import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-quote',
    standalone: true,
    imports: [NgClass],
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.css']
})
export class QuoteComponent {
    @Input() p = '';
    @Input() f = '';
    @Input() smallP = false;
}