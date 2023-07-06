import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableEvents]'
})
export class DisableEventsDirective {
  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // Vô hiệu hóa phím F11
    if (event.key === 'F11') {
      event.preventDefault();
    }

    // Vô hiệu hóa phím Esc
    if (event.key === 'Escape') {
      event.preventDefault();
    }
  }

  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }
  

}
