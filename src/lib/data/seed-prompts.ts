import { PromptSeed } from '@/types';

export const TASK_1_SEEDS: PromptSeed[] = [
  {
    id: 't1-line-rainfall',
    taskType: 'task1',
    title: 'Average Monthly Rainfall in Three Cities',
    category: 'Line Graph',
    instruction:
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    question:
      'The graph below shows the average monthly rainfall (in millimeters) in three cities (London, Tokyo, and Rome) throughout the year.',
    minWords: 150,
    timeMinutes: 20,
    chartType: 'line',
    chartDescription:
      'Monthly rainfall in mm: Tokyo peaks dramatically in June (180mm) and September/October (200mm), whilst maintaining moderate levels in winter (50mm in Jan). Rome has a Mediterranean pattern with high rainfall in November (110mm) and December (95mm), dropping sharply in July (15mm). London has a steady, consistent rainfall between 45mm and 65mm across all 12 months.',
    chartDataKeys: [
      { key: 'Tokyo', name: 'Tokyo (Japan)', color: '#ef4444' },
      { key: 'Rome', name: 'Rome (Italy)', color: '#3b82f6' },
      { key: 'London', name: 'London (UK)', color: '#10b981' },
    ],
    chartData: [
      { label: 'Jan', Tokyo: 50, Rome: 80, London: 55 },
      { label: 'Feb', Tokyo: 60, Rome: 70, London: 45 },
      { label: 'Mar', Tokyo: 110, Rome: 65, London: 40 },
      { label: 'Apr', Tokyo: 130, Rome: 55, London: 45 },
      { label: 'May', Tokyo: 140, Rome: 40, London: 50 },
      { label: 'Jun', Tokyo: 180, Rome: 25, London: 55 },
      { label: 'Jul', Tokyo: 140, Rome: 15, London: 45 },
      { label: 'Aug', Tokyo: 150, Rome: 25, London: 50 },
      { label: 'Sep', Tokyo: 205, Rome: 65, London: 60 },
      { label: 'Oct', Tokyo: 195, Rome: 90, London: 65 },
      { label: 'Nov', Tokyo: 95, Rome: 110, London: 60 },
      { label: 'Dec', Tokyo: 55, Rome: 95, London: 55 },
    ],
    chartTable: {
      headers: ['Month', 'Tokyo (mm)', 'Rome (mm)', 'London (mm)'],
      rows: [
        ['Jan', 50, 80, 55],
        ['Feb', 60, 70, 45],
        ['Mar', 110, 65, 40],
        ['Apr', 130, 55, 45],
        ['May', 140, 40, 50],
        ['Jun', 180, 25, 55],
        ['Jul', 140, 15, 45],
        ['Aug', 150, 25, 50],
        ['Sep', 205, 65, 60],
        ['Oct', 195, 90, 65],
        ['Nov', 95, 110, 60],
        ['Dec', 55, 95, 55],
      ],
    },
  },
  {
    id: 't1-bar-internet',
    taskType: 'task1',
    title: 'Household Internet Access in Five Countries',
    category: 'Bar Chart',
    instruction:
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    question:
      'The chart below shows the percentage of households with internet access in five countries (UK, USA, Germany, Japan, Vietnam) between 2010 and 2020.',
    minWords: 150,
    timeMinutes: 20,
    chartType: 'bar',
    chartDescription:
      'Internet penetration rates increased across all five nations from 2010 to 2020. The UK and Germany consistently led with rates rising from around 75-80% in 2010 to over 95% in 2020. The USA and Japan saw strong steady growth from ~70% to 90-92%. Vietnam witnessed the most dramatic growth, quadrupling from 20% in 2010 to 78% in 2020.',
    chartDataKeys: [
      { key: 'y2010', name: '2010 (%)', color: '#94a3b8' },
      { key: 'y2015', name: '2015 (%)', color: '#38bdf8' },
      { key: 'y2020', name: '2020 (%)', color: '#2563eb' },
    ],
    chartData: [
      { label: 'UK', y2010: 80, y2015: 90, y2020: 96 },
      { label: 'Germany', y2010: 78, y2015: 88, y2020: 95 },
      { label: 'USA', y2010: 71, y2015: 82, y2020: 90 },
      { label: 'Japan', y2010: 73, y2015: 83, y2020: 92 },
      { label: 'Vietnam', y2010: 20, y2015: 48, y2020: 78 },
    ],
    chartTable: {
      headers: ['Country', '2010 (%)', '2015 (%)', '2020 (%)'],
      rows: [
        ['UK', '80%', '90%', '96%'],
        ['Germany', '78%', '88%', '95%'],
        ['USA', '71%', '82%', '90%'],
        ['Japan', '73%', '83%', '92%'],
        ['Vietnam', '20%', '48%', '78%'],
      ],
    },
  },
  {
    id: 't1-pie-energy',
    taskType: 'task1',
    title: 'Energy Production by Source in 1995 vs 2015',
    category: 'Pie Chart',
    instruction:
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    question:
      'The pie charts below show the comparison of energy production from different sources in a European country in 1995 and 2015.',
    minWords: 150,
    timeMinutes: 20,
    chartType: 'pie',
    chartDescription:
      'In 1995, Fossil Fuels dominated energy production at 60%, followed by Nuclear at 25%, Hydro at 10%, and Renewables (Solar/Wind) at only 5%. By 2015, Fossil Fuels declined sharply to 35%, while Renewables experienced exponential growth to 30%. Nuclear remained relatively stable at 23%, and Hydro accounted for 12%.',
    chartDataKeys: [
      { key: '1995', name: '1995 Share', color: '#64748b' },
      { key: '2015', name: '2015 Share', color: '#0ea5e9' },
    ],
    chartData: [
      { label: 'Fossil Fuels', val1995: 60, val2015: 35, fill: '#ef4444' },
      { label: 'Nuclear', val1995: 25, val2015: 23, fill: '#f59e0b' },
      { label: 'Renewables', val1995: 5, val2015: 30, fill: '#10b981' },
      { label: 'Hydro', val1995: 10, val2015: 12, fill: '#06b6d4' },
    ],
    chartTable: {
      headers: ['Energy Source', '1995 Proportion', '2015 Proportion', 'Net Change'],
      rows: [
        ['Fossil Fuels (Coal/Gas/Oil)', '60%', '35%', '-25% (Significant decrease)'],
        ['Nuclear Energy', '25%', '23%', '-2% (Slight decrease)'],
        ['Renewable Energy (Wind/Solar)', '5%', '30%', '+25% (Sixfold increase)'],
        ['Hydroelectric Power', '10%', '12%', '+2% (Marginal increase)'],
      ],
    },
  },
];

export const TASK_2_SEEDS: PromptSeed[] = [
  {
    id: 't2-opinion-ai-teachers',
    taskType: 'task2',
    title: 'Artificial Intelligence in Education',
    category: 'Opinion (Agree / Disagree)',
    instruction:
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    question:
      'Some people believe that artificial intelligence will soon replace human teachers in schools and universities. To what extent do you agree or disagree with this statement?',
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: 't2-discussion-culture-tech',
    taskType: 'task2',
    title: 'Technology and Traditional Culture',
    category: 'Discussion (Both Views & Opinion)',
    instruction:
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    question:
      'Some people argue that technological development leads to the loss of traditional cultures, while others believe that modern technology helps preserve traditions. Discuss both views and give your own opinion.',
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: 't2-problem-housing',
    taskType: 'task2',
    title: 'Skyrocketing Urban Housing Prices',
    category: 'Problem & Solution',
    instruction:
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    question:
      'In many cities around the world, housing prices have skyrocketed, making it difficult for young adults to buy a home. What are the causes of this issue, and what measures can be taken to solve it?',
    minWords: 250,
    timeMinutes: 40,
  },
];

export const ALL_SEEDS = [...TASK_1_SEEDS, ...TASK_2_SEEDS];

export function getPromptById(id: string): PromptSeed | undefined {
  return ALL_SEEDS.find((p) => p.id === id);
}
