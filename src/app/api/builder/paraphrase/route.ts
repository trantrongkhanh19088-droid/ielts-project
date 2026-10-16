import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 30;

interface ParaphraseRequestBody {
  sentence: string;
  targetBand: string; // '5.5' | '6.0' | '6.5' | '7.0' | '7.5' | '8.0+'
  blockId?: string;
  taskType?: 'task1' | 'task2';
  promptText?: string;
  userApiKey?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ParaphraseRequestBody = await req.json();
    const { sentence, targetBand, blockId, taskType, promptText, userApiKey } = body;

    if (!sentence || sentence.trim().length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng nhập câu cần nâng cấp.' },
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
You are a distinguished IELTS Writing Master Coach and Examiner specializing in vocabulary upgrades, academic collocations, and high-band sentence structures.
Your mission is to PARAPHRASE and ELEVATE a candidate's sentence to specifically target Band ${targetBand || '7.5'}.

CONTEXT:
- Task: ${taskType === 'task1' ? 'IELTS Academic Writing Task 1' : 'IELTS Writing Task 2'}
- Block/Section: ${blockId || 'Body Paragraph'}
- Prompt Question: ${promptText || 'Not provided'}
- Candidate's Original Sentence:
"${sentence.trim()}"
- Target Band: Band ${targetBand || '7.5'}

INSTRUCTIONS:
1. Retain the core factual and logical meaning of the original sentence, but rewrite it into natural, sophisticated, academic English suitable for Band ${targetBand}.
2. Use authentic C1/C2 collocations, topic-specific vocabulary, and flexible grammatical structures (such as participle clauses, nominalization, cleft sentences, inversion, or advanced subordinate clauses where appropriate).
3. Do NOT make it overly convoluted or pompous; ensure it sounds natural to a native English academic examiner.
4. Identify 2 to 4 key lexical highlights or collocations in your paraphrased sentence, provide their clear Vietnamese meanings, and explain how candidates can use them.
5. In "styleExplanationVi", explain in Vietnamese why this version is superior and how it boosts the Lexical Resource and Grammatical Range score to Band ${targetBand}.

MANDATORY JSON OUTPUT FORMAT:
You MUST output ONLY a valid JSON object matching this exact schema:
{
  "paraphrasedSentence": "The sophisticated academic paraphrased sentence here.",
  "bandScore": "${targetBand || '7.5'}",
  "lexicalHighlights": [
    {
      "phrase": "exact phrase from the paraphrased sentence",
      "type": "Collocation", // "Collocation" | "C1/C2 Vocabulary" | "Academic Phrase" | "Grammar Structure"
      "meaningVi": "Nghĩa tiếng Việt rõ ràng, chính xác",
      "usageNoteVi": "Cách dùng hoặc điểm cộng khi dùng cụm từ này trong bài thi IELTS"
    }
  ],
  "styleExplanationVi": "Giải thích tại sao câu này đạt band điểm mục tiêu (ví dụ: dùng danh từ hóa, liên từ học thuật, tránh lặp từ...)"
}
`;

    // Priority: Fastest lightweight models (Flash-Lite) for instant sentence paraphrasing
    const candidateModels = [
      'gemini-3.5-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-2.5-flash-lite',
      'gemini-3.6-flash',
      'gemini-3.7-flash',
      'gemini-3.8-flash',
      'gemini-2.5-flash',
      'gemini-flash-latest',
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
    console.error('Error during sentence paraphrasing:', error);
    return NextResponse.json(
      {
        error: error.message || 'Lỗi khi nâng cấp câu văn với AI. Vui lòng thử lại.',
      },
      { status: 500 }
    );
  }
}
