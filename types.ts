export interface Option {
  id: string;
  text: string;
  emoji: string;
}

export interface Question {
  id: number;
  type: 'choice' | 'scale'; // Identifies if it's buttons or a slider
  question: string;
  options?: Option[]; // Optional because scale doesn't have list options
  scaleConfig?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export type QuizState = {
  step: number;
  answers: string[]; // Stores the text of the selected answers
  note: string;
};