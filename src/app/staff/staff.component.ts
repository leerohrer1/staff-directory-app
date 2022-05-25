import { Component, OnInit } from '@angular/core';
import Staff from '../staff';
import { STAFF } from '../mock-staff';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  staffMembers = STAFF;
  selectedStaff?: Staff;
  onSelect(staff: Staff): void {
  this.selectedStaff = staff;
  }
}
