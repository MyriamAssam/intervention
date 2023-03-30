import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('1 : prenom invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });
it(' 2 : prenom invalide avec 3 caractères', () => {

  let zone = component.problemeForm.controls['Prenom'];
  zone.setValue('a'.repeat(3));
 
 expect(zone.valid).toBeTruthy();
});
it('3 : prenom valide avec 200 caractères', () => {

  let zone = component.problemeForm.controls['Prenom'];
  zone.setValue('a'.repeat(200));
 
 expect(zone.valid).toBeTruthy();
});
it('4 : prenom valide avec 0 caractères', () => {

  let zone = component.problemeForm.controls['Prenom'];
  zone.setValue('a'.repeat(0));
 
 expect(zone.valid).toBeFalsy();
});
it('5 : prenom valide avec 10 espaces', () => {

  let zone = component.problemeForm.controls['Prenom'];
  zone.setValue(' '.repeat(10));
 
 expect(zone.valid).toBeTruthy();
});
it('6 : prenom valide avec 2 espaces et 1 caractères', () => {

  let zone = component.problemeForm.controls['Prenom'];
  zone.setValue('  a');
 
 expect(zone.valid).toBeTruthy();
});
});