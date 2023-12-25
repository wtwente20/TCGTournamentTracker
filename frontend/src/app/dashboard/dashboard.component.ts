import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  entries: any[] = [];
  newEntry: any = {}; // Define the structure based on your model
  userId: string | null = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.userId = this.getUserIdFromToken();
    if (this.userId) {
      this.loadTournamentEntries();
    }
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));

    return decodedToken.userId; // Adjust based on your token payload structure
  }

  addEntry() {
    // Add the userId to the newEntry object
    this.newEntry.userId = this.userId;
    this.http.post('http://localhost:5000/tournaments/add', this.newEntry)
      .subscribe(response => {
        this.entries.push(response);
        this.newEntry = {}; // Reset the form
      });
  }

  loadTournamentEntries() {
    this.http.get<any[]>(`http://localhost:5000/tournaments/${this.userId}`)
      .subscribe(entries => this.entries = entries,
        error => console.error(error));
  }
}
