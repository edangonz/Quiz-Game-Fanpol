import { Quiz } from './quiz.structure';

export interface Event{
    id_event?: string;
    name_event?: string;
    date?: string;
    state?: boolean;
    is_ended?: boolean;
    id_quiz?: string;
    quiz?: Quiz;
    winner?: String[];
    max_winners?: Number;
}
