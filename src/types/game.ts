export type GradeLevel = 'all' | '10' | '11' | '12';

export type QuestionLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export interface Question {
  id: string;
  grade: '10' | '11' | '12';
  topic: string;
  level: QuestionLevel;
  content: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: string;
}

export type GameId = 'millionaire' | 'wheel' | 'racer' | 'puzzle';

export interface GameInfo {
  id: GameId;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  gradient: string;
  description: string;
  features: string[];
}

export interface TeamScore {
  id: string;
  name: string;
  color: string;
  score: number;
}
