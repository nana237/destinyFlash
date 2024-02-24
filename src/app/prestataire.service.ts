import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class PrestataireService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  
  getAllPrestataire(): Observable<any>{

    return this.http.get(this.baseurl + '/prestataires/',
    {headers: this.httpHeaders});
  }

  getOnePrestataire(id): Observable<any> {
    return this.http.get(this.baseurl + '/prestataires/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updatePrestataire(prestataire): Observable<any>{
    const body={nomP:prestataire.nomP, prenomP:prestataire.prenomP, dateNaissP:prestataire.dateNaissP, emailP: prestataire.emailP, sexeP: prestataire.sexeP, adresseP: prestataire.adresseP,villeP: prestataire.villeP,quartierP: prestataire.quartierP, numCNI_P: prestataire.numCNI_P, telP: prestataire.telP, loginP: prestataire.loginP, motDePassP: prestataire.motDePassP};
    return this.http.put(this.baseurl + '/prestataires/' + prestataire.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  


    createPrestataire(prestataire): Observable<any> {
    const body={nomP:prestataire.nomP, prenomP:prestataire.prenomP, dateNaissP:prestataire.dateNaissP, emailP: prestataire.emailP, sexeP: prestataire.sexeP, adresseP: prestataire.adresseP,villeP: prestataire.villeP,quartierP: prestataire.quartierP, numCNI_P: prestataire.numCNI_P, telP: prestataire.telP, loginP: prestataire.loginP, motDePassP: prestataire.motDePassP};
    return this.http.post(this.baseurl + '/prestataires/', body,
    {headers: this.httpHeaders});
  }

  deletePrestataire(id): Observable<any> {
    return this.http.delete(this.baseurl + '/prestataires/' + id + '/',
    {headers: this.httpHeaders});
  }

}
