import { Directive, OnInit } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appFeatherIcon]',
})
export class FeatherIcon implements OnInit {

    ngOnInit(): void {
        (window as any).feather.replace();
    }
}
