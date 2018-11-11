import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vs-smartcontract-item',
  templateUrl: './smartcontract-item.component.html',
  styleUrls: ['./smartcontract-item.component.css']
})
export class SmartcontractItemComponent implements OnInit {
  @Input() smartContract: any;

  constructor() {}

  ngOnInit() {}
}
