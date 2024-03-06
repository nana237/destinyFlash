import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllArticle(): Observable<any>{
    return this.http.get(this.baseurl + '/articles/',
    {headers: this.httpHeaders});
  }

  getOneArticle(id): Observable<any> {
    return this.http.get(this.baseurl + '/articles/'+ id +'/',
    {headers: this.httpHeaders});
  }

/*
  getArticleNom(designationAr): Observable<any> {
    return this.http.get(this.baseurl + '/articles/'+ designationAr +'/',
    {headers: this.httpHeaders});
  }
  */

  updateArticle(article): Observable<any>{
    const body={id:article.id, designationAr:article.designationAr , photoAr:article.photoAr , prixAr:article.prixAr , qteAr: article.qteAr, telPoint:article.telPoint , StockSecuriteAr:article.StockSecuriteAr,VideoPubAr: article.VideoPubAr, nbAchatAr: article.nbAchatAr, sous_categorie: article.sous_categorie, marque: article.marque };
    return this.http.put(this.baseurl + '/articles/' + article.id + '/',body,
    {headers: this.httpHeaders}
    )
  }

  

  createArticle(article): Observable<any> {
    
   
    const body={id:article.id, designationAr:article.designationAr , photoAr:article.photoAr , prixAr:article.prixAr ,
       qteAr: article.qteAr , StockSecuriteAr:article.StockSecuriteAr,VideoPubAr: article.VideoPubAr,
        nbAchatAr: article.nbAchatAr, sous_categorie: article.sous_categorie, marque: article.marque };
        
    return this.http.post(this.baseurl + '/articles/',body,
     {headers: this.httpHeaders} );
  }

  deleteArticle(id): Observable<any> {
    return this.http.delete(this.baseurl + '/articles/' + id + '/',
    {headers: this.httpHeaders});
  }

  
}
