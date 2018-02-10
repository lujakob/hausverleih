import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-top',
  templateUrl: './toolbar-top.component.html',
  styleUrls: ['./toolbar-top.component.css']
})
export class ToolbarTopComponent implements OnInit {

  public showNavbar: boolean = true;
  public userName: string = '';
  public title: string = 'Hausverleih';

  constructor() { }

  ngOnInit() {
  }

}
