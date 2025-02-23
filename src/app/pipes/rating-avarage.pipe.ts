import { Pipe, PipeTransform } from '@angular/core';

import { TrackerInterface } from '../models';
import { RatingInPointsPipe } from './rating-in-points.pipe';

@Pipe({
    name: 'ratingAvarage',
})
export class RatingAvaragePipe implements PipeTransform {

    constructor(
        private ratingInPointsPipe: RatingInPointsPipe
    ) { }

    transform(trackerModel: TrackerInterface[]) {
        const ratings = trackerModel.map(v => v.rating);
        const asPoints = ratings.map(v => this.ratingInPointsPipe.transform(v));

        let sum = 0;

        asPoints.forEach((p) => { 
            sum += p;
        });

        let avarage = sum / asPoints.length;

        if (Number.isNaN(avarage)) {
            avarage = 0;
        }
    
        return Math.round(avarage * 10) / 10;
    }
}