import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { FeatherIcon } from '../../directives';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    imports: [NgClass, NgIf, FeatherIcon]
})
export class CardComponent {
    @Input() header = '';
    @Input() iconType: 'user' | 'book' | 'edit' | '' = '';
}