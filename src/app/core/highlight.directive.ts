import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[myHighlight]'
})
export class HighlightDirective {
    constructor(private el : ElementRef) {
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.hightlightColor || this.defaultColor || 'red');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }

@Input('myHighlight') hightlightColor: string;
@Input() defaultColor: string;
}
