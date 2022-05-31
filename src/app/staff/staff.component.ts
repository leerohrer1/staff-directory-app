import { Component, OnInit } from '@angular/core';
import Staff from '../staff';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.getStaffMembers();
  }

  staffMembers: Staff[] = [];

  getStaffMembers(): void {
    this.staffService.getStaffMembers()
        .subscribe(staffMembers => this.staffMembers = staffMembers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.staffService.addStaff({ name } as Staff)
      .subscribe((staff: Staff) => {
        this.staffMembers.push(staff);
      });
  }

  delete(staff: Staff): void {
    this.staffMembers = this.staffMembers.filter(s => s !== staff);
    this.staffService.deleteStaff(staff.id).subscribe();
  }
}
