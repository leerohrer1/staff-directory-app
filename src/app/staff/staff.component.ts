import { Component, OnInit } from '@angular/core';
import Staff from '../staff';
import { StaffService } from '../staff.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private staffService: StaffService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getStaff();
  }

  staffMembers: Staff[] = [];
  
  selectedStaff?: Staff;

  onSelect(staff: Staff): void {
  this.selectedStaff = staff;
  this.messageService.add(`StaffComponent: Selected staff id=${staff.id}`);
  }

  getStaff(): void {
    this.staffService.getStaff()
        .subscribe(staffMembers => this.staffMembers = staffMembers);
  }
}
