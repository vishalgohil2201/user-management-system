import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public upArrowSvg: SafeHtml;
  public downArrowSvg: SafeHtml;

  public currentPage: number = 1;
  public pageSize: number = 10;

  public sortColumn: string = '';
  public sortDirection: string = 'asc';
  public sortedUsers: any[] = [];
  public searchText!: string;
  constructor(
    public _stoargeService: StorageService,
    private sanitizer: DomSanitizer
  ) {
    this.upArrowSvg = this.sanitizer.bypassSecurityTrustHtml(`
      <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="black" viewBox="0 0 448 512">
        <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
      </svg>
    `);
    this.downArrowSvg = this.sanitizer.bypassSecurityTrustHtml(`
      <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="black" viewBox="0 0 448 512">
        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
      </svg>
    `);
  }

  ngOnInit() {
    this._stoargeService.getUsersFromStorage();
    this._stoargeService.users$.subscribe((users) => {
      this.sortedUsers = users;
      this.sortData('name');
    });
  }

  public sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortedUsers = [...this.sortedUsers].sort((a, b) => {
      const valA = a[column].toLowerCase();
      const valB = b[column].toLowerCase();
      return this.sortDirection === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }
}
