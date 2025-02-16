import { Injectable } from '@angular/core';
import { TrackerInterface } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ValidateTrackerJsonService {

    private requiredValidationIsValid(trackerModel: TrackerInterface[]): boolean {
        return trackerModel.every((v) => {
            return v.id && v.rating && (v.date && v.date.day && v.date.month && v.date.year);
        });
    }

    isValid(trackerModel: TrackerInterface[]): boolean {
        if (!trackerModel) {
            return false;
        }

        return this.requiredValidationIsValid(trackerModel);
    }

    isSomething(trackerModel: any): boolean {
        return trackerModel != null;
    }

    isAnArray(trackerModel: any): boolean {
        return Array.isArray(trackerModel);
    }

}