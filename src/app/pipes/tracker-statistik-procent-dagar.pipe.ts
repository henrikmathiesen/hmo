import { Pipe, PipeTransform } from '@angular/core';
import { TrackerInterface } from '../models';

@Pipe({
    name: 'trackerStatistikProcentDagar',
})
export class TrackerStatistikProcentDagarPipe implements PipeTransform {
    transform(rating: string, trackerModel: TrackerInterface[]) {
        const n = trackerModel.filter(v => v.rating === rating).length;
        return n / trackerModel.length;
    }
}