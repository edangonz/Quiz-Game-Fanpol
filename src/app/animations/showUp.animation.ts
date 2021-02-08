import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

export const showUpStagger = trigger('showUpCollection', [
    transition('void => *', [
        query(':enter' , [
            style({
                transform: 'translateX(-150%)'
            }),
            stagger(100, [
                animate('500ms cubic-bezier(.17,.67,.42,1.27)', style({
                    transform: 'translateX(0)'
                }))
            ]),
        ], {optional: true})
    ]),
    transition('* => void', [
        query(':leave' , [
            stagger(100, [
                animate('500ms ease-out', style({
                    transform: 'translateX(-150%)'
                }))
            ]),
        ], {optional: true})
    ]),
]);

export const showUp = trigger('showUpElement', [
    transition(':enter', [
        style({ 
            transform: 'scale(0)',
            opacity: 0
         }),
        animate('500ms cubic-bezier(.17,.67,.42,1.27)', style({
            transform: 'scale(1)',
            opacity: 1
        })),
    ]),
        transition(':leave', [
        animate('500ms cubic-bezier(.17,.67,.42,1.27)', style({
            transform: 'scale(0)',
            opacity: 0
        }))
    ])
]);

export const showMove = trigger('moveElement', [
    transition(':enter', [
        style({ 
            transform: 'translateY(100%)'
         }),
        animate('400ms cubic-bezier(0,.69,.22,1)', style({
            transform: 'translateY(0)'
        })),
    ]),
        transition(':leave', [
        animate('400ms cubic-bezier(0,.69,.22,1)', style({
            transform: 'translateY(100%)'
        }))
    ])
]);

export const showMoveCaracter = trigger('moveCaracter', [
    state('false', style({ transform: 'translateX(0)' })),
    state('true', style({ transform: 'translateX(100%)' })),
    transition('false <=> true', animate('500ms cubic-bezier(.17,.67,.42,1.27)'))
]);