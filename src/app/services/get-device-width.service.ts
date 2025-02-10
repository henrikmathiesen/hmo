import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GetDeviceWidthService {

    private isSM = false;
    private isMD = false;
    private isLG = false;

    getIsSM() {
        return this.isSM;
    }

    setIsSM(isSM: boolean) {
        this.isSM = isSM;
    }

    getIsMD() {
        return this.isMD;
    }

    setIsMD(isMD: boolean) {
        this.isMD = isMD;
    }

    getIsLG() {
        return this.isLG;
    }

    setIsLG(isLG: boolean) {
        this.isLG = isLG;
    }

}