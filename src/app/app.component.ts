import { Component, OnInit, OnDestroy } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { FitTextDirectective } from './directives/fit-text.directive'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DatePipe, FitTextDirectective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Midsummer Eve'
  targetDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  countdown = ''
  private timer!: ReturnType<typeof setInterval>

  ngOnInit() {
    this.updateCountdown()
    this.timer = setInterval(() => this.updateCountdown(), 1000)
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  updateCountdown() {
    const now = new Date().getTime()
    const distance = this.targetDate.getTime() - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    this.countdown = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`
  }

  onDateChange(dateStr: string) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (!datePattern.test(dateStr)) {
      return
    }

    const newDate = new Date(dateStr)
    if (!isNaN(newDate.getTime())) {
      this.targetDate = newDate
      this.updateCountdown()
    }
  }
}
