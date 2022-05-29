import { Component, OnInit } from '@angular/core';
import Staff from '../staff';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  staffMembers: Staff[] = [];

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.getStaffMembers();
  }

  getStaffMembers(): void {
    this.staffService.getStaffMembers()
      .subscribe(staffMembers => this.staffMembers = staffMembers.slice(1, 5));
  }
}