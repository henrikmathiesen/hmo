import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ratingAvarage',
})
export class RatingAvaragePipe implements PipeTransform {

    transform(ratingInPoints: number[]) {
        let sum = 0;

        ratingInPoints.forEach((p) => { 
            sum += p;
        });

        let avarage = sum / ratingInPoints.length;

        if (Number.isNaN(avarage)) {
            avarage = 0;
        }
    
        return Math.round(avarage * 10) / 10;
    }
}