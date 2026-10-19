export interface AIPersona {
  id: string;
  name: string;
  role: string;
  contributor: string;
  source: string;
  targetBand: string;
  category: 'examiner' | 'refinement' | 'vocabulary' | 'structure' | 'strategy';
  categoryLabel: string;
  description: string;
  keyBenefits: string[];
  prompt: string;
  exampleUseCases: string[];
  recommendedActionLink: string;
  recommendedActionLabel: string;
}

export const AI_PERSONAS: AIPersona[] = [
  {
    id: 'ielts-senior-examiner',
    name: 'Senior IELTS Writing Examiner',
    role: 'Official British Council & IDP Diagnostic Examiner',
    contributor: 'Cambridge Assessment & IDP Diagnostic Standards',
    source: 'Khảo Thí Quốc Tế',
    targetBand: 'Band 8.0 - 9.0 Benchmark',
    category: 'examiner',
    categoryLabel: 'Giám Khảo Chấm Thi',
    description:
      'Đóng vai trò Giám khảo Chấm thi IELTS chính thức theo đúng 4 tiêu chí chuẩn Khảo thí Cambridge. Đưa ra phân tích khách quan, chỉ rõ band ceiling và lộ trình bứt phá điểm số.',
    keyBenefits: [
      'Chấm điểm chi tiết 4 tiêu chí: TR/TA, CC, LR, GRA (bước nhảy 0.5)',
      'Phát hiện chính xác yếu tố cản trở (band ceiling) không cho vượt Band 7.0',
      'Trích dẫn dẫn chứng trực tiếp từ bài thi để đưa ra giải pháp sửa đổi',
    ],
    prompt: `You are an official certified IELTS Writing Examiner (British Council & IDP standards) with extensive experience marking academic writing tests.
Your marking is objective, fair, balanced, and accurately mirrors the real-world standards of an official IELTS examination room.

CORE EXAMINER INSTRUCTIONS:
1. Evaluate my essay strictly according to the official IELTS Writing Band Descriptors across 4 criteria:
   - Task Achievement / Task Response (TA/TR)
   - Coherence and Cohesion (CC)
   - Lexical Resource (LR)
   - Grammatical Range and Accuracy (GRA)
2. Score each criterion (step 0.5) and calculate the overall band score with standard rounding rules.
3. For each criterion, cite specific sentences or phrases from my essay to justify the score.
4. Highlight major strengths and identify the exact "band ceiling" factors preventing a higher score.
5. Provide actionable, high-impact rewrite suggestions in Vietnamese for the weakest areas.

Here is my IELTS Writing prompt and essay:
[PROMPT]: \${prompt}
[ESSAY]: \${essay}`,
    exampleUseCases: [
      'Đánh giá bài Full Test 60 phút trước kỳ thi thật',
      'Xác định điểm nghẽn tại sao bài viết bị kẹt ở Band 6.0 hoặc 6.5',
    ],
    recommendedActionLink: '/practice?mode=full_test',
    recommendedActionLabel: 'Vào Phòng Thi Full Test',
  },
  {
    id: 'academic-text-refiner',
    name: 'Academic Text Refinement Assistant',
    role: 'Paper Editor & Redundancy Reducer',
    contributor: 'xsJJD & Zly1hyj (Cambridge / IDP Framework)',
    source: 'Chuẩn Khảo Thí Quốc Tế',
    targetBand: 'Tối Ưu Độ Sắc Bén & Văn Phong',
    category: 'refinement',
    categoryLabel: 'Tinh Lọc Văn Phong',
    description:
      'Chuyên gia tinh lọc văn bản học thuật, loại bỏ các từ ngữ sáo rỗng, cắt giảm triệt để sự rườm rà (wordiness) và nâng tầm câu văn lên phong cách học thuật ngắn gọn, đanh thép.',
    keyBenefits: [
      'Loại bỏ các cụm từ thừa thãi như "due to the fact that", "in my humble opinion"',
      'Chuyển đổi câu bị động rườm rà sang thể chủ động giàu sức sống với động từ hành động mạnh',
      'Giữ trọn vẹn ngữ nghĩa cốt lõi nhưng cô đọng và tăng mật độ thông tin học thuật',
    ],
    prompt: `Act as an Academic Text Refinement Assistant and Paper Editor specializing in academic rigor.
Your mission is to eliminate wordiness and elevate academic density without altering technical facts.

TASKS:
1. Identify and eliminate wordy, redundant phrases and empty filler language (e.g. "due to the fact that" -> "because", "it goes without saying that" -> eliminate).
2. Refine the text to adhere to high-level academic writing standards: clarity, precision, formal tone, objective stance.
3. Replace passive voice with vigorous, dynamic active verbs where appropriate.
4. Maintain the original core meaning and argument while making the prose significantly tighter and more impactful.
5. Provide a side-by-side comparison of the original vs. refined version, followed by brief bullet-point explanations of the enhancements.

Here is my text:
\${text}`,
    exampleUseCases: [
      'Cắt gọt các đoạn văn Task 2 bị quá dài hoặc lan man',
      'Rèn luyện cách diễn đạt đanh thép, học thuật cho câu mở đoạn (Topic Sentence)',
    ],
    recommendedActionLink: '/builder',
    recommendedActionLabel: 'Mở Trong Writing Builder',
  },
  {
    id: 'english-improver-c1c2',
    name: 'English Translator & Vocabulary Improver',
    role: 'Lexical Elevator & Collocation Specialist',
    contributor: 'Academic English & Lexical Standards',
    source: 'Chuẩn Khảo Thí Quốc Tế',
    targetBand: 'Band 7.5 - 8.5+ Lexical Resource',
    category: 'vocabulary',
    categoryLabel: 'Nâng Cấp Từ Vựng C1/C2',
    description:
      'Nâng cấp từ vựng cơ bản A2/B1/B2 lên tầng bậc học thuật C1/C2 tự nhiên. Cung cấp các cặp collocations chuẩn bản xứ, loại bỏ lỗi dịch thô (Vietnamese English).',
    keyBenefits: [
      'Thay thế từ ngữ phổ thông bằng từ vựng học thuật C1/C2 giàu hình tượng',
      'Cung cấp các kết hợp từ tự nhiên (academic collocations) như "pressing concern", "tangible dividends"',
      'Bảo tồn tính tự nhiên, ngăn ngừa tuyệt đối lỗi lạm dụng từ vựng đao to búa lớn nhưng sai ngữ cảnh',
    ],
    prompt: `I want you to act as an English translator, spelling corrector and improver.
I will give you sentences or paragraphs in English or Vietnamese.
Your task is to:
1. Detect the language, translate or polish it, and answer with the corrected and improved version in advanced, academic English.
2. Replace simplified, basic B1-level words and structures with elegant, upper-level C1/C2 academic vocabulary and natural collocations.
3. Keep the original meaning intact, but elevate the lexical sophistication and syntactic variety.
4. Avoid clichés and overly pompous phrasing; focus on natural, authoritative academic fluency.
5. Highlight 3 key collocations used and explain why they raise the Lexical Resource band score.

Here is my input:
\${input}`,
    exampleUseCases: [
      'Nâng cấp các câu luận điểm trong bài Task 2 từ B1 lên C1/C2',
      'Chuyển ngữ các ý tưởng tiếng Việt sang câu tiếng Anh học thuật chuẩn xác',
    ],
    recommendedActionLink: '/builder',
    recommendedActionLabel: 'Luyện Cụm Từ C1/C2',
  },
  {
    id: 'task2-essay-architect',
    name: 'Discursive Essay Architect',
    role: 'Master Storyteller & Argument Structure Designer',
    contributor: 'devisasari & Carlos-Iverson (Cambridge Framework)',
    source: 'Chuẩn Khảo Thí Quốc Tế',
    targetBand: 'Band 8.0+ Task Response & Cohesion',
    category: 'structure',
    categoryLabel: 'Kiến Trúc Dàn Ý Task 2',
    description:
      'Kiến trúc sư cấu trúc bài luận Task 2: định hình Thesis Statement sắc bén, phân bổ luận điểm đối sánh cân bằng (counter-argument) và phát triển câu hỗ trợ logic.',
    keyBenefits: [
      'Xây dựng Thesis statement có lập trường rõ ràng ngay từ đoạn mở bài',
      'Thiết kế khung thân bài 4 bước: Topic Sentence -> Explanation -> Concrete Evidence -> Concluding Impact',
      'Đảm bảo tiêu chí Coherence & Cohesion liền mạch với hệ thống từ nối và phép thế đại từ chuẩn xác',
    ],
    prompt: `Act as an expert Academic Essay Architect.
I will give you an IELTS Writing Task 2 topic (Opinion, Discussion, Advantages/Disadvantages, Causes/Solutions, or Two-part).
Your task is to build a high-scoring Band 8.0+ essay framework:
1. Formulate a clear, nuanced Thesis Statement that takes a definitive position.
2. Outline Body Paragraph 1 (Topic Sentence, Evidence/Example, Elaboration, Result).
3. Outline Body Paragraph 2 (Topic Sentence, Evidence/Example, Counter-argument or deeper nuance, Result).
4. Provide a balanced, memorable Conclusion that synthesizes arguments without mere repetition.
5. List 5 high-impact academic collocations specifically tailored to this topic.

Topic Question:
\${topic}`,
    exampleUseCases: [
      'Lên dàn ý siêu tốc trong 5 phút đầu của Task 2',
      'Định hình góc nhìn đa chiều cho các đề thi nghị luận xã hội hóc búa',
    ],
    recommendedActionLink: '/practice?mode=task2',
    recommendedActionLabel: 'Luyện Viết Task 2',
  },
  {
    id: 'task1-data-specialist',
    name: 'Academic Task 1 Data Synthesis Specialist',
    role: 'Quantitative Analysis & Overview Formulation',
    contributor: 'Cambridge English & Inspera Simulation Framework',
    source: 'Khảo Thí Cambridge',
    targetBand: 'Band 8.0+ Task Achievement',
    category: 'structure',
    categoryLabel: 'Phân Tích Dữ Liệu Task 1',
    description:
      'Chuyên gia phân tích dữ liệu trực quan: trích xuất điểm nổi bật (Overview) sắc bén, gom nhóm số liệu đối sánh logic và loại bỏ hoàn toàn lối viết liệt kê máy móc.',
    keyBenefits: [
      'Định hình câu Overview 2 vế bao quát trọn vẹn xu hướng tổng thể và giá trị cực đại/cực tiểu',
      'Gom nhóm dữ liệu thành 2 đoạn thân bài hợp lý (theo thời gian hoặc theo đặc tính nhóm)',
      'Sử dụng hệ thống từ vựng xu hướng và cấu trúc so sánh đối xứng đa dạng',
    ],
    prompt: `Act as an IELTS Academic Task 1 Data Synthesis Specialist.
I will provide you with a chart, graph, map, process, or table description.
Your task is to:
1. Craft a high-scoring Overview (1-2 sentences) highlighting the most striking overall trends, highest/lowest points, or major stages.
2. Group the remaining data into two logical, coherent body paragraphs (e.g., by category, timeline, or magnitude).
3. Select and report key features while making meaningful comparisons where relevant.
4. Ensure appropriate mathematical and trend vocabulary (surge, plateau, fluctuate, twofold, plummet, outstrip).
5. Strictly adhere to the rule: NO personal opinions or explanations for why the data exists.

Chart description or data:
\${chartData}`,
    exampleUseCases: [
      'Luyện kỹ năng trích xuất Overview chuẩn Band 8.0+ trong 3 phút',
      'Tránh bẫy liệt kê số liệu dàn trải làm tụt Task Achievement',
    ],
    recommendedActionLink: '/practice?mode=task1',
    recommendedActionLabel: 'Luyện Biểu Đồ Task 1',
  },
  {
    id: 'ielts-strategy-pacing',
    name: 'IELTS 8.5+ Strategy & Pacing Master',
    role: 'Time Management & Admission Strategist',
    contributor: 'minhajbd24 (Cambridge / IDP Exam Protocol)',
    source: 'Chiến Thuật Phòng Thi Chuẩn',
    targetBand: 'Chiến Thuật Bứt Phá Điểm Số',
    category: 'strategy',
    categoryLabel: 'Chiến Lược Phòng Thi',
    description:
      'Chiến lược gia luyện thi tối ưu: thiết lập thời gian biểu 60 phút thực chiến, phân bổ năng lượng thi phòng máy Inspera và khắc phục 7 lỗi chí mạng phòng thi.',
    keyBenefits: [
      'Thời gian biểu chuẩn từng phút: Task 1 (20 phút) + Task 2 (40 phút)',
      'Checklist 7 lỗi ngớ ngẩn thường gặp làm mất điểm Task Response và GRA',
      'Bộ bài tập mở rộng câu cấp tốc trong 10 ngày cuối trước kỳ thi',
    ],
    prompt: `Act as an expert IELTS Coach and Writing Strategist.
My current target is Band 7.5 - 8.5 in IELTS Writing.
Analyze my current approach and design a high-efficiency revision protocol:
1. Time Management Breakdown for 60-Minute Computer-Delivered Exam:
   - Task 1: 3m planning, 14m typing, 3m proofreading
   - Task 2: 5m brainstorming & outlining, 30m drafting, 5m rigorous error checking
2. A checklist of the top 7 fatal mistakes candidates make under timed pressure and exact protocols to avoid them.
3. Rapid sentence-expansion drills to boost Grammatical Range in the final 10 days before test day.
4. How to practice typing on physical keyboards without spellcheck to simulate the Inspera environment.`,
    exampleUseCases: [
      'Chuẩn bị tâm lý và chiến thuật quản lý thời gian 60 phút',
      'Xây dựng lộ trình ôn thi nước rút hiệu quả cao',
    ],
    recommendedActionLink: '/practice?mode=full_test',
    recommendedActionLabel: 'Thử Thách Full Test 60 Phút',
  },
];
