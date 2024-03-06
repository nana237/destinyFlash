import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { SousCategorieService } from '../sous-categorie.service';
import { MarqueService } from '../marque.service';
import { HttpClient } from '@angular/common/http';
import { PanierService } from '../panier.service';
import { PanierComponent } from '../panier/panier.component';
import { SeConnecterComponent } from '../se-connecter/se-connecter.component';
import { AppComponent } from '../app.component';
import { DetailPAComponent } from '../detail-p-a/detail-p-a.component';
import { DetailPAService } from '../detail-p-a.service';
import { CaracteristiqueService } from '../caracteristique.service';
import Swal from 'sweetalert2';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { PointDeRetraitComponent } from '../point-de-retrait/point-de-retrait.component';
import { InscriptionComponent } from '../inscription/inscription.component';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [PointDeRetraitComponent,ArticleService,CaracteristiqueService,PanierComponent,SeConnecterComponent,AppComponent,DetailPAComponent]
})
export class ArticleComponent implements OnInit {
  T_actuel_articles;
  T_articles_initial;
  selectedArticle;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  formPhotovisibe=false;
  detailvisible=false;
  labelDuForm='';
  sous_categories;
  sous_categories5;
  marques;
  defaultfEvent:any;
  panier;
  paniers;
  clientActuelle;
  detail;
  listArticleVisible = false;
  lblArticle = "Afficher la liste des articles";
  caracteristiques;
  sessionActuelle;
  filterVisible=false;
  searchVisible=false;
  btnFilterVisible1=true;
  btnFilterVisible2=false;
  btnSearchVisible1=true;
  btnSearchVisible2=false;
  caracteristique;
  txtSearch="";
  lbl_aucunArticle="";
  lbl_aucunArticleVisible=false;
  estConnecter = false;
  /**************************************************************** */
  /**************** code magique
   subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
   */

  afficherImage(image){
    
    Swal.fire({
      //title: 'Custom width, padding, background.',
      imageUrl: 'http://localhost:8000'+ image,
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

   essais(){
     const dialogConfig = new MatDialogConfig;
     //dialogConfig.disableClose = true;
     dialogConfig.autoFocus=true;
     dialogConfig.width="60%";
     this.dialog.open(SeConnecterComponent,dialogConfig);
    // this.dialog.open()
   }

   ouvrirSeConnecter(){
    const dialogConfig = new MatDialogConfig;
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(SeConnecterComponent,dialogConfig);
   // this.dialog.open()
  }

  recuperer_n_sousCategorie(sous_categories){
    const n = 5;
    this.sous_categories5=[];
    for (let i = 0; i < this.sous_categories.length; i++) {
      const val = this.sous_categories[i];
      this.sous_categories5.push(val);
      if (i>=(n-1)) {
        break;
      }
    }
    this.getMarque(sous_categories);
  }
TrierParSous_categorie(sous_categorie){
  this.T_actuel_articles=this.T_articles_initial;
  var T=[];
  for (let i = 0; i < this.T_actuel_articles.length; i++) {
    const val = this.T_actuel_articles[i];
    if (val.sous_categorie == sous_categorie.id) {
      T.push(val);
    }
  }
  this.T_actuel_articles=T;
}
  onTxtSearchChanged(event: any){
  this.txtSearch=event.target.value;
   console.log(this.txtSearch);
  }

  chercherArticle(){
    this.txtSearch=this.txtSearch.replace(new RegExp(/[éèêë]/g),"e");
    this.txtSearch=this.txtSearch.toUpperCase();
   // var l="dnsèéà èé àä";
  //  l=l.normalize();
   // this.show(l);
 // l.replace(new RegExp(/[éèêë]/g),"e");
    var T=[];
    //this.show(this.txtSearch);
    for (let i = 0; i < this.T_articles_initial.length; i++) {
      const val = this.T_articles_initial[i];
      
      
      if (val.designationAr.toUpperCase().indexOf(this.txtSearch)>=0) {
      //  this.show(val.designationAr.toUpperCase());
        T.push(val);

      }
    }
    if(T.length==0){
      this.lbl_aucunArticleVisible=true;
      this.lbl_aucunArticle="Aucun élément ne correspond à votre recherche \n Veuiller verifier l'orthographe puis reéssayez !"
    }else{
      this.lbl_aucunArticleVisible=false;
      this.lbl_aucunArticle="";
    }
    this.T_actuel_articles=T;
  }

  TrierArticlePrixSuperieurA(val){
    this.T_actuel_articles=this.T_articles_initial
    var T=[];
    for (let i = 0; i < this.T_actuel_articles.length-1; i++) {
      const article_i = this.T_actuel_articles[i];
      if (val<article_i.prixAr) {
        T.push(article_i);
      }
    }
    this.T_actuel_articles=T;
  }

  TrierArticleIntervalPrix(min,max){
    this.T_actuel_articles=this.T_articles_initial
    var T=[];
    for (let i = 0; i < this.T_actuel_articles.length-1; i++) {
      const article_i = this.T_actuel_articles[i];
      if (min<=article_i.prixAr && article_i.prixAr<=max) {
        T.push(article_i);
      }
    }
    this.T_actuel_articles=T;
  }

  TrierArticleAlphabetique(){
    this.T_actuel_articles=this.T_articles_initial
    for (let i = 0; i < this.T_actuel_articles.length-1; i++) {
      //const article_i = this.T_actuel_articles[i];
      for (let j = i+1; j < this.T_actuel_articles.length; j++) {
        //const article_j = this.T_actuel_articles[j];
        if (this.T_actuel_articles[i].designationAr>this.T_actuel_articles[j].designationAr) {
          //permutation
          var c = this.T_actuel_articles[i]
          this.T_actuel_articles[i]=this.T_actuel_articles[j];
          this.T_actuel_articles[j]=c;
          
        }
      }
    }
  }

  
  TrierArticleNbreAchat(){
    this.T_actuel_articles=this.T_articles_initial
    for (let i = 0; i < this.T_actuel_articles.length-1; i++) {
      //const article_i = this.T_actuel_articles[i];
      for (let j = i+1; j < this.T_actuel_articles.length; j++) {
        //const article_j = this.T_actuel_articles[j];
        if (this.T_actuel_articles[i].nbAchatAr<this.T_actuel_articles[j].nbAchatAr) {
          //permutation
          var c = this.T_actuel_articles[i]
          this.T_actuel_articles[i]=this.T_actuel_articles[j];
          this.T_actuel_articles[j]=c;
          
        }
      }
    }
  }

   TrierArticlePrixCroissant(){
    this.T_actuel_articles=this.T_articles_initial
    for (let i = 0; i < this.T_actuel_articles.length-1; i++) {
       //const article_i = this.T_actuel_articles[i];
       for (let j = i+1; j < this.T_actuel_articles.length; j++) {
         //const article_j = this.T_actuel_articles[j];
         if (this.T_actuel_articles[i].prixAr>this.T_actuel_articles[j].prixAr) {
           //permutation
           var c = this.T_actuel_articles[i]
           this.T_actuel_articles[i]=this.T_actuel_articles[j];
           this.T_actuel_articles[j]=c;
           
         }
       }
     }
   }

   TrierArticlePrixDecroissant(){
    this.T_actuel_articles=this.T_articles_initial
    for (let i = 0; i < this.T_actuel_articles.length-1; i++) {
      //const article_i = this.T_actuel_articles[i];
      for (let j = i+1; j < this.T_actuel_articles.length; j++) {
        //const article_j = this.T_actuel_articles[j];
        if (this.T_actuel_articles[i].prixAr<this.T_actuel_articles[j].prixAr) {
          //permutation
          var c = this.T_actuel_articles[i]
          this.T_actuel_articles[i]=this.T_actuel_articles[j];
          this.T_actuel_articles[j]=c;
          
        }
      }
    }
  }

  creerCaracteristique(article){
    this.caracteristique={
      id:-1,
      couleurCaract:'standart',
      photoCaract:article.photoAr,
      tailleCaract:0,
      autreDetailCaract:'',
      prixCaract:article.prixAr,
      qteCaract:article.qteAr,
      nbAchatCaract:0,
      article:article.id
    }
    this.creatCaract2(this.caracteristique);
  }


  getLastArticle(article){
    console.log("cool nous somme entrer dans getLastArticle");
    this._article.getAllArticle().subscribe(
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
       article.id=val0.id;
       this.creerCaracteristique(article);

      },
      error => {console.log(error);}
    )
  }


  creatCaract2(caracteristique){
    const uploadData = new FormData();
    
    uploadData.set('couleurCaract',caracteristique.couleurCaract);
    uploadData.set('photoCaract',caracteristique.photoCaract,caracteristique.photoCaract.name);
    uploadData.set('tailleCaract',caracteristique.tailleCaract);
    uploadData.set('autreDetailCaract',caracteristique.autreDetailCaract);
    uploadData.set('prixCaract',caracteristique.prixCaract);
    uploadData.set('qteCaract',caracteristique.qteCaract);
    uploadData.set('nbAchatCaract',caracteristique.nbAchatCaract);
    uploadData.set('article',caracteristique.article);
    this.http.post('http://127.0.0.1:8000/caracteristiques/',uploadData ).subscribe(
      data=>{
        console.log(data);
       // this.caracteristiques.push(data);
    this.getArticle(this.marques,this.sous_categories);

       },
       error =>{
         console.log(error);
       }
    );
  }

  showListArticle(){
    if (this.listArticleVisible) {
      this.listArticleVisible=false;
      this.lblArticle="Afficher la liste des articles";
    }else{
      this.listArticleVisible=true;
      this.lblArticle="Fermer";
    }
    
  }


  onShowSearch(){
    console.log("meckde 1");
    if(this.searchVisible){
      this.filterVisible=false;
      this.searchVisible=false;
      this.btnFilterVisible1=true;
      this.btnFilterVisible2=false;
      this.btnSearchVisible1=true;
      this.btnSearchVisible2=false;
    }else{
      this.filterVisible=false;
      this.searchVisible=true;
      this.btnFilterVisible1=true;
      this.btnFilterVisible2=false;
      this.btnSearchVisible1=false;
      this.btnSearchVisible2=true;
    }
  }

  onShowFilter(){
    console.log("meckde 2");
    if(this.filterVisible){
      this.filterVisible=false;
      this.searchVisible=false;
      this.btnFilterVisible1=true;
      this.btnFilterVisible2=false;
      this.btnSearchVisible1=true;
      this.btnSearchVisible2=false;
    }else{
      this.filterVisible=true;
      this.searchVisible=false;
      this.btnFilterVisible1=false;
      this.btnFilterVisible2=true;
      this.btnSearchVisible1=true;
      this.btnSearchVisible2=false;
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

  getCaracteristique(articles){
    this._caracteristique.getAllCaracteristique().subscribe(
      data=>{
        console.log(data);
        this.caracteristiques=data;
        for (let i = 0; i < this.caracteristiques.length; i++) {
         
          this.caracteristiques[i].articles2=this.getOneArticle(this.caracteristiques[i].client,articles);
        console.log("affichage de la caracteristique " + i)
        console.log(this.caracteristiques[i].categorie);
          
        }
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

  getOneArticle(id,articles){
    for (let i = 0; i < articles.length; i++) {
      const val = articles[i];
      if (val.id==id) {
        return val;
      }
    }
  }


/**************************************************** */
  ajouterAuPanier(article){
  //  this.clientActuelle=35; //test et à suprrimer
  if(this.estConnecter){

  
    console.log("this.clientActuelle.id");
    console.log(this.clientActuelle.id);
    this.panier=this.getPanier(this.clientActuelle.id);
    console.log("affichage du panier actuelle");
    console.log(this.panier);
    console.log("affichage de l'article ");
    console.log(article);
    this.detail={
      id:-1,
        panier:this.panier.id,
        article:article.id,
        qte:1,
        prix:article.prixAr,
        couleur:"standard"
    }
    console.log("affichage d'un element important" + this.detail.article);

    this.creatDetail(this.detail);
  }else{
    this.ouvrirSeConnecter();
  }
   /**
    * this.panier.articles.push(article.id)
    *  this._panier.updatePanier(this.panier).subscribe(
      data =>{
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    )
    */
  }

  getClientActuelle(session){
    if (session) {
    //  console.log("il y a bien un client");
      this.clientActuelle = session
   //   console.log("le voici :")
   //   console.log(this.clientActuelle)
      
    }else{
  //    console.log("yémalé aucun client a l'horizon");
  //    console.log(session);
      
    }
  }

  getPanier(client){
  //  console.log("affichage de l'id du client");
  //  console.log(client);

   /*
    this._panier.getAllPanier().subscribe(
      data =>{
        
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const val = data[i];
          console.log(this.panier);
          if (client=val.client) { //test
            //if (client.id=val.client) {
              
            this.panier=val;
            console.log("affichage du panier");
            console.log(this.panier);
            break;
          }
        }
      },
      error =>{
        console.log(error);
      }
    )
   */

    for (let i = 0; i < this._panierComponent.paniers.length; i++) {
      const val = this._panierComponent.paniers[i];
      if (client==val.client) { //test
        //if (client.id=val.client) {
          
        this.panier=val;
    //    console.log("affichage du panier");
   //     console.log(this.panier);
        break;
      }
    }
    return this.panier;

  }

  getDetail_P_A(article,panier){
    for (let i = 0; i < this._detail_P_AComponent.details.length; i++) {
      const val = this._detail_P_AComponent.details[i];
      
      if (val.panier==panier && val.article==article) {
        this.detail=val;
      }

    }
  }


  creatDetail=(detail)=>{
    console.log("detail");
    console.log(detail);
    this._detail.createDetail(detail).subscribe(
      data=>{
    //    console.log(data);
    this.show("Cet article a été ajouté au panier !");
      },
      error =>{
        
     //   console.log("une erreur s'est produite, affichage du detail");
    //    console.log(detail);
    //    console.log(error);
      }
    )
  }
  /****************************** */
  onDesignationChanged(event: any){
    this.selectedArticle.designationAr = event.target.value;
  }

  onPhotoArChanged(event: any){
    this.selectedArticle.photoAr = event.target.files[0];
  }

  constructor(
    private _article:ArticleService,
    private _sousCategorie:SousCategorieService,
    private _marque: MarqueService,
    private http: HttpClient,
    private _panier: PanierService,
    private _panierComponent : PanierComponent,
    private _seConnecterComponent:  SeConnecterComponent,
    private _appComponent: AppComponent,
    private _detail_P_AComponent:DetailPAComponent,
    private _detail : DetailPAService,
    private _caracteristique: CaracteristiqueService,
    private dialog : MatDialog
    
  ) {

    console.log("donc c'est meme entré hien ... pourquoi ca n'affiche pas alors ?");
   this.getSousCategorie();
   // this.getMarque(this.sous_categories);
    //this.getArticle(this.marques,this.sous_categories);
    this.sessionActuelle= _seConnecterComponent.getSessionActuelle();
    this.getClientActuelle(this.sessionActuelle);
    console.log("affichage du client actuelle");
    this.clientActuelle=this.sessionActuelle;
    if (this.clientActuelle.etat == "desactivé") {
      this.estConnecter = false;
    } else {
      this.estConnecter = true;
    }
    
    this.selectedArticle={
      id:-1,
      designationAr:'',
      photoAr:null,
      prixAr:0,
      qteAr:0,
      StockSecuriteAr :0,
      VideoPubAr:'',
      nbAchatAr:0,
      sous_categorie:'',
      marque :''
    }

    this.detail={
      id:-1,
        panier:'',
        article:'',
        qte:0
    }


   }

   getSousCategorie = ()=>{
    this._sousCategorie.getAllSousCategorie().subscribe(
      data=>{
        this.sous_categories=data;
        console.log(this.sous_categories);
        this.recuperer_n_sousCategorie(this.sous_categories);
      },
      error =>{
        console.log(error);
      }
    )
  }

   getMarque = (sous_categories)=>{
    this._marque.getAllMarque().subscribe(
      data=>{
        this.marques=data;
        console.log(this.marques);
        this.getArticle(this.marques,sous_categories);

      },
      error =>{
        console.log(error);
      }
    )
  }

  getArticle = (marques,sous_categories)=>{
    // this._article.getArticleNom("casque de vision 3D").subscribe(
      this._article.getAllArticle().subscribe(
      data=>{
        this.T_actuel_articles=data;
        for (let i = 0; i < this.T_actuel_articles.length; i++) {
          
   //       console.log("affichage de test 1");
   //       console.log(marques);
  //        console.log("affichage de test 2");
 //         console.log(sous_categories);

         
          this.T_actuel_articles[i].libMarq=this.getOneMarque(this.T_actuel_articles[i].marque,marques);
          this.T_actuel_articles[i].libSCat=this.getOneSousCategorie(this.T_actuel_articles[i].sous_categorie,sous_categories);
          
   //       console.log("affichage de test");
   //       console.log("numero de la sous_categories" + i);
   //       console.log(this.articles[i].sous_categorie);
   //       console.log("numero de la marque" + i);
   //       console.log(this.articles[i].marque);
        }
        this.T_articles_initial=this.T_actuel_articles;
      },
      error =>{
        console.log(error);
      }
    )
  }

  getOneSousCategorie(id,sous_categories){
  //  console.log("sous_categories" + id);
 //   console.log(sous_categories);
    for (let i = 0; i < sous_categories.length; i++) {
      const val = sous_categories[i];
      if (val.id==id) {
        return val.libSCat;
      }
    }
  }

/**
 * 
   getOneSousCategorie(id){
    for (let i = 0; i < this.sous_categories.length; i++) {
      const val = this.sous_categories[i];
      if (val.id==id) {
        return val.libSCat;
      }
    }
  }
 */

  getOneMarque(id,marques){
    for (let i = 0; i < marques.length; i++) {
      const val = marques[i];
      if (val.id==id) {
        return val.libMarq;
      }
    }
  }





  annulerArticle(){
    this.formVisible=false;
  }

  showFormCreer(){
    this.getSousCategorie();
    this.getMarque(this.sous_categories);
    this.labelDuForm='Ajout d\'un article ';
    this.formVisible=true;
    this.modifierVisible=false;
    this.annulerVisible = true;
    this.creerVisible = true;
    this.formPhotovisibe=false;
    this.idVisible = false;
   }

   showFormModifier(article){
     this.getPanier(2);
    this.labelDuForm='Modification de l\'article ';
    this.formVisible=true;
    this.modifierVisible=true;
    this.annulerVisible = true;
    this.creerVisible = false;
    this.idVisible = false;
    this.formPhotovisibe=true;
    this.ArticleSelected(article);
    
    console.log("Affichage de marque et categorie hors subscribe");
    console.log(this.marques);
    console.log(this.sous_categories);
   }
   showDetail(article){
    this.detailvisible=true;
    this.selectedArticle=article;
    //this.ArticleSelected(article);
    
   }
   fermerDetail(){
    this.detailvisible=false;
   }

  ArticleSelected=(article)=>{
    // console.log(movie.id);
     this._article.getOneArticle(article.id).subscribe(
       data=>{
         this.selectedArticle=data;
         console.log(this.selectedArticle);
       },
       error =>{
         console.log(error);
       }
     );
   }

   creerArticle(){
     
     this.creatArticle2(this.selectedArticle);
  //   console.log(this.selectedArticle);

    // this.getArticle(this.marques,this.sous_categories);

     //this.formVisible=false;
   }

   modifierArticle(){
     this.updateArticle2(this.selectedArticle);
 //    console.log(this.selectedArticle);
     this.getArticle(this.marques,this.sous_categories);
   }

  creatArticle = () =>{
    this._article.createArticle(this.selectedArticle).subscribe(
      data=>{
       this.T_actuel_articles.push(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  creatArticle2(article){
    const uploadData = new FormData();
    
    uploadData.set('designationAr',article.designationAr);
    uploadData.set('photoAr',article.photoAr,article.photoAr.name);
    uploadData.set('prixAr',article.prixAr);
    uploadData.set('qteAr',article.qteAr);
    uploadData.set('StockSecuriteAr',article.StockSecuriteAr);
    uploadData.set('VideoPubAr',article.VideoPubAr);
    uploadData.set('nbAchatAr',article.nbAchatAr);
    uploadData.set('sous_categorie',article.sous_categorie);
    uploadData.set('marque',article.marque);
    this.http.post('http://127.0.0.1:8000/articles/',uploadData ).subscribe(
      data=>{
   //     console.log(data);
        this.T_actuel_articles.push(data);
        this.getLastArticle(article);
       },
       error =>{
         console.log(error);
       }
    );
  }

  updateArticle2(article){
    const uploadData = new FormData();
    uploadData.append('designationAr',article.designationAr);
    uploadData.append('photoAr',article.photoAr,article.photoAr.name);
    //uploadData.append('photoAr',article.photoAr.name);
    uploadData.append('prixAr',article.prixAr);
    uploadData.append('qteAr',article.qteAr);
    uploadData.append('StockSecuriteAr',article.StockSecuriteAr);
    uploadData.append('VideoPubAr',article.VideoPubAr);
    uploadData.append('nbAchatAr',article.nbAchatAr);
    uploadData.append('sous_categorie',article.sous_categorie);
    uploadData.append('marque',article.marque);
    this.http.put('http://127.0.0.1:8000/articles/'+ article.id +'/',uploadData ).subscribe(
      data=>{
    //    console.log(data);
        this.T_actuel_articles.push(data);
       },
       error =>{
         console.log(error);
       }
    );
  }

  supprimerMarque(artilce){
    if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
      this.deleteMarque(artilce);
    }
    
  }

  deleteMarque(artilce){
    this._article.deleteArticle(artilce.id).subscribe(
      data=>{
      this.getArticle(this.marques,this.sous_categories);
      },
      error =>{
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}
