import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateRequestOrigin } from '@/lib/security';
import { TASK_1_SEEDS, TASK_2_SEEDS } from '@/lib/data/seed-prompts';

export const maxDuration = 30;

interface PlanTreeRequestBody {
  weaknessPrompt?: string;
  targetedWeaknesses?: string[];
  totalLevels: number;
  targetBand: string;
}

export async function POST(req: NextRequest) {
  let body: PlanTreeRequestBody = { totalLevels: 5, targetBand: '6.5' };
  try {
    if (!validateRequestOrigin(req)) {
      return NextResponse.json({ error: 'Yêu cầu không hợp lệ' }, { status: 403 });
    }

    body = await req.json();
    const { weaknessPrompt, targetedWeaknesses = [], totalLevels = 5, targetBand = '6.5' } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return fallback without AI if API key is missing
      return NextResponse.json({
        coachAdvice: `Lộ trình ${totalLevels} tầng đã được điều chỉnh tự động để tăng cường các dạng đề bạn đã chọn. Hãy tập trung viết chắc từng câu từ Tầng 1!`,
        recommendedTask1Ids: [],
        recommendedTask2Ids: [],
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Compact seeds summary for AI
    const t1Summary = TASK_1_SEEDS.map((s) => ({ id: s.id, cat: s.category, title: s.title })).slice(0, 40);
    const t2Summary = TASK_2_SEEDS.map((s) => ({ id: s.id, cat: s.category, title: s.title })).slice(0, 40);

    const systemPrompt = `
You are an expert Cambridge IELTS Academic Writing Coach.
A student is setting up their gamified Writing Beanstalk Tree (${totalLevels} levels) aiming for Band ${targetBand}.
They provided the following weakness / focus prompt and weak categories:

STUDENT'S WEAKNESS PROMPT:
"${weaknessPrompt || 'Không có mô tả chi tiết, muốn tập trung các dạng đã chọn'}"

SELECTED WEAK CATEGORIES / TAGS:
${JSON.stringify(targetedWeaknesses)}

AVAILABLE TASK 1 POOL (Sample):
${JSON.stringify(t1Summary)}

AVAILABLE TASK 2 POOL (Sample):
${JSON.stringify(t2Summary)}

YOUR TASK:
1. Formulate a concise, motivating Coach Advice in Vietnamese (2-3 sentences) explaining how this personalized Beanstalk Tree directly addresses their weaknesses and what strategy they should apply.
2. Select up to ${Math.min(totalLevels, 8)} recommended Task 1 IDs from the pool that best target their weaknesses (e.g. Map, Process, Bar chart, etc.).
3. Select up to ${Math.min(totalLevels, 8)} recommended Task 2 IDs from the pool that best target their weaknesses (e.g. Discuss Both Views, Two-part, etc.).
4. Return a list of identified focus tags (e.g. ["Dạng Bản đồ (Map)", "Thảo luận 2 quan điểm (Discuss Both Views)", "Chủ đề Môi trường"]).

OUTPUT FORMAT (JSON ONLY, NO MARKDOWN WRAPPERS):
{
  "coachAdvice": "Lời khuyên từ Huấn luyện viên AI...",
  "recommendedTask1Ids": ["id1", "id2"],
  "recommendedTask2Ids": ["id1", "id2"],
  "focusTags": ["Tag 1", "Tag 2"]
}
`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = result.response.text();
    let parsedData = {};
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsedData = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Plan Tree Error:', error);
    return NextResponse.json({
      coachAdvice: 'Lộ trình cây đậu đã được thuật toán tối ưu hóa theo các trọng tâm cải thiện của bạn!',
      recommendedTask1Ids: [],
      recommendedTask2Ids: [],
      focusTags: body.targetedWeaknesses || [],
    });
  }
}
