import { Component, ViewChild } from '@angular/core';
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
    @ViewChild('laddaUpp') laddaUpp: any;

    private readonly localStorageKey = LocalstorageKeysEnum.tracker;

    adminRaderaLsCb = false;
    uploadedJsonIsValid: boolean | null = null;
    uploadJsonInprogress = false;
    laddaUppLoaderStyle = { width: '50%' };

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
        this.uploadJsonInprogress = true;
        this.setLoaderLengthProgress();
        this.uploadedJsonIsValid = null;

        const file: File = event.target.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = (e) => {
                if (e && e.target) {
                    this.validateJson(e.target.result);
                    this.hideLoaderWithLittleDelay();
                }
            };

            reader.readAsText(file);
        }
    }

    private validateJson(uploadedJson: any) {
        let parsed;
        let finalParsed;
        let isSomething;
        let isAnArray;

        try {
            parsed = JSON.parse(uploadedJson);
        } catch {
            this.uploadedJsonIsValid = false;
            return;
        }

        isSomething = this.validateTrackerJsonService.isSomething(parsed);

        if (!isSomething) {
            this.uploadedJsonIsValid = false;
        }

        isAnArray = this.validateTrackerJsonService.isAnArray(parsed);

        if (!isAnArray) {
            finalParsed = JSON.parse(parsed);
        } else {
            finalParsed = parsed;
        }

        this.uploadedJsonIsValid = this.validateTrackerJsonService.isValid((finalParsed as TrackerInterface[]));

        if (this.uploadedJsonIsValid) {
            localStorage.setItem(this.localStorageKey, JSON.stringify((finalParsed as TrackerInterface[])));
        }

        this.laddaUpp.value = '';
    }

    private hideLoaderWithLittleDelay() {
        setTimeout(() => {
            this.setLoaderLengthProgress('90%');
        });

        setTimeout(() => { this.uploadJsonInprogress = false; }, 1000);
    }

    private setLoaderLengthProgress(w = '50%') {
        this.laddaUppLoaderStyle = { ...this.laddaUppLoaderStyle, width: w };
    }
}