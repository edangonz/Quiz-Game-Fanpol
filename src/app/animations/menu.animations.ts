import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

let time: string = '160ms';

export const showUpMenu = trigger('showUpMenu', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(time, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(time, style({ opacity: 0 }))
      ])
]);

export const showUpLeftMenu = trigger('showUpLeftMenu', [
  transition(':enter', [
      style({ transform: 'translateX(-260px)' }),
      animate(time, style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
      animate(time, style({ transform: 'translateX(-260px)' }))
    ])
]);