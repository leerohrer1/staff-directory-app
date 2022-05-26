import { Injectable } from '@angular/core';
import Staff from './staff';
import STAFF from './mock-staff'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private messageService: MessageService) { }

  getStaff(): Observable<Staff[]> {
    const staffMembers = of(STAFF);
    this.messageService.add('StaffService: fetched staff members');
    return staffMembers;
  }
}
