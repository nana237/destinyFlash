import { Component, OnInit } from '@angular/core';
import { LivreurService } from '../livreur.service';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css'],
  providers: [LivreurService]
})
export class LivreurComponent implements OnInit {

  livreurs;
  selectedlivreur;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';


  constructor(
    private _livreur:LivreurService
    ) { 
      this.getLivreur();

      this.selectedlivreur={
        id:-1,
        nomL:'coolLivreur ',
        prenomL: 'cool',
        dateNaissL:'2012-12-12',
        emailL:'fdgds@coolyahoo.com',
        sexeL:'M',
        adresseL:'sdfa',
        villeL:'sdfgds',
        quartierL:'asdfa',
        numCNI_L:'hjk ',
        telL:987456321,
        loginL:'ghjk',
        motDePassL:'vghj'
      }

    }

    modifierLivreur(){
      this.updateLivreur();
      this.formVisible=false;
    }
    

    
    creerLivreur(){
      console.log(this.selectedlivreur)
      this.creatLivreur();
      console.log(this.selectedlivreur);
      //this.creatpanier();
      //this.creerpanier();
     // this.creerPanier(this.val0);
      
      this.formVisible=false;
    }
    showFormModifier(livreur){
      //console.log("afficage de val0");
      //console.log(this.val0);
     this.labelDuForm='Modification du livreur ';
     this.formVisible=true;
     this.modifierVisible=true;
     this.annulerVisible = true;
     this.creerVisible = false;
     this.idVisible = false;
     this.LivreurSelected(livreur);
     
    }
    showFormCreer(){
     this.labelDuForm='Ajout d\'une marque ';
     this.formVisible=true;
     this.modifierVisible=false;
     this.annulerVisible = true;
     this.creerVisible = true;
     this.idVisible = false;
    }
  
     getLivreur = ()=>{
       console.log("mama");
      this._livreur.getAllLivreur().subscribe(
         data=>{
           this.livreurs=data;
           console.log(this.livreurs);
         },
         error =>{
           console.log(error);
         }
       )
     }
  
  
     LivreurSelected=(livreur)=>{
       // console.log(movie.id);
        this._livreur.getOneLivreur(livreur.id).subscribe(
          data=>{
            this.selectedlivreur=data;
            console.log(this.selectedlivreur);
          },
          error =>{
            console.log(error);
          }
        );
      }
  
      annulerModif(){
      //  this.selectedlivreur=-1;
        this.formVisible=false;
      }
     updateLivreur = ()=>{
       this._livreur.updateLivreur(this.selectedlivreur).subscribe(
         data=>{
           this.getLivreur();
         },
         error =>{
           console.log(error);
         }
       )
     }
  
     creatLivreur = () =>{
       this._livreur.createLivreur(this.selectedlivreur).subscribe(
         data=>{
          this.getLivreur();
  
         },
         error =>{
           console.log(error);
         }
       );
     }
     supprimerLivreur(livreur){
       if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
         this.deleteLivreur(livreur);
       }
       
     }
     deleteLivreur(livreur){
       this._livreur.deleteLivreur(livreur.id).subscribe(
         data=>{
         this.getLivreur();
         
         },
         error =>{
           console.log(error);
         }
       );
     }

  ngOnInit() {
  }

}
