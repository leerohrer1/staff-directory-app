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

  getStaffMembers(): Observable<Staff[]> {
    const staffMembers = of(STAFF);
    this.messageService.add('Staff Service: fetched all staff');
    return staffMembers;
  }

  getStaff(id: number): Observable<Staff> {
    const staff = STAFF.find(s => s.id === id)!;
    this.messageService.add('StaffService: fetched staff member id: ${id}');
    return of(staff);
  }
}
