import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appFeatherIcon]',
})
export class FeatherIcon implements OnInit {

    constructor(
        private el: ElementRef
    ){}

    ngOnInit(): void {
        this.el.nativeElement.setAttribute('aria-hidden', 'true');
        (window as any).feather.replace();
    }
}
