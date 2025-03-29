import { Pipe, PipeTransform } from '@angular/core';
import { TrackerInterface } from '../models';

@Pipe({
    name: 'trackerStatistikAntalDagar',
})
export class TrackerStatistikAntalDagarPipe implements PipeTransform {
    transform(rating: string, trackerModel: TrackerInterface[]) {
        return trackerModel.filter(v => v.rating === rating).length;
    }
}