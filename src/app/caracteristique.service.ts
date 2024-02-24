import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllCaracteristique(): Observable<any>{
    return this.http.get(this.baseurl + '/caracteristiques/',
    {headers: this.httpHeaders});
  }

  getOneCaracteristique(id): Observable<any> {
    return this.http.get(this.baseurl + '/caracteristiques/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateCaracteristique(caracteristique): Observable<any>{
    const body={ couleurCaract:caracteristique.couleurCaract , photoCaract:caracteristique.photoCaract , tailleCaract:caracteristique.tailleCaract , autreDetailCaract: caracteristique.autreDetailCaract, prixCaract:caracteristique.prixCaract , qteCaract:caracteristique.qteCaract, nbAchatCaract: caracteristique.nbAchatCaract, article: caracteristique.article };
    return this.http.put(this.baseurl + '/caracteristiques/' + caracteristique.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  

  createCaracteristique(caracteristique): Observable<any> {
    
    const body={ couleurCaract:caracteristique.couleurCaract , photoCaract:caracteristique.photoCaract , tailleCaract:caracteristique.tailleCaract , autreDetailCaract: caracteristique.autreDetailCaract, prixCaract:caracteristique.prixCaract , qteCaract:caracteristique.qteCaract, nbAchatCaract: caracteristique.nbAchatCaract, article: caracteristique.article };
        
    return this.http.post(this.baseurl + '/caracteristiques/',body,
     {headers: this.httpHeaders} );
  }

  deleteCaracteristique(id): Observable<any> {
    return this.http.delete(this.baseurl + '/caracteristiques/' + id + '/',
    {headers: this.httpHeaders});
  }

}
