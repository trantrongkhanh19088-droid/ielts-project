import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateRequestOrigin } from '@/lib/security';

export const maxDuration = 45;

interface GenerateOutlineBody {
  taskType: 'task1' | 'task2';
  title?: string;
  question: string;
  category?: string;
  imageBase64?: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!validateRequestOrigin(req)) {
      return NextResponse.json({ error: 'Yêu cầu không hợp lệ' }, { status: 403 });
    }

    const body: GenerateOutlineBody = await req.json();
    const { taskType, title, question, category, imageBase64 } = body;

    if (!question || question.trim().length < 5) {
      return NextResponse.json(
        { error: 'Vui lòng nhập nội dung đề bài thi để AI phân tích.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ hệ thống.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const isTask1 = taskType === 'task1';

    const systemPrompt = `
You are an expert certified Cambridge & IDP IELTS Writing Examiner and master IELTS curriculum designer.
Your task is to analyze an IELTS Writing prompt (and optional chart image for Task 1) and generate a comprehensive, high-scoring Band 8.0+ Outline, official category, and academic vocabulary recommendations.

TASK TYPE: ${isTask1 ? 'IELTS Academic Writing Task 1 (Report minimum 150 words)' : 'IELTS Writing Task 2 (Academic Essay minimum 250 words)'}
CANDIDATE QUESTION / PROMPT:
"${question}"
${title ? `USER SUGGESTED TITLE: "${title}"` : ''}
${category ? `USER SUGGESTED CATEGORY: "${category}"` : ''}

OUTPUT FORMAT REQUIREMENTS:
You MUST respond with valid JSON ONLY conforming to this schema:
{
  "title": "A concise, professional title (e.g. 'T2: Higher Education: Online Learning vs Face-to-Face' or 'T1: Global Coffee Production and Consumption')",
  "category": "Official category: ${
    isTask1
      ? 'Line Graph | Bar Chart | Pie Chart | Table | Process Diagram | Map Comparison | Mixed Charts'
      : 'Opinion / Agree or Disagree | Discuss Both Views | Advantages & Disadvantages | Problem & Solution | Two-part Question'
  }",
  "instruction": "${
    isTask1
      ? 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
      : 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.'
  }",
  "outline": {
    "overviewOrThesis": "High-level overview (for Task 1) summarizing main trends/features without specific numbers, OR clear thesis statement / balanced viewpoint (for Task 2) directly answering all question prompts.",
    "body1": "Detailed plan for Body Paragraph 1 (Topic sentence, key trends or main argument 1, academic supporting evidence/data).",
    "body2": "Detailed plan for Body Paragraph 2 (Topic sentence, key comparisons or main argument 2, counter-argument or extension).",
    "conclusion": "${isTask1 ? 'Summary of most significant contrast or stability.' : 'Definitive synthesis re-affirming thesis and final concluding perspective.'}",
    "note": "Examiner guidance on pitfalls and common mistakes candidates must avoid for this specific topic."
  },
  "suggestedVocabulary": [
    {
      "word": "C1/C2 Academic Word or Phrase",
      "meaningVi": "Ý nghĩa tiếng Việt ngắn gọn, súc tích",
      "collocation": "A natural academic collocation or sample clause using this word in this topic"
    }
  ]
}

CRITICAL RULES:
- The outline content must strictly reflect Band 8.0 - 9.0 standards (academic precision, logical cohesion, sophisticated lexical range).
- "suggestedVocabulary" must include 4 to 6 high-value collocations.
- If an image is provided for Task 1, inspect the axes, legend, and key trends in the chart to build an accurate overview and body paragraphs.
- Respond with JSON ONLY, with no surrounding markdown or explanation text outside the JSON.
`;

    const promptParts: any[] = [systemPrompt];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      promptParts.push({
        inlineData: {
          data: cleanBase64,
          mimeType: 'image/jpeg',
        },
      });
      promptParts.push('\n[Carefully inspect the chart/diagram in this image to produce the accurate data overview and outline.]\n');
    }

    const candidateModels = [
      'gemini-3-flash-preview',
      'gemini-3.5-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.5-flash',
      'gemini-flash-latest',
    ];

    let result = null;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          });
          result = await model.generateContent(promptParts);
          if (result) break;
        } catch (err: any) {
          lastError = err;
          const isOverloaded =
            err.status === 503 ||
            err.status === 429 ||
            (err.message &&
              (err.message.includes('503') ||
                err.message.includes('429') ||
                err.message.includes('high demand') ||
                err.message.includes('quota')));

          if (isOverloaded && attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
          } else {
            break;
          }
        }
      }
      if (result) break;
    }

    if (!result) {
      throw lastError || new Error('Không thể kết nối đến mô hình AI.');
    }

    const responseText = result.response.text();
    let cleanJson = responseText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsedData = JSON.parse(cleanJson);
    return NextResponse.json(parsedData);
  } catch (err: any) {
    console.error('Error in generate-outline API:', err);
    return NextResponse.json(
      { error: err.message || 'Không thể tạo dàn ý AI. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
