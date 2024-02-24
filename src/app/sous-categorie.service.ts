import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private http: HttpClient) { }

  getAllSousCategorie(): Observable<any>{
    return this.http.get(this.baseurl + '/sous_categories/',
    {headers: this.httpHeaders});
  }

  getOneSousCategorie(id): Observable<any> {
    return this.http.get(this.baseurl + '/sous_categories/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateSousCategorie(sous_categorie): Observable<any>{
    const body={libSCat:sous_categorie.libSCat, photoSCat:sous_categorie.photoSCat , categorie:sous_categorie.categorie };
     
    return this.http.put(this.baseurl + '/sous_categories/' + sous_categorie.id + '/',body,
    {headers: this.httpHeaders}
    )
  }

    createSousCategorie(sous_categorie): Observable<any> {
    const body={libSCat:sous_categorie.libSCat, photoSCat:sous_categorie.photoSCat , categorie:sous_categorie.categorie };
    return this.http.post(this.baseurl + '/sous_categories/', body,
    {headers: this.httpHeaders});
  }

  deleteSousCategorie(id): Observable<any> {
    return this.http.delete(this.baseurl + '/sous_categories/' + id + '/',
    {headers: this.httpHeaders});
  }
}
