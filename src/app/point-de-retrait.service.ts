import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PointDeRetraitService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllPointDeRetrait(): Observable<any>{
    return this.http.get(this.baseurl + '/point_de_retraits/',
    {headers: this.httpHeaders});
  }

  getOnePointDeRetrait(id): Observable<any> {
    return this.http.get(this.baseurl + '/point_de_retraits/'+ id +'/',
    {headers: this.httpHeaders});
  }

  updatePointDeRetrait(pointRetrait): Observable<any>{
    const body={libPoint:pointRetrait.libPoint, villePoint:pointRetrait.villePoint , quartierPoint:pointRetrait.quartierPoint , descriptionPoint:pointRetrait.descriptionPoint , telPoint:pointRetrait.telPoint , mailPoint:pointRetrait.mailPoint};
    return this.http.put(this.baseurl + '/point_de_retraits/' + pointRetrait.id + '/',body,
    {headers: this.httpHeaders}
    )
  }

    createPointDeRetrait(pointRetrait): Observable<any> {
      const body={libPoint:pointRetrait.libPoint, villePoint:pointRetrait.villePoint , quartierPoint:pointRetrait.quartierPoint , descriptionPoint:pointRetrait.descriptionPoint , telPoint:pointRetrait.telPoint , mailPoint:pointRetrait.mailPoint};
    return this.http.post(this.baseurl + '/point_de_retraits/', body,
    {headers: this.httpHeaders});
  }

  deletePointDeRetrait(id): Observable<any> {
    return this.http.delete(this.baseurl + '/point_de_retraits/' + id + '/',
    {headers: this.httpHeaders});
  }

}
