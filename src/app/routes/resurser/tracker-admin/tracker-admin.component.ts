import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';

import { LocalstorageKeysEnum, TrackerInterface } from '../../../models';
import { ValidateTrackerJsonService } from '../../../services';

@Component({
    selector: 'app-tracker-admin',
    imports: [RouterLink, FormsModule, FileSaverModule, NgIf],
    templateUrl: './tracker-admin.component.html'
})
export class TrackerAdminComponent {
    private readonly localStorageKey = LocalstorageKeysEnum.tracker;

    adminRaderaLsCb = false;
    uploadedJsonIsValid: boolean | null = null;

    constructor(
        private fileSaver: FileSaverService,
        private validateTrackerJsonService: ValidateTrackerJsonService
    ) { }

    onAdminRaderaLsCb(v: boolean) {
        this.adminRaderaLsCb = v;
    }

    onAdminRaderaLsCbConfirmed() {
        localStorage.removeItem(LocalstorageKeysEnum.milestones);
        localStorage.removeItem(LocalstorageKeysEnum.tracker);
        this.adminRaderaLsCb = false;
    }

    onDownloadJson() {
        let trackersInLocalStorage = localStorage.getItem(this.localStorageKey);
        trackersInLocalStorage = JSON.stringify(trackersInLocalStorage);

        this.fileSaver.saveText(trackersInLocalStorage, `${this.localStorageKey}.json`);
    }

    onUploadJson(event: any) {
        const file: File = event.target.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = (e) => {
                if (e && e.target) {
                    this.validateJson(e.target.result);
                }
            };

            reader.readAsText(file);
        }
    }

    private validateJson(uploadedJson: any) {
        let finalParsed;

        try {
            console.log('TRYING TO PARSE');
            const parsed = JSON.parse(uploadedJson);
            finalParsed = JSON.parse(parsed); // for some reason this is needed
        } catch {
            console.log('CAUGHT ERROR - STOPPING');
            this.uploadedJsonIsValid = false;
            return;
        }

        console.log('DO SIMPLE VALIDATION OF PROPERTIES');
        
        this.uploadedJsonIsValid = this.validateTrackerJsonService.isValid((finalParsed as TrackerInterface[]));

        if (this.uploadedJsonIsValid) {
            console.log('PROPERTIES ARE VALID - SETTING IN LOCALSTORAGE');
            localStorage.setItem(this.localStorageKey, JSON.stringify((finalParsed as TrackerInterface[])));
        }
    }

    /* 
        TODO <======= important

        https://blog.angular-university.io/angular-file-upload/
        Don't forget to use fileUpload.value = ''; before fileUpload.click();.
        Otherwise, the same file can't be selected again.
    
    */
}