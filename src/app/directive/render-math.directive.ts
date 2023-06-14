import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare const MathJax: any;

@Directive({
  selector: '[appRenderMath]'
})
export class RenderMathDirective implements OnInit {
  @Input('appRenderMath') content: string;

  constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.renderMath();
  }

  private renderMath() {
    const div = document.createElement('div');
    div.innerHTML = this.content;

    MathJax.typeset([div], () => {
      const mathjaxOutput = document.createElement('div');
      mathjaxOutput.appendChild(div);

      // Lấy HTML đã được xử lý bởi MathJax
      const processedHtml = mathjaxOutput.innerHTML;

      // Sử dụng sanitizer để trả về HTML đã được bypassSecurityTrustHtml
      const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(processedHtml);

      // Gán nội dung đã xử lý vào phần tử DOM
      this.elementRef.nativeElement.innerHTML = sanitizedHtml;
    });
  }
}
