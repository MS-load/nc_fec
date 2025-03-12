import { Component, OnInit, OnDestroy } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { FitTextDirective } from './directives/fit-text.directive'
import { EventStorageService } from './services/event-storage.service'
import { Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DatePipe, FitTextDirective, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = ''
  targetDate = new Date()
  countdown = ''
  private timer!: ReturnType<typeof setInterval>
  private subscription!: Subscription
  isComplete = false

  constructor(private eventStorage: EventStorageService) {}

  ngOnInit() {
    this.subscription = this.eventStorage.eventData$.subscribe(data => {
      this.title = data.title
      this.targetDate = data.targetDate
      this.updateCountdown()
    })

    this.timer = setInterval(() => this.updateCountdown(), 1000)
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  updateCountdown() {
    const now = new Date().getTime()
    const distance = this.targetDate.getTime() - now

    this.isComplete = false
    const absDistance = Math.abs(distance)
    const days = Math.floor(absDistance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((absDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((absDistance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((absDistance % (1000 * 60)) / 1000)

    this.countdown = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`
    if (distance < 0) {
      this.isComplete = true
    }
  }

  onDateChange(dateStr: string) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (!datePattern.test(dateStr)) {
      return
    }

    const newDate = new Date(dateStr)
    if (!isNaN(newDate.getTime())) {
      this.eventStorage.updateEventData({ targetDate: newDate })
    }
  }

  onTitleChange(newTitle: string) {
    this.eventStorage.updateEventData({ title: newTitle })
  }
}

/* 
font-size: 14px;
font-family: Open Sauce One;
font-weight: 400;
line-height: 150%;
letter - spacing: 0 %;

font-size: 74px;
font-family: Open Sauce One;
font-weight: 400;
line-height: 150%;
letter - spacing: 0 %;

font-size: 67px;
font-family: Open Sauce One;
font-weight: 800;
line-height: 135.0000023841858%;
letter - spacing: -2 %;


border-color: #757575;
border - width: 1px;

gap 3 */
