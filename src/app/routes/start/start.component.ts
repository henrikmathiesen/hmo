import { Component } from '@angular/core';
import { CardComponent, QuoteComponent } from '../../components';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    imports: [CardComponent, QuoteComponent]
})
export class StartComponent { }