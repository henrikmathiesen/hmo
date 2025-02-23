import { Pipe, PipeTransform } from '@angular/core';
import { RatingEnum } from '../models';

@Pipe({
    name: 'ratingInPoints',
})
export class RatingInPointsPipe implements PipeTransform {
    transform(rating: RatingEnum | string) {
        switch(rating) {
            case RatingEnum.stammer_helt: {
                return 4;
            }
            case RatingEnum.stammer_nastan_helt: {
                return 3;
            }
            case RatingEnum.stammer_delvis: {
                return 2;
            }
            case RatingEnum.stammer_inte: {
                return 1;
            }
            default: {
                console.error('Could not get point for rating');
                return 0;
            }
        }
    }
}