import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../Shared/longueur-minimum/longueur-minimum.component';
import { ICategorie } from './categorie';
import { CategorieService } from './categorie.service';
import { emailMatcherValidator } from '../Shared/email-matcher/email-matcher.component';

@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})

export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  categoriesProduits: ICategorie[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typesprobleme: CategorieService) { }

  ngOnInit(){
    this.problemeForm = this.fb.group({
      prenom:['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      type: [''],
      noTypeProbleme: ['', Validators.required], 
     courrielGroup: this.fb.group({
    courriel: [{value: '', disabled: true}],
    courrielConfirmation: [{value: '', disabled: true}],
  }),
telephone: [{value: '', disabled: true}],
      
    });
    
    
    this.typesprobleme.obtenirCategories()
    .subscribe(cat => this.categoriesProduits = cat,
               error => this.errorMessage = <any>error);  
              }
              gestionNotifications(typeCueillette: string): void {
                const CourrielControl = this.problemeForm.get('courrielGroup.courriel');
                const ConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
                const CourrielGroupControl = this.problemeForm.get('courrielGroup');      
                const TelephoneControl = this.problemeForm.get('telephone');
                CourrielControl.clearValidators();
                CourrielControl.reset();  
                CourrielControl.disable();  
            
                ConfirmationControl.clearValidators();
                ConfirmationControl.reset();    
                ConfirmationControl.disable();
            
                if (typeCueillette === 'Telephone') {   
                  CourrielControl.setValidators([Validators.required]);      
                  CourrielControl.enable();  
                  ConfirmationControl.setValidators([Validators.required]);              
                  ConfirmationControl.enable();  
                                            
                  }   
                  else
                  {
                    if(typeCueillette === 'Adresse courriel')
                    {
                      CourrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
                      CourrielControl.enable();
                      ConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
                      ConfirmationControl.enable();
                      CourrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
                    }
                  }
                  CourrielControl.updateValueAndValidity();   
                  ConfirmationControl.updateValueAndValidity();     
                  CourrielGroupControl.updateValueAndValidity();    
              }
                   
 save() {
}
}
