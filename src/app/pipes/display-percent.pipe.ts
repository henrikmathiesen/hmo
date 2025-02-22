import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayPercent',
})
export class DisplayPercentPipe implements PipeTransform {
    transform(nr: number) {
        if (Number.isNaN(nr)) {
            return '0%';
        }

        const p = nr * 100;
        const r = Math.round(p)
        return `${r}%`;
    }
}