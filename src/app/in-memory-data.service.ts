import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import Staff from './staff';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const staffMembers = [
      { id: 12, name: 'Dr. Evil' },
      { id: 13, name: 'Sheryl Crow' },
      { id: 14, name: 'Mariah Carey' },
      { id: 15, name: 'Sean Penn' },
      { id: 16, name: 'Billy Madison' },
      { id: 17, name: 'Carol Burnett' },
      { id: 18, name: 'Kate Hudson' },
      { id: 19, name: 'Dr. McStuffins' },
      { id: 20, name: 'Kahlil Gibran' },
    ];

    return { staffMembers };
  }

  genId(staffMembers: Staff[]): number {
    return staffMembers.length > 0
      ? Math.max(...staffMembers.map((staff) => staff.id)) + 1
      : 11;
  }
}
