import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categories; 
  selectedcategorie;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';

  constructor(
    private _categorie:CategorieService,
    private http:HttpClient
    ) { 
      this.getCategorie();

      this.selectedcategorie={
        id:-1,
        libCat:'',
        photoCat:''
      }

    }

    onPhotoCatChanged(event: any){
      this.selectedcategorie.photoCat = event.target.files[0];
    }

    modifierCategorie(){
      this.updateCategorie2(this.selectedcategorie);
      this.formVisible=false;
    }
    creerCategorie(){
      console.log(this.selectedcategorie)
      //this.creatCategorie();
      this.creatCategorie2(this.selectedcategorie);
      this.formVisible=false;
    }
    showFormModifier(categorie){
     this.labelDuForm='Modification de la catégorie ';
     this.formVisible=true;
     this.modifierVisible=true;
     this.annulerVisible = true;
     this.creerVisible = false;
     this.idVisible = false;
     this.CategorieSelected(categorie);
     
    }
    showFormCreer(){
     this.labelDuForm='Ajout d\'une catégorie ';
     this.formVisible=true;
     this.modifierVisible=false;
     this.annulerVisible = true;
     this.creerVisible = true;
     this.idVisible = false;
    }
  
     getCategorie = ()=>{
       this._categorie.getAllCategorie().subscribe(
         data=>{
           this.categories=data;
         },
         error =>{
           console.log(error);
         }
       )
     }
  
     CategorieSelected=(marque)=>{
       // console.log(movie.id);
        this._categorie.getOneCategorie(marque.id).subscribe(
          data=>{
            this.selectedcategorie=data;
            console.log(this.selectedcategorie);
          },
          error =>{
            console.log(error);
          }
        );
      }
  
      annulerModif(){
        this.selectedcategorie=-1;
        this.formVisible=false;
      }

      updateCategorie2(categorie){
        const uploadData = new FormData();
            
        uploadData.append('libCat',categorie.libCat);
        uploadData.append('photoCat',categorie.photoCat,categorie.photoCat.name);

        this.http.put('http://127.0.0.1:8000/categories/'+ categorie.id +'/',uploadData ).subscribe(
                data=>{
                console.log(data);
                this.getCategorie();
                  //this.T_actuel_articles.push(data);
                },
                error =>{
                  console.log(error);
                }
            );

      }

     updateCategorie = ()=>{
       this._categorie.updateCategorie(this.selectedcategorie).subscribe(
         data=>{
           this.getCategorie();
         },
         error =>{
           console.log(error);
         }
       )
     }
  
     creatCategorie2(categorie){
      const uploadData = new FormData();

      uploadData.set('libCat',categorie.libCat);
      uploadData.set('photoCat',categorie.photoCat,categorie.photoCat.name);
      console.log(uploadData);
      this.http.post('http://127.0.0.1:8000/categories/',uploadData ).subscribe(
          data=>{
            console.log(data);
            this.categories.push(data);
            this.getCategorie();
          },
          error =>{
            console.log(error);
          }
        );
     }

     creatCategorie = () =>{
       this._categorie.createCategorie(this.selectedcategorie).subscribe(
         data=>{
          this.categories.push(data);
         },
         error =>{
           console.log(error);
         }
       );
     }
     supprimerCategorie(categorie){
       if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
         this.deleteCategorie(categorie);
       }
       
     }
     deleteCategorie(categorie){
       this._categorie.deleteCategorie(categorie.id).subscribe(
         data=>{
         this.getCategorie();
         
         },
         error =>{
           console.log(error);
         }
       );
     }


  ngOnInit() {
  }

}
