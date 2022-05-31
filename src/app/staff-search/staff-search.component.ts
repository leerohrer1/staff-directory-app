import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import Staff from '../staff';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: [ './staff-search.component.css' ]
})
export class StaffSearchComponent implements OnInit {
  staffMembers$!: Observable<Staff[]>;
  private searchTerms = new Subject<string>();

  constructor(private staffService: StaffService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.staffMembers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.staffService.searchStaffMembers(term)),
    );
  }

}