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
  // --- 5 NEW TASK 1 FORECAST PROMPTS ---
  {
    id: 't1-line-co2-emissions',
    taskType: 'task1',
    title: 'CO2 Emissions in 4 European Countries (Forecast)',
    category: 'Line Graph',
    instruction:
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    question:
      'The line graph shows carbon dioxide emissions per person (in metric tonnes) in four European countries (United Kingdom, Sweden, Italy, Portugal) between 1967 and 2007.',
    minWords: 150,
    timeMinutes: 20,
    chartType: 'line',
    chartDescription:
      'CO2 emissions in tonnes per capita: The UK was consistently the highest emitter, though falling gradually from 11 tonnes in 1967 to 9 tonnes in 2007. Sweden initially rose from 8.5 to a peak of 10.5 in 1977, before dropping dramatically to 5.5 tonnes by 2007. In contrast, Italy rose steadily from 4.2 to 7.8 tonnes, and Portugal increased almost fourfold from 1.3 to 5.4 tonnes.',
    chartDataKeys: [
      { key: 'UK', name: 'United Kingdom', color: '#1e40af' },
      { key: 'Sweden', name: 'Sweden', color: '#0284c7' },
      { key: 'Italy', name: 'Italy', color: '#10b981' },
      { key: 'Portugal', name: 'Portugal', color: '#f59e0b' },
    ],
    chartData: [
      { label: '1967', UK: 11.0, Sweden: 8.5, Italy: 4.2, Portugal: 1.3 },
      { label: '1977', UK: 10.8, Sweden: 10.5, Italy: 6.2, Portugal: 2.5 },
      { label: '1987', UK: 10.0, Sweden: 7.0, Italy: 7.0, Portugal: 3.8 },
      { label: '1997', UK: 9.4, Sweden: 6.0, Italy: 7.5, Portugal: 4.8 },
      { label: '2007', UK: 9.0, Sweden: 5.5, Italy: 7.8, Portugal: 5.4 },
    ],
    chartTable: {
      headers: ['Year', 'United Kingdom', 'Sweden', 'Italy', 'Portugal'],
      rows: [
        ['1967', '11.0 t', '8.5 t', '4.2 t', '1.3 t'],
        ['1977', '10.8 t', '10.5 t', '6.2 t', '2.5 t'],
        ['1987', '10.0 t', '7.0 t', '7.0 t', '3.8 t'],
        ['1997', '9.4 t', '6.0 t', '7.5 t', '4.8 t'],
        ['2007', '9.0 t', '5.5 t', '7.8 t', '5.4 t'],
      ],
    },
  },
  {
    id: 't1-bar-sports-participation',
    taskType: 'task1',
    title: 'University Sports Participation by Gender (Forecast)',
    category: 'Bar Chart',
    instruction:
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    question:
      'The chart below shows the percentage of male and female students at a university who took part in six different sports in 2023.',
    minWords: 150,
    timeMinutes: 20,
    chartType: 'bar',
    chartDescription:
      'Sports participation by gender: Football had the largest gender discrepancy with 38% of males playing compared to only 12% of females. Basketball also favoured males (28% vs 14%). Conversely, Swimming was the most popular sport for females (35% vs 18% males), as was Badminton (22% females vs 15% males). Tennis had near parity (20% males, 21% females). Cycling showed 16% males and 14% females.',
    chartDataKeys: [
      { key: 'Male', name: 'Male Students (%)', color: '#2563eb' },
      { key: 'Female', name: 'Female Students (%)', color: '#ec4899' },
    ],
    chartData: [
      { label: 'Football', Male: 38, Female: 12 },
      { label: 'Swimming', Male: 18, Female: 35 },
      { label: 'Basketball', Male: 28, Female: 14 },
      { label: 'Tennis', Male: 20, Female: 21 },
      { label: 'Badminton', Male: 15, Female: 22 },
      { label: 'Cycling', Male: 16, Female: 14 },
    ],
    chartTable: {
      headers: ['Sport', 'Male (%)', 'Female (%)', 'Leading Gender'],
      rows: [
        ['Football', '38%', '12%', 'Male (+26%)'],
        ['Swimming', '18%', '35%', 'Female (+17%)'],
        ['Basketball', '28%', '14%', 'Male (+14%)'],
        ['Tennis', '20%', '21%', 'Near Equal (Female +1%)'],
        ['Badminton', '15%', '22%', 'Female (+7%)'],
        ['Cycling', '16%', '14%', 'Male (+2%)'],
      ],
    },
  },
  {
    id: 't1-table-underground-railways',
    taskType: 'task1',
    title: 'Underground Railway Systems in Six Major Cities (Forecast)',
    category: 'Table Chart',
    instruction:
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    question:
      'The table below gives information about the underground railway systems in six major cities worldwide, including their opening dates, total route lengths, and annual passenger numbers.',
    minWords: 150,
    timeMinutes: 20,
    chartDescription:
      'Underground networks comparison: London is the oldest system opened in 1863, followed by Paris in 1900. London also boasts the longest route at 394 km, though Paris carries significantly more passengers (1191 million vs 775 million for London). Tokyo, opened in 1927, has by far the highest annual passenger volume at 1927 million despite a moderate route of 155 km. Washington DC has 126 km of track carrying 144 million. Kyoto and Los Angeles are the newest (1981 and 2001) with the shortest routes (11 km and 28 km) and smallest passenger counts (45 million and 50 million).',
    chartTable: {
      headers: ['City', 'Date Opened', 'Kilometres of Route', 'Passengers per year (millions)'],
      rows: [
        ['London', '1863', '394 km', '775 million'],
        ['Paris', '1900', '199 km', '1,191 million'],
        ['Tokyo', '1927', '155 km', '1,927 million'],
        ['Washington DC', '1976', '126 km', '144 million'],
        ['Kyoto', '1981', '11 km', '45 million'],
        ['Los Angeles', '2001', '28 km', '50 million'],
      ],
    },
  },
  {
    id: 't1-map-stockham-village',
    taskType: 'task1',
    title: 'Coastal Village Transformation: Stockham 1990 - Present (Forecast)',
    category: 'Map / Plan',
    instruction:
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    question:
      'The two maps illustrate the changes that have taken place in the coastal village of Stockham between 1990 and the present day.',
    minWords: 150,
    timeMinutes: 20,
    chartDescription:
      'Maps of Stockham (1990 vs Present): In 1990, Stockham was a quiet rural fishing village. The northern farmland and ancient woods have been largely converted into a modern residential estate with a shopping precinct. The small fishing port on the southern coast was demolished and replaced by a large marina for private yachts, luxury holiday apartments, and a beachfront promenade. A dual carriageway was constructed to link the newly built hotels directly to the airport to the east, replacing the old narrow country road.',
    chartTable: {
      headers: ['Feature', 'Situation in 1990', 'Present Day Status'],
      rows: [
        ['Farmland & Woods (North)', 'Agricultural land and woodland', 'Suburban housing complex & shopping centre'],
        ['Harbour (South)', 'Small commercial fishing docks', 'Modern recreational marina & luxury apartments'],
        ['Infrastructure', 'Narrow single lane country road', 'Dual carriageway highway connecting to new airport'],
        ['Amenities', 'Local village market & 1 small inn', 'Several international resort hotels & beachfront promenade'],
      ],
    },
  },
  {
    id: 't1-process-salmon-cycle',
    taskType: 'task1',
    title: 'The Life Cycle of Salmon (Forecast)',
    category: 'Process Diagram',
    instruction:
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    question:
      'The diagram illustrates the natural life cycle of the salmon, from egg to adult spawning fish.',
    minWords: 150,
    timeMinutes: 20,
    chartDescription:
      'Salmon Life Cycle Process: 1. Spawning: Adult salmon lay thousands of eggs in shallow gravel beds in upper freshwater rivers. 2. Fry stage: After 5-6 months, the eggs hatch into alevins and mature into fry (5-8 cm long). 3. Smolt stage: The young fish swim downstream to lower, faster-flowing river sections, growing into "smolts" (12-15 cm) over 1-2 years. 4. Ocean maturation: Smolts migrate out to the open sea, where they spend 1-5 years feeding, growing into mature adult salmon (70-76 cm). 5. Upstream migration: Adult salmon swim against powerful river currents back to their exact natal riverbed to spawn and begin the cycle anew, usually dying shortly after.',
    chartTable: {
      headers: ['Stage', 'Environment / Location', 'Size / Duration', 'Key Biological Milestone'],
      rows: [
        ['1. Eggs / Alevin', 'Upper slow-flowing river gravel', '5-6 months incubation', 'Hatching in protected freshwater'],
        ['2. Fry', 'Fast-flowing freshwater streams', '5 - 8 cm', 'Free swimming and feeding on river insects'],
        ['3. Smolt', 'Estuary and lower river', '12 - 15 cm (1-2 years)', 'Physiological adaptation to saltwater'],
        ['4. Adult', 'Open Ocean / Sea', '70 - 76 cm (1-5 years)', 'Rapid growth and sexual maturation'],
        ['5. Spawner', 'Upstream migration to birth river', 'Adult size', 'Spawning eggs in gravel beds, completing cycle'],
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
  // --- 5 NEW TASK 2 FORECAST PROMPTS ---
  {
    id: 't2-opinion-later-parenting',
    taskType: 'task2',
    title: 'Having Children Later in Life (Forecast)',
    category: 'Advantages & Disadvantages',
    instruction:
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    question:
      'In many developed nations today, people are choosing to have children later in life. What are the reasons for this trend, and do the advantages outweigh the disadvantages?',
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: 't2-discussion-university-purpose',
    taskType: 'task2',
    title: 'The Purpose of Higher Education (Forecast)',
    category: 'Discussion (Both Views & Opinion)',
    instruction:
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    question:
      'Some people believe that the primary purpose of university education is to prepare students for employment by teaching practical job skills. Others argue that university should focus on pure knowledge and academic theory regardless of workplace utility. Discuss both views and give your opinion.',
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: 't2-problem-ageing-population',
    taskType: 'task2',
    title: 'The Global Ageing Population (Forecast)',
    category: 'Problem & Solution',
    instruction:
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    question:
      'In many parts of the world, people are living longer, resulting in an increasingly ageing population. What social and economic challenges does this phenomenon create, and what measures should governments implement to address them?',
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: 't2-opinion-online-shopping',
    taskType: 'task2',
    title: 'Online Shopping vs Physical High Street Stores (Forecast)',
    category: 'Positive or Negative Development',
    instruction:
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    question:
      'Nowadays, an increasing proportion of consumer goods are purchased through online e-commerce platforms rather than in physical brick-and-mortar shops. Is this a positive or negative development for society?',
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: 't2-opinion-fuel-price-environment',
    taskType: 'task2',
    title: 'Fuel Taxation to Solve Environmental Issues (Forecast)',
    category: 'Opinion (Agree / Disagree)',
    instruction:
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    question:
      'The most effective way to solve global environmental problems is to significantly increase the price of fuel and petrol. To what extent do you agree or disagree with this statement?',
    minWords: 250,
    timeMinutes: 40,
  },
];

export const ALL_SEEDS = [...TASK_1_SEEDS, ...TASK_2_SEEDS];

export function getPromptById(id: string): PromptSeed | undefined {
  return ALL_SEEDS.find((p) => p.id === id);
}
