import { Component, OnInit } from '@angular/core';
import { FactureService } from '../facture.service';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  providers: [FactureService]
})
export class FactureComponent implements OnInit {
  factures; 
  selectedfacture;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  commandes;

  constructor(
    private _facture : FactureService,
    private _commande : CommandeService
  ) { 
    
    this.getCommande();
    this.selectedfacture={
      id:-1,
      dateF:'',
      montantF:0,
      commande:''
    }
  }
  getCommande = ()=>{
     this._commande.getAllCommande().subscribe(
       data=>{
         this.commandes=data;
         console.log("this.commandes");
         console.log(this.commandes);
         this.getFacture(this.commandes);
       },
       error =>{
         console.log(error);
       }
     )
   }

   
  getOneCommande(id,commandes){
    for (let i = 0; i < commandes.length; i++) {
      const val = commandes[i];
      if (val.id==id) {
        return val;
      }
    }
  }


  modifierFacture(){
    this.updateMarque();
    this.formVisible=false;
  }
  creerFacture(){
    console.log(this.selectedfacture)
    this.creatFacture();
    this.formVisible=false;
  }
  showFormModifier(facture){
   this.labelDuForm='Modification de la facture ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.FactureSelected(facture);
   
  }
  showFormCreer(){
   this.labelDuForm='Ajout d\'une facture ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }

   getFacture = (commandes)=>{
     this._facture.getAllFacture().subscribe(
       data=>{
         this.factures=data;
         for (let i = 0; i < this.factures.length; i++) {
           this.factures[i].commande2= this.getOneCommande(this.factures[i].commande,commandes);
         }
         console.log("this.factures");
         console.log(this.factures);
       },
       error =>{
         console.log(error);
       }
     )
   }

   FactureSelected=(facture)=>{
     // console.log(movie.id);
      this._facture.getOneFacture(facture.id).subscribe(
        data=>{
          this.selectedfacture=data;
          console.log(this.selectedfacture);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
      this.selectedfacture=-1;
      this.formVisible=false;
    }
   updateMarque = ()=>{
     this._facture.updateFacture(this.selectedfacture).subscribe(
       data=>{
         this.getCommande();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatFacture = () =>{
     this._facture.createFacture(this.selectedfacture).subscribe(
       data=>{
        this.factures.push(data);
       },
       error =>{
         console.log(error);
       }
     );
   }
   supprimerFacture(facture){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deleteFacture(facture);
     }
     
   }
   deleteFacture(facture){
     this._facture.deleteFacture(facture.id).subscribe(
       data=>{
       this.getCommande();
       
       },
       error =>{
         console.log(error);
       }
     );
   }

  ngOnInit() {
  }

}
