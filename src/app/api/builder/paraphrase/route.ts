import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateRequestOrigin } from '@/lib/security';

export const maxDuration = 30;

interface ParaphraseRequestBody {
  sentence: string;
  targetBand: string; // '5.5' | '6.0' | '6.5' | '7.0' | '7.5' | '8.0+'
  blockId?: string;
  taskType?: 'task1' | 'task2';
  promptText?: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!validateRequestOrigin(req)) {
      return NextResponse.json({ error: 'Yêu cầu không hợp lệ' }, { status: 403 });
    }

    const body: ParaphraseRequestBody = await req.json();
    const { sentence, targetBand, blockId, taskType, promptText } = body;

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
You are a distinguished IELTS Writing Master Coach and Senior Cambridge/IDP Examiner specializing in vocabulary upgrades, modern academic collocations, and diverse high-band sentence structures.
Your mission is to PARAPHRASE and ELEVATE a candidate's sentence to specifically target Band ${targetBand || '7.5'}.

CONTEXT:
- Task: ${taskType === 'task1' ? 'IELTS Academic Writing Task 1' : 'IELTS Writing Task 2'}
- Block/Section: ${blockId || 'Body Paragraph'}
- Prompt Question: ${promptText || 'Not provided'}
- Candidate's Original Sentence:
"${sentence.trim()}"
- Target Band: Band ${targetBand || '7.5'}

CRITICAL STYLISTIC DIRECTIVE: STRICTLY AVOID MECHANICAL PASSIVE VOICE BIAS
1. CANDIDATE FEEDBACK & REAL-WORLD EXAMINER STANDARD:
   Candidates report that previous versions repeatedly forced almost every sentence into passive voice (e.g., cliché patterns like "It is believed that...", "Measures should be implemented by...", "...is witnessed"), making their essays sound sluggish, repetitive, and unnatural.
   In reality, official Band 8.0 - 9.0 writing relies predominantly on CRISP, VIGOROUS ACTIVE VOICE with strong transitive verbs and modern collocations.
2. PREFER DYNAMIC ACTIVE VOICE:
   If the candidate's original sentence is in the active voice, PREFER KEEPING IT IN THE ACTIVE VOICE!
   Elevate it by:
   - Replacing generic verbs with punchy, high-impact verbs (e.g., foster, cultivate, exacerbate, undermine, propel, catalyze, alleviate, spearhead, harness, empower, jeopardize, stimulate).
   - Employing modern, authentic C1/C2 collocations (e.g., "rampant consumerism", "digital proliferation", "socioeconomic disparities", "tangible dividends", "dire ramifications", "pressing environmental concerns").
   - Using nominalization as active subjects (e.g., "The widespread adoption of AI streamlines industrial workflows..." rather than passive "Industrial workflows are streamlined by the adoption of AI...").
   - Using participle clauses (-ing / -ed) to add depth (e.g., "By investing heavily in infrastructure, municipal authorities can relieve traffic bottlenecks, thereby boosting overall economic productivity").
   - Using contrast/concessive structures (e.g., "While financial constraints remain formidable, proactive governmental policies can effectively mitigate...").
   - Passive voice should ONLY be used when the agent is genuinely irrelevant or in Task 1 process descriptions. NEVER force passive voice just to sound "academic".

3. PROVIDE 3 DISTINCT STYLISTIC ALTERNATIVES (MANDATORY):
   Generate 3 distinctly different elevated variations so the candidate has diverse options to choose from:
   - Option 1 (Active & Modern Collocations): Strong ACTIVE VOICE with sophisticated verbs and natural collocations. (Recommended default)
   - Option 2 (Participle / Complex Clause): Elegant sentence utilizing a participle clause (-ing / -ed) or concessive / relative clause expansion.
   - Option 3 (Nominalized / Emphatic Structure): A formal academic sentence using an active nominalized subject, balanced contrast, or emphatic structure.

4. MANDATORY JSON OUTPUT FORMAT:
You MUST output ONLY a valid JSON object matching this exact schema:
{
  "paraphrasedSentence": "The best, most natural elevated sentence here (preferring active voice with modern collocations).",
  "bandScore": "${targetBand || '7.5'}",
  "alternatives": [
    {
      "sentence": "Full sentence for Option 1",
      "styleLabel": "Chủ động & Collocation hiện đại (Khuyên dùng)",
      "explanationVi": "Giữ thể chủ động mạnh mẽ, thay động từ thông thường bằng collocation C1/C2 sắc nét."
    },
    {
      "sentence": "Full sentence for Option 2",
      "styleLabel": "Mệnh đề phân từ / Mở rộng (Participle Clause)",
      "explanationVi": "Sử dụng phân từ (-ing) hoặc liên từ mở rộng giúp câu giàu nhịp điệu và đa dạng ngữ pháp."
    },
    {
      "sentence": "Full sentence for Option 3",
      "styleLabel": "Danh từ hóa & Trang trọng (Nominalization)",
      "explanationVi": "Đưa khái niệm lên làm chủ ngữ danh từ hóa tạo sắc thái học thuật trang trọng mà không bị gượng ép."
    }
  ],
  "lexicalHighlights": [
    {
      "phrase": "exact phrase from the paraphrased sentence",
      "type": "Collocation", // "Collocation" | "C1/C2 Vocabulary" | "Academic Phrase" | "Grammar Structure"
      "meaningVi": "Nghĩa tiếng Việt rõ ràng, chính xác",
      "usageNoteVi": "Cách dùng hoặc điểm cộng khi dùng cụm từ này trong bài thi IELTS"
    }
  ],
  "styleExplanationVi": "Giải thích chi tiết tại sao các cách diễn đạt này đạt Band ${targetBand} (nhấn mạnh cách dùng từ tự nhiên, mạch lạc, không bị lạm dụng bị động)."
}
`;

    // Priority: Fastest lightweight models for instant sentence paraphrasing
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
              temperature: 0.45,
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
    console.error('Error during sentence paraphrasing:', error);
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
      : error.message || 'Lỗi khi nâng cấp câu văn với AI. Vui lòng thử lại.';

    return NextResponse.json(
      { error: errorMessage, isOverloaded },
      { status: isOverloaded ? 503 : 500 }
    );
  }
}
