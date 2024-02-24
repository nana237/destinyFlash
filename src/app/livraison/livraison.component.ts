import { Component, OnInit } from '@angular/core';
import { LivraisonService } from '../livraison.service';
import { ClientService } from '../client.service';
import { LivreurService } from '../livreur.service';
import { PointDeRetraitService } from '../point-de-retrait.service';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css'],
  providers: [LivraisonService, ClientService , LivreurService, CommandeService]
})
export class LivraisonComponent implements OnInit {

  livraisons; 
  selectedlivraison;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  clients;
  livreurs;
  point_de_retraits;
  commandes;

  constructor(
    private _livraison : LivraisonService,
    private _client : ClientService ,
    private _livreur : LivreurService,
    private _point_de_retrait : PointDeRetraitService,
    private _commande : CommandeService,
  ) {

   
    this.getCommande();
    
    this.selectedlivraison={
      id:-1,
      libeleL:'',
      dateL:'',
      descriptionL:'',
      montantL:0,
      typeL:'',
      client:'',
      point_de_retrait:'',
      livreur:'',
      commande:''
    }
  }


  getCommande = ()=>{
    this._commande.getAllCommande().subscribe(
      data=>{
        this.commandes=data;
        console.log("this.commandes");
        console.log(this.commandes);
        this.getPoint_de_retrait(this.commandes);
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

  getPoint_de_retrait = (commandes)=>{
    this._point_de_retrait.getAllPointDeRetrait().subscribe(
      data=>{
        this.point_de_retraits=data;
        console.log("this.point_de_retraits");
        console.log(this.point_de_retraits);
        this.getLivreur(commandes,this.point_de_retraits)
      },
      error =>{
        console.log(error);
      }
    )
  }
  getOnePoint_de_retrait(id,point_de_retraits){
    for (let i = 0; i < point_de_retraits.length; i++) {
      const val = point_de_retraits[i];
      if (val.id==id) {
        return val;
      }
    }
  }

  getLivreur = (commandes,point_de_retraits)=>{
    this._livreur.getAllLivreur().subscribe(
      data=>{
        this.livreurs=data;
        console.log("this.livreurs");
        console.log(this.livreurs);
        this.getClient(commandes,point_de_retraits,this.livreurs);
      },
      error =>{
        console.log(error);
      }
    )
    }
  getOneLivreur(id,livreurs){
    for (let i = 0; i < livreurs.length; i++) {
      const val = livreurs[i];
      if (val.id==id) {
        return val;
      }
    }
  }

  getClient = (commandes,point_de_retraits,livreurs)=>{
    this._client.getAllClient().subscribe(
      data=>{
        this.clients=data;
        console.log("this.clients");
        console.log(this.clients);
        this.getLivraison(commandes,point_de_retraits,livreurs,this.clients)
      },
      error =>{
        console.log(error);
      }
    )
  }
  getOneClient(id,clients){
    for (let i = 0; i < clients.length; i++) {
      const val = clients[i];
      if (val.id==id) {
        return val;
      }
    }
  }


  modifierLivraison(){
    this.updateLivraison();
    this.formVisible=false;
  }

  creerLivraison(){
    console.log(this.selectedlivraison)
    this.creatLivraison();
    this.formVisible=false;
  }
  showFormModifier(marque){
   this.labelDuForm='Modification de la livraison ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.LivraisonSelected(marque);
   
  }
  showFormCreer(){
   this.labelDuForm='Ajout d\'une livraison ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }

   getLivraison = (commandes,point_de_retraits,livreurs,clients)=>{
     this._livraison.getAllLivraison().subscribe(
       data=>{
         this.livraisons=data;
         for (let i = 0; i < data.length; i++) {
           const livraison = data[i];
           livraison.client2= this.getOneClient(livraison.client,clients);
           livraison.point_de_retrait2=this.getOnePoint_de_retrait(livraison.point_de_retrait,point_de_retraits);
           livraison.livreur2=this.getOneLivreur(livraison.livreur,livreurs);
           livraison.commande2=this.getOneCommande(livraison.commande,commandes)
         }
         console.log("this.livraisons");
         console.log(this.livraisons);
       },
       error =>{
         console.log(error);
       }
     )
   }

   

   LivraisonSelected=(livraison)=>{
     // console.log(movie.id);
      this._livraison.getOneLivraison(livraison.id).subscribe(
        data=>{
          this.selectedlivraison=data;
          console.log(this.selectedlivraison);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
      this.selectedlivraison=-1;
      this.formVisible=false;
    }
   updateLivraison = ()=>{
     this._livraison.updateLivraison(this.selectedlivraison).subscribe(
       data=>{
         this.getCommande();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatLivraison = () =>{
     this._livraison.createLivraison(this.selectedlivraison).subscribe(
       data=>{
        this.livraisons.push(data);
       },
       error =>{
         console.log(error);
       }
     );
   }
   supprimerLivraison(livraison){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deleteLivraison(livraison);
     }
     
   }
   deleteLivraison(livraison){
     this._livraison.deleteLivraison(livraison.id).subscribe(
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
