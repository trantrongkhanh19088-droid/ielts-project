import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 30;

interface CheckRequestBody {
  sentence: string;
  blockId?: string;
  taskType?: 'task1' | 'task2';
  promptText?: string;
  previousSentences?: string[];
  userApiKey?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckRequestBody = await req.json();
    const { sentence, blockId, taskType, promptText, previousSentences, userApiKey } = body;

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

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Chưa cấu hình GEMINI_API_KEY. Vui lòng thêm GEMINI_API_KEY hoặc nhập key cá nhân từ Google AI Studio.',
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

YOUR TASK:
1. Detect all grammatical errors (tenses, subject-verb agreement, relative clauses, prepositions, articles, dangling modifiers).
2. Detect lexical and word choice inaccuracies (unnatural collocations, wrong parts of speech, inappropriate register).
3. Detect spelling, capitalization, and punctuation mistakes.
4. Formulate the clean, corrected version of the candidate's sentence preserving their original intended meaning.
5. Provide a short, constructive, encouraging advice sentence in Vietnamese.

MANDATORY JSON OUTPUT FORMAT:
You MUST output ONLY a valid JSON object matching this exact schema:
{
  "hasErrors": true, // false if sentence has zero errors
  "errors": [
    {
      "type": "Grammar", // "Grammar" | "Vocabulary" | "Spelling" | "Punctuation"
      "originalSnippet": "exact substring containing error",
      "correction": "exact corrected substring",
      "explanationVi": "Ngắn gọn giải thích tại sao sai bằng tiếng Việt (1 câu dễ hiểu)"
    }
  ],
  "correctedSentence": "Full corrected sentence with all mistakes resolved",
  "overallAdviceVi": "Lời khuyên ngắn gọn bằng tiếng Việt giúp học viên nhớ quy tắc này"
}
`;

    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-flash-latest',
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
            temperature: 0.1,
          },
        });
        result = await model.generateContent(systemPrompt);
        if (result) break;
      } catch (err: any) {
        lastError = err;
      }
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
    return NextResponse.json(
      {
        error: error.message || 'Lỗi khi phân tích ngữ pháp câu văn. Vui lòng thử lại.',
      },
      { status: 500 }
    );
  }
}
