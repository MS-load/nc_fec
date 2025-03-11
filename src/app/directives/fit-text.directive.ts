import { Directive, ElementRef, AfterViewInit, HostListener, NgZone } from '@angular/core'

@Directive({
  selector: '[fitText]',
  standalone: true,
})
export class FitTextDirective implements AfterViewInit {
  private originalFontSize: number
  private resizeObserver: ResizeObserver
  private mutationObserver: MutationObserver

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
  ) {
    this.originalFontSize = parseFloat(window.getComputedStyle(this.el.nativeElement).fontSize)
    this.resizeObserver = new ResizeObserver(() => {
      this.ngZone.run(() => this.fitText())
    })

    this.mutationObserver = new MutationObserver(() => {
      this.ngZone.run(() => this.fitText())
    })
  }

  ngAfterViewInit() {
    this.resizeObserver.observe(this.el.nativeElement.parentElement)
    this.mutationObserver.observe(this.el.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true,
    })
    this.fitText()
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect()
    this.mutationObserver.disconnect()
  }

  @HostListener('window:resize')
  onResize() {
    this.fitText()
  }

  private fitText() {
    const element = this.el.nativeElement
    const container = element.parentElement
    let fontSize = this.originalFontSize

    fontSize = 1
    element.style.fontSize = `${fontSize}px`

    while (element.scrollWidth <= container.clientWidth) {
      fontSize++
      element.style.fontSize = `${fontSize}px`

      if (fontSize > 1000) break
    }

    fontSize--
    element.style.fontSize = `${fontSize}px`
  }
}
