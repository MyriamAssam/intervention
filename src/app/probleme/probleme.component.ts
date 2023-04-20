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
      type: ['']
    });
    
    
    this.typesprobleme.obtenirCategories()
    .subscribe(cat => this.categoriesProduits = cat,
               error => this.errorMessage = <any>error);  
              }
 save() {
}
}
