export interface Milestone {
  date: string;
  title: string;
  detail: string;
}

export interface CompanyStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface Company {
  id: string;
  name: string;
  founded: number;
  era: string;
  tagline: string;
  origin: string;
  milestones: Milestone[];
  stat: CompanyStat;
  status: string;
  quote: string;
  accent: string;
  scene:
    | 'origins'
    | 'zip2'
    | 'paypal'
    | 'spacex'
    | 'tesla'
    | 'neuralink'
    | 'boring'
    | 'x'
    | 'xai';
}

export interface TimelineEvent {
  id: string;
  year: number;
  date: string;
  company: string;
  title: string;
  detail: string;
  accent: string;
}

export const COMPANIES: Company[] = [
  {
    id: 'origins',
    name: 'The Origin',
    founded: 1971,
    era: '1971 — 1995',
    tagline: 'Before the empire, a kid with a computer.',
    origin:
      'Born in Pretoria, South Africa in 1971, Elon taught himself to program on a Commodore VIC-20. At age 12 he wrote Blastar — a space shooter — and sold the code to PC and Office Technology magazine for about $500. His first sale. At 17 he left for Canada alone, worked farm and lumber jobs, transferred to Penn, and in 1995 dropped out of Stanford after exactly two days to chase the internet.',
    milestones: [
      {
        date: 'Jun 1971',
        title: 'Born in Pretoria',
        detail:
          'Elon Reeve Musk is born on June 28, 1971. A bookish, bullied kid who reads the encyclopedia for fun and devours science fiction.',
      },
      {
        date: '1984',
        title: 'Sells Blastar for ~$500',
        detail:
          'At 12, self-taught on a VIC-20, he writes a space shooter and sells the source code to a computing magazine — his first product, his first exit.',
      },
      {
        date: '1995',
        title: 'Two days at Stanford',
        detail:
          'Admitted to a PhD in applied physics, he drops out after 48 hours to start an internet company. The empire begins.',
      },
    ],
    stat: { label: 'First sale — Blastar, age 12', value: 500, prefix: '$' },
    status:
      'A $500 game written by a 12-year-old. Every rocket, car, and chip that follows traces back to this line of code.',
    quote: 'I was raised by books. Books, and then my parents.',
    accent: '#4ade80',
    scene: 'origins',
  },
  {
    id: 'zip2',
    name: 'Zip2',
    founded: 1995,
    era: '1995 — 1999',
    tagline: 'The internet before the internet had maps.',
    origin:
      'In 1995, Elon and his brother Kimbal dropped everything to build an online city guide — maps, directions, and business listings for a web that barely existed. They coded by night and slept in the office, showering at the YMCA. Newspapers like The New York Times bought in, and the first empire brick was laid.',
    milestones: [
      {
        date: '1995',
        title: 'Founded as Global Link Information Network',
        detail:
          'Elon, Kimbal Musk, and Greg Kouri launch the company in Palo Alto with money largely borrowed from angel investors and family.',
      },
      {
        date: '1996',
        title: 'Mohr Davidow invests $3M',
        detail:
          'Venture backing arrives, the company is renamed Zip2, and it pivots to selling city-guide software to newspapers.',
      },
      {
        date: 'Feb 1999',
        title: 'Compaq acquires Zip2 for $307M',
        detail:
          'One of the largest cash deals for an internet company at the time. Elon walks away with about $22M at age 27.',
      },
    ],
    stat: { label: 'Acquisition price', value: 307, prefix: '$', suffix: 'M' },
    status: 'Acquired by Compaq in 1999 — the exit that funded everything after.',
    quote: 'Work like hell. Put in 80 to 100 hour weeks. This improves the odds of success.',
    accent: '#38bdf8',
    scene: 'zip2',
  },
  {
    id: 'paypal',
    name: 'X.com / PayPal',
    founded: 1999,
    era: '1999 — 2002',
    tagline: 'Money is just an entry in a database.',
    origin:
      'Months after selling Zip2, Musk bet $12M of his own payout on X.com — a plan to rebuild banking from scratch on the internet. In 2000 it merged with rival Confinity and its killer feature, PayPal. The product ate online payments, and eBay came knocking.',
    milestones: [
      {
        date: 'Mar 1999',
        title: 'X.com founded',
        detail:
          'One of the first federally insured online banks. Musk pours in nearly all of his Zip2 windfall.',
      },
      {
        date: 'Mar 2000',
        title: 'Merger with Confinity',
        detail:
          'X.com merges with Peter Thiel and Max Levchin’s Confinity. The combined company renames itself PayPal in 2001.',
      },
      {
        date: 'Oct 2002',
        title: 'eBay acquires PayPal for $1.5B',
        detail:
          'Months after a successful IPO, eBay buys PayPal in stock. Musk, the largest shareholder, nets roughly $176M.',
      },
    ],
    stat: { label: 'eBay acquisition', value: 1.5, prefix: '$', suffix: 'B' },
    status:
      'PayPal lives on as a payments giant. Musk bought the X.com domain back in 2017 — and in 2023, Twitter became X.',
    quote:
      'Starting a company is like eating glass and staring into the abyss.',
    accent: '#a78bfa',
    scene: 'paypal',
  },
  {
    id: 'spacex',
    name: 'SpaceX',
    founded: 2002,
    era: '2002 — Today',
    tagline: 'Making life multiplanetary.',
    origin:
      'Told that rockets were impossibly expensive, Musk did the math on raw materials and founded SpaceX in 2002 to build them cheaper. Three failed launches nearly ended it — the fourth reached orbit with the last of the money. Then SpaceX did what no one had: it landed the rocket and flew it again.',
    milestones: [
      {
        date: 'Sep 2008',
        title: 'Falcon 1 reaches orbit',
        detail:
          'The first privately developed liquid-fuel rocket to orbit Earth — on the company’s fourth and final-funded attempt.',
      },
      {
        date: 'Dec 2015',
        title: 'First orbital booster landing',
        detail:
          'Falcon 9 delivers satellites to orbit, then lands its first stage upright at Cape Canaveral. Reusability becomes real.',
      },
      {
        date: 'May 2020',
        title: 'Crew Dragon flies astronauts',
        detail:
          'Demo-2 carries NASA astronauts to the ISS — the first crewed orbital flight by a private company.',
      },
    ],
    stat: { label: 'Orbital launches', value: 450, suffix: '+' },
    status:
      'The world’s most active launch provider. Starlink spans the globe, Starship is flying, and a SpaceX IPO — reported to be the largest in history — is on the horizon. Mars is the finish line.',
    quote:
      'When something is important enough, you do it even if the odds are not in your favor.',
    accent: '#f97316',
    scene: 'spacex',
  },
  {
    id: 'tesla',
    name: 'Tesla',
    founded: 2003,
    era: '2003 — Today',
    tagline: 'Accelerating the world to sustainable energy.',
    origin:
      'Tesla was founded in 2003 by Martin Eberhard and Marc Tarpenning; Musk led the $6.5M Series A in 2004 and became chairman, then CEO through the 2008 crash that nearly killed the company. The Roadster proved electric could be fast. The Model S proved it could be better. The Model 3 proved it could be for everyone.',
    milestones: [
      {
        date: 'Feb 2008',
        title: 'Roadster deliveries begin',
        detail:
          'The first highway-legal production EV with lithium-ion cells — 0–60 in under 4 seconds, 200+ miles of range.',
      },
      {
        date: 'Jun 2010',
        title: 'IPO on NASDAQ',
        detail:
          'The first American carmaker to go public since Ford in 1956. Shares price at $17 — a split-adjusted $1.13.',
      },
      {
        date: 'Jul 2017',
        title: 'Model 3 launches',
        detail:
          'The mass-market Tesla arrives and becomes the best-selling electric car in history, dragging the entire industry electric.',
      },
    ],
    stat: { label: 'Vehicles delivered', value: 7, suffix: 'M+' },
    status:
      'The world’s most valuable automaker — now betting the future on Full Self-Driving, robotaxis, and the Optimus robot.',
    quote:
      'The first step is to establish that something is possible; then probability will occur.',
    accent: '#ef4444',
    scene: 'tesla',
  },
  {
    id: 'neuralink',
    name: 'Neuralink',
    founded: 2016,
    era: '2016 — Today',
    tagline: 'A direct line between brain and machine.',
    origin:
      'Founded in 2016 on a simple, staggering premise: if AI is coming, humans need a bandwidth upgrade. Neuralink builds coin-sized brain implants with over a thousand electrodes, stitched into the cortex by a surgical robot. In 2024, a paralyzed man moved a cursor with his thoughts.',
    milestones: [
      {
        date: 'Jul 2019',
        title: 'First public reveal',
        detail:
          'Neuralink unveils its flexible "threads" and the sewing-machine-like robot that implants them with micron precision.',
      },
      {
        date: 'May 2023',
        title: 'FDA approves human trials',
        detail:
          'After years of animal studies, the FDA clears Neuralink’s first-in-human clinical study, PRIME.',
      },
      {
        date: 'Jan 2024',
        title: 'First human implant',
        detail:
          'Noland Arbaugh, paralyzed from the shoulders down, receives the N1 chip — and is soon playing chess by thought alone.',
      },
    ],
    stat: { label: 'Electrodes per implant', value: 1024 },
    status:
      'Multiple human patients implanted, trials expanding internationally. Telepathy is in clinical testing; Blindsight is next.',
    quote:
      'If you can\u2019t beat them, join them.',
    accent: '#e879f9',
    scene: 'neuralink',
  },
  {
    id: 'boring',
    name: 'The Boring Company',
    founded: 2016,
    era: '2016 — Today',
    tagline: 'Traffic is a 3D problem with a 1D solution. Go down.',
    origin:
      'It started as a tweet stuck in LA traffic: "I am going to build a tunnel boring machine and just start digging." Weeks later, The Boring Company existed. The pitch — tunnels are absurdly expensive, so make the machines faster and the tunnels smaller, then move people through them in electric vehicles.',
    milestones: [
      {
        date: 'Dec 2018',
        title: 'Hawthorne test tunnel opens',
        detail:
          'A 1.14-mile proof-of-concept tunnel under SpaceX’s home turf in LA, dug for a fraction of typical tunneling costs.',
      },
      {
        date: 'Jun 2021',
        title: 'Vegas Loop goes live',
        detail:
          'The LVCC Loop opens under the Las Vegas Convention Center, shuttling passengers in Teslas between halls in minutes.',
      },
      {
        date: 'Apr 2022',
        title: '$675M raise at $5.7B valuation',
        detail:
          'Series C funding to scale Prufrock, a machine designed to tunnel a mile per week — and eventually beat a snail.',
      },
    ],
    stat: { label: 'Company valuation', value: 5.7, prefix: '$', suffix: 'B' },
    status:
      'The Vegas Loop is expanding toward 68 stations across the Strip while Prufrock machines dig faster with each generation.',
    quote:
      'To solve traffic, roads must go 3D \u2014 which means tunnels.',
    accent: '#facc15',
    scene: 'boring',
  },
  {
    id: 'x',
    name: 'X / Twitter',
    founded: 2022,
    era: '2022 — 2025',
    tagline: 'The town square, under new management.',
    origin:
      'In April 2022 Musk quietly became Twitter’s largest shareholder — then offered to buy the whole thing at $54.20 a share. After six months of public drama and a lawsuit forcing the deal, he walked into headquarters carrying a sink. "Let that sink in." $44 billion later, the bird was his — and within a year, the bird was gone.',
    milestones: [
      {
        date: 'Apr 2022',
        title: 'The $44B offer',
        detail:
          'Musk discloses a 9.2% stake, declines a board seat, and offers to take Twitter private at $54.20 per share.',
      },
      {
        date: 'Oct 2022',
        title: 'Deal closes — "the bird is freed"',
        detail:
          'After trying to back out and being sued, Musk completes the $44B acquisition and becomes "Chief Twit."',
      },
      {
        date: 'Jul 2023',
        title: 'Twitter becomes X',
        detail:
          'The 17-year-old bird logo is retired overnight. Twitter is rebranded X — a step toward Musk’s "everything app."',
      },
    ],
    stat: { label: 'Acquisition price', value: 44, prefix: '$', suffix: 'B' },
    status:
      'Merged into xAI in March 2025 at a $33B valuation — the social feed now fuels Grok, and X.com finally points where Musk always wanted.',
    quote:
      'Free speech is the bedrock of a functioning democracy, and Twitter is the digital town square.',
    accent: '#cbd5e1',
    scene: 'x',
  },
  {
    id: 'xai',
    name: 'xAI',
    founded: 2023,
    era: '2023 — Today',
    tagline: 'Understand the true nature of the universe.',
    origin:
      'Launched in July 2023 as Musk’s answer to the AI labs he helped start and then fell out with. xAI shipped its first model, Grok, within months — then built Colossus, one of the largest AI supercomputers on Earth, in 122 days. In 2025 it swallowed X itself, fusing the model with the feed.',
    milestones: [
      {
        date: 'Nov 2023',
        title: 'Grok-1 launches',
        detail:
          'xAI’s first model debuts on X with real-time knowledge of the platform and a deliberately rebellious streak.',
      },
      {
        date: 'Sep 2024',
        title: 'Colossus comes online',
        detail:
          'A 100,000-GPU training cluster in Memphis, assembled in 122 days — then doubled to 200,000 GPUs within months.',
      },
      {
        date: 'Mar 2025',
        title: 'xAI acquires X',
        detail:
          'An all-stock deal values xAI at $80B and X at $33B, merging the AI lab with the social platform’s data firehose.',
      },
    ],
    stat: { label: 'GPUs in Colossus', value: 200000, suffix: '+' },
    status:
      'Grok ships across X and standalone apps while Colossus keeps growing — the youngest company, moving the fastest.',
    quote:
      'The goal of xAI is to understand the true nature of the universe.',
    accent: '#22d3ee',
    scene: 'xai',
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'e1971-born',
    year: 1971,
    date: 'Jun 1971',
    company: 'Origins',
    title: 'Elon Musk is born',
    detail:
      'Born June 28, 1971 in Pretoria, South Africa — a kid who reads the encyclopedia cover to cover and teaches himself to code.',
    accent: '#4ade80',
  },
  {
    id: 'e1984-blastar',
    year: 1984,
    date: '1984',
    company: 'Origins',
    title: 'Sells Blastar for ~$500',
    detail:
      'At age 12 he writes a space shooter on a Commodore VIC-20 and sells the source code to PC and Office Technology magazine. First sale, first exit.',
    accent: '#4ade80',
  },
  {
    id: 'e1995-zip2',
    year: 1995,
    date: '1995',
    company: 'Zip2',
    title: 'Zip2 is founded',
    detail:
      'Elon and Kimbal Musk launch an online city-guide company in Palo Alto, coding through the night and sleeping in the office.',
    accent: '#38bdf8',
  },
  {
    id: 'e1999-compaq',
    year: 1999,
    date: 'Feb 1999',
    company: 'Zip2',
    title: 'Compaq buys Zip2 for $307M',
    detail:
      'The exit nets 27-year-old Elon roughly $22M — seed capital for everything that follows.',
    accent: '#38bdf8',
  },
  {
    id: 'e1999-xcom',
    year: 1999,
    date: 'Mar 1999',
    company: 'X.com',
    title: 'X.com founded',
    detail:
      'Musk puts ~$12M of his Zip2 payout into an audacious plan: a full-service bank that lives entirely online.',
    accent: '#a78bfa',
  },
  {
    id: 'e2000-merger',
    year: 2000,
    date: 'Mar 2000',
    company: 'X.com',
    title: 'X.com merges with Confinity',
    detail:
      'The merger brings PayPal into the fold. The combined company adopts the PayPal name in 2001.',
    accent: '#a78bfa',
  },
  {
    id: 'e2002-paypal',
    year: 2002,
    date: 'Oct 2002',
    company: 'PayPal',
    title: 'eBay acquires PayPal for $1.5B',
    detail:
      'Musk, the largest shareholder, walks away with about $176M — and immediately bets it on rockets and cars.',
    accent: '#a78bfa',
  },
  {
    id: 'e2002-spacex',
    year: 2002,
    date: 'Mar 2002',
    company: 'SpaceX',
    title: 'SpaceX founded',
    detail:
      'After failing to buy a refurbished Russian ICBM, Musk decides to build rockets from first principles instead.',
    accent: '#f97316',
  },
  {
    id: 'e2004-tesla',
    year: 2004,
    date: 'Feb 2004',
    company: 'Tesla',
    title: 'Musk leads Tesla’s Series A',
    detail:
      'A $6.5M investment makes him chairman of the year-old EV startup founded by Eberhard and Tarpenning.',
    accent: '#ef4444',
  },
  {
    id: 'e2008-falcon1',
    year: 2008,
    date: 'Sep 2008',
    company: 'SpaceX',
    title: 'Falcon 1 reaches orbit',
    detail:
      'On the fourth attempt — funded with the company’s last dollars — Falcon 1 becomes the first privately developed liquid-fuel rocket to orbit.',
    accent: '#f97316',
  },
  {
    id: 'e2008-roadster',
    year: 2008,
    date: 'Feb 2008',
    company: 'Tesla',
    title: 'Roadster deliveries begin',
    detail:
      'The first production EV with lithium-ion cells proves electric cars can be objects of desire.',
    accent: '#ef4444',
  },
  {
    id: 'e2010-ipo',
    year: 2010,
    date: 'Jun 2010',
    company: 'Tesla',
    title: 'Tesla IPO',
    detail:
      'The first American automaker to go public since Ford in 1956, pricing at $17 a share.',
    accent: '#ef4444',
  },
  {
    id: 'e2012-dragon',
    year: 2012,
    date: 'May 2012',
    company: 'SpaceX',
    title: 'Dragon berths with the ISS',
    detail:
      'The first commercial spacecraft to deliver cargo to the International Space Station.',
    accent: '#f97316',
  },
  {
    id: 'e2012-models',
    year: 2012,
    date: 'Jun 2012',
    company: 'Tesla',
    title: 'Model S launches',
    detail:
      'The car that rewrote expectations — Motor Trend’s unanimous Car of the Year in 2013.',
    accent: '#ef4444',
  },
  {
    id: 'e2013-hyperloop',
    year: 2013,
    date: 'Aug 2013',
    company: 'Hyperloop',
    title: 'Hyperloop Alpha paper published',
    detail:
      'Musk open-sources a 58-page design for near-supersonic pod travel in low-pressure tubes — and invites the world to build it.',
    accent: '#fb7185',
  },
  {
    id: 'e2015-openai',
    year: 2015,
    date: 'Dec 2015',
    company: 'OpenAI',
    title: 'Co-founds OpenAI',
    detail:
      'Musk co-founds the nonprofit AI lab with Sam Altman and others, pledging up to $1B to keep AI development open and safe.',
    accent: '#a3e635',
  },
  {
    id: 'e2015-landing',
    year: 2015,
    date: 'Dec 2015',
    company: 'SpaceX',
    title: 'Falcon 9 lands its booster',
    detail:
      'The first orbital-class rocket stage to return and land upright. Rockets stop being disposable.',
    accent: '#f97316',
  },
  {
    id: 'e2016-neuralink',
    year: 2016,
    date: 'Jul 2016',
    company: 'Neuralink',
    title: 'Neuralink founded',
    detail:
      'A brain-computer interface company built on the premise that humans need more bandwidth to keep up with AI.',
    accent: '#e879f9',
  },
  {
    id: 'e2016-boring',
    year: 2016,
    date: 'Dec 2016',
    company: 'The Boring Company',
    title: 'The Boring Company founded',
    detail:
      'Born from a tweet in LA traffic: "I am going to build a tunnel boring machine and just start digging."',
    accent: '#facc15',
  },
  {
    id: 'e2017-model3',
    year: 2017,
    date: 'Jul 2017',
    company: 'Tesla',
    title: 'Model 3 deliveries begin',
    detail:
      'The mass-market Tesla goes on to become the best-selling electric car in history.',
    accent: '#ef4444',
  },
  {
    id: 'e2018-openai-exit',
    year: 2018,
    date: 'Feb 2018',
    company: 'OpenAI',
    title: 'Leaves OpenAI board',
    detail:
      'Citing potential conflicts with Tesla’s AI work, Musk departs the lab he co-founded — a split that later turns into open rivalry.',
    accent: '#a3e635',
  },
  {
    id: 'e2018-heavy',
    year: 2018,
    date: 'Feb 2018',
    company: 'SpaceX',
    title: 'Falcon Heavy launches a Roadster',
    detail:
      'The world’s most powerful operational rocket debuts by sending Musk’s own Tesla Roadster toward Mars’ orbit.',
    accent: '#f97316',
  },
  {
    id: 'e2019-starlink',
    year: 2019,
    date: 'May 2019',
    company: 'SpaceX',
    title: 'First 60 Starlink satellites',
    detail:
      'A single Falcon 9 deploys the first batch of Starlink — the start of the largest satellite constellation in history.',
    accent: '#f97316',
  },
  {
    id: 'e2020-crew',
    year: 2020,
    date: 'May 2020',
    company: 'SpaceX',
    title: 'Crew Dragon carries astronauts',
    detail:
      'Demo-2 makes SpaceX the first private company to fly humans to orbit and the ISS.',
    accent: '#f97316',
  },
  {
    id: 'e2021-loop',
    year: 2021,
    date: 'Jun 2021',
    company: 'The Boring Company',
    title: 'Vegas Loop opens',
    detail:
      'The LVCC Loop begins shuttling convention-goers through twin tunnels under Las Vegas in Teslas.',
    accent: '#facc15',
  },
  {
    id: 'e2022-optimus',
    year: 2022,
    date: 'Sep 2022',
    company: 'Tesla',
    title: 'Optimus robot revealed',
    detail:
      'Tesla unveils its humanoid robot prototype at AI Day — Musk calls it potentially "more significant than the vehicle business."',
    accent: '#ef4444',
  },
  {
    id: 'e2022-twitter',
    year: 2022,
    date: 'Oct 2022',
    company: 'X',
    title: 'Musk acquires Twitter for $44B',
    detail:
      'The deal closes after months of drama. A year later, the bird is gone and Twitter becomes X.',
    accent: '#22d3ee',
  },
  {
    id: 'e2023-xai',
    year: 2023,
    date: 'Jul 2023',
    company: 'xAI',
    title: 'xAI founded',
    detail:
      'Musk launches his own AI lab with the mission to "understand the true nature of the universe." Grok ships four months later.',
    accent: '#22d3ee',
  },
  {
    id: 'e2023-starship',
    year: 2023,
    date: 'Apr 2023',
    company: 'SpaceX',
    title: 'Starship’s first integrated flight',
    detail:
      'The largest rocket ever built lifts off from Boca Chica. It explodes — and the program accelerates anyway.',
    accent: '#f97316',
  },
  {
    id: 'e2024-implant',
    year: 2024,
    date: 'Jan 2024',
    company: 'Neuralink',
    title: 'First human Neuralink implant',
    detail:
      'Noland Arbaugh receives the N1 chip and is soon controlling a computer cursor — and playing chess — by thought.',
    accent: '#e879f9',
  },
  {
    id: 'e2024-catch',
    year: 2024,
    date: 'Oct 2024',
    company: 'SpaceX',
    title: 'Mechazilla catches a booster',
    detail:
      'Starship’s Super Heavy booster returns to the launch tower and is caught mid-air by giant mechanical arms.',
    accent: '#f97316',
  },
  {
    id: 'e2021-richest',
    year: 2021,
    date: 'Jan 2021',
    company: 'Tesla',
    title: 'World’s richest person',
    detail:
      'Tesla’s rally makes Musk the wealthiest person on Earth, passing Jeff Bezos — 22 years after the $22M Zip2 payout.',
    accent: '#ef4444',
  },
  {
    id: 'e2025-merge',
    year: 2025,
    date: 'Mar 2025',
    company: 'xAI',
    title: 'xAI acquires X',
    detail:
      'An all-stock deal values xAI at $80B and X at $33B, fusing the AI lab with the platform’s real-time data.',
    accent: '#22d3ee',
  },
  {
    id: 'e2025-trillionaire',
    year: 2025,
    date: '2025',
    company: 'The Empire',
    title: 'First trillionaire in history',
    detail:
      'Driven by Tesla’s surge, SpaceX and xAI valuations, and a record shareholder-approved pay package, Musk becomes the first person ever to be worth $1 trillion. From a $500 game to thirteen figures.',
    accent: '#fbbf24',
  },
  {
    id: 'e2025-spacex-ipo',
    year: 2025,
    date: 'Dec 2025',
    company: 'SpaceX',
    title: 'SpaceX moves toward IPO',
    detail:
      'SpaceX signals plans to take the company public — an offering reported to potentially be the largest IPO in history, powered by Starlink revenue and Starship.',
    accent: '#f97316',
  },
  {
    id: 'e2026-today',
    year: 2026,
    date: '2026',
    company: 'The Empire',
    title: 'The empire today',
    detail:
      'Rockets that land themselves, cars that drive themselves, chips that read thoughts, tunnels under cities, an AI woven through it all — and the first trillionaire in human history, four decades after a boy sold a space game for $500.',
    accent: '#38bdf8',
  },
];

export const TIMELINE_RANGE = { start: 1971, end: 2026 };
