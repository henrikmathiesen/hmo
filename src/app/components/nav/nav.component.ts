import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [RouterLink, NgClass],
    templateUrl: './nav.component.html',
})
export class NavComponent {

    @Input() sizeCssClass = '';

}