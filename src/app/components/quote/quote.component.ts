import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-quote',
    standalone: true,
    templateUrl: './quote.component.html'
})
export class QuoteComponent {
    @Input() p = '';
    @Input() f = '';
}