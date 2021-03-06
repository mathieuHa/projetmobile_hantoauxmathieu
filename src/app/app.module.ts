import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PostServiceProvider } from '../providers/post-service/post-service';
import {AddPostPage} from '../pages/add-post/add-post';
import {PostDetailPage} from '../pages/post-detail/post-detail';
import {EditpostPage} from '../pages/editpost/editpost';
import {FormPostComponent} from '../components/form-post/form-post';
import {PostComponent} from '../components/post/post';
import {Network} from "@ionic-native/network";
import {NativeStorage} from "@ionic-native/native-storage";
import {IonicStorageModule} from "@ionic/storage";
import {ListOfflinePage} from "../pages/list-offline/list-offline";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AddPostPage,
    PostDetailPage,
    EditpostPage,
    FormPostComponent,
    PostComponent,
    ListOfflinePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AddPostPage,
    PostDetailPage,
    EditpostPage,
    FormPostComponent,
    PostComponent,
    ListOfflinePage
  ],
  providers: [
    Network,
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    PostServiceProvider,
  ]
})
export class AppModule {}
