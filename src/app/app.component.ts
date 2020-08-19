import { Component } from '@angular/core';
import { Observable, fromEvent, interval } from 'rxjs';
import { exhaustMap, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  timeLeft = 0;
  interval;

  constructor() { }

  start() {
    this.interval = setInterval(() => {
        this.timeLeft++;
    }, 1000);
  }
  pause() {
    clearInterval(this.interval);
  }
  reset() {
    this.timeLeft = 0;
  }
  wait() {
    const clicks$: Observable<Event> = fromEvent( document.getElementById('wait'), 'click');
    const doubleclicks = clicks$.pipe(
      exhaustMap(() => clicks$.pipe(takeUntil(interval(250)))),
    ).subscribe(() => clearInterval(this.interval));
  }
}

