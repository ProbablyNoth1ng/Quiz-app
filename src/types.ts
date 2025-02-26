export interface Question {
  id: number;
  text: string;
  type: 'multiple' | 'boolean';  
  correct_answer:string;
  question:string;
  
}

export  interface QuestionsState {
  questions: Question[];
  answers: (string | boolean)[];  
  loading: boolean;
  error: null | string;
  }
  

export interface Props {
  className?: string;
}

export interface ScoreState {
  score:number
}