import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Staff from './staff'
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class StaffService {

  private staffMembersUrl = 'api/staffMembers';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getStaffMembers(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.staffMembersUrl)
      .pipe(
        tap(_ => this.log('fetched staff members')),
        catchError(this.handleError<Staff[]>('getStaffMembers', []))
      );
  }

  getStaffNo404<Data>(id: number): Observable<Staff> {
    const url = `${this.staffMembersUrl}/?id: ${id}`;
    return this.http.get<Staff[]>(url)
      .pipe(
        map(staffMembers => staffMembers[0]), 
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} staff id ${id}`);
        }),
        catchError(this.handleError<Staff>(`getStaff id ${id}`))
      );
  }

  getStaff(id: number): Observable<Staff> {
    const url = `${this.staffMembersUrl}/${id}`;
    return this.http.get<Staff>(url).pipe(
      tap(_ => this.log(`fetched staff id ${id}`)),
      catchError(this.handleError<Staff>(`getStaff id ${id}`))
    );
  }

  searchStaffMembers(term: string): Observable<Staff[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Staff[]>(`${this.staffMembersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found staff members matching "${term}"`) :
         this.log(`no staff members matching "${term}"`)),
      catchError(this.handleError<Staff[]>('searchStaffMembers', []))
    );
  }

// Save methods 

  addStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.staffMembersUrl, staff, this.httpOptions).pipe(
      tap((newStaff: Staff) => this.log(`added staff with id ${newStaff.id}`)),
      catchError(this.handleError<Staff>('addStaff'))
    );
  }

  deleteStaff(id: number): Observable<Staff> {
    const url = `${this.staffMembersUrl}/${id}`;
    return this.http.delete<Staff>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted staff id ${id}`)),
      catchError(this.handleError<Staff>('deleteStaff'))
    );
  }

  updateStaff(staff: Staff): Observable<any> {
    return this.http.put(this.staffMembersUrl, staff, this.httpOptions).pipe(
      tap(_ => this.log(`updated staff id ${staff.id}`)),
      catchError(this.handleError<any>('updateStaff'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`StaffService: ${message}`);
  }
}