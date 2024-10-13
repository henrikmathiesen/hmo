import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    imports: [NgClass]
})
export class CardComponent implements OnInit {

    @Input() header = '';
    @Input() backgroundCssClass = 'bg-light'; // use bg-light, bg-danger or bg-warning
    textcolorCssClass = '';
    shadowCssClass = 'app-card-shadow-for-bg-light';

    ngOnInit(): void {
        if (this.backgroundCssClass === 'bg-danger') {
            this.textcolorCssClass = 'text-white';
            this.shadowCssClass = '';
        }

        if (this.backgroundCssClass === 'bg-warning') {
            this.shadowCssClass = '';
        }
    }

}