import { Component, OnInit } from '@angular/core';
import { PrestataireService } from '../prestataire.service';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-prestataire',
  templateUrl: './prestataire.component.html',
  styleUrls: ['./prestataire.component.css'],
  providers: [PrestataireService,PanierService]
})
export class PrestataireComponent implements OnInit {

  prestataires;
  selectedprestataire;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  panier;
  val0;


  constructor(
    private _prestataire : PrestataireService,
    private _panier: PanierService
  ) {
    
    this.getPrestataire();
   

    this.selectedprestataire={
      id:-1,
      nomP:'cool ',
      prenomP: 'cool',
      dateNaissP:'2012-12-12',
      emailP:'fdgds@yahoo.com',
      sexeP:'M',
      adresseP:'sdfa',
      villeP:'sdfgds',
      quartierP:'asdfa',
      numCNI_P:'hjk ',
      telP:987456321,
      loginP:'ghjk',
      motDePassP:'vghj'
    }
   }

   
  modifierPrestataire(){
    this.updatePrestataire();
    this.formVisible=false;
  }
  
  creerPanier(prestataire){
    console.log("nous sommes dans créer panier. nous affichons le client actuelle");
    console.log(prestataire);
    this.panier={
      id:-1,
      libPanier:'panier de ' + prestataire.nomC,
      client:prestataire.id,
      articles: []
    }
    console.log("création du panier");
    
    this._panier.createPanier(this.panier).subscribe(
      data=>{
        console.log("panier creer avec succes");
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  
  creerPrestataire(){
    console.log(this.selectedprestataire)
    this.creatPrestataire();
    console.log(this.selectedprestataire);
    //this.creatpanier();
    //this.creerpanier();
   // this.creerPanier(this.val0);
    
    this.formVisible=false;
  }
  showFormModifier(prestataire){
    //console.log("afficage de val0");
    //console.log(this.val0);
   this.labelDuForm='Modification du prestataire ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.PrestataireSelected(prestataire);
   
  }
  showFormCreer(){
   this.labelDuForm='Ajout d\'un prestataire ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }

   getPrestataire = ()=>{
     this._prestataire.getAllPrestataire().subscribe(
       data=>{
         this.prestataires=data;

         console.log(this.prestataires);
       },
       error =>{
         console.log(error);
       }
     )
   }

  // getlastClient = ()=>{
  creatpanier = ()=>{
    // this.getClient();
    // console.log("affichage du client");
    // console.log(this.clients[1]);

     this._prestataire.getAllPrestataire().subscribe(
      data=>{
        
        console.log("recuperaiton des prestataires");
        this.prestataires=data;
        console.log(this.prestataires);
        console.log("affichage du nombre de prestataires");
        console.log(this.prestataires.length);
        this.val0=this.prestataires[0]
        for (let i = 1; i < this.prestataires.length; i++) {
          const val = this.prestataires[i];
          if (val.id>this.val0.id) {
            this.val0=val;
          }
        }
        
        console.log("affichage du dernier prestataire ");
        console.log(this.val0);
        this.creerPanier(this.val0);

      },
      error =>{
        console.log(error);
      }
    )
/*
    console.log(this.val0);
    this.panier={
      id:-1,
      libPanier:'panier de ' + this.val0.nom,
      client:this.val0.id,
      articles: []
    }
    console.log("création du panier");
    
    this._panier.createPanier(this.panier).subscribe(
      data=>{
        console.log("panier creer avec succes");
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
*/
   }

   PrestataireSelected=(marque)=>{
     // console.log(movie.id);
      this._prestataire.getOnePrestataire(marque.id).subscribe(
        data=>{
          this.selectedprestataire=data;
          console.log(this.selectedprestataire);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
    //  this.selectedprestataire=-1;
      this.formVisible=false;
    }
   updatePrestataire = ()=>{
     this._prestataire.updatePrestataire(this.selectedprestataire).subscribe(
       data=>{
         this.getPrestataire();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatPrestataire = () =>{
     this._prestataire.createPrestataire(this.selectedprestataire).subscribe(
       data=>{
        this.getPrestataire();
        this.selectedprestataire=data;

       // this.creerPanier(this.selectedprestataire);
       },
       error =>{
         console.log(error);
       }
     );
   }

   supprimerPrestataire(prestataire){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deletePrestataire(prestataire);
     }
     
   }
   /************************************ je me suis arreter a delete client */
   deletePrestataire(prestataire){
     this._prestataire.deletePrestataire(prestataire.id).subscribe(
       data=>{
       this.getPrestataire();
       
       },
       error =>{
         console.log(error);
       }
     );
   }



  ngOnInit() {
  }

}
