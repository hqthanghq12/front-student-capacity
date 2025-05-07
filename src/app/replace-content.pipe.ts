import { Pipe, Renderer2, PipeTransform,ElementRef,SecurityContext  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MathContent } from './math/math-content';
@Pipe({
  name: 'replaceContent'
})
export class ReplaceContentPipe implements PipeTransform {
  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer,private el: ElementRef) { }
  public MathContent: MathContent ;

  transform(value: string, images: { img_code: string, path: string }[]): SafeHtml {
    const mathJaxRegex = /\\\(.+?\\\)/g;
    const imgCodeRegex = /\[anh\d*\]/g;
    const imgCodes = value.match(imgCodeRegex);
    const mathJaxStrings = value.match(mathJaxRegex);
    
 

  
    if (imgCodes) {
      imgCodes.forEach((imgCode) => {
        const imgCodeOnly = imgCode.slice(1, -1); // Loại bỏ cặp ngoặc []
        const image = images.find((img) => img.img_code === imgCodeOnly);
  
        if (image) {
          value = value.replace(imgCode, `<img src="${image.path}">`);
        }
      });
    }

    // if (mathJaxStrings) {
    //   // Các chuỗi MathJax đã được tìm thấy
    //   mathJaxStrings.forEach((mathJaxString) => {
    //     // value = value.replace(mathJaxString, stringMath);
      
    //   });
    // }
    return this.MathContent = {
      latex : value
    };
    // return this.sanitizer.bypassSecurityTrustHtml(value);
    
  }


 
 
}
