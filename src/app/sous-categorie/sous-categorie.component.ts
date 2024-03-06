import { Component, OnInit } from '@angular/core';
import { SousCategorieService } from '../sous-categorie.service';
import { CategorieService } from '../categorie.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sous-categorie',
  templateUrl: './sous-categorie.component.html',
  styleUrls: ['./sous-categorie.component.css'],
  providers: [SousCategorieService]
})
export class SousCategorieComponent implements OnInit {

  sous_categories; 
  selectedCategorie;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  categories;

  constructor(
    private _sousCategorie:SousCategorieService,
    private _Categorie:CategorieService,
    private http:HttpClient
  ) {
      this.getCategorie();
      this.getSousCategorie();
    
      this.selectedCategorie={
        id:-1,
        libSCat:'',
        photoSCat:'',
        categorie:''
      }
   }

   onPhotoScatChanged(event: any){
    this.selectedCategorie.photoSCat = event.target.files[0];

   }

    modifierSousCategorie(){

     this.updateSousCategorie2(this.selectedCategorie);
     //this.updateSousCategorie();
     this.formVisible=false;
   }
   creerSousCategorie(){
    this.creatSoucategorie2(this.selectedCategorie);
    // this.creatSousCategorie();
     console.log(this.selectedCategorie);
    //  this.formVisible=false;
   }
   showFormModifier(sousCategorie){
    this.labelDuForm='Modification de la sous-catégorie ';
    this.formVisible=true;
    this.modifierVisible=true;
    this.annulerVisible = true;
    this.creerVisible = false;
    this.idVisible = false;
    this.sousCategorieSelected(sousCategorie);

    //test
    console.log("affichage des sous-categories en dehors du subscribe")
    console.log(this.sous_categories)
   }
   showFormCreer(){
    this.labelDuForm='Ajout d\'une sous-catégorie ';
    this.formVisible=true;
    this.modifierVisible=false;
    this.annulerVisible = true;
    this.creerVisible = true;
    this.idVisible = false;
    this.getCategorie();
   }
  
  /*********************************** */



   getSousCategorie = ()=>{
    this._sousCategorie.getAllSousCategorie().subscribe(
      data=>{
        this.sous_categories=data;
        for (let i = 0; i < this.sous_categories.length; i++) {
         
          this.sous_categories[i].libCat=this.getOneCategorie(this.sous_categories[i].categorie);
        //console.log("affichage de la categories " + i)
        //console.log(this.sous_categories[i].categorie);
          
        }
        console.log("affichage des sous-categories")
        console.log(this.sous_categories)
      },
      error =>{
        console.log(error);
      }
    )
  }

  getOneCategorie(id){
    for (let i = 0; i < this.categories.length; i++) {
      const val = this.categories[i];
      if (val.id==id) {
        return val.libCat;
      }
    }
  }
 

  sousCategorieSelected=(sous_categorie)=>{
    // console.log(movie.id);
     this._sousCategorie.getOneSousCategorie(sous_categorie.id).subscribe(
       data=>{
         this.selectedCategorie=data;
         console.log(this.selectedCategorie);
       },
       error =>{
         console.log(error);
       }
     );
   }

   annulerModif(){
    this.selectedCategorie=-1;
    this.formVisible=false;
  }


  updateSousCategorie2(sousCat){
    const uploadData = new FormData();
            
    uploadData.append('libSCat',sousCat.libSCat);
    uploadData.append('photoSCat',sousCat.photoSCat,sousCat.photoSCat.name);
    uploadData.append('categorie',sousCat.categorie);

    this.http.put('http://127.0.0.1:8000/sous_categories/'+ sousCat.id +'/',uploadData ).subscribe(
            data=>{
            console.log(data);
            this.getSousCategorie();
              //this.T_actuel_articles.push(data);
            },
            error =>{
              console.log(error);
            }
        );
  }

  updateSousCategorie = ()=>{
    this._sousCategorie.updateSousCategorie(this.selectedCategorie ).subscribe(
      data=>{
        this.getSousCategorie();
      },
      error =>{
        console.log(error);
      }
    )
  }


  creatSoucategorie2(sousCat){
    const uploadData = new FormData();
    
    uploadData.set('libSCat',sousCat.libSCat);
    uploadData.set('photoSCat',sousCat.photoSCat,sousCat.photoSCat.name);
    uploadData.set('categorie',sousCat.categorie);

    console.log(uploadData);

    this.http.post('http://127.0.0.1:8000/sous_categories/',uploadData ).subscribe(
          data=>{
            console.log(data);
            this.sous_categories.push(data);
            this.getSousCategorie();
          },
          error =>{
            console.log(error);
          }
        );

  }

  creatSousCategorie = () =>{
    this._sousCategorie.createSousCategorie(this.selectedCategorie).subscribe(
      data=>{
       this.sous_categories.push(data);
      },
      error =>{
        console.log(error);
      }
    );
  }
  
  deleteSousCategorie(sous_categorie){
    this._sousCategorie.deleteSousCategorie(sous_categorie.id).subscribe(
      data=>{
      this.getSousCategorie();
      
      },
      error =>{
        console.log(error);
      }
    );
  }
  supprimerSousCategorie(sous_categorie){
    if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
      this.deleteSousCategorie(sous_categorie);
    }
    
  }


  getCategorie = () =>{
    this._Categorie.getAllCategorie().subscribe(
      data=>{
        this.categories=data;
       console.log(this.categories);
      },
      error=>{
        console.log(error);
      }
    )
  }

  ngOnInit() {
  }

}
