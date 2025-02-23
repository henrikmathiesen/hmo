import { Pipe, PipeTransform } from '@angular/core';
import { RatingEnum, TrackerInterface } from '../models';

@Pipe({
    name: 'ratingAvarage',
})
export class RatingAvaragePipe implements PipeTransform {
    transform(trackerModel: TrackerInterface[]) {
        return '';
    }
}