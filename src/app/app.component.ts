import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  //get the position of the scrollbar and max scroll height
  let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  let max = document.documentElement.scrollHeight;
  // pagination, add 30 each time scrollbar hits max
    if(pos == max && this.page < 34)   {
      this.page++;
      this.http.get("https://api.github.com/search/repositories?q=created:%3E"+this.date+"&sort=stars&order=desc&page="+this.page)
      .subscribe( data => {
        for(let i of data.items){
          this.gitRepo.push(i);
        }
      })
    }
  }

  title = 'MostStarredRepositories';

  gitRepo = [];

  //get current time and remove 30 days 
  time = new Date(Date.now()-2628000000).toLocaleDateString().split("/");

  //change to the format of the github api
  date = this.time[2] + "-" + this.time[1] + "-" + this.time[0]; 

  page = 1;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //subscribe data from the github api to get the repositories sorted in terms of stars
    this.http.get("https://api.github.com/search/repositories?q=created:%3E"+this.date+"&sort=stars&order=desc&page="+this.page)
    .subscribe( data => {
      //assign the JSON data of the repository to gitRepo
      this.gitRepo = data.items;
    })
  }

  goTop(){
    document.body.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
