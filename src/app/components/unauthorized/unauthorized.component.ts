import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  @Input() text:string;

  constructor() { }

  ngOnInit() {}

}
