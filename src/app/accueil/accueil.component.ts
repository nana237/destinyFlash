import { Component, OnInit } from '@angular/core';
import { Article } from '../../LesClasses/Article';
import { Categorie } from '../../LesClasses/Categorie';
import { SousCategorie } from '../../LesClasses/SousCategorie';
import { StoreService } from '../store.service';
 import Swal from 'sweetalert2';
// import { SlickCarouselComponent } from 'ngx-slick-carousel';
import {Router} from '@angular/router';


import { ArticleService } from '../article.service';
import { SousCategorieService } from '../sous-categorie.service';
import { MarqueService } from '../marque.service';
import { DetailPAService } from '../detail-p-a.service';
// import { PanierComponent } from '../panier/panier.component';
import { DetailPAComponent } from '../detail-p-a/detail-p-a.component';
import { PanierService } from '../panier.service';
import { SeConnecterComponent } from '../se-connecter/se-connecter.component';
import { CategorieService } from '../categorie.service';

/*
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
*/

/*
import { main } from '../design/js/main';
import { perfect } from '../design/vendor/perfect-scrollbar/perfect-scrollbar.min';
import { sweetalert } from '../design/vendor/sweetalert/sweetalert.min.js';
import { isotope } from '../design/vendor/isotope/isotope.pkgd.min.js';
import { magnific } from '../design/vendor/MagnificPopup/jquery.magnific-popup.min.js';
import { parallax100 } from '../design/vendor/parallax100/parallax100.js';
import { slick } from '../design/js/slick-custom.js';
import { slick2 } from '../design/vendor/slick/slick.min.js';
//import { daterangepicker } from '../design/vendor/daterangepicker/daterangepicker.js';
//  import { moment_min } from '../design/vendor/daterangepicker/moment.min.js';
import { select2 } from '../design/vendor/select2/select2.min.js';
import { bootstrap } from '../design/vendor/bootstrap/js/bootstrap.min.js';
import { popper } from '../design/vendor/bootstrap/js/popper.js';
import { animsition } from '../design/vendor/animsition/js/animsition.min.js';
import { jquery } from '../design/vendor/jquery/jquery-3.2.1.min.js';
*/

declare var jQuery: any;
/*
declare var main:any;
declare var perfect:any;
declare var sweetalert:any;
declare var isotope:any;
declare var magnific:any;
declare var parallax100:any;
declare var slick:any;
declare var daterangepicker:any;
declare var moment:any;
declare var select2:any;
declare var bootstrap:any;
declare var popper:any;
declare var animsition:any;
declare var jquery:any;
// declare var moment : any;

*/



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers:  [CategorieService,SeConnecterComponent,PanierService,DetailPAComponent,DetailPAService,StoreService,MarqueService,SousCategorieService,
    //SlickCarouselComponent,
/*   main,
    perfect,
    sweetalert,
    isotope,
    magnific,
    parallax100,
    slick,
    slick2,
//    daterangepicker, 
//    moment_min,
    select2,
    bootstrap,
    popper,
    animsition,
    jquery */
  ],
  /*
  animations: [
    // animation triggers go here
    trigger,
  state,
  style,
  animate,
  transition,
  ]
  */

})
export class AccueilComponent implements OnInit {



  T_actuel_articles;
  T_articles_initial;
  selectedArticle;
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
  sous_categories;
  sous_categoriesM=[]; // les sous catégories du moment
  sous_categories5;
  marques;
  clientActuelle;
  panier;
  detail;
  paniers;
  categories;

  onOuvrirScat(scat){
    // this._router.navigate(['sous_categorie']);
    this._router.navigate(['article']);
  }

  remplirSousCategorie(sous_categories){
    this.sous_categories = sous_categories
    
    console.log("this.sous_categories");
    console.log(this.sous_categories);
    for (let i = 0; i < this.sous_categories.length; i++) {
      //  const val = this.sous_categories[i];
      this.sous_categories[i].articles=[];
        for (let j = 0; j < this.T_articles_initial.length; j++) {
          const val2 = this.T_articles_initial[j];
          if (val2.sous_categorie == this.sous_categories[i].id) {
            this.sous_categories[i].articles.push(val2);
          }
        }
    }

    var a : string;

    

    for (let i = 0; i < 10; i++) {
      console.log("miakde");
      console.log(i);
      console.log(this.sous_categories[i]);
      console.log(this.sous_categories[i].photoSCat);
      console.log(typeof(this.sous_categories[i].photoSCat));
      console.log(typeof(this.sous_categories[i].photoSCat)!="undefined");
      
      if (i<this.sous_categories.length && this.sous_categories[i].photoSCat!=null ) {
        if(this.sous_categories[i].photoSCat.indexOf("/") >=0){
          this.sous_categoriesM.push(this.sous_categories[i]);

        }
      }else{
        if(i>=this.sous_categories.lengt){
          break;
        }
      }
      
    }
    
    console.log("this.sous_categories");
    console.log(this.sous_categories);
    
   // this.recuperer_n_sousCategorie(this.sous_categories);
  }

  getAllCategorie(){
    this._categorie.getAllCategorie().subscribe(
      data =>{
        this.categories=data;
       // this.categories= this.remplirSousCategorie(this.categories);
        console.log("this.categories");
        console.log(this.categories);
      },
      error =>{
        console.log(error);
      }
    );
  }

  ajouterAuPanier2(article){
    this.getAllpanier(article);
    console.log("heo je suis la ! le code passe meme ici ?");
  }

  getAllpanier(article){
    this._panier.getAllPanier().subscribe(
      data=>{
        this.paniers = data;
        
        this.ajouterAuPanier(article,this.paniers);
      },
      error=>{
        console.log("error");
      }
    )
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

    getOneMarque(id,marques){
      for (let i = 0; i < marques.length; i++) {
        const val = marques[i];
        if (val.id==id) {
          return val.libMarq;
        }
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

  getSousCategorie = ()=>{
    this._sousCategorie.getAllSousCategorie().subscribe(
      data=>{
        this.sous_categories=data;
        console.log(this.sous_categories);
       // this.remplirSousCategorie(this.sous_categories)
        this.recuperer_n_sousCategorie(this.sous_categories);
      },
      error =>{
        console.log(error);
      }
    )
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
        console.log(this.T_actuel_articles);

        this.remplirSousCategorie(sous_categories)
      },
      error =>{
        console.log(error);
      }
    )
  }


  allerAuPanier(){
    console.log("cool ca marche");
    this._router.navigateByUrl("/panier");
    
  }



/*

  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }


*/














 // _Article:Article[];
  movies = [
    {title: 'titanic'},
    {title:'avatar'}
  ];
  selectedMovie;
  //title;
  //desc;
  //year;

 _Article=[
  {
    idA:1,
    designationA:"seche cheveux de luxe",
    qteA:5,
    stockSecuriteA:2,
    descriptionA:"",
    videoPub:"",
    photoA:"assets/img/images/51fvhOSIKfL._AC_UL200_SR200,200_.jpg",
    idPanier:1,
    idMarq:1,
    idSC:1
  },
  {
    idA:2,
    designationA:"mineral oil",
    qteA:7,
    stockSecuriteA:4,
    descriptionA:"",
    videoPub:"",
    photoA:"assets/img/images/41QkyztlhSL._AC_US200_.jpg",
    idPanier:1,
    idMarq:1,
    idSC:1
  },
  {
    idA:3,
    designationA:"super bafle",
    qteA:10,
    stockSecuriteA:4,
    descriptionA:"",
    videoPub:"",
    photoA:"assets/img/images/31HGFpFLFuL._AC_UL180_SR296,180_.jpg",
    idPanier:1,
    idMarq:1,
    idSC:1
  },
  {
    idA:4,
    designationA:"lunette de soleil",
    qteA:8,
    stockSecuriteA:5,
    descriptionA:"",
    videoPub:"",
    photoA:"assets/img/images/31KMWUyGddL._AC_UL180_SR296,180_.jpg",
    idPanier:1,
    idMarq:1,
    idSC:1
  },
  {
    idA:5,
    designationA:"lunette de soleil",
    qteA:15,
    stockSecuriteA:5,
    descriptionA:"",
    videoPub:"",
    photoA:"assets/img/images/31KMWUyGddL._AC_UL180_SR296,180_.jpg",
    idPanier:1,
    idMarq:1,
    idSC:1
  },
  {
    idA:6,
    designationA:"vernis à ongle",
    qteA:15,
    stockSecuriteA:5,
    descriptionA:"",
    videoPub:"",
    photoA:"assets/img/images/31Oodlv-rHL._AC_SY400_.jpg",
    idPanier:1,
    idMarq:1,
    idSC:1
  }
];

_Categorie=[
  {
    idC:1,
    libC:"chossure",
    photoC:"cool.jpg"
  }
];

_SousCategorie=[
    {
    idSC:1,
    libSC:"SmartPhone",
    photoSC:"assets/img/sousCategorie/71PjE-V6sWL._AC_SX368_.jpg",
    idC:1
  }
];
  
  constructor(
    private _sousCategorie:SousCategorieService,
    private _marque: MarqueService,
    private _article:ArticleService,
    private store:StoreService,
    private _detail : DetailPAService,
    private _categorie: CategorieService,
 //   private _panierComponent : PanierComponent,
    private _detail_P_AComponent:DetailPAComponent,
    private _panier : PanierService,
    private _seconnecterComponent : SeConnecterComponent,
    private _router : Router
   // _Article:Article[],
   // _Categorie:Categorie[],
   // _SousCategorie:SousCategorie[]
   /*
 private  main:main,
 private  perfect:perfect,
 private  sweetalert:sweetalert,
 private  isotope:isotope,
 private  magnific:magnific,
 private  parallax100:parallax100,
 private  slick:slick,
 private  slick2:slick2,
 // private //    daterangepicker, 
 // private //    moment_min,
 private  select2:select2,
 private  bootstrap:bootstrap,
 private  popper:popper,
 private  animsition:animsition,
 private  jquery:jquery */
    ){
      
    this.clientActuelle = this._seconnecterComponent.getSessionActuelle();
    console.log(this.clientActuelle.type);
      this.getAllCategorie();
      this.getSousCategorie(); 
          // jQuery.swal("bonjour");
      this.getMovies();
      this.selectedMovie = {id: -1, title: '', desc: '', year: 0};

  
    }

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

    Subscribe(){
      console.log("veuilon voir");
      /*
      Swal({
        title:"Destiny Flash",
        text:"Subscription reussite",
        type:"success"
      });
      */
     // Swal.fire('Hey user!', 'I like you.', 'success');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'suscription reussite',
        showConfirmButton: false,
        timer: 1500
      })
    }
    getMovies = ()=>{
      this.store.getAllMovies().subscribe(
        data=>{
          this.movies=data;
        },
        error => {
          console.log(error);
        }
      )
    }
  
    movieClicked=(movie)=>{
     // console.log(movie.id);
      this.store.getOneMovie(movie.id).subscribe(
        data=>{
          //console.log(data);
         /* this.title=data.title;
          this.desc=data.desc;
          this.year=data.year; */
          this.selectedMovie=data;
        },
        error =>{
          console.log(error);
        }
      );
    }

    updateMovie = () =>{
      this.store.updateMovie(this.selectedMovie).subscribe(
        data=>{
         
          this.getMovies();
        },
        error =>{
          console.log(error);
        }
      );
    }

    createMovie = () =>{
      this.store.createMovie(this.selectedMovie).subscribe(
        data=>{
         this.movies.push(data);
        },
        error =>{
          console.log(error);
        }
      );
    }

    deleteMovie = () =>{
      this.store.deleteMovie(this.selectedMovie.id).subscribe(
        data=>{
        this.getMovies();
        
        },
        error =>{
          console.log(error);
        }
      );
    }
    

    ajouterAuPanier(article,paniers){
      //  this.clientActuelle=35; //test et à suprrimer
        console.log("this.clientActuelle.id");
        console.log(this.clientActuelle);
        console.log(this.clientActuelle.id);
       this.panier=this.getPanier(this.clientActuelle.id,paniers);
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

      
  getPanier(client,paniers){
 
  
      for (let i = 0; i < paniers.length; i++) {
        const val = this.paniers[i];
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


  ngOnInit() {
    (function ($) {
      $(document).ready(function(){
        console.log("Hello from jQuery!");
     jQuery.swal("Destiny Flash", "souscription reussite !", "success");

      });
    })(jQuery);







   /*
     $(".js-select2").each(function(){

      $(this).select2({
        minimumResultsForSearch: 20,
        dropdownParent: $(this).next('.dropDownSelect2')
      });
    })
    $('.parallax100').parallax100();
    $('.gallery-lb').each(function() { // the containers for all your galleries
      $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true
        },
        mainClass: 'mfp-fade'
      });
    });
    $('.js-addwish-b2').on('click', function(e){
      e.preventDefault();
    });
  
    $('.js-addwish-b2').each(function(){
      var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
      $(this).on('click', function(){
        swal(nameProduct, "is added to wishlist !", "success");
  
        $(this).addClass('js-addedwish-b2');
        $(this).off('click');
      });
    });
  
    $('.js-addwish-detail').each(function(){
      var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();
  
      $(this).on('click', function(){
        swal(nameProduct, "is added to wishlist !", "success");
  
        $(this).addClass('js-addedwish-detail');
        $(this).off('click');
      });
    });
  
    /*---------------------------------------------
  
    $('.js-addcart-detail').each(function(){
      var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
      $(this).on('click', function(){
        swal(nameProduct, "is added to cart !", "success");
      });
    });
  
    $('.js-pscroll').each(function(){
      $(this).css('position','relative');
      $(this).css('overflow','hidden');
      var ps = new PerfectScrollbar(this, {
        wheelSpeed: 1,
        scrollingThreshold: 1000,
        wheelPropagation: false,
      });
  
      $(window).on('resize', function(){
        ps.update();
      })
    });



   */


  }






}
