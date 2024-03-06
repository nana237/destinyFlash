import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ClientService } from '../client.service';
import { PanierService } from '../panier.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [ClientService,PanierService]
})
export class InscriptionComponent implements OnInit {

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
  panier;
  val0;
  verifierPassword='';
  bienRempli=true;


  constructor(
    private _router: Router,
    private _client: ClientService,
    private _panier: PanierService
    
  ) { 
    this.selectedclient={
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
      telC:'',
      loginC:'',
      motDePassC:''
    }

    /*
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
    */
  }

  ngOnInit() {
  }

  onSeconnecter(){
    this._router.navigate(['seConnecter']);
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
    
    try {
      this._panier.createPanier(this.panier).subscribe(
        data=>{
          console.log("panier creer avec succes");
          console.log(data);
          this.show("Votre inscription est effective");
          this._router.navigate(['accueil']);
        },
        error=>{
          console.log(error);
        this.showError("Une erreur inattendue est survenu ! veuillez contacter le service client pour une resolution rapide de ce probleme");

        }
      )
    } catch (error) {
      
    }

    
  }

  verifierDonnees(){
    this.bienRempli=true;

    //verification du remplisage des champs obligatoire
    if (this.selectedclient.sexeC == "" || this.selectedclient.nomC=="" || this.selectedclient.prenomC=="" || this.selectedclient.telC=="" || this.selectedclient.loginC == "" || this.selectedclient.motDePassC == "" || this.verifierPassword =="" ) {
      this.showError("Veuillez remplir tout les champs obligatoire !");
      this.bienRempli = false;
    }

    console.log(this.selectedclient.telC);
    console.log(typeof(this.selectedclient.telC));

 

   if(this.bienRempli){
     if ( this.selectedclient.motDePassC != this.verifierPassword ) {
       this.showError("les deux mots de passes doivent avoir la même valeur");
       this.bienRempli = false;
     }
   }

  }

  affecterValeurParDefaut(){
    if(this.selectedclient.dateNaissC ==""){
      this.selectedclient.dateNaissC = null;
    }

    
    if(this.selectedclient.adresseC ==""){
      this.selectedclient.adresseC = null;
    }

    
    if(this.selectedclient.villeC ==""){
      this.selectedclient.villeC = null;
    }

    if(this.selectedclient.quartierC ==""){
      this.selectedclient.quartierC = null;
    }

    if(this.selectedclient.emailC ==""){
      this.selectedclient.emailC = null;
    }

    if(this.selectedclient.numCNI_C ==""){
      this.selectedclient.numCNI_C = null;
    }


  }

  creerClient(){
    console.log(this.selectedclient);
    this.verifierDonnees();
    if(this.bienRempli){
      this.affecterValeurParDefaut();
      console.log(this.selectedclient);
    }

    if(this.bienRempli){
      try {
      this.creatClient();

      } catch (error) {
        this.showError(error);
       // this.showError("Une erreur inattendue est survenu ! veuillez contacter le service client pour une resolution rapide de ce probleme");
      }
    }

    console.log(this.selectedclient);
    //this.creatpanier();
    //this.creerpanier();
   // this.creerPanier(this.val0);
    
    //this.formVisible=false;
  }

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

   creatClient = () =>{
    try {
      this._client.createClient(this.selectedclient).subscribe(
        data=>{
        // this.getClient();
         this.selectedclient=data;
  
         this.creerPanier(this.selectedclient);
        },
        error =>{
          console.log(error);
        this.showError("Une erreur inattendue est survenu ! veuillez contacter le service client pour une resolution rapide de ce probleme");
      }
      );
    } catch (error) {
    this.showError("Une erreur inattendue est survenu ! veuillez contacter le service client pour une resolution rapide de ce probleme");
      
    }

    
  }

  show(message){
    Swal.fire({
    //  position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  showError(message){
    Swal.fire({
    //  position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000
    })
  }

  isNumeric(n){
    try {
      typeof(n);
    } catch (error) {
      
    }
  }

}
