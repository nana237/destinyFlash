import { Component, OnInit } from '@angular/core';
import { DetailPAService } from '../detail-p-a.service';
import { ArticleService } from '../article.service';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-detail-p-a',
  templateUrl: './detail-p-a.component.html',
  styleUrls: ['./detail-p-a.component.css'],
  providers: [DetailPAService,ArticleService,PanierService]
})
export class DetailPAComponent implements OnInit {

  details; 
  selecteddetail;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';
  articles;
  paniers;

  constructor(
    private _detail_p_a:DetailPAService,
    private _article:ArticleService,
    private _panier: PanierService
    ) {

      this.getDetail();
      this.getAticle();
      this.getPanier();
      this.selecteddetail={
        id:-1,
        panier:'',
        article:'',
        qte:0,
        couleur:'',
        taille:'',
        prix:'',
        autreDetail:''
      }

        

     }

     getPanier(){
      this._panier.getAllPanier().subscribe(
        data=>{
          this.paniers=data;
          console.log("affichage des paniers");
          console.log(this.paniers);
        },
        error=>{
          console.log(error);
        }
      )
    }

    getAticle(){
      this._article.getAllArticle().subscribe(
        data=>{
          this.articles=data;
          console.log("affichage des articles");
          console.log(this.articles);
        },
        error=>{
          console.log(error);
        }
      )
    }

     modifierDetail(){
      this.updateDetail();
      this.formVisible=false;
    }
    creerDetail(){
      console.log(this.selecteddetail)
      this.creatDetail();
      this.formVisible=false;
    }
    showFormModifier(detail){
     this.labelDuForm='Modification de la marque ';
     this.formVisible=true;
     this.modifierVisible=true;
     this.annulerVisible = true;
     this.creerVisible = false;
     this.idVisible = false;
     this.DetailSelected(detail);
     
    }
    showFormCreer(){
     this.labelDuForm='Ajout d\'un détail ';
     this.formVisible=true;
     this.modifierVisible=false;
     this.annulerVisible = true;
     this.creerVisible = true;
     this.idVisible = false;
    }
  
     getDetail = ()=>{
       this._detail_p_a.getAllDetail().subscribe(
         data=>{
           this.details=data;
         },
         error =>{
           console.log(error);
         }
       )
     }
  
     DetailSelected=(detail)=>{
       // console.log(movie.id);
        this._detail_p_a.getOneDetail(detail.id).subscribe(
          data=>{
            this.selecteddetail=data;
            console.log(this.selecteddetail);
          },
          error =>{
            console.log(error);
          }
        );
      }
  
      annulerModif(){
        this.selecteddetail=-1;
        this.formVisible=false;
      }
     updateDetail = ()=>{
       this._detail_p_a.updateDetail(this.selecteddetail).subscribe(
         data=>{
           this.getDetail();
         },
         error =>{
           console.log(error);
         }
       )
     }
  
     creatDetail = () =>{
       this._detail_p_a.createDetail(this.selecteddetail).subscribe(
         data=>{
          this.details.push(data);
         },
         error =>{
           console.log(error);
         }
       );
     }
     supprimerDetail(detail){
       if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
         this.deleteDetail(detail);
       }
       
     }
     deleteDetail(detail){
       this._detail_p_a.deleteDetail(detail.id).subscribe(
         data=>{
         this.getDetail();
         
         },
         error =>{
           console.log(error);
         }
       );
     }
  



  ngOnInit() {
  }

}
