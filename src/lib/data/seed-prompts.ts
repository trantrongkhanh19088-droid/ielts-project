import { PromptSeed } from '@/types';

export const TASK_1_SEEDS: PromptSeed[] = [
  {
    "id": "t1-01-immigration-line",
    "taskType": "task1",
    "title": "T1-01: Immigrants to Three Countries (1990-2001)",
    "category": "Line Graph",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The graph below shows the number of immigrants to three countries from 1990 to 2001.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "line",
    "chartDescription": "Line graph showing immigration numbers (in thousands) from 1991 to 2001 for USA, Canada, and Australia. USA started at 1,450k in 1991, peaked at 1,800k in 1992, plunged to ~1,000k in 1993, fluctuated between 700k-900k, ending at 900k. Canada rose from 200k in 1991 to ~450k in 2001. Australia was lowest, starting at ~100k, dipping to ~60k in 1994-1995, and ending at ~150k in 2001.",
    "chartDataKeys": [
      {
        "key": "USA",
        "name": "USA (thousands)",
        "color": "#ef4444"
      },
      {
        "key": "Canada",
        "name": "Canada (thousands)",
        "color": "#10b981"
      },
      {
        "key": "Australia",
        "name": "Australia (thousands)",
        "color": "#3b82f6"
      }
    ],
    "chartData": [
      {
        "label": "1991",
        "USA": 1450,
        "Canada": 200,
        "Australia": 100
      },
      {
        "label": "1992",
        "USA": 1800,
        "Canada": 230,
        "Australia": 110
      },
      {
        "label": "1993",
        "USA": 1000,
        "Canada": 270,
        "Australia": 105
      },
      {
        "label": "1994",
        "USA": 900,
        "Canada": 270,
        "Australia": 80
      },
      {
        "label": "1995",
        "USA": 800,
        "Canada": 230,
        "Australia": 80
      },
      {
        "label": "1996",
        "USA": 750,
        "Canada": 230,
        "Australia": 105
      },
      {
        "label": "1997",
        "USA": 900,
        "Canada": 230,
        "Australia": 105
      },
      {
        "label": "1998",
        "USA": 820,
        "Canada": 230,
        "Australia": 105
      },
      {
        "label": "1999",
        "USA": 690,
        "Canada": 230,
        "Australia": 105
      },
      {
        "label": "2000",
        "USA": 680,
        "Canada": 270,
        "Australia": 140
      },
      {
        "label": "2001",
        "USA": 900,
        "Canada": 450,
        "Australia": 150
      }
    ],
    "chartTable": {
      "headers": [
        "Year",
        "USA (000s)",
        "Canada (000s)",
        "Australia (000s)"
      ],
      "rows": [
        [
          "1991",
          "1,450",
          "200",
          "100"
        ],
        [
          "1992",
          "1,800",
          "230",
          "110"
        ],
        [
          "1993",
          "1,000",
          "270",
          "105"
        ],
        [
          "1994",
          "900",
          "270",
          "80"
        ],
        [
          "1995",
          "800",
          "230",
          "80"
        ],
        [
          "1996",
          "750",
          "230",
          "105"
        ],
        [
          "1997",
          "900",
          "230",
          "105"
        ],
        [
          "1998",
          "820",
          "230",
          "105"
        ],
        [
          "1999",
          "690",
          "230",
          "105"
        ],
        [
          "2000",
          "680",
          "270",
          "140"
        ],
        [
          "2001",
          "900",
          "450",
          "150"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the USA received by far the most immigrants throughout the period, whereas Australia consistently recorded the fewest. Despite fluctuations, immigration to the USA fell substantially, while the figures for Canada and Australia ended higher than they began.",
      "body1": "Group the USA separately: About 1.45 million in 1991 -> peak of 1.8 million in 1992 -> roughly 1 million in 1993. After recovery to ~900,000 in 1997, fell to ~700,000 in 1999-2000, before rising to ~900,000 in 2001.",
      "body2": "Group Canada and Australia: Canada started ~200,000, plateaued near 230,000 in late 1990s, then ~450,000 in 2001. Australia was ~100,000, dipped to ~60,000 in 1994-1995, ending at ~150,000.",
      "note": "The prompt says 1990-2001, but visible plotted years begin in 1991. Describe visible data 1991-2001 in thousands."
    }
  },
  {
    "id": "t1-02-landfill-process",
    "taskType": "task1",
    "title": "T1-02: Modern Landfill Construction & Operation",
    "category": "Process",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The process shows the design of a modern landfill for household waste.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "A technical process diagram illustrating three distinct phases of a modern household waste landfill: Construction (excavation of man-made hole in natural rock, installation of clay barrier, synthetic lining, drainage pipes along bottom leading to drainage tank); Use (deposit of household waste, drainage of toxic waste liquid into tank via pipes); and Closure (once full, surface sealed with clay cover, vertical gas pipe allows escape of methane/landfill gases).",
    "chartTable": {
      "headers": [
        "Phase",
        "Key Structural Components",
        "Primary Function"
      ],
      "rows": [
        [
          "1. Construction",
          "Natural rock excavation, Clay barrier, Synthetic lining, Drainage pipes & tank",
          "Create secure underground chamber preventing leachate leakage"
        ],
        [
          "2. Use",
          "Household waste deposit, Bottom drainage pipes, Waste liquid tank",
          "Contain compacted domestic refuse while channelling liquid waste"
        ],
        [
          "3. Closure",
          "Dense clay top cover, Vertical gas outlet pipe",
          "Airtight seal preventing rainwater ingress and venting hazardous gases"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the landfill has three main phases: construction, use and closure. It begins with the excavation of a hole in natural rock and ends with the waste being sealed beneath a clay cover, while gas and liquid are channelled away.",
      "body1": "Construction phase: dig a man-made hole in natural rock; line it with clay and then a synthetic layer; install drainage pipes along the bottom and connect them to a drainage tank. Describe outside-in structure and drainage setup.",
      "body2": "Use and closure phases: deposit household waste inside the lined hole; allow waste liquid to drain through the pipes into the tank. Once filled completely, cover waste with clay and install vertical gas pipe to release decomposition gases.",
      "note": "This diagram labels three phases rather than numbering individual steps. Treat three as the phase count."
    }
  },
  {
    "id": "t1-03-expenditure-2009",
    "taskType": "task1",
    "title": "T1-03: Household Expenditure Shares (2009)",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The bar chart below shows the share of expenditures for five major categories in the United States, Canada, the United Kingdom, and Japan in the year 2009.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Expenditure shares across 5 categories in 2009: Housing was highest in USA (26%), UK (24%), Japan (22%), and Canada (21%). Food was led by Japan (23%), UK (20%), Canada (15%), USA (14%). Transportation ranged from Canada (20%) to Japan (10%). Healthcare was highest in USA (7%), Canada/Japan (4%), UK (1%). Clothing was 4-6% across all 4 countries.",
    "chartDataKeys": [
      {
        "key": "USA",
        "name": "United States (%)",
        "color": "#2563eb"
      },
      {
        "key": "Canada",
        "name": "Canada (%)",
        "color": "#f97316"
      },
      {
        "key": "UK",
        "name": "United Kingdom (%)",
        "color": "#10b981"
      },
      {
        "key": "Japan",
        "name": "Japan (%)",
        "color": "#eab308"
      }
    ],
    "chartData": [
      {
        "label": "Food",
        "USA": 14,
        "Canada": 15,
        "UK": 20,
        "Japan": 23
      },
      {
        "label": "Housing",
        "USA": 26,
        "Canada": 21,
        "UK": 24,
        "Japan": 22
      },
      {
        "label": "Transportation",
        "USA": 18,
        "Canada": 20,
        "UK": 15,
        "Japan": 10
      },
      {
        "label": "Health care",
        "USA": 7,
        "Canada": 4,
        "UK": 1,
        "Japan": 4
      },
      {
        "label": "Clothing",
        "USA": 4,
        "Canada": 6,
        "UK": 5.5,
        "Japan": 4.5
      }
    ],
    "chartTable": {
      "headers": [
        "Category",
        "United States",
        "Canada",
        "United Kingdom",
        "Japan"
      ],
      "rows": [
        [
          "Food",
          "14%",
          "15%",
          "20%",
          "23%"
        ],
        [
          "Housing",
          "26%",
          "21%",
          "24%",
          "22%"
        ],
        [
          "Transportation",
          "18%",
          "20%",
          "15%",
          "10%"
        ],
        [
          "Health care",
          "7%",
          "4%",
          "1%",
          "4%"
        ],
        [
          "Clothing",
          "4%",
          "6%",
          "5.5%",
          "4.5%"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, housing accounted for the largest share of spending in all four countries except Japan, where food was the biggest category. Healthcare and clothing attracted much smaller proportions, while transportation showed the greatest difference between countries.",
      "body1": "Major categories: Housing was led by the USA (26%), UK (24%), Japan (22%) and Canada (21%). Food was led by Japan (~23%) with USA lowest (14%). Transportation spanned from 20% in Canada to 10% in Japan.",
      "body2": "Minor categories: Healthcare spending in USA reached ~7%, vs ~4% in Canada/Japan and only 1% in UK. Clothing clustered tightly between 4% and 6%, with Canada slightly highest.",
      "note": "Compare percentage shares, not absolute monetary amounts."
    }
  },
  {
    "id": "t1-04-doctor-worker-pay",
    "taskType": "task1",
    "title": "T1-04: Annual Pay of Doctors vs Other Workers (2004)",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The chart below shows the annual pay (thousands of US dollars) for doctors and other workers in seven countries in 2004.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Comparison of annual pay (in $1,000 USD) between Doctors and Other Workers in 2004: The US led with Doctors at $120k and other workers at $45k ($75k gap). Switzerland: $70k vs $40k. France: $72k vs $31k. Germany: $63k vs $20k. Czech Republic: $66k vs $20k. Italy: $60k vs $20k. Finland: $51k vs $25k.",
    "chartDataKeys": [
      {
        "key": "Doctors",
        "name": "Doctors ($000)",
        "color": "#ef4444"
      },
      {
        "key": "OtherWorkers",
        "name": "Other Workers ($000)",
        "color": "#06b6d4"
      }
    ],
    "chartData": [
      {
        "label": "US",
        "Doctors": 120,
        "OtherWorkers": 45
      },
      {
        "label": "Switzerland",
        "Doctors": 70,
        "OtherWorkers": 40
      },
      {
        "label": "France",
        "Doctors": 72,
        "OtherWorkers": 31
      },
      {
        "label": "Germany",
        "Doctors": 63,
        "OtherWorkers": 20
      },
      {
        "label": "Czech Rep",
        "Doctors": 66,
        "OtherWorkers": 20
      },
      {
        "label": "Italy",
        "Doctors": 60,
        "OtherWorkers": 20
      },
      {
        "label": "Finland",
        "Doctors": 51,
        "OtherWorkers": 25
      }
    ],
    "chartTable": {
      "headers": [
        "Country",
        "Doctors (USD)",
        "Other Workers (USD)",
        "Pay Gap (USD)"
      ],
      "rows": [
        [
          "United States",
          "$120,000",
          "$45,000",
          "+$75,000"
        ],
        [
          "France",
          "$72,000",
          "$31,000",
          "+$41,000"
        ],
        [
          "Switzerland",
          "$70,000",
          "$40,000",
          "+$30,000"
        ],
        [
          "Czech Republic",
          "$66,000",
          "$20,000",
          "+$46,000"
        ],
        [
          "Germany",
          "$63,000",
          "$20,000",
          "+$43,000"
        ],
        [
          "Italy",
          "$60,000",
          "$20,000",
          "+$40,000"
        ],
        [
          "Finland",
          "$51,000",
          "$25,000",
          "+$26,000"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, doctors earned considerably more than other workers in every country. The USA had the highest pay for both groups and the widest earnings gap, whereas other workers in Germany and the Czech Republic were among the lowest paid.",
      "body1": "Doctors salaries: The USA dominated at approximately $120,000 annually. France and Switzerland followed around $70,000-$72,000, while Czech Republic, Germany and Italy stood between $60,000 and $66,000. Finland had lowest doctors pay at ~$51,000.",
      "body2": "Other workers and pay gaps: US other workers earned $45,000, Switzerland $40,000, France $31,000. In Finland other workers earned $25,000, and only $20,000 in Germany, Czech and Italy. Highlight the colossal US gap of $75,000.",
      "note": "The unit is thousands of US dollars; write $120,000, not $120."
    }
  },
  {
    "id": "t1-05-leisure-reading-music",
    "taskType": "task1",
    "title": "T1-05: Time Spent on Reading vs Music by Age in NZ",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The graphs illustrate the average amount of time per day spent on popular leisure activities for different age groups in New Zealand.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Two graphs showing average minutes/day spent in NZ: Reading increases linearly with age: 15-24 (20m), 25-34 (35m), 35-44 (45m), 45-54 (50m), 55+ (70m). Music shows a U-shape: 15-24 (80m), 25-34 (60m), 35-44 (45m), 45-54 (60m), 55+ (75m).",
    "chartDataKeys": [
      {
        "key": "Reading",
        "name": "Reading for pleasure (min)",
        "color": "#dc2626"
      },
      {
        "key": "Music",
        "name": "Listening to music (min)",
        "color": "#3b82f6"
      }
    ],
    "chartData": [
      {
        "label": "15-24",
        "Reading": 20,
        "Music": 80
      },
      {
        "label": "25-34",
        "Reading": 35,
        "Music": 60
      },
      {
        "label": "35-44",
        "Reading": 45,
        "Music": 45
      },
      {
        "label": "45-54",
        "Reading": 50,
        "Music": 60
      },
      {
        "label": "55+",
        "Reading": 70,
        "Music": 75
      }
    ],
    "chartTable": {
      "headers": [
        "Age Group",
        "Reading (minutes/day)",
        "Music (minutes/day)",
        "Dominant Activity"
      ],
      "rows": [
        [
          "15–24",
          "20 min",
          "80 min",
          "Music (+60 min)"
        ],
        [
          "25–34",
          "35 min",
          "60 min",
          "Music (+25 min)"
        ],
        [
          "35–44",
          "45 min",
          "45 min",
          "Equal (45 min)"
        ],
        [
          "45–54",
          "50 min",
          "60 min",
          "Music (+10 min)"
        ],
        [
          "55 or over",
          "70 min",
          "75 min",
          "Near Equal (Music +5 min)"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, older age groups spent progressively more time reading for pleasure. Listening to music was most popular among the youngest group and least popular among those aged 35–44, giving it a U-shaped pattern across age groups.",
      "body1": "Reading trend: Increases steadily with age from 20 minutes (15-24) to 35 (25-34), 45 (35-44), 50 (45-54), and peaking at 70 minutes for seniors 55+. Senior citizens read 50 minutes longer per day than young adults.",
      "body2": "Music and cross-comparisons: Music listening registered 80, 60, 45, 60, and 75 minutes. Exceeded reading in every group except 35-44 where both tied at 45 minutes. The 15-24 demographic had the largest activity gap (60m).",
      "note": "Age groups are discrete categories, not a time series over calendar years."
    }
  },
  {
    "id": "t1-06-car-ownership-uk",
    "taskType": "task1",
    "title": "T1-06: Household Car Ownership in Britain (1971-2007)",
    "category": "Line Graph",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The graph below gives information about car ownership in Britain from 1971 to 2007.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "line",
    "chartDescription": "UK car ownership percentage (1971-2007) across 4 categories: No car fell from 48% to 25%. One car hovered between 42% and 44%. Two cars surged from 7% to 26% (overtaking no-car in 2007). Three or more cars climbed gently from 2% to 6%.",
    "chartDataKeys": [
      {
        "key": "OneCar",
        "name": "One car",
        "color": "#6b7280"
      },
      {
        "key": "NoCar",
        "name": "No car",
        "color": "#111827"
      },
      {
        "key": "TwoCars",
        "name": "Two cars",
        "color": "#2563eb"
      },
      {
        "key": "ThreePlusCars",
        "name": "Three or more cars",
        "color": "#10b981"
      }
    ],
    "chartData": [
      {
        "label": "1971",
        "NoCar": 48,
        "OneCar": 44,
        "TwoCars": 7,
        "ThreePlusCars": 2
      },
      {
        "label": "1975",
        "NoCar": 45,
        "OneCar": 44,
        "TwoCars": 10,
        "ThreePlusCars": 2
      },
      {
        "label": "1979",
        "NoCar": 41,
        "OneCar": 44,
        "TwoCars": 10,
        "ThreePlusCars": 2
      },
      {
        "label": "1983",
        "NoCar": 39,
        "OneCar": 43,
        "TwoCars": 14,
        "ThreePlusCars": 2
      },
      {
        "label": "1987",
        "NoCar": 35,
        "OneCar": 44,
        "TwoCars": 15,
        "ThreePlusCars": 3
      },
      {
        "label": "1991",
        "NoCar": 32,
        "OneCar": 44,
        "TwoCars": 19,
        "ThreePlusCars": 3.5
      },
      {
        "label": "1995",
        "NoCar": 30,
        "OneCar": 45,
        "TwoCars": 20,
        "ThreePlusCars": 4
      },
      {
        "label": "1999",
        "NoCar": 28,
        "OneCar": 43,
        "TwoCars": 22,
        "ThreePlusCars": 4.5
      },
      {
        "label": "2003",
        "NoCar": 25,
        "OneCar": 41,
        "TwoCars": 25,
        "ThreePlusCars": 5
      },
      {
        "label": "2007",
        "NoCar": 25,
        "OneCar": 42,
        "TwoCars": 26,
        "ThreePlusCars": 6
      }
    ],
    "chartTable": {
      "headers": [
        "Year",
        "No car (%)",
        "One car (%)",
        "Two cars (%)",
        "Three+ cars (%)"
      ],
      "rows": [
        [
          "1971",
          "48%",
          "44%",
          "7%",
          "2%"
        ],
        [
          "1979",
          "41%",
          "44%",
          "10%",
          "2%"
        ],
        [
          "1987",
          "35%",
          "44%",
          "15%",
          "3%"
        ],
        [
          "1995",
          "30%",
          "45%",
          "20%",
          "4%"
        ],
        [
          "2003",
          "25%",
          "41%",
          "25%",
          "5%"
        ],
        [
          "2007",
          "25%",
          "42%",
          "26%",
          "6%"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, one-car households represented the largest group for most of the period, while households with three or more cars remained the smallest. The proportion without a car fell markedly, whereas ownership of two or more cars became more common.",
      "body1": "No-car and one-car households: No-car households declined steadily from ~48% in 1971 to 25% in 2007. One-car ownership fluctuated slightly around mid-40s (44% to 42%), overtaking no-car in the 1970s.",
      "body2": "Multiple-car households: Two-car households quadrupled from 7% to 26%, surpassing the no-car category by 2007. Three-or-more cars rose modestly from 2% to 6%.",
      "note": "Emphasise the substantial rise in multi-car families and the decline of carless households."
    }
  },
  {
    "id": "t1-07-beachfront-maps",
    "taskType": "task1",
    "title": "T1-07: Australian Beachfront Development (1950 vs Now)",
    "category": "Map / Plan",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The maps below show a beachfront area in Australia in 1950 and today.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Two maps showing an Australian beachfront in 1950 and Now. In 1950, a road ran along the top north from the city with a playground, dining tables, pavilion, and car park beneath it. Two 25m swimming pools sat on the beach (west and east) with a lighthouse at the far east. In the Present day, the western playground became a second car park. The western 25m pool expanded into a 50m Olympic pool, adjacent to a new restaurant and surf club. Another surf club was built next to the eastern pool. The access road was extended wrapping around the eastern edge. Pavilion, dining tables, eastern 25m pool, and lighthouse were retained.",
    "chartTable": {
      "headers": [
        "Zone / Feature",
        "1950 Setup",
        "Present Day Transformation"
      ],
      "rows": [
        [
          "Western Area",
          "Children playground & 25m pool",
          "Car park replacing playground; 50m pool with restaurant & Surf Club"
        ],
        [
          "Eastern Area",
          "25m pool & lighthouse",
          "Retained 25m pool & lighthouse, plus newly added Surf Club"
        ],
        [
          "Road Infrastructure",
          "Northern road from City to car park",
          "Extended road wrapping around the eastern coastline"
        ],
        [
          "Central Amenities",
          "Pavilion & dining tables",
          "Fully preserved pavilion and outdoor dining tables"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the beachfront became more developed for recreation and visitors, with the most noticeable changes around the western pool and the eastern end of the road. New facilities included a restaurant and surf clubs, while parking capacity and one swimming pool were expanded.",
      "body1": "Description of 1950: Northern road linked the city. Beneath it stood a playground, outdoor dining tables, pavilion, and car park. Two 25m pools flanked the beach with a lighthouse on the eastern headland.",
      "body2": "Modern redevelopment: Western playground replaced by a second car park; western pool enlarged from 25m to 50m accompanied by a restaurant and surf club. Second surf club erected near eastern pool. Northern road extended around eastern side.",
      "note": "Use past-to-present comparison structures (e.g. was converted into, expanded, retained)."
    }
  },
  {
    "id": "t1-08-education-mode-australia",
    "taskType": "task1",
    "title": "T1-08: Australian Higher Education Modes by Gender & Age (2006)",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The charts below show the percentage of male and female students of different age groups who studied in Australia for full-time and part-time education in 2006.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Two bar charts for Male and Female students in Australia (2006): Part-time study strongly peaked in the 20-24 age group for both genders (40% males, 42% females) vs full-time (12% males, 13% females). In ages 15-19, part-time was 12% M / 17% F vs full-time 8% M / 7% F. For older adults (30+), full-time study overtook part-time (Males: 10% FT vs 8% PT; Females: 12% FT vs 6% PT).",
    "chartDataKeys": [
      {
        "key": "MalePT",
        "name": "Male Part-time (%)",
        "color": "#1e3a8a"
      },
      {
        "key": "MaleFT",
        "name": "Male Full-time (%)",
        "color": "#60a5fa"
      },
      {
        "key": "FemalePT",
        "name": "Female Part-time (%)",
        "color": "#be185d"
      },
      {
        "key": "FemaleFT",
        "name": "Female Full-time (%)",
        "color": "#f472b6"
      }
    ],
    "chartData": [
      {
        "label": "15-19",
        "MalePT": 12,
        "MaleFT": 8,
        "FemalePT": 17,
        "FemaleFT": 7
      },
      {
        "label": "20-24",
        "MalePT": 40,
        "MaleFT": 12,
        "FemalePT": 42,
        "FemaleFT": 13
      },
      {
        "label": "25-29",
        "MalePT": 8,
        "MaleFT": 6,
        "FemalePT": 8,
        "FemaleFT": 8
      },
      {
        "label": "30+",
        "MalePT": 8,
        "MaleFT": 10,
        "FemalePT": 6,
        "FemaleFT": 12
      }
    ],
    "chartTable": {
      "headers": [
        "Age Group",
        "Male Part-time",
        "Male Full-time",
        "Female Part-time",
        "Female Full-time"
      ],
      "rows": [
        [
          "15–19",
          "12%",
          "8%",
          "17%",
          "7%"
        ],
        [
          "20–24",
          "40%",
          "12%",
          "42%",
          "13%"
        ],
        [
          "25–29",
          "8%",
          "6%",
          "8%",
          "8%"
        ],
        [
          "30 and over",
          "8%",
          "10%",
          "6%",
          "12%"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, part-time study was especially common among students aged 20–24, with women in this group recording the highest percentage. Part-time figures generally exceeded full-time figures, although full-time study was more common among students aged 30 and above.",
      "body1": "Younger age groups (15-24): Part-time study dominated heavily. Ages 15-19: men at 12% PT vs 8% FT; women at 17% PT vs 7% FT. Ages 20-24: peaked dramatically at 40% PT for men and 42% PT for women, while full-time was just 12% and 13%.",
      "body2": "Older groups (25-30+): Ages 25-29 were low (men 8% PT / 6% FT; women 8% for both). In the 30+ bracket, full-time study exceeded part-time (men 10% FT vs 8% PT; women 12% FT vs 6% PT).",
      "note": "Compare males and females within matching age cohorts."
    }
  },
  {
    "id": "t1-09-supermarket-food-goods",
    "taskType": "task1",
    "title": "T1-09: Supermarket Food and Goods Purchases (1998 vs 2008)",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The charts below show the percentage of food and goods bought from supermarkets in European countries in 1998 and 2008.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Supermarket purchase percentages in European Countries A, B, and C in 1998 and 2008: Country A saw huge growth in food (10% -> 35%) and goods (10% -> 39%), overtaking Country B to become #1. Country B grew moderately (Food: 22% -> 27%, Goods: 24% -> 26%). Country C was lowest (Food: 6% -> 8%, Goods: 3% -> 14%).",
    "chartDataKeys": [
      {
        "key": "Food1998",
        "name": "Food 1998 (%)",
        "color": "#93c5fd"
      },
      {
        "key": "Food2008",
        "name": "Food 2008 (%)",
        "color": "#1d4ed8"
      },
      {
        "key": "Goods1998",
        "name": "Goods 1998 (%)",
        "color": "#fca5a5"
      },
      {
        "key": "Goods2008",
        "name": "Goods 2008 (%)",
        "color": "#b91c1c"
      }
    ],
    "chartData": [
      {
        "label": "Country A",
        "Food1998": 10,
        "Food2008": 35,
        "Goods1998": 10,
        "Goods2008": 39
      },
      {
        "label": "Country B",
        "Food1998": 22,
        "Food2008": 27,
        "Goods1998": 24,
        "Goods2008": 26
      },
      {
        "label": "Country C",
        "Food1998": 6,
        "Food2008": 8,
        "Goods1998": 3,
        "Goods2008": 14
      }
    ],
    "chartTable": {
      "headers": [
        "Country",
        "Food 1998",
        "Food 2008",
        "Goods 1998",
        "Goods 2008"
      ],
      "rows": [
        [
          "Country A",
          "10%",
          "35%",
          "10%",
          "39%"
        ],
        [
          "Country B",
          "22%",
          "27%",
          "24%",
          "26%"
        ],
        [
          "Country C",
          "6%",
          "8%",
          "3%",
          "14%"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, supermarket purchases increased in all three countries for both food and goods. Country A experienced the largest rises and overtook Country B to become the leading market, while Country C remained the lowest in both categories.",
      "body1": "Countries A and B: In Country A, food surged from ~10% to 35% and goods from ~10% to nearly 40%. Country B increased modestly from 22% to 27% (food) and 24% to 26% (goods), being surpassed by A.",
      "body2": "Country C: Smallest share throughout. Food inched up from 6% to 8%, while goods rose from 3% to 14%. The gap between A and C widened drastically.",
      "note": "Use exact labels Country A, Country B, and Country C. Do not invent country names."
    }
  },
  {
    "id": "t1-10-coal-electricity-process",
    "taskType": "task1",
    "title": "T1-10: Producing Electricity from Coal",
    "category": "Process",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The diagram below shows how one type of coal is used to produce electricity.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Flow diagram outlining electricity production from coal in 3 stages and 7 actions: (1) Coal is extracted from mine; (2) Crushed into small particles by a crusher; (3) Transported via truck to gasifier; (4) Transformed into gas in gasifier with heat input; (5) Gas is cooled in cooling unit; (6) Gas is cleaned in cleaning unit, emitting waste heat; (7) Cleaned synthetic gas powers gas power plant to generate electricity for homes and power grid. Waste heat from power plant is also released, while heat is recycled back to gasifier.",
    "chartTable": {
      "headers": [
        "Phase",
        "Actions Involved",
        "Output / Byproduct"
      ],
      "rows": [
        [
          "1. Coal Preparation",
          "Mining -> Crushing -> Truck transport",
          "Finely crushed coal delivered to gasifier"
        ],
        [
          "2. Gas Production & Treatment",
          "Gasification -> Cooling -> Gas cleaning",
          "Treated synthetic gas; waste heat emitted; heat feedback to gasifier"
        ],
        [
          "3. Electricity Generation",
          "Gas power plant burning treated gas -> Transmission",
          "Electricity distributed to residential users and electrical grid"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the process can be divided into three phases: preparing coal, producing and treating gas, and generating electricity. Seven main actions can be identified, beginning with mining coal and ending with electricity being supplied to users; heat is also returned to the gasifier.",
      "body1": "Preparation and gasification: Coal is mined, crushed into smaller fragments, and transported by truck to a gasifier where it is converted into combustible gas with heat assistance.",
      "body2": "Gas treatment and power generation: The raw gas is cooled and cleaned, releasing waste heat. The refined gas is directed into a gas power plant to generate electricity, which is supplied to households and the electric grid. Mention heat recycling to gasifier.",
      "note": "Follow the direction of arrows systematically across all seven actions."
    }
  },
  {
    "id": "t1-11-travel-modes-1997-2007",
    "taskType": "task1",
    "title": "T1-11: Annual Travel Distance by Mode in the UK (1997 vs 2007)",
    "category": "Table Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The table below gives information about the average annual distance travelled by adults and the types of travel in 1977 and 2007.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Table of average annual distance (miles) per adult in 1997 and 2007: Walking fell from 400 to 300 miles. Bicycle dropped from 100 to 80 miles. Car surged from 3,500 to 7,100 miles (more than double). Motorcycle decreased from 100 to 90 miles. Bus fell from 800 to 500 miles. Train rose from 900 to 1,000 miles. Taxi quadrupled from 200 to 800 miles.",
    "chartTable": {
      "headers": [
        "Mode of Travel",
        "1997 (miles)",
        "2007 (miles)",
        "Change (miles)"
      ],
      "rows": [
        [
          "Car",
          "3,500",
          "7,100",
          "+3,600 (more than doubled)"
        ],
        [
          "Train",
          "900",
          "1,000",
          "+100"
        ],
        [
          "Taxi",
          "200",
          "800",
          "+600 (quadrupled)"
        ],
        [
          "Bus",
          "800",
          "500",
          "-300"
        ],
        [
          "Walking",
          "400",
          "300",
          "-100"
        ],
        [
          "Motorcycle",
          "100",
          "90",
          "-10"
        ],
        [
          "Bicycle",
          "100",
          "80",
          "-20 (lowest overall)"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, cars accounted for by far the greatest distance travelled in both years, whereas bicycles and motorcycles had the lowest figures. Car, train and taxi travel increased, while all other modes declined; the growth in car travel was particularly substantial.",
      "body1": "Increasing modes: Car travel more than doubled from 3,500 to 7,100 miles per adult annually. Train travel rose from 900 to 1,000 miles, while taxi travel quadrupled from 200 to 800 miles.",
      "body2": "Declining modes: Bus travel dropped from 800 to 500 miles, and walking from 400 to 300 miles. Cycling and motorcycles both began at 100 miles, falling to 80 and 90 miles respectively. Bicycle remained the lowest category.",
      "note": "The prompt text says 1977 but the data table displays 1997 and 2007. Keep original prompt wording and describe 1997-2007 figures."
    }
  },
  {
    "id": "t1-12-room-layouts-training",
    "taskType": "task1",
    "title": "T1-12: Training Room Layouts (Plan A vs Plan B)",
    "category": "Map / Plan",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The plans show the room layouts for training sessions for up to ten people and more than ten people.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Two architectural floor plans: Plan A (no more than 10 people) has top entrance, presenter chair and whiteboard at front, a central U-shaped table arrangement with chairs, and Morning Tea refreshments along the bottom wall. Plan B (more than 10 people) relocates Morning Tea to the top-left near entrance, shifts Whiteboard and Presenter chair to top-right, and arranges tables into two parallel vertical rows with chairs grouped in blocks.",
    "chartTable": {
      "headers": [
        "Component",
        "Plan A (<= 10 people)",
        "Plan B (> 10 people)"
      ],
      "rows": [
        [
          "Seating Arrangement",
          "Enclosed central U-shaped table layout",
          "Two parallel vertical rows of tables and chairs"
        ],
        [
          "Presenter Area",
          "Centered at front with whiteboard",
          "Repositioned to the upper-right corner"
        ],
        [
          "Morning Tea Refreshments",
          "Stretching along bottom southern wall",
          "Moved to the top-left corner adjacent to entrance"
        ],
        [
          "Capacity & Spacing",
          "Intimate, focused on single group discussion",
          "Higher density, linear auditorium-style arrangement"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, both layouts provide presentation and refreshment facilities, but the arrangement for larger groups uses a different seating configuration and relocates the presentation area. The smaller-group plan has a more enclosed, U-shaped table arrangement.",
      "body1": "Plan A details: The entrance is at the top. The presenter chair and whiteboard are situated near the front. Tables and chairs form an enclosed U-shape in the center. A Morning Tea refreshment station spans the bottom wall.",
      "body2": "Plan B comparison: Tables form two parallel rows accommodating larger groups. Presentation area moves to upper-right. Morning tea shifts to top-left beside the entrance.",
      "note": "Neither plan has a year. Compare Plan A and Plan B as spatial alternatives; do not describe as a historical renovation."
    }
  },
  {
    "id": "t1-13-water-filter-process",
    "taskType": "task1",
    "title": "T1-13: Simple Water Filter Assembly and Operation",
    "category": "Process",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The diagram below shows how a simple water filter is constructed and how it functions to produce clean drinking water.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Schematic of a gravity water filter system: Consists of a plastic barrel positioned directly above a storage drum. The top barrel has a plastic lid and contains 3 stratified filtration layers: sand at top, charcoal in middle, and gravel at bottom. Untreated water is poured into the top, percolates down through sand, charcoal, and gravel, passes through a pipe into the lower storage drum, and is drawn as clean drinking water via a bottom tap into a glass.",
    "chartTable": {
      "headers": [
        "Component / Layer",
        "Physical Position",
        "Function in Filtration Process"
      ],
      "rows": [
        [
          "Plastic Lid & Barrel",
          "Upper structure",
          "Encloses filtration chamber and receives untreated water"
        ],
        [
          "Sand Layer",
          "Top layer in barrel",
          "Filters coarse debris and suspended particulate matter"
        ],
        [
          "Charcoal Layer",
          "Middle layer in barrel",
          "Absorbs impurities, odours, and chemical compounds"
        ],
        [
          "Gravel Layer",
          "Bottom layer in barrel",
          "Provides drainage base preventing sand/charcoal runoff"
        ],
        [
          "Connecting Pipe & Drum",
          "Lower level",
          "Channels filtered water into sealed storage drum with tap"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the system consists of a filtering barrel connected to a storage drum and works through three phases: filling, filtration and collection. Five main operational actions can be described, beginning with untreated water entering the barrel and ending with drinking water being drawn from a tap.",
      "body1": "Structure: A lidded plastic barrel holds three filtering media (sand at top, charcoal in middle, gravel at bottom), placed above a clean water storage drum connected via an angled pipe.",
      "body2": "Operation flow: (1) Pour untreated water into top; (2) water filters down through sand, charcoal, and gravel; (3) piped into storage drum; (4) stored safely; (5) clean drinking water dispensed via tap into a cup.",
      "note": "Do not invent pumps or electricity; this is a purely passive gravity-fed filtration system."
    }
  },
  {
    "id": "t1-14-retirement-age-gender",
    "taskType": "task1",
    "title": "T1-14: Retirement Age in Seven Countries (2004 vs 2008)",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The charts below show the average age men and women retired in seven countries in 2004 and 2008.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Two charts of average retirement age in 2004 and 2008 across 7 countries for Men and Women: Sweden had highest retirement ages (Men: 63 -> 64, Women: 62 -> 63). Netherlands was second (Men: 61.5 -> 62, Women: 61 -> 62). Germany & UK were around 60-62. Denmark & France near 59-60. Italy had lowest: Men stayed at ~58, while Italian women actually fell from 57 to 56 years.",
    "chartDataKeys": [
      {
        "key": "Men2004",
        "name": "Men 2004",
        "color": "#1e40af"
      },
      {
        "key": "Men2008",
        "name": "Men 2008",
        "color": "#60a5fa"
      },
      {
        "key": "Women2004",
        "name": "Women 2004",
        "color": "#9d174d"
      },
      {
        "key": "Women2008",
        "name": "Women 2008",
        "color": "#f472b6"
      }
    ],
    "chartData": [
      {
        "label": "Sweden",
        "Men2004": 63,
        "Men2008": 64,
        "Women2004": 62,
        "Women2008": 63
      },
      {
        "label": "Netherlands",
        "Men2004": 61.5,
        "Men2008": 62,
        "Women2004": 61,
        "Women2008": 62
      },
      {
        "label": "UK",
        "Men2004": 61,
        "Men2008": 62,
        "Women2004": 60,
        "Women2008": 61
      },
      {
        "label": "Germany",
        "Men2004": 60,
        "Men2008": 61,
        "Women2004": 59,
        "Women2008": 60
      },
      {
        "label": "Denmark",
        "Men2004": 59,
        "Men2008": 60,
        "Women2004": 58.5,
        "Women2008": 59.5
      },
      {
        "label": "France",
        "Men2004": 58.8,
        "Men2008": 59.5,
        "Women2004": 58,
        "Women2008": 59
      },
      {
        "label": "Italy",
        "Men2004": 58,
        "Men2008": 58,
        "Women2004": 57,
        "Women2008": 56
      }
    ],
    "chartTable": {
      "headers": [
        "Country",
        "Men 2004",
        "Men 2008",
        "Women 2004",
        "Women 2008"
      ],
      "rows": [
        [
          "Sweden",
          "63 yrs",
          "64 yrs",
          "62 yrs",
          "63 yrs"
        ],
        [
          "Netherlands",
          "61.5 yrs",
          "62 yrs",
          "61 yrs",
          "62 yrs"
        ],
        [
          "United Kingdom",
          "61 yrs",
          "62 yrs",
          "60 yrs",
          "61 yrs"
        ],
        [
          "Germany",
          "60 yrs",
          "61 yrs",
          "59 yrs",
          "60 yrs"
        ],
        [
          "Denmark",
          "59 yrs",
          "60 yrs",
          "58.5 yrs",
          "59.5 yrs"
        ],
        [
          "France",
          "58.8 yrs",
          "59.5 yrs",
          "58 yrs",
          "59 yrs"
        ],
        [
          "Italy",
          "58 yrs",
          "58 yrs",
          "57 yrs",
          "56 yrs"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, Sweden had the highest retirement ages for both men and women, while Italy was among the lowest. Retirement ages generally increased between the two years, and men tended to retire later than women, although Italian women were an exception to the upward trend.",
      "body1": "Men retirement: Sweden led, rising from 63 to 64 years; Netherlands followed near 62. Germany and UK rose from ~60-61 to 61-62. Denmark and France rose from ~59 to 60. Italy remained static at 58.",
      "body2": "Women retirement & gender comparisons: Sweden women rose from 62 to 63, Netherlands from 61 to 62. Germany, UK, Denmark and France all saw small 1-year increases. Contrast Italy where female retirement dropped from 57 to 56, widening the gender gap.",
      "note": "Use approximate ages; avoid inventing false decimal precision."
    }
  },
  {
    "id": "t1-15-museum-redevelopment-map",
    "taskType": "task1",
    "title": "T1-15: Walton Museum South Wing (2008 vs 2012)",
    "category": "Map / Plan",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The plans below show the South Wing of Walton Museum in 2008 and in 2012 after it was redeveloped.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Vertical section plans of the South Wing in 2008 and 2012: In 2008, path led to left entrance. Lower-left had special exhibition room, shop beside it, and reception above shop. Right had reading room, cloaks room, and central stairs. In 2012, a terrace and entrance hall were added at left. Reception and cloakroom were combined above shop with a new restaurant on top floor. Central stairs were replaced by an elevator (lift). Right side expanded into a 4-storey tower: exhibition room, self-service room, reading room, and children play area.",
    "chartTable": {
      "headers": [
        "Zone",
        "2008 Original Layout",
        "2012 Redeveloped Layout"
      ],
      "rows": [
        [
          "Left Section",
          "Path leading directly to Entrance",
          "Added outdoor Terrace and spacious Entrance Hall"
        ],
        [
          "Central Section",
          "Ground floor shop, upper reception, staircase",
          "Retained shop, combined Reception + Cloaks, top-floor Restaurant, Lift replacing stairs"
        ],
        [
          "Right Section",
          "Two rooms: Reading room & Cloaks room",
          "Expanded into 4-storey block: Exhibition room, Self-service room, Reading room, Children play area"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the South Wing was substantially enlarged and gained a wider range of visitor facilities. The greatest expansion occurred in the taller right-hand section, while a lift replaced the stairs and new dining and children's facilities were introduced.",
      "body1": "2008 Layout: Path on left led to entrance. Special exhibition room at lower-left, shop next to it with reception above. Right section contained reading room and cloakroom with stairs in middle.",
      "body2": "2012 Redevelopment: Terrace and entrance hall added on left. Reception and cloakroom merged above shop, topped by a restaurant. Lift installed. Right section enlarged with exhibition room, self-service room, relocated reading room, and children play area.",
      "note": "The diagram shows a building architectural elevation/section with vertically stacked rooms."
    }
  },
  {
    "id": "t1-16-home-smokery-process",
    "taskType": "task1",
    "title": "T1-16: Home Smokery Structure and Operation",
    "category": "Process",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The diagram below describes the structure of a home smokery and how it works.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Diagram of a home smokery consisting of 3 sections: (1) Air intake chamber with lid underground; (2) Underground fire chamber with lid holding burning logs; (3) Above-ground smoking box supported by bricks. Air enters chamber 1, flows through a lower conduit into chamber 2 to feed log combustion. Smoke travels through an inclined underground pipe into the base of the smoking box, curing food hung inside.",
    "chartTable": {
      "headers": [
        "Stage / Component",
        "Physical Location",
        "Operational Function"
      ],
      "rows": [
        [
          "Chamber 1 (Air Intake)",
          "Underground (left)",
          "Draws fresh air into the system via open lid"
        ],
        [
          "Chamber 2 (Firebox)",
          "Underground (middle)",
          "Burns wood logs supported by oxygen from chamber 1, generating smoke"
        ],
        [
          "Connecting Pipe",
          "Underground conduit",
          "Transfers dense smoke from fire chamber to the smoking box"
        ],
        [
          "Smoking Box",
          "Above ground on brick base",
          "Holds suspended meat/fish where rising smoke cures food"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the smokery consists of three connected sections that allow air and smoke to move towards suspended food. Five main actions can be grouped into three phases: admitting air, generating and transferring smoke, and smoking the food.",
      "body1": "Structure and initial combustion: Two lidded underground pits and an elevated smoking box on bricks. Air enters first chamber, flows into second combustion chamber containing wood logs to sustain smouldering fire.",
      "body2": "Smoke transfer and curing: Smoke travels through a subterranean pipe into the smoking box base, rising around the food hanging from ceiling hooks. Process ends with smoking food.",
      "note": "No packaging or storage stage is depicted."
    }
  },
  {
    "id": "t1-17-shalton-village-maps",
    "taskType": "task1",
    "title": "T1-17: Shalton Village Development (1910 vs 2010)",
    "category": "Map / Plan",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The maps show the changes in Shalton village from 1910 to 2010.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Two historical maps of Shalton village in 1910 and 2010: In 1910, triangular road network formed by School Road, London Road, High Street. Inside was a large house surrounded by trees, grocer, baker, small house. Outside stood butcher, school, post office. By 2010, large house and trees were cleared for modern housing and small access road. Grocer became cafe, baker replaced by housing. Butcher replaced by supermarket with parking, bank added. Post office and school remained.",
    "chartTable": {
      "headers": [
        "Feature",
        "1910 Situation",
        "2010 Modern Transformation"
      ],
      "rows": [
        [
          "Central Triangle",
          "Large house surrounded by dense woodland",
          "Demolished; replaced by residential housing estate & access road"
        ],
        [
          "Commercial Shops",
          "Grocer, Baker, Butcher",
          "Grocer -> Cafe; Baker -> Houses; Butcher -> Supermarket + Car Park"
        ],
        [
          "New Additions",
          "None",
          "Bank added north of supermarket; additional homes along London Road"
        ],
        [
          "Preserved Amenities",
          "School, Post Office, Main Road layout",
          "School, Post Office, and triangular road network fully retained"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, Shalton became more densely built up, with additional housing and updated commercial facilities. The central area changed most dramatically as the large house and trees disappeared, while the main road pattern, school and post office were retained.",
      "body1": "1910 Village layout: Triangular road system enclosed a large estate house and trees, grocer, baker, and small dwelling. West of School Road were a butcher and school, with post office at northern junction.",
      "body2": "2010 Village changes: Central trees and mansion replaced by housing and access lane. Baker replaced by housing; grocer converted to cafe; butcher replaced by supermarket and car park. Bank constructed north; school, post office, and main roads preserved.",
      "note": "Contrast commercial and residential development clearly over the 100-year span."
    }
  },
  {
    "id": "t1-18-energy-shares-1985-2003",
    "taskType": "task1",
    "title": "T1-18: National Energy Production by Source (1985 vs 2003)",
    "category": "Pie Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The charts below show changes in the proportion of energy produced from different resources in the country in 1985 and 2003.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "pie",
    "chartDescription": "Two pie charts showing energy sources in 1985 and 2003: Oil fell from 52% to 39% (-13%). Natural gas surged from 13% to 23% (+10%). Coal jumped from 8% to 22% (+14%). Nuclear plummeted from 22% to 8% (-14%). Hydro remained at 4%. Other renewables grew from 1% to 4%.",
    "chartDataKeys": [
      {
        "key": "Oil",
        "name": "Oil (%)",
        "color": "#0284c7"
      },
      {
        "key": "NaturalGas",
        "name": "Natural Gas (%)",
        "color": "#1e3a8a"
      },
      {
        "key": "Coal",
        "name": "Coal (%)",
        "color": "#475569"
      },
      {
        "key": "Nuclear",
        "name": "Nuclear (%)",
        "color": "#facc15"
      },
      {
        "key": "Hydro",
        "name": "Hydro (%)",
        "color": "#f97316"
      },
      {
        "key": "OtherRenewable",
        "name": "Other Renewables (%)",
        "color": "#dc2626"
      }
    ],
    "chartData": [
      {
        "label": "Oil",
        "share1985": 52,
        "share2003": 39
      },
      {
        "label": "Natural Gas",
        "share1985": 13,
        "share2003": 23
      },
      {
        "label": "Coal",
        "share1985": 8,
        "share2003": 22
      },
      {
        "label": "Nuclear",
        "share1985": 22,
        "share2003": 8
      },
      {
        "label": "Hydro",
        "share1985": 4,
        "share2003": 4
      },
      {
        "label": "Other Renewable",
        "share1985": 1,
        "share2003": 4
      }
    ],
    "chartTable": {
      "headers": [
        "Energy Resource",
        "1985 Share (%)",
        "2003 Share (%)",
        "Change (percentage points)"
      ],
      "rows": [
        [
          "Oil",
          "52%",
          "39%",
          "-13% (still largest)"
        ],
        [
          "Natural gas",
          "13%",
          "23%",
          "+10%"
        ],
        [
          "Coal",
          "8%",
          "22%",
          "+14% (steepest rise)"
        ],
        [
          "Nuclear",
          "22%",
          "8%",
          "-14% (steepest decline)"
        ],
        [
          "Hydro",
          "4%",
          "4%",
          "0% (unchanged)"
        ],
        [
          "Other renewables",
          "1%",
          "4%",
          "+3% (quadrupled)"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, oil remained the largest energy source despite a substantial decline in its share. Natural gas and coal gained importance, whereas nuclear power became much less significant; hydro remained unchanged and other renewables continued to contribute relatively little.",
      "body1": "Fossil fuel dominance: Oil fell from 52% to 39% (-13%). Natural gas climbed from 13% to 23%, and coal rose steeply from 8% to 22%. By 2003, gas and coal achieved near parity (~22-23%).",
      "body2": "Nuclear and renewables: Nuclear energy suffered the greatest drop, falling from 22% to 8%. Hydro held steady at 4%, while other renewables quadrupled from 1% to 4%.",
      "note": "Describe percentage-point differences accurately, not as relative growth percentages."
    }
  },
  {
    "id": "t1-19-student-common-room-maps",
    "taskType": "task1",
    "title": "T1-19: Student Common Room Layout (5 Years Ago vs Now)",
    "category": "Map / Plan",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The plans show a student common room from five years ago and now.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Plans of a student common room 5 years ago and Now: 5 years ago, top wall had sink, cupboard, two benches, microwave, refrigerator. Central area had 4 round tables surrounded by chairs. Now, one bench was replaced by a second microwave. A drinks machine was placed near fridge. Lower right round table became a TV lounge with armchairs. Another round table was replaced by a long rectangular table, leaving 2 round tables. A laptop bench was installed along bottom wall.",
    "chartTable": {
      "headers": [
        "Area",
        "5 Years Ago",
        "Current Layout"
      ],
      "rows": [
        [
          "Top Kitchen Wall",
          "Sink, cupboard, 2 benches, 1 microwave, fridge",
          "Sink, cupboard, 1 bench, 2 microwaves, fridge, drinks machine added"
        ],
        [
          "Central Seating",
          "4 circular tables surrounded by chairs",
          "2 circular tables, 1 rectangular work table"
        ],
        [
          "Lower Right Area",
          "1 circular dining table",
          "Lounge area with television and armchairs"
        ],
        [
          "Bottom Wall",
          "Open space",
          "Dedicated laptop bench installed with seating"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the common room became more multifunctional, with new facilities for studying and relaxing. Changes were concentrated in the seating area and the right-hand side, while much of the equipment along the top wall remained in place.",
      "body1": "Original layout (5 years ago): Kitchen amenities along northern wall included sink, cupboard, two benches, microwave, and refrigerator. Central room was occupied by four round tables with chairs.",
      "body2": "Current layout changes: Second microwave replaced one bench; drinks vending machine added. Rectangular desk replaced one circular table (2 round tables retained). TV lounge with armchairs added at bottom right; laptop study bench installed along bottom.",
      "note": "Focus on functional diversification (study, dining, relaxation)."
    }
  },
  {
    "id": "t1-20-household-tasks-gender",
    "taskType": "task1",
    "title": "T1-20: Household Tasks by Gender in Great Britain",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The chart shows the division of household tasks by gender in Great Britain.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Daily minutes per person spent on household chores in Great Britain: Cooking/baking (Women 74m vs Men 30m, gap 44m). Cleaning/tidying (Women 58m vs Men 13m, gap 45m). Childcare/play (Women 45m vs Men 20m, gap 25m). Clothes/ironing (Women 25m vs Men 2m, gap 23m). Gardening/pets (Men 49.5m vs Women 21m, gap 28.5m). Maintenance/odd jobs (Men 26m vs Women 9.5m, gap 16.5m).",
    "chartDataKeys": [
      {
        "key": "Males",
        "name": "Men (minutes/day)",
        "color": "#2563eb"
      },
      {
        "key": "Females",
        "name": "Women (minutes/day)",
        "color": "#ec4899"
      }
    ],
    "chartData": [
      {
        "label": "Cooking & washing up",
        "Males": 30,
        "Females": 74
      },
      {
        "label": "Cleaning house",
        "Males": 13,
        "Females": 58
      },
      {
        "label": "Gardening & pet care",
        "Males": 49.5,
        "Females": 21
      },
      {
        "label": "Child care & play",
        "Males": 20,
        "Females": 45
      },
      {
        "label": "Maintenance & odd jobs",
        "Males": 26,
        "Females": 9.5
      },
      {
        "label": "Clothes, washing, ironing",
        "Males": 2,
        "Females": 25
      }
    ],
    "chartTable": {
      "headers": [
        "Task",
        "Men (min/day)",
        "Women (min/day)",
        "Gender Gap"
      ],
      "rows": [
        [
          "Cooking, baking, washing up",
          "30 min",
          "74 min",
          "Women +44 min"
        ],
        [
          "Cleaning and house tidying",
          "13 min",
          "58 min",
          "Women +45 min (widest female gap)"
        ],
        [
          "Gardening and pet care",
          "49.5 min",
          "21 min",
          "Men +28.5 min (widest male gap)"
        ],
        [
          "Care of children & play",
          "20 min",
          "45 min",
          "Women +25 min"
        ],
        [
          "Maintenance and odd jobs",
          "26 min",
          "9.5 min",
          "Men +16.5 min"
        ],
        [
          "Clothes, washing, ironing",
          "2 min",
          "25 min",
          "Women +23 min (men lowest task)"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, women spent more time on most household tasks, especially cooking and cleaning, whereas men devoted more time to gardening and maintenance. Cleaning showed the largest gender gap, closely followed by cooking, and clothes-related tasks occupied the least time for men.",
      "body1": "Female-dominated tasks: Cooking/washing up (74m vs 30m, 44m gap); Cleaning (58m vs 13m, 45m gap); Childcare (45m vs 20m); Clothes/ironing (25m vs 2m). Cleaning displayed the widest gap overall.",
      "body2": "Male-dominated tasks: Gardening/pets saw men spend 49.5 min vs women 21 min (+28.5m). Maintenance/repairs was 26 min for men vs 9.5 min for women. Gardening was men's largest commitment.",
      "note": "Use exact printed numbers from table rather than estimating bar heights."
    }
  },
  {
    "id": "t1-21-zoo-redevelopment-map",
    "taskType": "task1",
    "title": "T1-21: Australian Zoo Redevelopment (1960 vs Now)",
    "category": "Map / Plan",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The map below shows the changes that have taken place at a zoo in Australia between 1960 and now.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Maps of an Australian Zoo in 1960 and Now: In 1960, northern boundary had harbour. West had African and Australian animals. Upper centre had birds and seal show, chimpanzees below. South had gift shop, east had picnic area. Now, former African enclosure became wild animals enclosure; African animals moved to central area. Bird and chimp displays were removed. Seal show kept. Ferry service and northern entrance added at harbour; southwest entrance added. Cable car installed connecting to picnic area. Gift shop enlarged. Australian animals and picnic area retained.",
    "chartTable": {
      "headers": [
        "Zone",
        "1960 Setup",
        "Current Modern Layout"
      ],
      "rows": [
        [
          "Entrances & Transport",
          "Single path network",
          "Harbour Ferry terminal & northern entrance added; SW entrance added; Cable car line in east"
        ],
        [
          "Western Enclosures",
          "African animals & Australian animals",
          "Wild animals enclosure added; Australian animals retained"
        ],
        [
          "Central Area",
          "Birds, seal show, chimpanzees",
          "Birds & chimps removed; African animals relocated here; Seal show retained"
        ],
        [
          "Amenities",
          "Small gift shop, eastern picnic area",
          "Enlarged gift shop; Picnic area preserved in eastern woods"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the zoo gained improved visitor access and transport facilities, with major changes in the central and eastern areas. A ferry connection and cable car were introduced, while some animal displays were removed or relocated; the picnic area remained in the east.",
      "body1": "1960 Original layout: Harbour in north. African and Australian animal sections in west. Birds, seal show, and chimpanzees centrally positioned. Gift shop south-centre, picnic area east.",
      "body2": "Modern changes: Wild animal area replaced western African section; African animals shifted centre. Birds and chimps removed; seal show kept. Added ferry port, 2 new entrances, eastern cable car, and expanded gift shop.",
      "note": "Detail additions, relocations, removals, and retained features systematically."
    }
  },
  {
    "id": "t1-22-european-residents-matrix",
    "taskType": "task1",
    "title": "T1-22: Cross-Border European Residents (2011)",
    "category": "Table Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The table shows the number of people from five European nations living in each other’s countries in 2011.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Matrix table of expatriates living across 5 European nations in 2011: Host countries (rows) vs Nationalities (columns). Total received: Germany was top host (1,198,000), followed by Britain (1,037,000), Spain (861,000), Italy (196,000), Poland (6,000). By nationality (columns): Polish were largest expatriate group (1,168,000), followed by Italians (863,670), Germans (539,000), British (524,760), Spanish (202,170). Notable flows: 556k Italians in Germany; 550k Poles in Britain.",
    "chartTable": {
      "headers": [
        "Country of Residence",
        "British",
        "German",
        "Italian",
        "Polish",
        "Spanish",
        "Total Received"
      ],
      "rows": [
        [
          "Britain",
          "—",
          "297,000",
          "119,000",
          "550,000",
          "71,000",
          "1,037,000"
        ],
        [
          "Germany",
          "104,000",
          "—",
          "556,000",
          "426,000",
          "112,000",
          "1,198,000"
        ],
        [
          "Italy",
          "79,000",
          "42,000",
          "—",
          "106,000",
          "19,000",
          "196,000"
        ],
        [
          "Poland",
          "760",
          "4,400",
          "670",
          "—",
          "170",
          "6,000"
        ],
        [
          "Spain",
          "391,000",
          "196,000",
          "188,000",
          "86,000",
          "—",
          "861,000"
        ],
        [
          "Total Living Abroad",
          "524,760",
          "539,000",
          "863,670",
          "1,168,000",
          "202,170",
          "3,298,000"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, Germany and Britain accommodated the largest totals of residents from the other listed nations, whereas Poland hosted the fewest. Polish nationals formed the largest group living in the other countries, and particularly large flows were recorded from Italy to Germany and from Poland to Britain.",
      "body1": "Host nations (destinations): Germany accommodated 1.198 million foreigners, Britain 1.037 million, Spain 861,000. Poland hosted only 6,000. Largest flows: 556,000 Italians in Germany and 550,000 Polish in Britain.",
      "body2": "Nationalities abroad: Polish citizens were highest overall (1.168 million), followed by Italians (863,670), Germans (539,000) and British (524,760). Spanish nationals were lowest (202,170), with only 170 Spaniards living in Poland.",
      "note": "Rows indicate host country; columns represent origin nationality."
    }
  },
  {
    "id": "t1-23-dairy-producers-2012",
    "taskType": "task1",
    "title": "T1-23: World Top Three Dairy Producers (2012)",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The charts below give information about the world's top three producers for four different dairy products (milk, cheese, butter, milk powder) in the year of 2012.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Production of 4 dairy products in 2012 in Metric Tons: Milk (EU: 142,970 MT, India: 127,000 MT, US: 90,038 MT). Cheese (EU: 7,120 MT, US: 4,925 MT, Brazil: 700 MT). Butter (India: 4,500 MT, EU: 2,040 MT, US: 810 MT). Milk Powder (China: 1,200 MT, New Zealand: 1,110 MT, EU: 770 MT).",
    "chartDataKeys": [
      {
        "key": "Leader",
        "name": "Rank 1 Producer (MT)",
        "color": "#16a34a"
      },
      {
        "key": "Second",
        "name": "Rank 2 Producer (MT)",
        "color": "#2563eb"
      },
      {
        "key": "Third",
        "name": "Rank 3 Producer (MT)",
        "color": "#f59e0b"
      }
    ],
    "chartData": [
      {
        "label": "Milk",
        "Leader": 142970,
        "Second": 127000,
        "Third": 90038
      },
      {
        "label": "Cheese",
        "Leader": 7120,
        "Second": 4925,
        "Third": 700
      },
      {
        "label": "Butter",
        "Leader": 4500,
        "Second": 2040,
        "Third": 810
      },
      {
        "label": "Milk Powder",
        "Leader": 1200,
        "Second": 1110,
        "Third": 770
      }
    ],
    "chartTable": {
      "headers": [
        "Dairy Product",
        "1st Producer (MT)",
        "2nd Producer (MT)",
        "3rd Producer (MT)"
      ],
      "rows": [
        [
          "Milk",
          "European Union (142,970)",
          "India (127,000)",
          "United States (90,038)"
        ],
        [
          "Cheese",
          "European Union (7,120)",
          "United States (4,925)",
          "Brazil (700)"
        ],
        [
          "Butter",
          "India (4,500)",
          "European Union (2,040)",
          "United States (810)"
        ],
        [
          "Milk Powder",
          "China (1,200)",
          "New Zealand (1,110)",
          "European Union (770)"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the EU was the largest producer of milk and cheese, while India led butter production and China led milk-powder production. Milk output was far greater than that of the other products, and the gap between the leading producers was much narrower for milk powder than for milk.",
      "body1": "Milk & Cheese (led by EU): Milk output dwarf other products, with EU leading at 142,970 MT, India at 127,000 MT, and US at 90,038 MT. Cheese was led by EU (7,120 MT), US (4,925 MT), and Brazil (700 MT).",
      "body2": "Butter & Milk Powder: India dominated butter at 4,500 MT, ahead of EU (2,040 MT) and US (810 MT). Milk powder was tightly contested: China led with 1,200 MT, closely followed by New Zealand (1,110 MT) and EU (770 MT).",
      "note": "Use MT as printed in the prompt (1 MT = 1,000 kg); do not unnecessarily multiply."
    }
  },
  {
    "id": "t1-24-household-size-uk",
    "taskType": "task1",
    "title": "T1-24: Household Size Distribution in the UK (1981 vs 2001)",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The chart compares the number of people per household by percentage in the UK in 1981 and 2001.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "UK household size percentages in 1981 and 2001: 2-person was most common (31% in 1981 -> 34% in 2001). 1-person saw largest rise (17% -> 26%, +9%). Combined 1-2 person rose from 48% to 60%. Larger households shrank: 3-person (20% -> 17%), 4-person (18% -> 15%), 5-person (8% -> 6%), 6-person (6% -> 2%).",
    "chartDataKeys": [
      {
        "key": "Share1981",
        "name": "1981 (%)",
        "color": "#38bdf8"
      },
      {
        "key": "Share2001",
        "name": "2001 (%)",
        "color": "#0369a1"
      }
    ],
    "chartData": [
      {
        "label": "1-person",
        "Share1981": 17,
        "Share2001": 26
      },
      {
        "label": "2-person",
        "Share1981": 31,
        "Share2001": 34
      },
      {
        "label": "3-person",
        "Share1981": 20,
        "Share2001": 17
      },
      {
        "label": "4-person",
        "Share1981": 18,
        "Share2001": 15
      },
      {
        "label": "5-person",
        "Share1981": 8,
        "Share2001": 6
      },
      {
        "label": "6-person",
        "Share1981": 6,
        "Share2001": 2
      }
    ],
    "chartTable": {
      "headers": [
        "Household Size",
        "1981 Share (%)",
        "2001 Share (%)",
        "Net Trend"
      ],
      "rows": [
        [
          "1-person",
          "17%",
          "26%",
          "+9% (largest absolute rise)"
        ],
        [
          "2-person",
          "31%",
          "34%",
          "+3% (most common overall)"
        ],
        [
          "3-person",
          "20%",
          "17%",
          "-3%"
        ],
        [
          "4-person",
          "18%",
          "15%",
          "-3%"
        ],
        [
          "5-person",
          "8%",
          "6%",
          "-2%"
        ],
        [
          "6-person",
          "6%",
          "2%",
          "-4% (steepest proportional drop: -67%)"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, two-person households were the most common in both years, while six-person households were the least common. Smaller households became more prevalent, particularly those with just one person, whereas every category containing three or more people declined.",
      "body1": "Small households (1-2 persons): 1-person homes surged from 17% to 26% (+9 points). 2-person households grew from 31% to 34%. Together they represented 60% of all UK homes by 2001.",
      "body2": "Large households (3+ persons): 3-person fell 20% to 17%; 4-person 18% to 15%; 5-person 8% to 6%; 6-person collapsed from 6% to 2% (largest proportional fall).",
      "note": "Contrast the rapid growth of small households against the decline of large family households."
    }
  },
  {
    "id": "t1-25-marriage-ages-1996-2008",
    "taskType": "task1",
    "title": "T1-25: Age of Marriage by Gender (1996 vs 2008)",
    "category": "Bar Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The charts below give information on the ages of people when they got married in one particular country in 1996 and 2008.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "bar",
    "chartDescription": "Distribution of marriage ages by gender in 1996 and 2008: Women consistently peaked at 25-29 (~12% in both years). Younger marriages fell: women 20-24 dropped from 6% to 3%. For men, peak age shifted older: in 1996, men peaked at 25-29 and 30-34 (~9%). By 2008, 30-34 and 35-39 jumped to 11-12%, while 25-29 dropped to 8%.",
    "chartDataKeys": [
      {
        "key": "Female1996",
        "name": "Female 1996 (%)",
        "color": "#f43f5e"
      },
      {
        "key": "Male1996",
        "name": "Male 1996 (%)",
        "color": "#3b82f6"
      },
      {
        "key": "Female2008",
        "name": "Female 2008 (%)",
        "color": "#fda4af"
      },
      {
        "key": "Male2008",
        "name": "Male 2008 (%)",
        "color": "#93c5fd"
      }
    ],
    "chartData": [
      {
        "label": "16-19",
        "Female1996": 1.5,
        "Male1996": 0.5,
        "Female2008": 0.5,
        "Male2008": 0.2
      },
      {
        "label": "20-24",
        "Female1996": 6,
        "Male1996": 2.2,
        "Female2008": 3,
        "Male2008": 1.8
      },
      {
        "label": "25-29",
        "Female1996": 11.8,
        "Male1996": 9.1,
        "Female2008": 11.9,
        "Male2008": 7.9
      },
      {
        "label": "30-34",
        "Female1996": 7,
        "Male1996": 9.1,
        "Female2008": 8,
        "Male2008": 11
      },
      {
        "label": "35-39",
        "Female1996": 4,
        "Male1996": 7,
        "Female2008": 2.5,
        "Male2008": 11.5
      },
      {
        "label": "40-44",
        "Female1996": 2.2,
        "Male1996": 5.5,
        "Female2008": 2.3,
        "Male2008": 3.5
      }
    ],
    "chartTable": {
      "headers": [
        "Age Bracket",
        "Female 1996",
        "Male 1996",
        "Female 2008",
        "Male 2008"
      ],
      "rows": [
        [
          "16–19",
          "1.5%",
          "0.5%",
          "0.5%",
          "0.2%"
        ],
        [
          "20–24",
          "6.0%",
          "2.2%",
          "3.0%",
          "1.8%"
        ],
        [
          "25–29",
          "11.8%",
          "9.1%",
          "11.9%",
          "7.9%"
        ],
        [
          "30–34",
          "7.0%",
          "9.1%",
          "8.0%",
          "11.0%"
        ],
        [
          "35–39",
          "4.0%",
          "7.0%",
          "2.5%",
          "11.5%"
        ],
        [
          "40–44",
          "2.2%",
          "5.5%",
          "2.3%",
          "3.5%"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, women most commonly married at ages 25–29 in both years, whereas the peak age for men shifted upwards. Marriage became more concentrated in older male age groups, while the youngest age groups remained relatively uncommon.",
      "body1": "Women's patterns: Peak was stable at ages 25-29 (~12%). Younger marriage declined sharply: 20-24 dropped from ~6% to 3%. Ages 30-34 edged up from 7% to 8%, while 35-39 decreased.",
      "body2": "Men's patterns: Upward age shift. In 1996, men peaked equally at 25-29 and 30-34 (~9%). By 2008, 30-34 and 35-39 surged to 11-12%, while 25-29 fell to ~8%. 40-44 also dropped from 5.5% to 3.5%.",
      "note": "Values represent percentages of total population getting married in each age group."
    }
  },
  {
    "id": "t1-26-smoked-fish-process",
    "taskType": "task1",
    "title": "T1-26: Smoked Fish Production Process",
    "category": "Process",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The diagram below shows the process of producing smoked fish.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Flowchart detailing 13 sequential steps in smoked fish manufacturing: (1) Fish caught at sea; (2) Transported by fishing vessel; (3) Brought into port; (4) Initial freezing; (5) Thawed in fresh water; (6) Cut open and cleaned; (7) Immersed in salt water with yellow colouring; (8) Smoked in smokehouse; (9) Packed into boxes; (10) Second freezing at 0°C; (11) Held in cold storage; (12) Distribution by refrigerated trucks; (13) Delivered to fish shops for consumer sale.",
    "chartTable": {
      "headers": [
        "Phase",
        "Key Steps Involved",
        "Temperature / Treatment Condition"
      ],
      "rows": [
        [
          "1. Catching & Port Storage",
          "Catch at sea -> Boat transport -> Arrival at port -> Freeze",
          "Primary freezing immediately upon port arrival"
        ],
        [
          "2. Preparation & Smoking",
          "Thaw in fresh water -> Cut open -> Soak in yellow salted water -> Smoke",
          "Fresh water thaw; curing with salt & colouring; thermal smoking"
        ],
        [
          "3. Final Storage & Distribution",
          "Pack -> Freeze at 0°C -> Cold store -> Truck transport -> Fish shops",
          "Secondary freeze at exactly 0°C before cold storage and retail sale"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the diagram shows thirteen pictured stages, which can be grouped into catching and initial storage, preparation and smoking, and final storage and distribution. The process begins with fish being caught and ends with smoked fish being sold in shops, with freezing used both before preparation and after smoking.",
      "body1": "First 6 stages: (1) Catch fish at sea; (2) transport by boat; (3) unload at port; (4) primary freezing; (5) thaw in fresh water; (6) cut fish open. Freezing occurs before thawing and preparation.",
      "body2": "Final 7 stages: (7) Soak in salt water with yellow colouring; (8) smoking; (9) packing in boxes; (10) secondary freeze at 0°C; (11) cold storage holding; (12) refrigerated truck distribution; (13) delivery to fish shops.",
      "note": "Preserve the diagram's exact 0°C label; include port arrival as an explicit stage."
    }
  },
  {
    "id": "t1-27-ireland-unemployment-emigration",
    "taskType": "task1",
    "title": "T1-27: Ireland Unemployment Rate & Emigration (1988-2008)",
    "category": "Line Graph",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The chart below shows the unemployment rate and the number of people leaving Ireland from 1998 to 2008.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartType": "line",
    "chartDescription": "Dual-axis chart of Ireland (1988-2008): Left axis shows Unemployment rate (%) and Right axis shows Emigration count. In 1988, unemployment was ~17% and emigration ~65,000. Unemployment fluctuated (12% in 1990, 15% in 1992) before falling steadily to ~5% in 2004, ending at ~6% in 2008. Emigration declined to ~25,000 around 2002, then sharply rebounded to ~50,000 by 2008.",
    "chartDataKeys": [
      {
        "key": "UnemploymentRate",
        "name": "Unemployment Rate (%)",
        "color": "#111827"
      },
      {
        "key": "Emigrants",
        "name": "Emigrants leaving Ireland (thousands)",
        "color": "#38bdf8"
      }
    ],
    "chartData": [
      {
        "label": "1988",
        "UnemploymentRate": 17,
        "Emigrants": 65
      },
      {
        "label": "1990",
        "UnemploymentRate": 12,
        "Emigrants": 56
      },
      {
        "label": "1992",
        "UnemploymentRate": 15,
        "Emigrants": 35
      },
      {
        "label": "1994",
        "UnemploymentRate": 13,
        "Emigrants": 35
      },
      {
        "label": "1996",
        "UnemploymentRate": 12.5,
        "Emigrants": 30
      },
      {
        "label": "1998",
        "UnemploymentRate": 8,
        "Emigrants": 28
      },
      {
        "label": "2000",
        "UnemploymentRate": 5.8,
        "Emigrants": 26
      },
      {
        "label": "2002",
        "UnemploymentRate": 5.5,
        "Emigrants": 25
      },
      {
        "label": "2004",
        "UnemploymentRate": 5,
        "Emigrants": 32
      },
      {
        "label": "2006",
        "UnemploymentRate": 5.8,
        "Emigrants": 42
      },
      {
        "label": "2008",
        "UnemploymentRate": 6.2,
        "Emigrants": 50
      }
    ],
    "chartTable": {
      "headers": [
        "Year",
        "Unemployment Rate (%)",
        "Emigrants Leaving Ireland",
        "Pattern"
      ],
      "rows": [
        [
          "1988",
          "17%",
          "65,000",
          "Period peak for both indicators"
        ],
        [
          "1992",
          "15%",
          "35,000",
          "Unemployment rebound while emigration fell"
        ],
        [
          "1998",
          "8%",
          "28,000",
          "Rapid economic improvement"
        ],
        [
          "2002",
          "5.5%",
          "25,000",
          "Emigration reaches 20-year low"
        ],
        [
          "2004",
          "5.0%",
          "32,000",
          "Unemployment hits 20-year low"
        ],
        [
          "2008",
          "6.2%",
          "50,000",
          "Emigration surges back to 50,000"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, unemployment fell substantially over the period, despite an early fluctuation and a slight recovery at the end. Emigration also declined initially but rose strongly again after reaching its low point, so the two series did not follow the same pattern throughout.",
      "body1": "Earlier period (1988-1998): Both indicators fell. In 1988, unemployment was ~17% and 65,000 emigrated. Unemployment dropped to 12% in 1990, rose to 15% in 1992, then sank to 8% in 1998. Emigration dropped steadily to ~30,000.",
      "body2": "Later period (1998-2008): Divergence. Unemployment reached low of 5% in 2004, inching to 6% in 2008. Emigration bottomed at 25,000 around 2002, before rocketing to 50,000 in 2008.",
      "note": "The prompt text states 1998-2008, but the chart spans 1988-2008. Describe the visible axes accurately without asserting unproven causality."
    }
  },
  {
    "id": "t1-28-hydroelectric-dam-maps",
    "taskType": "task1",
    "title": "T1-28: Town Changes After Hydroelectric Dam Construction (1990 vs 2010)",
    "category": "Map / Plan",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The maps below show the changes in a town after the construction of a hydroelectric power dam.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Two maps showing a river valley in 1990 and 2010 after building a dam: In 1990, a natural river ran between western mountains (forest, ancient structure, rare plants/animals) and eastern terrain (irrigated farmland, villages). In 2010, a hydroelectric dam blocked the river, creating a huge artificial lake upstream. The forest, ancient ruins, rare wildlife, and farmland were submerged. Villages relocated downstream below the dam. A lakeside hotel, recreational boats, and fish were introduced. Electricity pylons line the downstream river.",
    "chartTable": {
      "headers": [
        "Zone / Sector",
        "1990 Natural State",
        "2010 Post-Dam State"
      ],
      "rows": [
        [
          "Upstream River Valley",
          "River running through valley with forest, ancient structure & rare wildlife",
          "Submerged beneath massive reservoir lake with boating & hotel"
        ],
        [
          "Agricultural & Human Land",
          "Irrigated farmland and villages east of river",
          "Farmland submerged; villages relocated downstream south of dam"
        ],
        [
          "Energy & Infrastructure",
          "No industrial electricity generation",
          "Hydroelectric dam built with electricity pylons and transmission grid"
        ],
        [
          "Tourism & Recreation",
          "Natural wildlife habitats",
          "Hotel on eastern shore; recreational water sports and fishing"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the town was transformed by a hydroelectric dam and the creation of a large lake. The greatest changes occurred upstream, where agricultural and natural land was submerged, while the villages were relocated and tourism and electricity infrastructure were introduced.",
      "body1": "1990 Landscape: River flowed between mountains. Western side had forest, ancient structure, rare flora and fauna. Eastern side had irrigated farmland and villages. No dam or lake.",
      "body2": "2010 Transformation: Dam built across river, flooding upstream area into a large lake. Forest, historic ruins, wildlife, and farmland vanished. Villages moved downstream near new electricity pylons. Hotel added on lake shore with boating facilities.",
      "note": "Emphasise inundation/submersion of upstream heritage and relocation of settlements downstream."
    }
  },
  {
    "id": "t1-29-office-layouts-us-japan",
    "taskType": "task1",
    "title": "T1-29: Office Layouts (Typical American vs Japanese Office)",
    "category": "Map / Plan",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The graph below shows a typical American and a Japanese office.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Two architectural office floor plans comparing American and Japanese styles: Japanese office is open-plan with Department Manager at top facing the whole room, two Section Managers at head of two closely packed employee desk rows. American office features separate private rooms for Section Managers and Department Manager on right wall, conference rooms and storage/printer on left wall, and individual cubicle desks spaced in the middle.",
    "chartTable": {
      "headers": [
        "Design Aspect",
        "Typical Japanese Office",
        "Typical American Office"
      ],
      "rows": [
        [
          "Managerial Positioning",
          "Open desks; Department Manager faces staff; Section Managers at head of rows",
          "Enclosed private executive offices along right wall"
        ],
        [
          "Workstation Layout",
          "Tightly grouped shared desks in two collaborative rows",
          "Individual cubicles spaced in central room with personal spacing"
        ],
        [
          "Specialised Rooms",
          "None (single shared open space)",
          "Multiple dedicated conference rooms, storage, printer/copier rooms"
        ],
        [
          "Cultural Philosophy",
          "Collective oversight, rapid teamwork, open communication",
          "Individual privacy, compartmentalized functions, private meetings"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, the Japanese office uses a shared, open arrangement that places managers close to their teams. In contrast, the American office separates managerial rooms from the main working area and provides more specialised spaces, including conference rooms and storage.",
      "body1": "Japanese office: Department manager desk faces open room. Two section managers sit at the head of two closely aligned rows of staff desks. All personnel occupy one open collaborative space with windows at top.",
      "body2": "American office: Managers occupy private offices on the right. Employees work at separate individual desks in the middle. Left side provides conference rooms, storage, and printer facilities. Doors at bottom.",
      "note": "These are two concurrent cultural designs, not a chronological renovation. Avoid before-and-after change language."
    }
  },
  {
    "id": "t1-30-healthcare-indicators-europe",
    "taskType": "task1",
    "title": "T1-30: Medical Care in Austria, France, and Sweden (1980-2000)",
    "category": "Table Chart",
    "instruction": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    "question": "The graph below shows the information about medical care in three European countries between 1980 and 2000.",
    "minWords": 150,
    "timeMinutes": 20,
    "chartDescription": "Table showing 3 healthcare indicators across Austria, France, and Sweden in 1980, 1990, and 2000: Physicians per 1000: Austria (0.8 -> 0.9 -> 1.0), France (2.4 -> 2.2 -> 1.3), Sweden (3.6 -> 3.0 -> 3.8). Hospital beds per 1000: Austria (1.4 -> 3.1 -> 3.7), France (0.2 -> 0.8 -> 1.6), Sweden (6.4 -> 6.4 -> 6.9). Average hospital stay: Austria (18 -> 6 -> 18), France (9 -> 7 -> 5), Sweden (23 -> 18 -> 21).",
    "chartTable": {
      "headers": [
        "Indicator",
        "Country",
        "1980",
        "1990",
        "2000"
      ],
      "rows": [
        [
          "Physicians (per 1000 people)",
          "Austria",
          "0.8",
          "0.9",
          "1.0"
        ],
        [
          "Physicians (per 1000 people)",
          "France",
          "2.4",
          "2.2",
          "1.3"
        ],
        [
          "Physicians (per 1000 people)",
          "Sweden",
          "3.6",
          "3.0",
          "3.8"
        ],
        [
          "Hospital beds (per 1000 people)",
          "Austria",
          "1.4",
          "3.1",
          "3.7"
        ],
        [
          "Hospital beds (per 1000 people)",
          "France",
          "0.2",
          "0.8",
          "1.6"
        ],
        [
          "Hospital beds (per 1000 people)",
          "Sweden",
          "6.4",
          "6.4",
          "6.9"
        ],
        [
          "Average stay in hospitals",
          "Austria",
          "18",
          "6",
          "18"
        ],
        [
          "Average stay in hospitals",
          "France",
          "9",
          "7",
          "5"
        ],
        [
          "Average stay in hospitals",
          "Sweden",
          "23",
          "18",
          "21"
        ]
      ]
    },
    "outline": {
      "overviewOrThesis": "Overall, Sweden generally had the highest provision of doctors and hospital beds, as well as the longest hospital stays, while Austria had the fewest doctors. Hospital-bed availability increased in all three countries, but trends in doctor numbers and length of stay were less consistent.",
      "body1": "Healthcare capacity: Physicians per 1,000 rose in Austria (0.8 to 1.0), dropped in France (2.4 to 1.3), and fluctuated in Sweden (3.6 to 3.0 to 3.8). Beds per 1,000 rose everywhere: Austria (1.4 to 3.7), France (0.2 to 1.6), and Sweden (6.4 to 6.9).",
      "body2": "Length of stay: Sweden remained highest (23, 18, 21). France decreased steadily from 9 to 7 to 5. Austria dipped sharply from 18 to 6 in 1990 before rebounding to 18 in 2000.",
      "note": "The source does not explicitly print days for hospital stay. Refer to \"average length of stay\" and avoid inventing unprinted units."
    }
  }
];

export const TASK_2_SEEDS: PromptSeed[] = [
  {
    "id": "t2-01-university-tuition-fees",
    "taskType": "task2",
    "title": "T2-01: Higher Education Tuition: Student vs Government Funded",
    "category": "Advantages & Disadvantages",
    "instruction": "Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    "question": "In some countries, students pay their own college or university fees while in others, the government pays for them. Do you think the advantages that the government pays the money outweigh the disadvantages?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although public funding places pressure on government budgets and may subsidise wealthy families, I believe its benefits for educational access and the skilled workforce are more significant.",
      "body1": "Admittedly, requiring students to contribute protects public finances and avoids unnecessary subsidies for affluent families who can already afford tuition, allowing tax revenue to fund essential public healthcare and rural clinics.",
      "body2": "However, government-funded tuition offers greater long-term advantages by widening access for talented students from underprivileged backgrounds and cultivating a highly skilled workforce (engineers, nurses) that strengthens economic productivity and future tax revenues.",
      "conclusion": "While student contributions can protect budgets, wider social mobility and a stronger skilled workforce are far more significant, meaning the benefits of state-funded higher education outweigh the drawbacks."
    }
  },
  {
    "id": "t2-02-international-cooperation-env-business",
    "taskType": "task2",
    "title": "T2-02: International Cooperation: Environment vs Global Business",
    "category": "Discuss Both Views",
    "instruction": "Discuss both views and give your opinion. Write at least 250 words.",
    "question": "Some people think the main benefit of international cooperation is in the protection of the environment, while others think that the main benefits are in world business. Discuss both views and give your opinion.",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "While cooperation benefits trade through market access and more efficient supply chains, I consider environmental protection its most important contribution.",
      "body1": "Commercial benefits: Trade agreements eliminate tariffs, harmonize customs protocols, and enable cross-border manufacturing networks, allowing businesses to access international markets and consumers to enjoy cheaper goods.",
      "body2": "Environmental urgency: Pollution, climate breakdown, and ocean degradation respect no national borders. Collaborative international accords (Paris Agreement, river basin treaties) facilitate technology transfer and collective carbon reduction that single countries cannot achieve alone.",
      "conclusion": "Although commercial cooperation accelerates economic growth, safeguarding the planetary ecosystem is of existential importance, making environmental protection the superior benefit."
    }
  },
  {
    "id": "t2-03-ideal-society-elements",
    "taskType": "task2",
    "title": "T2-03: The Ideal Modern Society and How to Achieve It",
    "category": "Two-part Question",
    "instruction": "Answer both questions directly with relevant examples. Write at least 250 words.",
    "question": "Throughout history, people have dreamed of living in a perfect society, but they have not agreed on what an ideal society would be like. What do you think is the most important element of a perfect society in the modern world? How can people work towards achieving an ideal society?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "I consider equality of opportunity its most important element, and believe it can be advanced through accessible public services and fair institutional rules.",
      "body1": "Core element (Equality of opportunity): Ensures every citizen's life outcomes depend on talent and effort rather than birth wealth or social background, fostering social trust, meritocracy, and cohesion.",
      "body2": "Actionable steps: Governments must invest heavily in world-class free education and healthcare for deprived regions, while employers must adopt blind, transparent recruitment practices and mentoring programs to eliminate bias.",
      "conclusion": "Equality of opportunity forms the cornerstone of a just modern society; delivering accessible public services and institutional transparency is the practical path to achieving it."
    }
  },
  {
    "id": "t2-04-roads-vs-public-transport-spending",
    "taskType": "task2",
    "title": "T2-04: Infrastructure Spending: Roads vs Public Transit",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree? Write at least 250 words.",
    "question": "Some people think it is more important to spend money on roads and motorways than on public transport systems such as railways and trams. To what extent do you agree or disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although roads support flexible travel and freight, I largely disagree because public transport can reduce congestion and provide more inclusive mobility.",
      "body1": "Merits of road spending: Essential for long-distance logistics, perishable goods distribution, and connecting isolated rural communities where scheduled buses or trains are economically unviable.",
      "body2": "Superiority of public transit: High-speed rail, subways, and modern trams move massive passenger volumes efficiently, slashing carbon emissions, traffic gridlock, and smog, while ensuring equitable mobility for non-drivers, youths, and the elderly.",
      "conclusion": "While road maintenance remains necessary for freight, public transit investment delivers vastly greater economic, social, and environmental returns in modern urbanized societies."
    }
  },
  {
    "id": "t2-05-youth-wealthier-less-happy",
    "taskType": "task2",
    "title": "T2-05: Young People Richer and Healthier but Less Happy",
    "category": "Causes and Solutions",
    "instruction": "What are the causes? What can be done to address this situation? Write at least 250 words.",
    "question": "In some countries, young people have become richer, healthier, and live longer, but they are less happy. What are the causes? What can be done to address this situation?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "This essay discusses the underlying causes of this paradox—namely relentless social comparison and isolation—and proposes feasible educational and community solutions.",
      "body1": "Causes: Intense hyper-competitiveness in schooling and careers, amplified by idealized social media portrayals that induce chronic inadequacy; combined with the erosion of traditional community support and loneliness.",
      "body2": "Solutions: Educational institutions should integrate mental wellness and media literacy into curricula; workplaces must respect work-life boundaries; local governments should fund accessible sports and social clubs to cultivate genuine real-world friendships.",
      "conclusion": "Addressing modern youth unhappiness requires active intervention to reduce toxic achievement pressure and rebuild authentic human connections."
    }
  },
  {
    "id": "t2-06-stay-at-home-fathers",
    "taskType": "task2",
    "title": "T2-06: Stay-at-Home Fathers and Working Mothers",
    "category": "Two-part Question",
    "instruction": "What could be the reasons for this? Is it a positive or negative development? Write at least 250 words.",
    "question": "These days, more fathers stay at home and take care of their children while mothers go out to work. What could be the reasons for this? Is it a positive or negative development?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "This shift reflects changing earning opportunities and progressive gender expectations, and I regard it as positive because it increases family flexibility and strengthens father-child relationships.",
      "body1": "Reasons for the shift: Growing female career advancement with higher earning potential leads pragmatic couples to designate the lower-earning partner as homemaker; coupled with progressive cultural shifts rejecting rigid gender stereotypes.",
      "body2": "Positive evaluation: Allows households to optimize income and childcare based on competence rather than dogma, while fostering deeper emotional bonds and developmental security between fathers and their offspring.",
      "conclusion": "Driven by economic pragmatism and gender equality, the rise of stay-at-home fathers is an overwhelmingly positive trend for family well-being."
    }
  },
  {
    "id": "t2-07-homeschooling-pros-cons",
    "taskType": "task2",
    "title": "T2-07: Homeschooling vs Traditional Schooling",
    "category": "Advantages & Disadvantages",
    "instruction": "Do the advantages of homeschooling outweigh the disadvantages? Write at least 250 words.",
    "question": "In some countries, parents are choosing to teach their children themselves at home instead of sending them to school. Do the advantages of homeschooling outweigh the disadvantages?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although homeschooling offers personalised instruction and flexible schedules, I believe its disadvantages for social development and access to specialist teaching are more significant.",
      "body1": "Benefits of homeschooling: Enables tailored learning paces for special needs or gifted students, protects children from school bullying, and accommodates non-traditional family lifestyles.",
      "body2": "Critical drawbacks: Deprives children of daily socialization with diverse peers, resolving conflicts, and team collaboration; furthermore, few parents possess the pedagogical expertise and laboratory equipment required for advanced sciences and arts.",
      "conclusion": "Because holistic childhood development depends heavily on social maturity and comprehensive academic expertise, conventional schooling remains superior to homeschooling."
    }
  },
  {
    "id": "t2-08-punish-youth-crimes-like-adults",
    "taskType": "task2",
    "title": "T2-08: Punishing Serious Juvenile Crimes as Adults",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree? Write at least 250 words.",
    "question": "Some people believe that young people who commit serious crimes should be punished in the same way as adults. Do you agree or disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although equal penalties may appear fair to victims and serve as a deterrent, I disagree with applying identical treatment because young offenders have different levels of maturity and stronger prospects for rehabilitation.",
      "body1": "Arguments for adult punishment: Retributive justice for victims who suffer devastating violent harm, and sending an uncompromising deterrent message to youth gangs.",
      "body2": "Reasons against: Adolescent neurological development is incomplete, making youth prone to impulsive peer pressure; placing teenagers in adult penitentiaries exposes them to hardened criminals, virtually guaranteeing recidivism rather than rehabilitation.",
      "conclusion": "Justice systems must prioritize age-appropriate correctional education, psychiatric guidance, and vocational rehabilitation over punitive adult incarceration."
    }
  },
  {
    "id": "t2-09-handheld-gaming-harmful",
    "taskType": "task2",
    "title": "T2-09: Video Games on Handheld Devices: Individual and Social Harm",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree? Write at least 250 words.",
    "question": "The availability of entertainment such as video games on handheld devices is harmful to individuals and to the society they live in. To what extent do you agree and disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although handheld games provide convenient relaxation and digital connectivity, I largely agree that excessive or unregulated use damages cognitive focus, physical health, and interpersonal relationships.",
      "body1": "Positive aspects: Offers accessible, short stress-relief breaks during commutes and enables friends separated by distance to cooperate in multiplayer games.",
      "body2": "Severe detrimental impacts: Dopamine-driven mobile gaming loops disrupt sleep, promote sedentary lifestyles, impair school attention spans, and displace meaningful face-to-face family conversations.",
      "conclusion": "Unrestricted handheld gaming poses serious psychological and societal threats, warranting stricter time boundaries and mindful consumption."
    }
  },
  {
    "id": "t2-10-elderly-physical-exercise",
    "taskType": "task2",
    "title": "T2-10: Encouraging Regular Physical Exercise in the Elderly",
    "category": "Causes and Solutions",
    "instruction": "What could be the reason for this? What can be done to encourage them to do physical activities? Write at least 250 words.",
    "question": "Doctors recommend that older people exercise regularly. However, many older people do not exercise enough. What could be the reason for this? What can be done to encourage them to do physical activities?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "This essay examines why older adults fail to exercise sufficiently—primarily fear of injury and inadequate facilities—and presents practical community-based interventions.",
      "body1": "Reasons: Fear of exacerbating joint pain or experiencing falls, lack of low-impact tailored programs, transportation obstacles, and loneliness from exercising unaccompanied.",
      "body2": "Solutions: Health authorities should provide subsidized, physiotherapist-led gentle classes (tai chi, water aerobics) in neighborhood centers, alongside volunteer transport and walking clubs.",
      "conclusion": "Tailored medical guidance and convenient, community-supported exercise schemes can overcome hesitation and dramatically improve seniors' physical vitality."
    }
  },
  {
    "id": "t2-11-online-courses-vs-face-to-face",
    "taskType": "task2",
    "title": "T2-11: Universities Replacing Face-to-Face Teaching with Online Courses",
    "category": "Positive or Negative Development",
    "instruction": "Do you think this is a positive or negative development? Write at least 250 words.",
    "question": "More and more universities are replacing face-to-face teaching with online courses. Do you think this is a positive or negative development?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although online provision improves flexibility and geographical access, I consider wholesale replacement negative because it can weaken interaction and practical training.",
      "body1": "Benefits of digital learning: Flexibility for working adult students to balance study with employment, lower tuition costs, and eliminating geographic relocation barriers.",
      "body2": "Critical drawbacks: Erodes spontaneous campus debates, peer networking, and mentorship; severely limits hands-on laboratory, clinical, and engineering workshops that cannot be replicated on screens.",
      "conclusion": "While hybrid learning is advantageous, completely eliminating classroom teaching undermines educational quality and social readiness, making it a negative development."
    }
  },
  {
    "id": "t2-12-serious-sports-vs-recreation-children",
    "taskType": "task2",
    "title": "T2-12: Children Sports: Intensive Training vs Casual Play",
    "category": "Positive or Negative Development",
    "instruction": "Is this a positive or negative development? Write at least 250 words.",
    "question": "Some children nowadays take sports seriously while others play sports in their free time. Is this a positive or negative development?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although intensive participation can create pressure and unequal opportunities, I regard the availability of different levels of involvement as positive because it supports both skill development and enjoyable physical activity.",
      "body1": "Potential hazards: Excessive competitive pressure from ambitious coaches/parents can cause burnout, anxiety, and early overuse injuries, while costly academies exclude poorer youths.",
      "body2": "Positive evaluation: Having dual pathways allows gifted youngsters to cultivate elite athletic talent and discipline, while recreational sports ensure all children stay healthy and make friends without high-stakes pressure.",
      "conclusion": "Offering varied commitment tiers honors diverse childhood inclinations, making this a healthy and positive social development provided children choose freely."
    }
  },
  {
    "id": "t2-13-banning-dangerous-sports",
    "taskType": "task2",
    "title": "T2-13: Banning Dangerous Sports vs Personal Freedom",
    "category": "Discuss Both Views",
    "instruction": "Discuss both views and give your own opinion. Write at least 250 words.",
    "question": "Some people think that governments should ban dangerous sports, while others think people should have freedom to do any sports or activity. Discuss both views and give your own opinion.",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although bans may prevent injuries and reduce rescue costs, I support regulated freedom because informed adults should retain choice and proportionate safety rules are less restrictive.",
      "body1": "Case for prohibition: Extreme sports (base jumping, free solo climbing, boxing) risk catastrophic injuries, fatalities, and place enormous financial strain on taxpayer-funded emergency rescue and healthcare services.",
      "body2": "Case for personal liberty: Competent adults possess bodily autonomy to pursue passion and challenge; rigorous safety protocols, certifications, and mandatory personal insurance can mitigate risk without outright authoritarian prohibition.",
      "conclusion": "Governments should enforce strict safety regulations and personal accountability rather than infringing on fundamental personal freedoms through outright bans."
    }
  },
  {
    "id": "t2-14-women-in-police-and-military",
    "taskType": "task2",
    "title": "T2-14: Women in Police and Military Forces: Equal Role vs Unsuitable",
    "category": "Discuss Both Views",
    "instruction": "Discuss both views and give your opinion. Write at least 250 words.",
    "question": "Some people believe that women should play an equal role as men in a country’s police force or military force, while others think women are not suitable for these kinds of jobs. Discuss both views and give your opinion.",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although some emphasise physical demands and operational readiness, I support equal opportunity based on role-specific standards because individual ability and a wider talent pool matter more than gender.",
      "body1": "Arguments citing suitability: Physiological differences in average upper-body strength and combat endurance, raising concerns about front-line heavy lifting and unit combat cohesion.",
      "body2": "Case for full equality: Modern security requires intelligence analysis, de-escalation, diplomacy, and cyber warfare where women excel; any woman meeting established physical standards should have equal combat rights.",
      "conclusion": "Enforcing objective physical and tactical standards irrespective of gender creates a more capable, diverse, and meritocratic armed forces."
    }
  },
  {
    "id": "t2-15-sports-funding-elite-vs-public",
    "taskType": "task2",
    "title": "T2-15: Sports Funding: Elite Athletes vs Public Community Facilities",
    "category": "Discuss Both Views",
    "instruction": "Discuss both sides and give your own opinion. Write at least 250 words.",
    "question": "Some people think that governments should spend more money on sports facilities for top athletes. Others argue that this money should be spent on sports facilities for ordinary people. Discuss both sides and give your own opinion.",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although elite facilities can improve competitive success and inspire spectators, I believe public facilities deserve greater priority because they benefit more people and widen access to exercise.",
      "body1": "Funding elite athletes: Olympic-grade training centers cultivate medal winners, fostering national prestige, international soft power, and inspiring the youth population to pursue athletics.",
      "body2": "Funding grassroots facilities: Free neighborhood parks, swimming pools, and community basketball courts directly combat rampant obesity, lifestyle diseases, and healthcare costs for millions of citizens.",
      "conclusion": "While maintaining a baseline for top competitors, governments must overwhelmingly prioritize accessible community sports amenities that benefit the health of the entire populace."
    }
  },
  {
    "id": "t2-16-mars-exploration-spending",
    "taskType": "task2",
    "title": "T2-16: Space Exploration (Mars) vs Protecting Earth",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree with this statement? Write at least 250 words.",
    "question": "In the future, it seems more difficult to live on Earth. Some people think more money should be spent on researching another planet to live on, such as Mars. To what extent do you agree or disagree with this statement?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although planetary research offers scientific knowledge and a possible long-term safeguard, I largely disagree with making it a higher priority than protecting Earth and adapting to present environmental threats.",
      "body1": "Arguments for Mars exploration: Advances extreme-environment life support technology, robotics, and provides humanity with an ultimate planetary backup against extinction level events.",
      "body2": "Why Earth must take priority: Mars is an inhospitable, radiation-bathed vacuum that can never host billions of people; spending trillions on Mars while Earth suffers catastrophic climate disruption, poverty, and deforestation is an unviable escapist fantasy.",
      "conclusion": "Human resources must be overwhelmingly focused on healing and sustaining our only habitable home before looking toward the stars."
    }
  },
  {
    "id": "t2-17-personal-information-online",
    "taskType": "task2",
    "title": "T2-17: Sharing Personal and Financial Information Online",
    "category": "Positive or Negative Development",
    "instruction": "Is this a positive or negative development? Write at least 250 words.",
    "question": "More people today put their personal and private information online (address, telephone number, credit card number) to do everyday activities such as banking, shopping, and socializing. Is this a positive or negative development?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although this brings convenience and easier access to services, I regard the growing exposure of sensitive information as negative when privacy protection fails to keep pace, because it increases fraud and reduces control over personal data.",
      "body1": "Benefits of digital identity: Unprecedented convenience in instant 24/7 banking, global e-commerce, and seamless communication without physical paperwork.",
      "body2": "Dangerous perils: Data breaches, identity theft, financial fraud, surveillance capitalism, and loss of personal privacy through invasive consumer profiling.",
      "conclusion": "Unless cybersecurity infrastructure and statutory privacy safeguards catch up with technological integration, the unchecked dissemination of personal data remains a net negative."
    }
  },
  {
    "id": "t2-18-reoffending-causes-solutions",
    "taskType": "task2",
    "title": "T2-18: Ex-Prisoner Recidivism: Causes and Solutions",
    "category": "Causes and Solutions",
    "instruction": "Why is this the case? What can be done to solve this problem? Write at least 250 words.",
    "question": "Recent research suggests that the majority of criminals who are sent to prison commit crimes after they are released. Why is this the case? What can be done to solve this problem?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "This essay explores the primary causes of high recidivism rates—notably societal stigma and lack of post-release support—and outlines effective reintegration strategies.",
      "body1": "Causes: Criminal records bar ex-offenders from legal employment and stable housing, while prison subcultures reinforce criminal behaviors and sever positive social ties, driving desperate individuals back to crime.",
      "body2": "Solutions: In-prison vocational training matched to industry needs, transitional halfway houses, tax incentives for companies hiring reformed convicts, and assigned reintegration caseworkers.",
      "conclusion": "Transforming penal institutions from punitive warehouses into rehabilitative academies equipped with post-release job placement is the only sustainable way to break the cycle of crime."
    }
  },
  {
    "id": "t2-19-compulsory-art-classes-high-school",
    "taskType": "task2",
    "title": "T2-19: Compulsory Art Classes in High School",
    "category": "Opinion Essay",
    "instruction": "Do you agree or disagree? Write at least 250 words.",
    "question": "Art classes, such as painting and drawing, are as important for children’s development as other subjects, so they should be compulsory in high school. Do you agree or disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although compulsory art can place pressure on timetables and restrict subject choice, I agree that a basic art curriculum is justified because it develops creative thinking and provides a valuable means of expression.",
      "body1": "Concerns: Overcrowds academic timetables for students intending to pursue STEM fields, and forcing disinterested adolescents into graded artistic performance can cause unnecessary academic stress.",
      "body2": "Why art is vital: Fosters creative lateral thinking, emotional catharsis, spatial intelligence, and visual design skills essential in modern digital media, game development, and architectural professions.",
      "conclusion": "A foundational art education should remain mandatory in early secondary schooling to cultivate well-rounded, imaginative innovators alongside scientific literacy."
    }
  },
  {
    "id": "t2-20-parental-pressure-on-children",
    "taskType": "task2",
    "title": "T2-20: Excessive Parental Pressure on Children",
    "category": "Two-part Question",
    "instruction": "What is the reason for this? Is this a positive or negative development for the children? Write at least 250 words.",
    "question": "Nowadays, some parents put a lot of pressure on their children. What is the reason for this? Is this a positive or negative development for the children?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "This pressure is often driven by competitive education and parental comparisons, and I consider it negative because it can damage children's well-being and weaken independent motivation.",
      "body1": "Reasons: Escalating economic competition for elite university places, fear of downward social mobility, and parents living vicariously through their children's prestige achievements.",
      "body2": "Harmful evaluation: Triggers severe adolescent anxiety, depression, and loss of intrinsic curiosity; fosters fear of failure, perfectionism, and damages parent-child emotional trust.",
      "conclusion": "While born of concern for future security, excessive parental coercion stifles authentic psychological development and is profoundly detrimental to childhood happiness."
    }
  },
  {
    "id": "t2-21-elite-sports-vs-children-sports-funding",
    "taskType": "task2",
    "title": "T2-21: Sports Budget: Olympic Preparation vs Children's Grassroots Sports",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree? Write at least 250 words.",
    "question": "Some countries spend a lot of money preparing competitors to take part in major competitions such as the Olympic Games or football World Cup. Some people say that it would be better to spend this money encouraging children to take up sports from a young age. To what extent do you agree or disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although elite competition can bring national recognition and inspirational role models, I agree that children's sport should receive greater priority because it builds lasting habits and benefits a much wider group.",
      "body1": "Merits of elite athlete funding: Olympic glory ignites national pride, strengthens international profile, and creates charismatic icons who inspire millions.",
      "body2": "Why youth sport deserves priority: Instills lifelong exercise habits in early childhood, prevents pediatric obesity, teaches teamwork and resilience, and democratization of sports delivers immense long-term public health savings.",
      "conclusion": "Governments should prioritize funding universal grassroots children's sports programs over astronomical expenditures on a handful of professional athletes."
    }
  },
  {
    "id": "t2-22-value-of-artists-in-tech-world",
    "taskType": "task2",
    "title": "T2-22: The Value of Artists in a World of Advanced Technology",
    "category": "Two-part Question",
    "instruction": "Why do you think it is? Are the arts as important in people’s lives as technology? Write at least 250 words.",
    "question": "In today’s world of advanced science and technology, we still greatly value our artists, such as musicians, painters, and writers. Why do you think it is? Are the arts as important in people’s lives as technology?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Their continuing importance comes from their ability to communicate human experience and preserve culture; I believe the arts are as important as technology because they meet different but complementary needs.",
      "body1": "Why artists remain valued: Art explores the depths of the human condition, moral complexity, and cultural heritage—realms of emotion and spiritual identity that cold logic and algorithms cannot fulfill.",
      "body2": "Comparison with technology: Technology provides physical survival, efficiency, and longevity; art provides meaning, ethics, comfort, and purpose. Without art, technological progress lacks soul and direction.",
      "conclusion": "Art and technology are complementary twin pillars of human civilization; science enables us to survive, but the arts make survival meaningful."
    }
  },
  {
    "id": "t2-23-higher-fuel-prices-environment",
    "taskType": "task2",
    "title": "T2-23: Increasing Fuel Prices to Solve Environmental Problems",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree? Write at least 250 words.",
    "question": "Some people think that one of the best ways to solve environmental problems is to increase the cost of fuels for cars and other vehicles. To what extent do you agree or disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although higher prices can encourage conservation and cleaner travel, I only partly agree because they may burden people with few alternatives and cannot address every major source of pollution.",
      "body1": "Benefits of carbon/fuel taxation: Economically disincentivizes superfluous driving, spurs adoption of electric vehicles, and funds green infrastructure subsidies.",
      "body2": "Flaws and limitations: Heavily regressive tax that penalizes low-income rural commuters who have no access to buses or trains; fails to tackle pollution from coal-fired power, heavy industry, and industrial agriculture.",
      "conclusion": "Fuel pricing is only a partial lever; true environmental remediation demands comprehensive green transit networks, renewable energy grids, and stringent industrial regulations."
    }
  },
  {
    "id": "t2-24-preventing-animal-extinction",
    "taskType": "task2",
    "title": "T2-24: Animal Extinction: Natural Process vs Human Intervention",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree? Write at least 250 words.",
    "question": "It is a natural process for animal species to become extinct. There is no reason why people should try to prevent this from happening. To what extent do you agree or disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although conservation can be costly and some ecological change is unavoidable, I strongly disagree because many current threats are human-driven and species loss can damage wider ecosystems.",
      "body1": "Recognizing natural background extinction: Historically, species evolved and died out naturally over geological epochs, and limited budgets mean humans cannot save every sub-species.",
      "body2": "The modern anthropogenic reality: Current extinction rates are hundreds of times faster than natural baselines due to deforestation, poaching, pollution, and climate change; preserving keystone species protects entire biomes, medical discoveries, and agricultural food webs.",
      "conclusion": "Humanity has an ethical obligation and self-interested duty to aggressively preserve global biodiversity from human-induced devastation."
    }
  },
  {
    "id": "t2-25-preserving-old-buildings",
    "taskType": "task2",
    "title": "T2-25: Preserving Historic Buildings: Criteria and Advantages",
    "category": "Mixed Question",
    "instruction": "Which types of old buildings should be preserved? Do you think that the advantages of preserving these old buildings outweigh the disadvantages? Write at least 250 words.",
    "question": "Some people think that certain old buildings are more worth preserving than the other ones. Which types of old buildings should be preserved? Do you think that the advantages of preserving these old buildings outweigh the disadvantages?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Buildings with major historical, cultural or architectural significance should be prioritised, and I believe the benefits of preserving them outweigh the costs and restrictions involved.",
      "body1": "Types of buildings to preserve: Structures tied to monumental historic milestones, ancient temples/cathedrals representing spiritual heritage, and works of rare architectural craftsmanship that modern construction cannot duplicate.",
      "body2": "Advantages outweigh drawbacks: While restoration is expensive, preserved architecture anchors cultural identity, enriches city aesthetics, and generates massive sustainable tourism revenue that far exceeds maintenance costs.",
      "conclusion": "Selectively protecting culturally and architecturally distinguished buildings enriches collective memory and local economies, easily outweighing modern redevelopment concerns."
    }
  },
  {
    "id": "t2-26-celebrity-wealth-vs-achievements",
    "taskType": "task2",
    "title": "T2-26: Celebrities Famous for Glamour and Wealth: Influence on Adolescents",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree? Write at least 250 words.",
    "question": "Nowadays celebrities are more famous for their glamour and wealth than for their achievements, and this is a bad example for adolescents. To what extent do you agree or disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although such fame can provide entertainment and commercial opportunities, I agree that presenting wealth as the main measure of success sets a poor example because it encourages materialism and unrealistic expectations.",
      "body1": "Superficial positives: Fashion inspiration, entertainment value, and demonstrating marketing and branding entrepreneurial savvy.",
      "body2": "Detrimental psychological impact: Distorts youth values by glorifying effortless consumerism over hard work and intellect, fostering body image dysmorphia, materialism, and feelings of inadequacy.",
      "conclusion": "When glamour outshines genuine competence and virtue, adolescent role models become superficial; society must celebrate scientists, humanitarians, and artists over hollow influencers."
    }
  },
  {
    "id": "t2-27-school-transport-government-vs-parents",
    "taskType": "task2",
    "title": "T2-27: School Commute: Government Responsibility vs Parents",
    "category": "Discuss Both Views",
    "instruction": "Discuss both views and give your opinion. Write at least 250 words.",
    "question": "Some people say it is the government's responsibility to transport children to school, while others believe parents should transport their children to school. Discuss both views and give your opinion.",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although parental transport allows flexibility and close supervision, I believe governments should ensure a reliable basic service because access to education should not depend on family resources and coordinated travel can be more efficient.",
      "body1": "Arguments for parental responsibility: Gives parents control over schedules, allows direct supervision of young or fragile children, and avoids straining municipal budgets.",
      "body2": "Arguments for state-organized school buses: Guarantees educational access for children of working or impoverished parents without cars, prevents massive school-gate traffic gridlock, and slashes vehicular carbon emissions.",
      "conclusion": "A state-coordinated school bus network is far more ecologically efficient and socially equitable, making basic public school transit a governmental duty."
    }
  },
  {
    "id": "t2-28-cars-vs-bicycles-in-cities",
    "taskType": "task2",
    "title": "T2-28: Urban Mobility Shifts: Cars Replacing Bicycles vs Bicycles Replacing Cars",
    "category": "Two-part Question",
    "instruction": "Why is this the case? Which development do you think is better? Write at least 250 words.",
    "question": "In some cities, people are choosing cars instead of bicycles, while in other cities riding bikes is replacing cars. Why is this the case? Which development do you think is better?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "These contrasting trends reflect differences in urban distances, infrastructure and convenience; I believe a shift towards cycling is generally better where safe routes and suitable travel distances make it practical.",
      "body1": "Reasons for divergent trends: Sprawling car-dependent cities with vast highway networks and hostile weather drive people into air-conditioned automobiles; conversely, dense compact cities investing in protected bike lanes and clean zones make cycling faster and cheaper.",
      "body2": "Evaluation: The resurgence of bicycles is far superior because it eliminates gridlock, purifies urban air, reduces noise pollution, and integrates daily aerobic cardio into citizen lifestyles.",
      "conclusion": "While urban geography dictates transit choices, municipal policies prioritizing protected cycling networks yield vastly healthier, more sustainable cities."
    }
  },
  {
    "id": "t2-29-space-exploration-spending-justified",
    "taskType": "task2",
    "title": "T2-29: Funding Space Exploration Technology: Justified or Wasteful?",
    "category": "Opinion Essay",
    "instruction": "To what extent do you agree or disagree? Write at least 250 words.",
    "question": "Some people think the money spent on developing the technology for space exploration is not justified. There are more beneficial ways to spend this money. To what extent do you agree or disagree?",
    "minWords": 250,
    "timeMinutes": 40,
    "outline": {
      "overviewOrThesis": "Although space research can generate useful knowledge and technological advances, I largely agree that urgent terrestrial needs should take priority when resources are limited.",
      "body1": "Merits of space innovation: Has spawned satellite telecommunications, GPS, lightweight alloys, water purification filters, and profound cosmological discoveries.",
      "body2": "Why terrestrial needs must take priority: Billions of humans suffer from hunger, preventable disease, substandard schooling, and extreme climate disasters; pouring billions into rocket launches while basic human needs remain unfunded is ethically indefensible.",
      "conclusion": "While space research has merit, public budgets must decisively prioritize human survival, health, and clean energy on Earth before subsidizing deep space exploration."
    }
  }
];

export function getPromptById(id: string): PromptSeed | undefined {
  return [...TASK_1_SEEDS, ...TASK_2_SEEDS].find((p) => p.id === id);
}

export function getRandomPrompt(taskType: 'task1' | 'task2'): PromptSeed {
  const pool = taskType === 'task1' ? TASK_1_SEEDS : TASK_2_SEEDS;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
