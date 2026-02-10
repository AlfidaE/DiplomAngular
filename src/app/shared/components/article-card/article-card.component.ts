import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: ArticleType;
  count: number = 1; // видео 13.3 время 1 час

  serverStaticPath = environment.serverStaticPath;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

}
