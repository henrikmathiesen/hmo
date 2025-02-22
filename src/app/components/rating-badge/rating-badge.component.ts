import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RatingEnum } from '../../models';

@Component({
    selector: 'app-rating-badge',
    imports: [NgClass],
    templateUrl: './rating-badge.component.html'
})
export class RatingBadgeComponent {
    @Input() ratingForSelectedDay: RatingEnum | string = RatingEnum.placeholder;
    @Input() smallText = false;
    RatingEnum = RatingEnum;
}