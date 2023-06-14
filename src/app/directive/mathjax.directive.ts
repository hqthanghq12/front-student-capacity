import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

declare const MathJax: any;
@Directive({
  selector: '[appMathJax]'
})
export class MathjaxDirective {

  @Input('appMathJax') equation: string;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equation']) {
      this.renderEquation();
    }
  }

  renderEquation(): void {
    if (!this.equation) return;

    this.el.nativeElement.innerHTML = this.equation;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.el.nativeElement]);
  }

}
