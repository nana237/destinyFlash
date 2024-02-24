import { Component, OnInit } from '@angular/core';
import { MarqueService } from '../marque.service';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css'],
  providers: [MarqueService]
})
export class MarqueComponent implements OnInit {

  marques; 
  selectedmarque;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';

  constructor(
    private _marque:MarqueService
  ) {
    this.getMarque();
    this.selectedmarque={
      id:-1,
      libMarq:'',
      photoMarq:''
    }
   }


   modifierMarque(){
    this.updateMarque();
    this.formVisible=false;
  }
  creerMarque(){
    console.log(this.selectedmarque)
    this.creatMarque();
    this.formVisible=false;
  }
  showFormModifier(marque){
   this.labelDuForm='Modification de la marque ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.MarqueSelected(marque);
   
  }
  showFormCreer(){
   this.labelDuForm='Ajout d\'une marque ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }

   getMarque = ()=>{
     this._marque.getAllMarque().subscribe(
       data=>{
         this.marques=data;
       },
       error =>{
         console.log(error);
       }
     )
   }

   MarqueSelected=(marque)=>{
     // console.log(movie.id);
      this._marque.getOneMarque(marque.id).subscribe(
        data=>{
          this.selectedmarque=data;
          console.log(this.selectedmarque);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
      this.selectedmarque=-1;
      this.formVisible=false;
    }
   updateMarque = ()=>{
     this._marque.updateMarque(this.selectedmarque).subscribe(
       data=>{
         this.getMarque();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatMarque = () =>{
     this._marque.createMarque(this.selectedmarque).subscribe(
       data=>{
        this.marques.push(data);
       },
       error =>{
         console.log(error);
       }
     );
   }
   supprimerMarque(marque){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deleteMarque(marque);
     }
     
   }
   deleteMarque(marque){
     this._marque.deleteMarque(marque.id).subscribe(
       data=>{
       this.getMarque();
       
       },
       error =>{
         console.log(error);
       }
     );
   }

  ngOnInit() {
  }

}
