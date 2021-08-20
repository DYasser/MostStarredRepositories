import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MostStarredRepositories';

  gitRepo = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //subscribe data from the github api to get the repositories sorted in terms of stars
    this.http.get("https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc")
    .subscribe( data => {
      //assign the JSON data of the repository to gitRepo
      this.gitRepo = data.items;
    })
  }
}
