import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trackerStatistikQuote',
})
export class TrackerStatistikQuotePipe implements PipeTransform {
    transform(nr: number, getP = true) {

        const o = { p: '', f: '' };

        if (nr == null) {
            return '';
        }

        switch (true) {
            case nr === 0: {
                o.p = 'When the going gets tough, the tough get going';
                o.f = 'Joseph P. Kennedy';
                break;
            }
            case nr <= 30: {
                o.p = 'Rom byggdes inte på en dag';
                o.f = 'John Heywood';
                break;
            }
            case nr <= 60: {
                o.p = 'Let things go well';
                o.f = 'Mark Freeman';
                break;
            }
            default: {
                o.p = 'Where are you going?';
                o.f = 'Mark Freeman';
                break;
            }
        }

        if (getP) {
            return o.p;
        }

        return o.f;
    }
} 