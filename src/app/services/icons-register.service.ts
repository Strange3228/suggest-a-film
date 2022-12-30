import { Injectable } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class IconsRegisterService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
  }

  registerIcons(){
    //Like icon
    this.matIconRegistry.addSvgIcon(
      'custom_like',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/like.svg')
    )
    //Star icon
    this.matIconRegistry.addSvgIcon(
      'custom_star',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/star.svg')
    )
    //Watched icon
    this.matIconRegistry.addSvgIcon(
      'custom_video-tick',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/video-tick.svg')
    )
    //Mail icon
    this.matIconRegistry.addSvgIcon(
      'custom_mail',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/sms.svg')
    )
    //Password icon
    this.matIconRegistry.addSvgIcon(
      'custom_key',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/key-square.svg')
    )
  }
}
