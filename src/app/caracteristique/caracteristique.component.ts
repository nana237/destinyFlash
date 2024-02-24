import { Component, OnInit } from '@angular/core';
import { CaracteristiqueService } from '../caracteristique.service';
import { ArticleService } from '../article.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caracteristique',
  templateUrl: './caracteristique.component.html',
  styleUrls: ['./caracteristique.component.css'],
  providers: [CaracteristiqueService]
})
export class CaracteristiqueComponent implements OnInit {


  caracteristiques;
  selectedCaracteristique;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  formPhotovisibe=false;
  detailvisible=false;
  labelDuForm='';
  articles;
  listeCaractVisible=false;
  lblCaract="Afficher la liste des caracteristique";
  article;

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

  afficherListCaract(){
    if (this.listeCaractVisible) {
      this.listeCaractVisible=false;
      this.lblCaract="Afficher la liste des caracteristique";
    }else{
      this.listeCaractVisible=true;
      this.lblCaract="Fermer";
    }
    
  }

ajouterAuPanier(article){
  console.log("cool");
}
  onCouleurChanged(event: any){
    this.selectedCaracteristique.couleurCaract = event.target.value;
  }

  onphotoCaractChanged(event: any){
    this.selectedCaracteristique.photoCaract = event.target.files[0];
  }


  constructor(
    private _carcateristique: CaracteristiqueService,
    private _article: ArticleService,
    private http:HttpClient
  ) {
    this.getArticle();
    this.selectedCaracteristique={
      id:-1,
      couleurCaract:'',
      photoCaract:null,
      tailleCaract:0,
      autreDetailCaract:'',
      prixCaract:0,
      qteCaract:0,
      nbAchatCaract:0,
      article:''
    }
   }
        

   getArticle = ()=>{
    this._article.getAllArticle().subscribe(
      data=>{
        this.articles=data;
        console.log(this.articles);
        this.getCaract(this.articles);
      },
      error =>{
        console.log(error);
      }
    )
  }

  getCaract = (articles)=>{
    this._carcateristique.getAllCaracteristique().subscribe(
      data=>{
        this.caracteristiques=data;
        console.log("test test test");
        console.log(this.caracteristiques);
        for (let i = 0; i < this.caracteristiques.length; i++) {
          
          console.log("affichage de test 1");
          console.log(articles);

         
          this.caracteristiques[i].designationAr=this.getOneArticle(this.caracteristiques[i].article,articles);
          
          console.log("affichage de test");
          console.log("numero de l'articles" + i);
          console.log(this.caracteristiques[i].article);
        }
      },
      error =>{
        console.log(error);
      }
    )
  }

  getOneArticle(id,articles){
    console.log("article" + id);
    console.log(articles);
    for (let i = 0; i < articles.length; i++) {
      const val = articles[i];
      if (val.id==id) {
        return val.designationAr;
      }
    }
  }

  annulerModif(){
    this.formVisible=false;
  }

  showFormCreer(){
    this.getArticle();
    this.labelDuForm='Ajout d\'une catégorie ';
    this.formVisible=true;
    this.modifierVisible=false;
    this.annulerVisible = true;
    this.creerVisible = true;
    this.formPhotovisibe=false;
    this.idVisible = false;
   }

   showFormModifier(caracteristique){
    this.labelDuForm='Modification de la catégories ';
    this.formVisible=true;
    this.modifierVisible=true;
    this.annulerVisible = true;
    this.creerVisible = false;
    this.idVisible = false;
    this.formPhotovisibe=true;
    this.CaractSelected(caracteristique);
    
    console.log("Affichage d'article  hors subscribe");
    console.log(this.articles);
   }

   showDetail(caracteristique){
    this.detailvisible=true;
    this.selectedCaracteristique=caracteristique
    //this.CaractSelected(caracteristique);
    
   }
   fermerDetail(){
    this.detailvisible=false;
   }

   CaractSelected=(caracteristique)=>{
    // console.log(movie.id);
     this._carcateristique.getOneCaracteristique(caracteristique.id).subscribe(
       data=>{
         this.selectedCaracteristique=data;
         console.log(this.selectedCaracteristique);
       },
       error =>{
         console.log(error);
       }
     );
   }

   creerCaract(){
     
    this.creatCaract2(this.selectedCaracteristique);
    console.log(this.selectedCaracteristique);

   this.getArticle();

    //this.formVisible=false;
  }

  modifierCaract(){
    this.updateCaract2(this.selectedCaracteristique);
    console.log(this.selectedCaracteristique);
    this.getArticle();
  }

  creatCaract = () =>{
    this._carcateristique.createCaracteristique(this.selectedCaracteristique).subscribe(
      data=>{
       this.caracteristiques.push(data);
      },
      error =>{
        console.log(error);
      }
    );
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
        this.caracteristiques.push(data);
       },
       error =>{
         console.log(error);
       }
    );
  }

  updateCaract2(caracteristique){
    const uploadData = new FormData();

    uploadData.append('couleurCaract',caracteristique.couleurCaract);
    uploadData.append('photoCaract',caracteristique.photoCaract,caracteristique.photoCaract.name);
    uploadData.append('tailleCaract',caracteristique.tailleCaract);
    uploadData.append('autreDetailCaract',caracteristique.autreDetailCaract);
    uploadData.append('prixCaract',caracteristique.prixCaract);
    uploadData.append('qteCaract',caracteristique.qteCaract);
    uploadData.append('nbAchatCaract',caracteristique.nbAchatCaract);
    uploadData.append('article',caracteristique.article);

    this.http.put('http://127.0.0.1:8000/caracteristiques/'+ caracteristique.id +'/',uploadData ).subscribe(
      data=>{
        console.log(data);
        this.caracteristiques.push(data);
       },
       error =>{
         console.log(error);
       }
    );
  }

  supprimerCaract(caracteristique){
    if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
      this.deleteCaract(caracteristique);
    }
    
  }

  deleteCaract(caracteristique){
    this._carcateristique.deleteCaracteristique(caracteristique.id).subscribe(
      data=>{
      this.getArticle();
      },
      error =>{
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}
