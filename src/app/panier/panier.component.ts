import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { ClientService } from '../client.service';
import { DetailPAComponent } from '../detail-p-a/detail-p-a.component';
import { DetailPAService } from '../detail-p-a.service';
import { ArticleService } from '../article.service';
import { CaracteristiqueService } from '../caracteristique.service';
import { SeConnecterComponent } from '../se-connecter/se-connecter.component';
import { DetailCommandeService } from '../detail-commande.service';
import { CommandeService } from '../commande.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  providers: [PanierService,DatePipe,CommandeService,DetailCommandeService,CaracteristiqueService,DetailPAComponent,DetailPAService,SeConnecterComponent]
})
export class PanierComponent implements OnInit {

  paniers; 
  selectedpanier;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  clients;
  articles;
  currentArticle;
  details=[];
  selecteddetail;
  caracteristiques;
  sessionActuelle;
  panierActuelle;
  commande;
  boolDetails = false;
  listePanierVisible=false;
 
  total=0;
  lblListePanier="Afficher la liste des panier";

  afficherImage(Image){
    
    Swal.fire({
      title: 'Custom width, padding, background.',
      imageUrl: 'http://localhost:8000'+ Image,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      //width: 600,
     // padding: '3em',
      background: 'rgba(21, 22, 22, 0.1)',
      backdrop: `
        rgba(21, 22, 22, 0.9)
      `
    });
   /* 
   Swal.fire({
   // title: 'Sweet!',
   // text: 'Modal with a custom image.',
    imageUrl: 'http://localhost:8000'+ image,
   // imageWidth: 400,
   // imageHeight: 200,
    imageAlt: 'Custom image',
  })
*/
  }

  btnListePanier(){
    if(this.listePanierVisible){
      this.listePanierVisible=false;
      this.lblListePanier="Afficher la liste des panier";
    }else{
      this.listePanierVisible=true;
      this.lblListePanier="Fermer";
    }
  }


  show(message){
    Swal.fire({
     // position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  calculerTotal(details){
    this.total = 0;
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      this.total += detail.prix * detail.qte;
    }
  }
  
  onDimunuer(){
    if(this.selecteddetail.qte>0){
      this.selecteddetail.qte -= 1;
    }

  }

  onAugmenter(){
    this.selecteddetail.qte += 1;
  }

  defBoolDetails(){
    if (this.details.length==0) {
      this.boolDetails=false;
    }else{
      this.boolDetails=true;
    }
  }
  onCommander(detail){
    var details=[];
    details.push(detail);
    this.onToutCommander(details);
  }
  modelerCommande(){
    
    var commande = {
      id:-1,
      libCmd:'commande de ' + this.sessionActuelle.login,
      dateCmd:this._dataPipe.transform(Date.now(),"yyyy-MM-dd") ,
      statusCmd:'EA',
      descriptionCmd:'commande En Attente',
      montantLivraisonCmd:0,
      client:this.sessionActuelle.id,
      articles:[],
    //  caracteristiques:''
    }

    this.details.forEach(detail => {
      commande.articles.push(detail.selectedCaract.article);
    });
    return commande;
  }
  onToutCommander(details){

    console.log("cool nous somme entrer dans onToutCommander");
    this.commande=this.modelerCommande();
    console.log(this.commande);
    this.creatCommande(this.commande,details);
    this.show("Votre commande a été passé avec succes");
    

  }
  getLastCommande(details){
    console.log("cool nous somme entrer dans getLastCommande");
    this._commande.getAllCommande().subscribe(
      data => {
        console.log(data);
       if (data[0]!=undefined) {
        var val0 = data[0];
        for (let i = 0; i < data.length; i++) {
          const val = data[i];
          if (val.id>val0.id) {
            val0=val;
          }
        }
       }
       this.ajouterDetail(details,val0);
      },
      error => {console.log(error);}
    )
  }

  ajouterDetail(details,commande){
    console.log("cool nous somme entrer dans ajouterDetail");
    console.log(commande);

    details.forEach(detail => {
      var detailCom={
        commande:commande.id,
        article:detail.selectedCaract.article,
        qteCom:detail.qte,
        couleurCom:detail.couleur,
        tailleCom:detail.taille,
        prixCom:detail.prix,
        autreDetailCom:detail.autreDetail
      };

      this._detailCom.createDetailCom(detailCom).subscribe(
        data=>{console.log(data)},
        error=>{console.log(error)},
      )

      this.deleteDetail(detail);
    });
    this.getDetail_P_A(this.panierActuelle.id,this.caracteristiques);
  }

  creatCommande(commande,details){
    console.log("cool nous somme entrer dans creatCommande");
    this._commande.createCommande(commande).subscribe(
      data=>{
        console.log(data);
        commande=data;
        this.getLastCommande(details)
      },
      error=>{
        console.log(error);
      },
    )
  }

  oncolorSelected(couleur){
    this.selecteddetail.couleur=couleur;
  }

  getCaracteristique(articles,paniers){
    this._caracteristique.getAllCaracteristique().subscribe(
      data=>{
     //   console.log(data);
        this.caracteristiques=data;
        for (let i = 0; i < this.caracteristiques.length; i++) {
         
          this.caracteristiques[i].article2=this.getOneArticle(this.caracteristiques[i].article,articles);
      //  console.log("affichage de l'article " + i)
      //  console.log(this.caracteristiques[i].article);
      //  console.log(this.caracteristiques[i].article2);
          
        }
        console.log("this.sessionActuelle");
        console.log(this.sessionActuelle);
        this.panierActuelle=this.getPanierActuelle(this.sessionActuelle.id,paniers);
        this.getDetail_P_A(this.panierActuelle.id,this.caracteristiques);
      },
      error=>{
        console.log(error);
      }
    )
  }

 /****
  *  getOneClient(id){
    for (let i = 0; i < this.clients.length; i++) {
      const val = this.clients[i];
      if (val.id==id) {
        return val.nomC;
      }
    }
  }
  */

  

  /** *****************************************/
    getDetail_P_A(panier,caracteristiques){
      this._detail_P_A.getAllDetail().subscribe(
        data=>{
         // console.log("affichage des caracteristique dans get detail");
        //  console.log(caracteristiques);
        //  console.log("recuperation de tous les details et affichage");
       //   console.log(data);
       this.details=[];
          for (let i = 0; i < data.length; i++) {
            const val = data[i];
            
            if (val.panier==panier ) {
              this.details.push(val);
            }
      
          }
        //  console.log("recuperation reussi");
       //   console.log(this.details);
       //    console.log("recuperation des articles correspondant");

          /**
            this.details[1].caracteristique=this.getOnecaracteristique(this.details[1].article,caracteristiques);
          console.log("affichage suplementaire , iteration " + 1);
          this.details[1].selectedCaract= this.details[1].caracteristique[1];

          console.log("affichage de test");
          console.log(this.details[1].selectedCaract);
          console.log("affichage du detail " + 1);
          console.log(this.details[1]);
           
           this.details[0].caracteristique=this.getOnecaracteristique(this.details[0].article,caracteristiques);
           console.log("affichage suplementaire , iteration " + 0);
           this.details[0].selectedCaract= this.details[0].caracteristique[0];

           console.log("affichage de test");
           console.log(this.details[0].selectedCaract);
           console.log("affichage du detail " + 0);
           console.log(this.details[0]);
           */
            for (let i = 0; i < this.details.length; i++) {
            
            
            //this.details[i].article2=this.getOneArticle(this.details[i].article,articles);
            this.details[i].caracteristique=this.getOnecaracteristique(this.details[i].article,caracteristiques);

            console.log("affichage suplementaire , iteration " + i);
           // this.details[i].selectedCaract= this.details[i].caracteristique[0];
            this.details[i].selectedCaract=this.seletionerCaract(this.details[i]);
            this.details[i].prix=this.details[i].selectedCaract.prixCaract;
            console.log("affichage de test");
            console.log(this.details[i].selectedCaract);
            console.log("affichage du detail " + i);
            console.log(this.details[i]);
          }
           
         

          this.selecteddetail=this.details[0];
         // console.log("affichage de details[0] ");
        //  console.log(this.details[0]);
        //  console.log("affichage de selecteddetail ");
        //  console.log(this.selecteddetail);
          // this.getCaracteristique(articles);
          this.defBoolDetails();
          this.calculerTotal(this.details);
        },
        error=>{
          console.log(error);
        }
      );
    
  } 

  getOnecaracteristique(id,caracteristiques){
    var caracts =[];
    var trouver=false;
   // console.log("cool nous avons pu entrer dans le get one caracteristique");
    for (let i = 0; i < caracteristiques.length; i++) {

      const val = caracteristiques[i];
      if (val.article==id) {
       // console.log("affichage de la caracteristique dans get one caracteristique");
       // console.log(val);
        caracts.push(val);
        trouver=true;
        
      }
      
    }
    if (trouver) {
      return caracts;
    }else{
      console.log("erreur 404 aucun element trouvé");
      return caracts;
    }

  }


  getOneArticle(id,articles){
    for (let i = 0; i < articles.length; i++) {
      const val = articles[i];
      if (val.id==id) {
      //  console.log("affichage de l'article dans get one article")
      //  console.log(val);
        return val;
        
      }
    }
  }

  getArticle(paniers){
    this._articles.getAllArticle().subscribe(
      data=>{
        this.articles=data;
        
    //console.log("nous sommes dans le subscribe affichage des articles");
   // console.log(this.articles);
    this.getCaracteristique(this.articles,paniers);
      },
      error=>{
        console.log(error);
      }
    )
  }

/**
 * 
 *  for (let i = 0; i < this._detail_P_AComponent.details.length; i++) {
      const val = this._detail_P_AComponent.details[i];
      
      if (val.panier==panier ) {
        this.details.push(val);
      }

    }
 */

detailSelected(detail){
  this.selecteddetail=detail;
}

seletionerCaract(detail){
  if (detail.couleur=="standard") {
    detail.couleur=detail.caracteristique[0].couleurCaract;
  }
  for (let i = 0; i < detail.caracteristique.length; i++) {
    const val = detail.caracteristique[i];
    if (val.couleurCaract==detail.couleur) {
      console.log("selection de la photo");
      console.log(val);
      return val;
    }
  }
}

modifierChoixActuelle(detail){
  //const sauvegardeSelectedDetail = detail;
  this._detail_P_A.updateDetail(detail).subscribe(
    data =>{
      
      console.log(data);
      this.details=[];
      console.log(this.details)
      this.getPanier();
    },
    error=>{
      console.log(error);
    }
  );
 // this.selecteddetail = sauvegardeSelectedDetail;
}

supprimerDuPanier(detail){
  if (confirm("etes vous sur de vouloir retirer cet élément de votre panier ?")) {
    this.deleteFromCard(detail);
  }
}

deleteFromCard(detail){
 // console.log(detail.id);
 // console.log(detail);
  this._detail_P_A.deleteDetail(detail.id).subscribe(
    data=>{
      console.log(data);
      this.getPanier();
    },
    error=>{
      console.log(error);
    }
  )
}

  /***************************************** */ 



  constructor(
    private _panier:PanierService,
    private _client: ClientService,
    private _detail_P_AComponent: DetailPAComponent,
    private _detail_P_A: DetailPAService,
    private _articles: ArticleService,
    private _caracteristique:CaracteristiqueService,
    private _seConnecter : SeConnecterComponent,
    private _commande : CommandeService,
    private _detailCom : DetailCommandeService,
    private _dataPipe: DatePipe
  ) {
    console.log("affichage de la session");
    this.sessionActuelle=this._seConnecter.getSessionActuelle();
    console.log(this.sessionActuelle);
    this.getClient();
    this.getPanier();
   // this.getArticle(this.paniers);
   // console.log("nous sommes dans le constructor affichage des articles")
   // console.log(this.articles)
    //this.getDetail_P_A();
    //this.getDetail_P_A(14,this.articles);
    
    this.selectedpanier={
      id:-1,
      libPanier:'',
      client:'',
      articles: []
    }
   }
   getClient=()=>{
    this._client.getAllClient().subscribe(
      data=>{
        this.clients=data;
      },
      error =>{
        console.log(error);
      }
    )
   }
   modifierPanier(){
    this.updatePanier();
    this.formVisible=false;
  }
  creerPanier(){
    console.log(this.selectedpanier)
    this.creatPanier();
    this.formVisible=false;
  }
  showFormModifier(panier){
   this.labelDuForm='Modification du panier ';
   this.formVisible=true;
   this.modifierVisible=true;
   this.annulerVisible = true;
   this.creerVisible = false;
   this.idVisible = false;
   this.PanierSelected(panier);
   
  }
  showFormCreer(){
   this.labelDuForm='Ajout d\'un panier ';
   this.formVisible=true;
   this.modifierVisible=false;
   this.annulerVisible = true;
   this.creerVisible = true;
   this.idVisible = false;
  }

   getPanier = ()=>{
     this._panier.getAllPanier().subscribe(
       data=>{
         this.paniers=data;
         for (let i = 0; i < this.paniers.length; i++) {
         
          this.paniers[i].nomC=this.getOneClient(this.paniers[i].client);
          console.log(" affichage du client" + i);
        console.log(this.paniers[i].nomC)
        //console.log("affichage de la categories " + i)
        //console.log(this.sous_categories[i].categorie);
          
        }
        console.log("affichage des paniers")
        console.log(this.paniers)
        this.getArticle(this.paniers);
       },
       error =>{
         console.log(error);
       }
     )
   }

   getPanierActuelle(clientId,paniers){
  
      for (let i = 0; i < paniers.length; i++) {
        const val = paniers[i];
        if (clientId==val.client) { //test
          //if (client.id=val.client) {
            
          this.panierActuelle=val;
      //    console.log("affichage du panier");
     //     console.log(this.panier);
          break;
        }
      }
      return this.panierActuelle;
  
    }


   getOneClient(id){
     // console.log("recuperation de client");
    for (let i = 0; i < this.clients.length; i++) {
      const val = this.clients[i];
      if (val.id==id) {
        //console.log(" affichage du client");
        // console.log(val.nomC);
        return val.nomC;
      }
    }
  }

   PanierSelected=(panier)=>{
     // console.log(movie.id);
      this._panier.getOnePanier(panier.id).subscribe(
        data=>{
          this.selectedpanier=data;
        //  console.log(this.selectedpanier);
        },
        error =>{
          console.log(error);
        }
      );
    }

    annulerModif(){
      this.selectedpanier=-1;
      this.formVisible=false;
    }
   updatePanier = ()=>{
     this._panier.updatePanier(this.selectedpanier).subscribe(
       data=>{
         this.getPanier();
       },
       error =>{
         console.log(error);
       }
     )
   }

   creatPanier = () =>{
     this._panier.createPanier(this.selectedpanier).subscribe(
       data=>{
        this.paniers.push(data);
       },
       error =>{
         console.log(error);
       }
     );
   }

   RetirerDuPanier(detail){
    if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
      this.deleteDetail(detail);
    }
    
  }
  deleteDetail(detail){
    this._detail_P_A.deleteDetail(detail.id).subscribe(
      data=>{
        this.details=[];
      this.getPanier();
      
      },
      error =>{
        console.log(error);
      }
    );
  }

   supprimerPanier(panier){
     if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
       this.deletePanier(panier);
     }
     
   }
   deletePanier(panier){
     this._panier.deletePanier(panier.id).subscribe(
       data=>{
       this.getPanier();
       
       },
       error =>{
         console.log(error);
       }
     );
   }

  ngOnInit() {
  }

}
