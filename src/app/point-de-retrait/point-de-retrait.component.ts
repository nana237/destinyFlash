import { Component, OnInit } from '@angular/core';
import { PointDeRetraitService } from '../point-de-retrait.service';

@Component({
  selector: 'app-point-de-retrait',
  templateUrl: './point-de-retrait.component.html',
  styleUrls: ['./point-de-retrait.component.css'],
  providers: [PointDeRetraitService]
})
export class PointDeRetraitComponent implements OnInit {

  pointRetraits; 
  selectedPointRetrait;
  formVisible=false;
  modifierVisible=false;
  annulerVisible = false;
  creerVisible = false;
  idVisible = false;
  labelDuForm='';

  constructor(
    private pointDeRetrait:PointDeRetraitService
  ) {
      this.getPointDeRetrait();
      this.selectedPointRetrait ={
        id : -1,
        libPoint :'',
        villePoint :'',
        quartierPoint :'',
        descriptionPoint :'',
        telPoint : 0,
        mailPoint : ''
      };
   }
   modifierPoint(){
     this.updatePointDeRetrait();
     this.formVisible=false;
   }
   creerPoint(){
     this.creatPointDeRetrait();
     this.formVisible=false;
   }
   showFormModifier(pointRetrait){
    this.labelDuForm='Modification du produit ';
    this.formVisible=true;
    this.modifierVisible=true;
    this.annulerVisible = true;
    this.creerVisible = false;
    this.idVisible = false;
    this.PointDeRetraitSelected(pointRetrait);
    
   }
   showFormCreer(){
    this.labelDuForm='Ajout d\'un point de retrait ';
    this.formVisible=true;
    this.modifierVisible=false;
    this.annulerVisible = true;
    this.creerVisible = true;
    this.idVisible = false;
   }

    getPointDeRetrait = ()=>{
      this.pointDeRetrait.getAllPointDeRetrait().subscribe(
        data=>{
          this.pointRetraits=data;
        },
        error =>{
          console.log(error);
        }
      )
    }

    PointDeRetraitSelected=(pointRetrait)=>{
      // console.log(movie.id);
       this.pointDeRetrait.getOnePointDeRetrait(pointRetrait.id).subscribe(
         data=>{
           this.selectedPointRetrait=data;
           console.log(this.selectedPointRetrait);
         },
         error =>{
           console.log(error);
         }
       );
     }

     annulerModif(){
       this.selectedPointRetrait=-1;
       this.formVisible=false;
     }
    updatePointDeRetrait = ()=>{
      this.pointDeRetrait.updatePointDeRetrait(this.selectedPointRetrait).subscribe(
        data=>{
          this.getPointDeRetrait();
        },
        error =>{
          console.log(error);
        }
      )
    }

    creatPointDeRetrait = () =>{
      this.pointDeRetrait.createPointDeRetrait(this.selectedPointRetrait).subscribe(
        data=>{
         this.pointRetraits.push(data);
        },
        error =>{
          console.log(error);
        }
      );
    }
    supprimerPoint(pointRetrait){
      if (confirm('êtes vous sur de vouloir suprimer cet element ?')) {
        this.deletePoint(pointRetrait);
      }
      
    }
    deletePoint(pointRetrait){
      this.pointDeRetrait.deletePointDeRetrait(pointRetrait.id).subscribe(
        data=>{
        this.getPointDeRetrait();
        
        },
        error =>{
          console.log(error);
        }
      );
    }
  ngOnInit() {
  }

}
