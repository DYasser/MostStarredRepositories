import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  @Input() repo;  //get the input from appComponent

  date: string;

  constructor() { }

  ngOnInit(): void {

    //shows date in a readable way 
    this.date  = new Date(Date.parse(this.repo.updated_at)).toLocaleDateString();
  }

}
