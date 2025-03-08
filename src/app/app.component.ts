import { Component, OnInit, OnDestroy } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DatePipe],
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
    this.targetDate = new Date(dateStr)
    this.updateCountdown()
  }
}
