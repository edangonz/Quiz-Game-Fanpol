import { Category } from './category.structure';
import { Caracter } from './caracter.structure';

export interface Quiz{
    id_quiz?: string;
    name_quiz?: string;
    id_category?: string;
    id_caracter?: string;
    category?: Category;
    caracter?: Caracter;
    questions?: Question[];
}

export interface Question{
    id_question?: string;
    question?: string;
    correct_answer?: string;
    message_correct?: string;
    message_incorrect?: string;
    answers?: string[];
    your_answer?: string;
}