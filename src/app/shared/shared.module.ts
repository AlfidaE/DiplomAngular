import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {StrLimiterPipe} from "./pipes/str-limiter.pipe";
import {MatMenuModule} from "@angular/material/menu";
import {ArticleCardComponent} from './components/article-card/article-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReviewCardComponent} from './components/review-card/review-card.component';
import {UserRoutingModule} from "../views/user/user-routing.module";
import {SaveHtmlPipe} from "./pipes/save-html.pipe";
import {ServiceCardComponent} from "./components/service-card/service-card.component";
import { PopupCardComponent } from './components/popup-card/popup-card.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CleanCurrencyPipe} from "./pipes/clean-currency.pipe";
import {PopupRingCardComponent} from "./components/popup-ring-card/popup-ring-card.component";
import {CommentCardComponent} from "./components/comment-card/comment-card.component";
import { RtfViewerComponent } from './components/rtf-viewer/rtf-viewer.component';


@NgModule({
  declarations: [
    StrLimiterPipe,
    ArticleCardComponent,
    ReviewCardComponent,
    CommentCardComponent,
    SaveHtmlPipe,
    CleanCurrencyPipe,
    RtfViewerComponent,
    ServiceCardComponent,
    PopupCardComponent,
    PopupRingCardComponent,

  ],

  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    MatDialogModule

  ],
  exports: [
    StrLimiterPipe,
    ArticleCardComponent,
    ReviewCardComponent,
    SaveHtmlPipe,
    ServiceCardComponent,
    RtfViewerComponent,
    CommentCardComponent


  ]
})
export class SharedModule {
}
