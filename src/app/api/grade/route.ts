import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Technical guard for Vercel Hobby serverless execution limit
export const maxDuration = 60;

interface GradeRequestBody {
  taskType: 'task1' | 'task2';
  promptText: string;
  chartDataOrDescription?: string;
  imageBase64?: string;
  essayContent: string;
  userApiKey?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: GradeRequestBody = await req.json();
    const { taskType, promptText, chartDataOrDescription, imageBase64, essayContent, userApiKey } = body;

    if (!essayContent || essayContent.trim().length < 10) {
      return NextResponse.json(
        { error: 'Nội dung bài viết quá ngắn. Vui lòng nhập ít nhất một đoạn văn hoàn chỉnh.' },
        { status: 400 }
      );
    }

    // Determine API Key: Prioritize Bring-Your-Own-Key (BYOK), fallback to system env
    const apiKey = (userApiKey && userApiKey.trim().length > 10)
      ? userApiKey.trim()
      : process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your-gemini-api-key') {
      return NextResponse.json(
        {
          error:
            'Chưa cấu hình GEMINI_API_KEY. Vui lòng thêm GEMINI_API_KEY vào .env.local hoặc nhấn vào biểu tượng chìa khóa (BYOK) trên thanh menu để nhập API key cá nhân miễn phí từ Google AI Studio.',
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const isTask1 = taskType === 'task1';
    const minWords = isTask1 ? 150 : 250;
    const actualWordCount = essayContent.trim().split(/\s+/).filter(Boolean).length;

    const systemPrompt = `
You are an extremely experienced, strict senior British Council & IDP IELTS Writing Examiner.
Evaluate the candidate's essay strictly according to the official IELTS Public Band Descriptors.

Evaluation Rules:
1. Task Type: ${isTask1 ? 'IELTS Academic Writing Task 1' : 'IELTS Writing Task 2'}.
2. Minimum Word Count Requirement: ${minWords} words.
   Candidate's word count: ${actualWordCount} words.
   ${
     actualWordCount < minWords
       ? `CRITICAL PENALTY: The candidate wrote only ${actualWordCount} words (under the required ${minWords}). You MUST strictly penalize the ${
           isTask1 ? 'Task Achievement (TA)' : 'Task Response (TR)'
         } band score by 0.5 to 1.0 band and explicitly point this out in the feedback.`
       : 'The candidate satisfied the minimum word count.'
   }
${
  isTask1
    ? `3. Task 1 Specific Standards:
   - Must have a clear Overview summarizing general trends, differences, or stages. Lack of an overview caps TA at Band 5.0.
   - Must select and report key features with accurate figures directly derived from the provided chart/table/data.
   - STRICT PROHIBITION: The candidate must NOT insert personal opinions, reasons, speculations, or conclusions not directly supported by data. Penalize TA if personal opinions are included.`
    : `3. Task 2 Specific Standards:
   - Must address all parts of the task prompt directly.
   - Clear thesis statement and position presented throughout.
   - Main ideas well supported with logical elaboration and concrete real-world examples.
   - Logical paragraphing and natural cohesive devices (not overusing robotic transition words).`
}

Output JSON Schema:
{
  "overallBand": number (step 0.5 between 4.0 and 9.0, accurately reflecting the 4 criteria),
  "criteria": {
    "taskAchievementOrResponse": {
      "score": number (step 0.5),
      "feedback": string (Detailed in-depth analysis written in Vietnamese, citing candidate's essay)
    },
    "coherenceCohesion": {
      "score": number (step 0.5),
      "feedback": string (Detailed in-depth analysis written in Vietnamese on progression, paragraphing, linkers)
    },
    "lexicalResource": {
      "score": number (step 0.5),
      "feedback": string (Detailed in-depth analysis written in Vietnamese on range, collocations, precision, spelling)
    },
    "grammaticalRange": {
      "score": number (step 0.5),
      "feedback": string (Detailed in-depth analysis written in Vietnamese on complex structures, punctuation, accuracy)
    }
  },
  "sentenceCorrections": [
    {
      "original": string (Exact sentence or phrase extracted from candidate essay),
      "corrected": string (Natural, Band 8+ correction),
      "errorType": "Grammar" | "Vocabulary" | "Cohesion",
      "explanationVi": string (Clear explanation in Vietnamese why it was wrong and how the correction improves the score)
    }
  ],
  "vocabularyUpgrades": [
    {
      "basicWord": string (A common or repetitive word from candidate's essay),
      "academicAlternatives": string[] (Array of 2-3 C1/C2 academic collocations or synonyms),
      "contextExample": string (Example sentence showing how to use the upgrade in this essay topic)
    }
  ],
  "modelEssayBand8": string (A full, pristine Band 8.5 - 9.0 model essay addressing the prompt with exceptional academic English)
}
`;

    const promptParts: any[] = [];
    promptParts.push(systemPrompt);

    promptParts.push(`\n=== CANDIDATE PROMPT ===\nTitle/Question:\n${promptText}\n`);

    if (chartDataOrDescription) {
      promptParts.push(`\n=== CHART DATA / PROMPT CONTEXT ===\n${chartDataOrDescription}\n`);
    }

    promptParts.push(`\n=== CANDIDATE ESSAY ===\n${essayContent}\n`);

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      promptParts.push({
        inlineData: {
          data: cleanBase64,
          mimeType: 'image/jpeg',
        },
      });
      promptParts.push('\n[Please examine the attached chart image carefully to check if candidate cited numbers accurately.]\n');
    }

    const candidateModels = [
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.8-flash',
      'gemini-3.7-flash',
    ];

    let result = null;
    let lastError: any = null;

    for (const modelName of candidateModels) {
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
        console.warn(`Model ${modelName} failed (${err.message}), trying next candidate...`);
      }
    }

    if (!result) {
      throw lastError || new Error('Không thể kết nối đến mô hình AI Gemini.');
    }

    const responseText = result.response.text();
    let cleanJson = responseText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    const parsedJson = JSON.parse(cleanJson);

    return NextResponse.json(parsedJson);
  } catch (error: any) {
    console.error('Error during AI grading:', error);
    return NextResponse.json(
      {
        error: error.message || 'Lỗi xử lý khi chấm bài với AI. Vui lòng kiểm tra API Key hoặc thử lại.',
      },
      { status: 500 }
    );
  }
}
