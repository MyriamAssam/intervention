import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../Shared/longueur-minimum/longueur-minimum.component';
import { TypeService } from './type.service';
import { ITypeProbleme } from './type';

@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})

export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  types : ITypeProbleme[];
  errorMessage: String;
  constructor(private fb: FormBuilder, private typeproblemeService: TypeService) { }

  ngOnInit(){
    this.problemeForm = this.fb.group({
      Prenom : ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      typeProbleme : ['']
    });
    
    this.typeproblemeService.obtenirProbleme()
    .subscribe(typesProbleme => this.types = typesProbleme,
               error => this.errorMessage = <any>error);  
              }

 save() {
}
}
