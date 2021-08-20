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

  //get current time and remove 30 days 
  time = new Date(Date.now()-2628000000).toLocaleDateString().split("/");

  //change to the format of the github api
  date = this.time[2] + "-" + this.time[1] + "-" + this.time[0]; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //subscribe data from the github api to get the repositories sorted in terms of stars
    this.http.get("https://api.github.com/search/repositories?q=created:%3E"+this.date+"&sort=stars&order=desc&page="+this.page)
    .subscribe( data => {
      //assign the JSON data of the repository to gitRepo
      this.gitRepo = data.items;
    })
  }
}
