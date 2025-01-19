import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RatingEnum } from './rating.enum';

export interface TrackerInterface {
    id: string;
    trackerCalendar: NgbDateStruct;
    rating: RatingEnum;
}