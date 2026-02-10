import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {OwlOptions} from "ngx-owl-carousel-o";
import {ReviewCardType} from "../../../types/review-card.type";
import {ReviewService} from "../../shared/services/review.service";
import {SliderMainType} from "../../../types/slider-main.type";
import {SliderMainDbService} from "../../shared/services/slider-main-db.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PopupCardComponent} from "../../shared/components/popup-card/popup-card.component";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {ServiceDbCardType} from "../../../types/service-db-card.type";
import {ServiceDbService} from "../../shared/services/service-db.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  topSliders: SliderMainType[] = [];
  articles: ArticleType[] = [];
  reviews: ReviewCardType[] = [];
  dialogRef: MatDialogRef<any> | null = null;
  servicesMain: ServiceDbCardType[] = [];

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['',''],
    dotsEach: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
    },
    nav: false,
  }

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false,
  }

  constructor(private articleService: ArticleService,
              private reviewService: ReviewService,
              private slidersMain: SliderMainDbService,
              private dialog: MatDialog,
              private servicesDbServices: ServiceDbService,
              private router: Router,) { }

  ngOnInit(): void {
    this.topSliders = this.slidersMain.getSliderMain();
    this.servicesMain = this.servicesDbServices.getServicesMain();
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      })

    this.reviews = this.reviewService.getReviews();
  }



  moreDetails(service: string) {
    this.dialogRef = this.dialog.open(PopupCardComponent, {
      data: {
        service: service,
      },
    });

    this.dialogRef.afterOpened()
      .pipe(take(1))
      .subscribe(() => {
        // Убираем aria-hidden с app-root после открытия диалога
        const appRoot = document.querySelector('app-root');
        if (appRoot) {
          appRoot.removeAttribute('aria-hidden');
        }
      });

    this.dialogRef.backdropClick()
      .subscribe(() => {
        this.dialogRef?.close();
        this.router.navigate(['/']);
      });
  }

}
