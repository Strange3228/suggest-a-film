import {animate, style, transition, trigger} from "@angular/animations";

const enterTransition = transition(':enter', [
  style({
    height: 0,
    opacity: 0
  }),
  animate('0.7s ease-in', style({
    opacity: 1,
    height: '600px'
  }))
])
const exitTransition = transition(':leave', [
  style({
    opacity: 1,
    height: '600px'
  }),
  animate('0.7s ease-out', style({
    opacity: 0,
    height: 0
  }))
])
export const scrollDown = trigger('scrollDown', [enterTransition])
export const scrollUp = trigger('scrollUp', [exitTransition])
