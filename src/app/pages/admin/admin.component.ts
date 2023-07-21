import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CountryService } from '../../core/services/country.service';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/core/interfaces/country';
import { LoaderService } from 'src/app/core/services/loader.service';
import { FormArray, FormArrayName, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  skillsForm!: FormGroup;
  $subscriptionCountries: Subscription | null = null;
  countries: Country[] = [];
  _countryService = inject(CountryService);
  _loaderService = inject(LoaderService);

  ngOnInit(): void {
    let me = this;
    me.getDataCountries();
    me.__loadForm();

  }

  __loadForm() {
    let me = this;
    me.skillsForm = new FormGroup({
      'inputNameSkill': new FormControl(''),
      'skills': new FormArray([])
    });
  }

  getDataCountries() {
    let me = this;
    me._countryService.getCountries().subscribe({
      next: (resp) => {
        console.log('[SUCCESS]', resp);
        me.countries = resp;

      },
      error: (error) => {
        console.log('[SUCCESS]', error);
      },
      complete: () => {
        console.log('[COMPLETE]');
      }
    });
  }

  ngOnDestroy(): void {
    let me = this;
    me.$subscriptionCountries && me.$subscriptionCountries.unsubscribe();
  }

  get skills():FormArray {
    let me = this;
    return me.skillsForm.get('skills') as FormArray;
  }

  add() {
    let me = this;
    const nameSkill = me.skillsForm.get('inputNameSkill')?.value;
    if (!nameSkill || nameSkill == "") {
      return;
    }
    const skill = new FormGroup({
      'name': new FormControl(nameSkill, [Validators.required])
    });
    me.skillsForm.get('inputNameSkill')?.setValue('');
    me.skills.push(skill);
  }

  submit() {
    let me = this;
    if (me.skillsForm.invalid) {
      console.log('[INVALID-FORM]', me.skillsForm.value)
    }
    console.log('[VALID-FORM]', me.skillsForm.value);
  }

  delete(i:number) {
    let me=this;
    me.skills.removeAt(i);

  }

  /* formItemsActivities(i:number) {
    let me=this;
    return me.formItems.controls.at(i)?.get('activities') as FormArray;
  } */


}
