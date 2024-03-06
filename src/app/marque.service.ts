import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllMarque(): Observable<any>{
    return this.http.get(this.baseurl + '/marques/',
    {headers: this.httpHeaders});
  }

  getOneMarque(id): Observable<any> {
    return this.http.get(this.baseurl + '/marques/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updateMarque(marque): Observable<any>{
    const body={libMarq:marque.libMarq, photoMarq:marque.photoMarq};
    return this.http.put(this.baseurl + '/marques/' + marque.id + '/',body,
    {headers: this.httpHeaders}
    )
  }
  
    createMarque(marque): Observable<any> {
      const body={libMarq:marque.libMarq, photoMarq:marque.photoMarq};
    return this.http.post(this.baseurl + '/marques/', body,
    {headers: this.httpHeaders});
  }

  deleteMarque(id): Observable<any> {
    return this.http.delete(this.baseurl + '/marques/' + id + '/',
    {headers: this.httpHeaders});
  }

}
