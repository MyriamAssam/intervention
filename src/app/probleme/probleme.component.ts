import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../Shared/longueur-minimum/longueur-minimum.component';
import { ICategorie } from './categorie';
import { CategorieService } from './categorie.service';
import { emailMatcherValidator } from '../Shared/email-matcher/email-matcher.component';

function seulementEspaces(c: AbstractControl): {[key: string]: boolean} | null  {
    let control = c.get('prenom');
  
   
  
       // messy but you get the idea
       let isWhitespace = (control.value || '').trim().length === 0;
       let isValid = !isWhitespace;
       return isValid ? null : { 'espaces': true }
  }
  
   
  
  @Component({
    selector: 'app-probleme',
    templateUrl: './probleme.component.html',
    styleUrls: ['./probleme.component.css']
  })
 

export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  categoriesProduits: ICategorie[];
  errorMessage: string;
  
  messageSauvegarde: string;
  constructor(private fb: FormBuilder, private typesprobleme: CategorieService) { }

  ngOnInit(){
    this.problemeForm = this.fb.group({
      prenom:['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      noTypeProbleme: ['', Validators.required], 
     courrielGroup: this.fb.group({
    courriel: [{value: '', disabled: true}],
    courrielConfirmation: [{value: '', disabled: true}],
   
  }),
  //}, { validator: emailMatcherValidator.courrielConfirmation() }),
telephone: [{value: '', disabled: true}],
nom : ['', Validators.required], 
notification: ['pasnotification'],
noUnite: [''],
descriptionProbleme: [''],
dateProbleme: [{value: Date(), disabled: true}],
});
   //},  { validator: seulementEspaces });    

           this.typesprobleme.obtenirCategories()
           .subscribe(cat => this.categoriesProduits = cat,
                      error => this.errorMessage = <any>error); 
   
           this.problemeForm.get('notification').valueChanges
           .subscribe(value => this.gestionNotifications(value));
   
  } // ngOnInit

 


    gestionNotifications(notifyVia: string): void {
      const courrielGroupControl = this.problemeForm.get('courrielGroup');
      const courrielControl = this.problemeForm.get('courrielGroup.courriel');
      const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');    
      const telephoneControl = this.problemeForm.get('telephone');  
  const nomControl = this.problemeForm.get('nom');      
  
   
  
      // Tous remettre à zéro (plus simple)
      courrielControl.clearValidators();
      courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
      courrielControl.disable();  
      courrielConfirmationControl.clearValidators();
      courrielConfirmationControl.reset();    
      courrielConfirmationControl.disable();
      telephoneControl.clearValidators();
      telephoneControl.reset(); // Pour enlever les messages d'erreur dûs à dirty, etc.. 
      telephoneControl.disable();
  
   
  
      if (notifyVia === 'courriel') {
          courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])])
          courrielControl.setValidators([Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
          courrielConfirmationControl.setValidators([Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
          courrielControl.enable();       
          courrielConfirmationControl.enable(); 
      } else {
      if (notifyVia === 'messageTexte') {
        telephoneControl.setValidators([Validators.required, Validators.minLength(10),  Validators.maxLength(10), Validators.pattern('[0-9]+')]);  
        telephoneControl.enable();  
      }   
      courrielControl.updateValueAndValidity();
      courrielConfirmationControl.updateValueAndValidity();   
      telephoneControl.updateValueAndValidity();      
  }
  }
  
   
  
  save(): void {
      /*if (this.problemeForm.dirty && this.problemeForm.valid) {
          // Copy the form values over the product object values
          // Transfert les valeurs du formulaire vers l'object. 
          // Les champs qui ne changent pas restent comme les valeurs originales (comme Id)
          //let prob = Object.assign({}, this.problemeForm.value, this.probleme); 
          // Affecter les valeurs qui peuvent l'être
           this.categoriesProduits = this.problemeForm.value;
           // Affecter les valeurs qui proviennent du fg le plus interne.
           this.categoriesProduits.courriel =  this.problemeForm.get('courrielGroup.courriel').value;
           this.categoriesProduits.courrielConfirmation =  this.problemeForm.get('courrielGroup.courrielConfirmation').value;
           // La date n'est pas transférer, affecter une date
           this.categoriesProduits.dateProbleme = new Date();       
          this.typesprobleme.saveProbleme(this.categoriesProduits)
              .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                  () => this.onSaveComplete(),  // Fonction callback
                  (error: any) => this.errorMessage = <any>error
              );
      } else if (!this.problemeForm.dirty) {
          this.onSaveComplete();*/
      }
    
   }
          
  
  
  