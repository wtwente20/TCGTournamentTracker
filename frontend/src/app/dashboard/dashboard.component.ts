import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  entries: any[] = [];
  newEntry: any = {};
  userId: string | null = '';

  constructor(
    private authService: AuthService,
    private tournamentService: TournamentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.loadTournamentEntries();
    } else {
      this.router.navigate(['/login']);
    }
  }

  addEntry() {
    this.newEntry.userId = this.userId; // Set userId if required
    this.tournamentService.addTournamentEntry(this.newEntry)
      .subscribe(response => {
        this.entries.push(response);
        this.newEntry = {};
      }, error => {
        console.error(error);
      });
  }

  loadTournamentEntries() {
    if (this.userId) {
      this.tournamentService.getTournamentEntries(this.userId)
        .subscribe(entries => {
          this.entries = entries;
        }, error => {
          console.error(error);
        });
    }
  }
}
