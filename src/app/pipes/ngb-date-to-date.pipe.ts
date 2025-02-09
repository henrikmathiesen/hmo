import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
    name: 'ngbDateToDate',
})
export class NgbDateToDatePipe implements PipeTransform {
    transform(ngbDate: NgbDateStruct | null) {
        
        if(!ngbDate) {
            return new Date();
        }

        return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);

    }
} 