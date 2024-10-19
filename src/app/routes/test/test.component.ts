import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [ReactiveFormsModule, NgFor],
    templateUrl: './test.component.html'
})
export class TestComponent {

    testForm: FormGroup;
    testLabels: { sectionA: string[], sectionB: string[], sectionC: string[] };
    hasOCD: null | boolean = null;

    constructor(private formBuilder: FormBuilder) {
        this.testForm = this.setUpTestForm();
        this.testLabels = this.setUpTestLabels();
    }

    getArrayForSection(section: 'sectionA' | 'sectionB' | 'sectionC') {
        return this.testForm.get(section) as FormArray;
    }

    getLabelForSection(section: 'sectionA' | 'sectionB' | 'sectionC', index: number) {
        return this.testLabels[section][index];
    }

    onSubmit() {
        this.evaluateTest();
    }

    private evaluateTest() {
        const sectionAValues = this.getArrayForSection('sectionA').value as boolean[];
        const sectionBValues = this.getArrayForSection('sectionB').value as boolean[];
        const sectionCValues = this.getArrayForSection('sectionC').value as boolean[];

        const atLeastOneTrueFromSectionAValues = sectionAValues.some(v => v === true);
        const atLeastOneTrueFromSectionBValues = sectionBValues.some(v => v === true);
        const atLeastOneTrueFromSectionCValues = sectionCValues.some(v => v === true);

        this.hasOCD = atLeastOneTrueFromSectionAValues && atLeastOneTrueFromSectionBValues && atLeastOneTrueFromSectionCValues;
    }

    private setUpTestForm() {
        const sectionA: FormControl[] = [
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false)
        ];

        const sectionB: FormControl[] = [
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false),
            this.formBuilder.control(false)
        ];

        const sectionC: FormControl[] = [
            this.formBuilder.control(false)
        ];

        return this.formBuilder.group({
            sectionA: this.formBuilder.array(sectionA),
            sectionB: this.formBuilder.array(sectionB),
            sectionC: this.formBuilder.array(sectionC),
        })
    }

    private setUpTestLabels() {
        return {
            sectionA: [
                'A1',
                'A2',
                'A3',
                'A4',
                'A5',
                'A6',
                'A7',
                'A8',
                'A9',
                'A10'
            ],
            sectionB: [
                'B1',
                'B2',
                'B3',
                'B4',
                'B5',
                'B6'
            ],
            sectionC: [
                'C1'
            ]
        }
    }

}