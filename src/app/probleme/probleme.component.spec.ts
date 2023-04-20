import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { CategorieService } from './categorie.service';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [CategorieService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('1 : prenom invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });
it(' 2 : prenom invalide avec 3 caractères', () => {

  let zone = component.problemeForm.get('prenom');
  zone.setValue('a'.repeat(3));
 
 expect(zone.valid).toBeTruthy();
});
it('3 : prenom valide avec 200 caractères', () => {

  let zone = component.problemeForm.get('prenom');
  zone.setValue('a'.repeat(200));
 
 expect(zone.valid).toBeTruthy();
});
it('4 : prenom valide avec 0 caractères', () => {

  let zone = component.problemeForm.get('prenom');
  zone.setValue('a'.repeat(0));
 
 expect(zone.valid).toBeFalsy();
});
it('5 : prenom invalide avec 10 espaces', () => {

  let zone = component.problemeForm.get('prenom');
  zone.setValue(' '.repeat(10));
 
 expect(zone.valid).toBeFalsy();
});
it('6 : prenom invalide avec 2 espaces et 1 caractères', () => {

  let zone = component.problemeForm.get('prenom');
  zone.setValue('  a');
 
 expect(zone.valid).toBeFalsy();
});

it('15 : Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
  component.gestionNotifications('aucune');

  let zone = component.problemeForm.get('telephone');
  expect(zone.disabled).toBeTrue();
});
it('16 : Zone TELEPHONE est vide quand ne pas me notifier', () => {
  component.gestionNotifications('aucune');

  let zone = component.problemeForm.get('telephone');
  expect(zone.value).toBe('');
});
it('17 : Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
  component.gestionNotifications('aucune');

  let zone = component.problemeForm.get('courrielGroup.courriel');
  expect(zone.disabled).toBeTrue();
});
it('18 : Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
  component.gestionNotifications('aucune');

  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  expect(zone.disabled).toBeTrue();
});
});