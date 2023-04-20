import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../Shared/longueur-minimum/longueur-minimum.component';
import { ICategorie } from './categorie';
import { CategorieService } from './categorie.service';

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
                const dateCommandeControl = this.problemeForm.get('courrielGroup.courriel');
                const dateExpeditionControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
                const datesGroupControl = this.problemeForm.get('courrielGroup');      
            
                dateCommandeControl.clearValidators();
                dateCommandeControl.reset();  
                dateCommandeControl.disable();  
            
                dateExpeditionControl.clearValidators();
                dateExpeditionControl.reset();    
                dateExpeditionControl.disable();
            
                if (typeCueillette === 'Telephone') {   
                        dateCommandeControl.setValidators([Validators.required]);      
                        dateCommandeControl.enable();  
                        dateExpeditionControl.setValidators([Validators.required]);              
                        dateExpeditionControl.enable();  
                                            
                  }   
                  else
                  {
                    if(typeCueillette === 'Adresse courriel')
                    {
                      dateCommandeControl.setValidators([Validators.required]);      
                      dateCommandeControl.disable();           
                    }
                  }
                dateCommandeControl.updateValueAndValidity();   
                dateExpeditionControl.updateValueAndValidity();         
              }
                   
 save() {
}
}
