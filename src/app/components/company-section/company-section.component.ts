import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-company-section',
  templateUrl: './company-section.component.html',
  styleUrl: './company-section.component.scss',
  animations: [
    trigger('slideInAnimation', [
      state('void', style({ opacity: 0, transform: 'translateX(-50px)' })),
      transition(':enter', [animate('1s ease-out')]),
    ]),
  ],
})
export class CompanySectionComponent {}
