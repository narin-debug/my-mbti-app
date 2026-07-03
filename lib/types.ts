export type Letter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

export interface QuizChoice {
  text: string;
  letter: Letter;
}

export interface QuizQuestion {
  id: number;
  dimension: Dimension;
  text: string;
  choices: [QuizChoice, QuizChoice];
}

export type MbtiType = string;

export interface PersonaMatch {
  type: MbtiType;
  name: string;
  reason: string;
}

export interface Persona {
  type: MbtiType;
  name: string;
  tagline: string;
  traits: [string, string, string];
  bestMatch: PersonaMatch;
  worstMatch: PersonaMatch;
}
