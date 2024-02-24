import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private http: HttpClient) { }

  getAllLivreur(): Observable<any>{
    return this.http.get(this.baseurl + '/livreurs/',
    {headers: this.httpHeaders});
  }

  getOneLivreur(id): Observable<any> {
    return this.http.get(this.baseurl + '/livreurs/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateLivreur(livreur): Observable<any>{
    const body={nomL:livreur.nomL, prenomL:livreur.prenomL, dateNaissL:livreur.dateNaissL, emailL: livreur.emailL, sexeL: livreur.sexeL, adresseL: livreur.adresseL, villeL: livreur.villeL,quartierL: livreur.quartierL, numCNI_L: livreur.numCNI_L, telL: livreur.telL, loginL: livreur.loginL, motDePassL: livreur.motDePassL};
    return this.http.put(this.baseurl + '/livreurs/' + livreur.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  


    createLivreur(livreur): Observable<any> {
    const body={nomL:livreur.nomL, prenomL:livreur.prenomL, dateNaissL:livreur.dateNaissL, emailL: livreur.emailL, sexeL: livreur.sexeL, adresseL: livreur.adresseL,villeL: livreur.villeL,quartierL: livreur.quartierL, numCNI_L: livreur.numCNI_L, telL: livreur.telL, loginL: livreur.loginL, motDePassL: livreur.motDePassL};
    return this.http.post(this.baseurl + '/livreurs/', body,
    {headers: this.httpHeaders});
  }

  deleteLivreur(id): Observable<any> {
    return this.http.delete(this.baseurl + '/livreurs/' + id + '/',
    {headers: this.httpHeaders});
  }


}
