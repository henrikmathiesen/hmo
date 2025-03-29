import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { RatingEnum } from '../../models';
import { RatingInPointsPipe } from '../../pipes';

@Component({
    selector: 'app-rating-badge',
    imports: [NgClass, NgIf, RatingInPointsPipe],
    templateUrl: './rating-badge.component.html'
})
export class RatingBadgeComponent {
    @Input() ratingForSelectedDay: RatingEnum | string = RatingEnum.placeholder;
    @Input() smallText = false;
    @Input() renderPointsInstead = false;
    RatingEnum = RatingEnum;
}