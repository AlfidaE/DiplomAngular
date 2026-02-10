import {Component, Input, OnInit} from '@angular/core';
import {ReviewCardType} from "../../../../types/review-card.type";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {

  @Input() review: ReviewCardType | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
