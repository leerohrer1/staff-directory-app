import { Component, OnInit, Input } from '@angular/core';
import Staff from '../staff';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../staff.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css'],
})
export class StaffDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getStaff();
  }

  @Input() staff?: Staff;

  getStaff(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.staffService.getStaff(id).subscribe((staff) => (this.staff = staff));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.staff) {
      this.staffService.updateStaff(this.staff)
        .subscribe(() => this.goBack());
    }
  }
}
