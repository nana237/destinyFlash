import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllCategorie(): Observable<any>{
    return this.http.get(this.baseurl + '/categories/',
    {headers: this.httpHeaders});
  }

  getOneCategorie(id): Observable<any> {
    return this.http.get(this.baseurl + '/categories/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateCategorie(categories): Observable<any>{
    const body={libCat:categories.libCat, photoCat:categories.photoCat };
    return this.http.put(this.baseurl + '/categories/' + categories.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
    createCategorie(categories): Observable<any> {
    const body={libCat:categories.libCat, photoCat:categories.photoCat };
    return this.http.post(this.baseurl + '/categories/', body,
    {headers: this.httpHeaders});
  }

  deleteCategorie(id): Observable<any> {
    return this.http.delete(this.baseurl + '/categories/' + id + '/',
    {headers: this.httpHeaders});
  }

}
