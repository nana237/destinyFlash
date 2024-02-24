import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { PanierService } from '../panier.service';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClientService,MatDatepicker]
})
export class ClientComponent implements OnInit {

  clients=[{
    id:-1,
    nomC:'',
    prenomC: '',
    dateNaissC:'',
    emailC:'',
    sexeC:'',
    adresseC:'',
    villeC:'',
    quartierC:'',
    numCNI_C:'',
    telC:0,
    loginC:'',
    motDePassC:''
  }]; 
  selectedclient;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  panier;
  val0;

  constructor(
    private _client: ClientService,
    private _panier: PanierService
  ) { 
    this.getClient();
    // this.getlastClient()
    //console.log("afficage de val0");
    //console.log(this.val0);
   

    this.selectedclient={
      id:-1,
      nomC:'cool ',
      prenomC: 'cool',
      dateNaissC:'2012-12-12',
      emailC:'fdgds@yahoo.com',
      sexeC:'M',
      adresseC:'sdfa',
      villeC:'sdfgds',
      quartierC:'asdfa',
      numCNI_C:'hjk ',
      telC:987456321,
      loginC:'ghjk',
      motDePassC:'vghj'
    }
  }



  modifierClient(){
    this.updateClient();
    this.formVisible=false;
  }
  
  creerPanier(client){
    console.log("nous sommes dans créer panier. nous affichons le client actuelle");
    console.log(client);
    this.panier={
      id:-1,
      libPanier:'panier de ' + client.nomC,
      client:client.id,
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
  
  creerClient(){
    console.log(this.selectedclient)
    this.creatClient();
    console.log(this.selectedclient);
    //this.creatpanier();
    //this.creerpanier();
   // this.creerPanier(this.val0);
    
    this.formVisible=false;
  }
  showFormModifier(client){
    //console.log("afficage de val0");
    //console.log(this.val0);
   this.labelDuForm='Modification du client ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.ClientSelected(client);
   
  }
  showFormCreer(){
   this.labelDuForm='Ajout d\'une marque ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }

   getClient = ()=>{
     this._client.getAllClient().subscribe(
       data=>{
         this.clients=data;
         //console.log(this.clients[1]);
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

     this._client.getAllClient().subscribe(
      data=>{
        
        console.log("recuperaiton des clients");
        this.clients=data;
        console.log(this.clients);
        console.log("affichage du nombre de client");
        console.log(this.clients.length);
        this.val0=this.clients[0]
        for (let i = 1; i < this.clients.length; i++) {
          const val = this.clients[i];
          if (val.id>this.val0.id) {
            this.val0=val;
          }
        }
        
        console.log("affichage du dernier client ");
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

   ClientSelected=(marque)=>{
     // console.log(movie.id);
      this._client.getOneClient(marque.id).subscribe(
        data=>{
          this.selectedclient=data;
          console.log(this.selectedclient);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
    //  this.selectedclient=-1;
      this.formVisible=false;
    }
   updateClient = ()=>{
     this._client.updateClient(this.selectedclient).subscribe(
       data=>{
         this.getClient();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatClient = () =>{
     this._client.createClient(this.selectedclient).subscribe(
       data=>{
        this.getClient();
        this.selectedclient=data;

        this.creerPanier(this.selectedclient);
       },
       error =>{
         console.log(error);
       }
     );
   }
   supprimerClient(client){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deleteClient(client);
     }
     
   }
   deleteClient(client){
     this._client.deleteClient(client.id).subscribe(
       data=>{
       this.getClient();
       
       },
       error =>{
         console.log(error);
       }
     );
   }

  ngOnInit() {
  }

}
