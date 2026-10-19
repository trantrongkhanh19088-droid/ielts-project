import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateRequestOrigin } from '@/lib/security';

export const maxDuration = 30;

interface CheckRequestBody {
  sentence: string;
  blockId?: string;
  taskType?: 'task1' | 'task2';
  promptText?: string;
  previousSentences?: string[];
}

export async function POST(req: NextRequest) {
  try {
    if (!validateRequestOrigin(req)) {
      return NextResponse.json({ error: 'Yêu cầu không hợp lệ' }, { status: 403 });
    }

    const body: CheckRequestBody = await req.json();
    const { sentence, blockId, taskType, promptText, previousSentences } = body;

    if (!sentence || sentence.trim().length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng nhập câu cần kiểm tra.' },
        { status: 400 }
      );
    }

    if (sentence.length > 1000) {
      return NextResponse.json(
        { error: 'Câu văn quá dài (vui lòng nhập dưới 1000 ký tự cho một câu).' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Chưa cấu hình GEMINI_API_KEY trên máy chủ hệ thống. Vui lòng liên hệ quản trị viên.',
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemPrompt = `
You are a senior, certified Cambridge & IDP IELTS Writing Examiner and master English Grammarian.
Your job is to thoroughly analyze a SINGLE SENTENCE written by an IELTS candidate within a specific section of their essay.

CONTEXT:
- Task: ${taskType === 'task1' ? 'IELTS Academic Writing Task 1' : 'IELTS Writing Task 2'}
- Block/Section: ${blockId || 'Body Paragraph'}
- Prompt Question: ${promptText || 'Not provided'}
- Preceding Sentences in this section (if any):
${previousSentences && previousSentences.length > 0 ? previousSentences.map((s, idx) => `  [Sentence ${idx + 1}]: ${s}`).join('\n') : '  (This is the first sentence in this block)'}

CANDIDATE'S SENTENCE TO EVALUATE:
"${sentence.trim()}"

YOUR TASK (CAMBRIDGE & IDP ACADEMIC REFINEMENT STANDARDS):
1. Detect all grammatical errors (tenses, subject-verb agreement, relative clauses, prepositions, articles, dangling modifiers).
2. Detect lexical and word choice inaccuracies (unnatural collocations, wrong parts of speech, inappropriate register).
3. Detect academic wordiness and redundancy (eliminating empty filler language, repetitive clichés like "due to the fact that" -> "because").
4. Detect spelling, capitalization, and punctuation mistakes.
5. Formulate the clean, corrected version of the candidate's sentence preserving their original intended meaning with optimal academic density.
6. Provide a short, constructive, encouraging advice sentence in Vietnamese.

MANDATORY JSON OUTPUT FORMAT:
You MUST output ONLY a valid JSON object matching this exact schema:
{
  "hasErrors": true, // false if sentence has zero errors
  "errors": [
    {
      "type": "Grammar", // "Grammar" | "Vocabulary" | "Spelling" | "Punctuation" | "Redundancy"
      "originalSnippet": "exact substring containing error or wordiness",
      "correction": "exact corrected or tightened substring",
      "explanationVi": "Ngắn gọn giải thích tại sao sai hoặc lý do cần tinh giản bằng tiếng Việt (1 câu dễ hiểu)"
    }
  ],
  "correctedSentence": "Full corrected sentence with all mistakes and redundancies resolved",
  "overallAdviceVi": "Lời khuyên ngắn gọn bằng tiếng Việt giúp học viên nhớ quy tắc này"
}
`;

    // Priority: Fastest lightweight models for real-time sentence checking
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
              temperature: 0.1,
            },
          });
          result = await model.generateContent(systemPrompt);
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

    const parsed = JSON.parse(cleanJson);
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('Error during sentence checking:', error);
    const isOverloaded =
      error.status === 503 ||
      error.status === 429 ||
      (error.message &&
        (error.message.includes('503') ||
          error.message.includes('429') ||
          error.message.includes('high demand') ||
          error.message.includes('quota')));

    const errorMessage = isOverloaded
      ? 'Hệ thống máy chủ Google AI hiện đang có lượng truy cập tăng đột biến tạm thời (503 Service Unavailable). Vui lòng thử lại sau vài giây.'
      : error.message || 'Lỗi khi phân tích ngữ pháp câu văn. Vui lòng thử lại.';

    return NextResponse.json(
      { error: errorMessage, isOverloaded },
      { status: isOverloaded ? 503 : 500 }
    );
  }
}
