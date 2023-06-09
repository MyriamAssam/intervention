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
it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
  component.gestionNotifications('pasnotification');
  let zone = component.problemeForm.get('telephone');
  expect(zone.status).toEqual('DISABLED'); 
});
it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
  component.gestionNotifications('Adresse courriel');
     
      let zone = component.problemeForm.get('courrielGroup.courriel');
      zone.setValue('');
      
      expect(zone.enabled).toBeTrue(); 
});
it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
  component.gestionNotifications('courriel');
    
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
     zone.setValue('');
      
      expect(zone.enabled).toBeTrue(); 
});
it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
  component.gestionNotifications('courriel');
      let errors = {};
      let zone = component.problemeForm.get('courrielGroup.courriel');
      zone.setValue('');
      errors = zone.errors || {};
      expect(errors['required']).toBeTruthy();  
});
it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
  component.gestionNotifications('courriel');
      let errors = {};
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      zone.setValue('');
       let group = component.problemeForm.get('courrielGroup');

      expect(group.invalid).toBeTrue(); 
});
it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
  component.gestionNotifications('courriel');
      let errors = {};
      let zone = component.problemeForm.get('courrielGroup.courriel');
      zone.setValue('ghfgh');
      errors = zone.errors || {};
      expect(errors['required']).toBeFalsy(); 
    });

it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
  component.gestionNotifications('courriel');
      let errors = {};
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      zone.setValue('myriamassamea@hotmail.com');
      let group = component.problemeForm.get('courrielGroup');

      expect(group.invalid).toBeTrue(); 

});
it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
  component.gestionNotifications('courriel');
      let errors = {};
      let zone = component.problemeForm.get('courrielGroup.courriel');
      zone.setValue('myriamassamea@hotmail.com');
      let group = component.problemeForm.get('courrielGroup');

      expect(group.invalid).toBeTrue(); 
});
it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
  component.gestionNotifications('courriel');
      let errors = {};
      let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
zoneCourriel.setValue('myriamassamea@hotmail.com');
zoneCourrielConfirmation.setValue('lyndaboukouna@hotmail.com');
let group = component.problemeForm.get('courrielGroup');
errors = group.errors || {};
      expect(group.invalid).toBeTrue(); 

      
});
it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
  component.gestionNotifications('courriel');
      let errors = {};
      let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
zoneCourriel.setValue('myriamassamea@hotmail.com');
zoneCourrielConfirmation.setValue('myriamassamea@hotmail.com');
});
it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
  component.gestionNotifications('messageTexte');
  let zone = component.problemeForm.get('telephone');
  expect(zone.disabled).toBeTrue();
});
it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
  component.gestionNotifications('messageTexte');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  expect(zone.disabled).toBeTrue();
});
it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
  component.gestionNotifications('messageTexte');
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  expect(zone.disabled).toBeTrue();
});
it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
  component.gestionNotifications('messageTexte');
      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('');
      errors = zone.errors || {};
      expect(errors['required']).toBeFalsy(); 
    });
it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
  component.gestionNotifications('messageTexte');
      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('fssds');
      errors = zone.errors || {};
      expect(errors['required']).toBeFalsy(); 
    });
it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
  component.gestionNotifications('messageTexte');
      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('123456789');
      errors = zone.errors || {};
      expect(errors['required']).toBeFalsy(); 
    });
it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
  component.gestionNotifications('messageTexte');
      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('12345678910');
      errors = zone.errors || {};
      expect(errors['required']).toBeFalsy(); 
    });
it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
  component.gestionNotifications('messageTexte');
      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('1234567891');
      errors = zone.errors || {};
      expect(errors['required']).toBeFalsy(); 
    });
});