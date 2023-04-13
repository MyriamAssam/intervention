
import { AbstractControl, ReactiveFormsModule, ValidatorFn } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
describe('longueurMinimum', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [ReactiveFormsModule]
        })
        .compileComponents();
    

      });

        
    it('Une chaine avec 10 espaces est invalide', () => {
      
        let control = { value: ' '.repeat(10) }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
            let result= validatorFn(control as AbstractControl);
            expect(result['nbreCaracteresInsuffisant']).toBeTrue();
          })
    
});

      it('une chaîne vide est invalide', () => {
        let control = { value: '' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
it('une phrase avec des mots est valide', () => {
        let control = { value: 'Je suis valide' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result == null);
      });
    
     
    
      it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value: '   Je suis valide   ' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result == null);
      });
     
    
    
      it('une phrase avec 1 espace et 2 caractère est invalide', () => {
        let control = { value: ' xx' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });  
    
     
    
      it('une phrase avec 2 espaces et 1 caractère est invalide', () => {
        let control = { value: '  x' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });  
    
     
    
      it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        let control = { value: '   J\'aime Angular' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result == null);
      });   
    
      it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let control = { value: '     J\'aime Angular     ' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result == null);
      });
    
