export interface ShiftEntry {
  robotId: string;
  status: 'ok' | 'warning' | 'error';
  summary: string;
  detail: string;
  metric?: string;
}

export interface ChatMessage {
  robotId: string;
  text: string;
  timestamp: string;
}

export const todaysShift: ShiftEntry[] = [
  {
    robotId: 'pepa',
    status: 'ok',
    summary: 'Odpověděl na 37 e-mailů',
    detail: 'Žádný nepřišel dvakrát. Marie je spokojená. (To se nestává často.)',
    metric: '37 e-mailů',
  },
  {
    robotId: 'franta',
    status: 'warning',
    summary: 'Nabídl pexeso firmě, která prodává bagry',
    detail: 'Prý "za zkoušku nic nedáme". Marie to řeší.',
    metric: '1 pochybná nabídka',
  },
  {
    robotId: 'mirek',
    status: 'error',
    summary: 'Tvrdí, že všechno funguje',
    detail: 'Ve skutečnosti nic neběží. Windows se aktualizoval.',
    metric: '0 funkčních věcí',
  },
  {
    robotId: 'marie',
    status: 'ok',
    summary: 'Zkontrolovala 14 výstupů',
    detail: '3 vrátila k přepracování. Franta dostal důrazné "Ne."',
    metric: '14 kontrol',
  },
  {
    robotId: 'anicka',
    status: 'ok',
    summary: 'Vyřídila 2 reklamace',
    detail: 'Oba zákazníci dostali omluvu + bonusovou omalovánku. Jsou spokojení.',
    metric: '2 reklamace',
  },
];

export const chatMessages: ChatMessage[] = [
  {
    robotId: 'marie',
    text: 'Franto. Proč jsi slíbil dodání do dvou minut?',
    timestamp: '14:32',
  },
  {
    robotId: 'franta',
    text: 'Protože jsem věřil.',
    timestamp: '14:32',
  },
  {
    robotId: 'marie',
    text: 'Už jsem to opravila na 3 pracovní dny.',
    timestamp: '14:33',
  },
  {
    robotId: 'pepa',
    text: 'Naučil jsem se nový výraz: "Tohle je průšvih." Použil jsem ho sedmnáctkrát.',
    timestamp: '15:01',
  },
  {
    robotId: 'mirek',
    text: 'Celý den jsem hledal chybu. Byla to čárka.',
    timestamp: '16:45',
  },
  {
    robotId: 'franta',
    text: 'Mám nový cíl! Prodat pexeso někomu, kdo ho fakt potřebuje.',
    timestamp: '17:00',
  },
  {
    robotId: 'marie',
    text: 'Franto, pexeso nikdo nepotřebuje.',
    timestamp: '17:01',
  },
  {
    robotId: 'franta',
    text: 'To je to, co si myslíš ty.',
    timestamp: '17:01',
  },
];
