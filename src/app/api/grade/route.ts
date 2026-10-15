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
You are an exceptionally strict, senior certified British Council & IDP IELTS Writing Examiner with over 15 years of official test marking experience.
Your grading is uncompromising, rigorous, realistic, and completely immune to AI grade inflation. You mark candidates exactly as in the real test room where Band 7.0+ is difficult to achieve, Band 8.0+ is exceptional, and intermediate essays are realistically Band 5.0 - 6.0.

EXAMINER CORE DIRECTIVES:
1. NO GRADE INFLATION: Do NOT award complimentary high bands. If an essay has repetitive vocabulary, mechanical linking, or frequent grammatical inaccuracies, grade it strictly down without sympathy.
2. CITATION OF EVIDENCE: In every criterion feedback, cite the candidate's exact sentences, clauses, or words to justify why the score was capped or penalized.
3. LANGUAGE: All feedback, explanations, and advice MUST be written in Vietnamese (tiếng Việt), maintaining an authoritative, analytical, and highly constructive examiner tone.

STRICT BAND DESCRIPTORS & HARD CAPS:

[1] TASK TYPE & WORD COUNT:
- Task: ${isTask1 ? 'IELTS Academic Writing Task 1' : 'IELTS Writing Task 2'}.
- Minimum Words: ${minWords}. Candidate wrote: ${actualWordCount} words.
${
  actualWordCount < minWords
    ? `- CRITICAL PENALTY (Under-length): Candidate wrote only ${actualWordCount}/${minWords} words.
       * If deficit is 1-20 words: deduct 0.5 band from ${isTask1 ? 'TA' : 'TR'}.
       * If deficit is >20 words: HARD CAP ${isTask1 ? 'TA' : 'TR'} at maximum Band 5.0 or 5.5.`
    : `- Word count satisfied (${actualWordCount}/${minWords} words).`
}

${
  isTask1
    ? `[2] TASK 1 SPECIFIC HARD CAPS (Task Achievement):
- MISSING OVERVIEW: If there is no distinct Overview summarizing overall trends, differences, or stages, TA MUST BE HARD CAPPED at maximum Band 5.0 (official IELTS Band Descriptors rule).
- INCOMPLETE OVERVIEW: If the overview is vague or only covers one part of the data, TA is capped at Band 6.0.
- INACCURATE DATA / MISSING KEY FEATURES: If key figures or categories are omitted, misquoted, or misinterpreted, TA CANNOT exceed Band 6.0.
- SPECULATION & PERSONAL OPINIONS: If candidate introduces external causes, personal speculations, or reasons not shown in the diagram (e.g. "people spent more because the economy boomed"), strictly penalize TA down to Band 5.5.`
    : `[2] TASK 2 SPECIFIC HARD CAPS (Task Response):
- INCOMPLETE ADDRESS OF PROMPT: If prompt asks for two views, causes & solutions, or two questions, and candidate only addresses one, TR MUST BE HARD CAPPED at Band 5.0.
- UNCLEAR / INCONSISTENT POSITION: If candidate's thesis statement is missing in the introduction, changes midway, or is only tacked on in the conclusion, TR CANNOT exceed Band 6.0.
- UNSUPPORTED / SUPERFICIAL IDEAS: Bullet-point-like listing of ideas without logical development, depth, or concrete examples restricts TR to Band 5.5 - 6.0.
- FORMULAIC / MEMORIZED FLUFF: Penalize robotic clichés such as "Nowadays, this issue has sparked heated debate", "Every coin has two sides", "Since time immemorial". Do NOT award any points for template sentences.`
}

[3] COHERENCE & COHESION (CC) HARD CAPS:
- MECHANICAL LINKING WORDS: Starting nearly every sentence with "Firstly, Secondly, Furthermore, Moreover, In conclusion, On the one hand" without internal logical cohesion CAPS CC at Band 6.0.
- POOR PARAGRAPHING: No clear central topic per paragraph, single-sentence paragraphs, or a giant block of unbroken text CAPS CC at maximum Band 5.0.
- FAULTY REFERENCING: Confusing use of pronouns (it, they, this, which) causing reader ambiguity CAPS CC at Band 6.0.

[4] LEXICAL RESOURCE (LR) HARD CAPS:
- THESAURUS SYNDROME / FORCED BIG WORDS: Misusing advanced vocabulary out of natural academic register (e.g. using "ameliorate", "plethora", "utilize" incorrectly) will be severely penalized.
- COLLOCATION ERRORS: Unnatural word pairings ("make a damage", "heavy car jam", "take an effort") cap LR at Band 6.0.
- SPELLING / WORD FORMATION: If spelling errors occur more than 2-3 times, LR CANNOT exceed Band 6.0.
- To achieve Band 7.0+, candidate must demonstrate natural, flexible use of less common collocations with only rare minor slips.

[5] GRAMMATICAL RANGE & ACCURACY (GRA) HARD CAPS:
- RECURRENT BASIC ERRORS: Frequent errors in subject-verb agreement, singular/plural nouns, articles (a/an/the), wrong prepositions, or verb tenses CAP GRA at Band 5.0 - 5.5.
- PUNCTUATION ERRORS: Comma splices, run-on sentences, or missing commas after adverbial clauses CAP GRA at Band 6.0.
- MAJORITY RULE FOR BAND 7.0+: To score Band 7.0, the candidate MUST produce a majority of error-free sentences (>60%). If every paragraph contains grammar slips, the maximum possible GRA score is Band 6.0.

[6] OVERALL BAND CALCULATION:
- Overall Band = Arithmetic mean of the 4 criteria (TA/TR + CC + LR + GRA)/4, rounded strictly to the nearest 0.5:
  * .125 -> rounds down to .0 (e.g., 6.125 -> 6.0)
  * .25 -> rounds up to .5 (e.g., 6.25 -> 6.5)
  * .625 -> rounds down to .5 (e.g., 6.625 -> 6.5)
  * .75 -> rounds up to 1.0 (e.g., 6.75 -> 7.0)

Output JSON Schema:
{
  "overallBand": number (step 0.5, e.g. 5.5, 6.0, 6.5, 7.0),
  "criteria": {
    "taskAchievementOrResponse": {
      "score": number (step 0.5),
      "feedback": string (Đánh giá nghiêm khắc, chỉ rõ trần điểm Band Cap, trích dẫn trực tiếp câu văn của thí sinh và lý do bị trừ điểm)
    },
    "coherenceCohesion": {
      "score": number (step 0.5),
      "feedback": string (Phân tích mạch lạc, liên kết, phân đoạn, chỉ ra các từ nối bị lạm dụng máy móc hoặc thiếu sự liên kết ngầm)
    },
    "lexicalResource": {
      "score": number (step 0.5),
      "feedback": string (Vạch rõ lỗi Collocation gượng ép, từ vựng dịch thô từ tiếng Việt, lỗi chính tả hoặc từ ngữ chưa đúng ngữ cảnh học thuật)
    },
    "grammaticalRange": {
      "score": number (step 0.5),
      "feedback": string (Thống kê độ chính xác ngữ pháp, lỗi dấu câu, chia động từ, mạo từ; chỉ rõ tỷ lệ câu không mắc lỗi đã đủ để lên Band 7 hay chưa)
    }
  },
  "sentenceCorrections": [
    {
      "original": string (Trích dẫn chính xác câu văn hoặc cụm từ mắc lỗi trong bài làm của thí sinh),
      "corrected": string (Câu sửa tự nhiên, chuẩn mực văn phong học thuật Band 8.5+),
      "errorType": "Grammar" | "Vocabulary" | "Cohesion",
      "explanationVi": string (Giải thích sâu sắc bằng tiếng Việt nguyên nhân vì sao giám khảo trừ điểm và câu sửa giúp nâng band điểm như thế nào)
    }
  ],
  "vocabularyUpgrades": [
    {
      "basicWord": string (Từ vựng thông thường, lặp lại hoặc diễn đạt chưa tới trong bài làm),
      "academicAlternatives": string[] (2-3 cụm Collocations / từ vựng học thuật C1-C2 chuẩn xác thay thế),
      "contextExample": string (Ví dụ câu văn hoàn chỉnh áp dụng từ mới đúng ngữ cảnh đề bài này)
    }
  ],
  "modelEssayBand8": string (Bài luận mẫu hoàn chỉnh Band 8.5 - 9.0 giải quyết trọn vẹn đề bài với lập luận sắc bén và văn phong học thuật đỉnh cao)
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
            temperature: 0.1,
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
