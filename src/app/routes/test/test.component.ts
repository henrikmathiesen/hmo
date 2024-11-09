import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { QuoteComponent, CardComponent } from '../../components';
import { FeatherIcon } from '../../directives';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [ReactiveFormsModule, NgFor, NgClass, NgIf, QuoteComponent, CardComponent, FeatherIcon],
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent {

    testForm: FormGroup;
    hasOCD: null | boolean = null;
    readonly quoteP = 'Från boken Tvångssyndrom (med tillåtelse)';
    readonly quoteF = 'Olle Wadström, 2017';

    testResult = {
        header: '',
        info: '',
        disclaimer: 'Bäst diagnosställning får du av en psykolog (som kan OCD).',
        reset: 'Gör testet igen'
    };

    private testLabels: { sectionA: string[], sectionB: string[], sectionC: string[] };

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
        this.scrollTop();
    }

    testReset() {
        this.testForm.reset();
        this.hasOCD = null;
        this.scrollTop();
    }

    private scrollTop() {
        window.scrollTo(0, 0);
    }

    private evaluateTest() {
        const sectionAValues = this.getArrayForSection('sectionA').value as boolean[];
        const sectionBValues = this.getArrayForSection('sectionB').value as boolean[];
        const sectionCValues = this.getArrayForSection('sectionC').value as boolean[];

        const atLeastOneTrueFromSectionAValues = sectionAValues.some(v => v === true);
        const atLeastOneTrueFromSectionBValues = sectionBValues.some(v => v === true);
        const atLeastOneTrueFromSectionCValues = sectionCValues.some(v => v === true);

        this.hasOCD = atLeastOneTrueFromSectionAValues && atLeastOneTrueFromSectionBValues && atLeastOneTrueFromSectionCValues;

        if (this.hasOCD) {
            this.testResult.header = 'Det kan handla om OCD';
            this.testResult.info = `Har du minst ett kryss vardera, under A, B och C, kan det handla om OCD i ditt fall. ${this.testResult.disclaimer}`;
        } else {
            this.testResult.header = 'Förmodligen inte OCD';
            this.testResult.info = `Enligt det här testet så har du förmodligen inte OCD. ${this.testResult.disclaimer}`;
        }
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
                'Du tvättar dig extra mycket och är mycket noga med din hygien',
                'Du kontrollerar spis, kaffebryggare, TV, dörrar, fönster, kranar och annat',
                'Du plockar ordning, ändrar om, rättar till och känner dig störd av oordning',
                'Du utför dagligen ritualer (säger ramsor, nynnar, räknar, skriver listor) som egentligen är meningslösa för andra människor',
                'Vissa aktiviteter tar alltför lång tid för dig (skriva, läsa, betala räkningar, gå på toaletten, berätta något på rätt sätt)',
                'Du har svårt att kasta saker som du egentligen vet är värdelösa och som andra personer brukar kasta. Du känner dig tveksam om det är viktigt eller värdefullt.',
                'Du undviker att göra vissa aktiviteter eller hamna i vissa situationer, du känner dig osäker på vad du kanske gör eller vad som kan hända',
                'Du frågar andra människor runt omkring dig om sådant som du egentligen vet svaret på, men som du trots det vill bli säkrare på. Efter en tid blir de kanske irriterade på dina frågor.',
                'Du använder andra människor (med eller utan deras medvetenhet) för att lugna dig i saker där du tvivlar',
                'Du tänker och ältar sådant som du egentligen redan vet svaret på, men ändå inte kan låta bli, trots att det sällan leder någonstans'
            ],
            sectionB: [
                'Du får ofta stark oro om du inte får utföra det som du kryssat för i föregående sektion',
                'Du har skrämmande tankar om vad som kan hända om du inte gör något av det som du kryssat för i föregående sektion',
                'Du har skrämmande tankar om vad du skulle kunna göra eller kan ha gjort',
                'Du känner dig ofta plågad av tvivel, ångest, oro för sådant som egentligen inte är något att oroa sig för',
                'Du kan få stark ångest av tanken på att din partner skulle kunna vara otrogen',
                'Du oroar dig för och tänker på att du kan vara kroppsligt sjuk på något sätt'
            ],
            sectionC: [
                'Du har svårt att acceptera eller tåla att känna osäkerhet, tvivel eller oro. Du vill vara helt säker.'
            ]
        }
    }

}