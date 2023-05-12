import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {WindowRefService} from "./window-ref.service";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(@Inject(PLATFORM_ID) private platformId: any, private windowRef : WindowRefService) { }

  getDateAndTime(dateString: string): {date: string, time: string} {
    // Match the date and time components using a regular expression
    const match: any = dateString.match(/^(\w{3}\s\d{1,2},\s\d{4})\s(\d{1,2}:\d{2}:\d{2}\s[AP]M)$/);

// Extract the date and time components from the match
    const dateStr = match[1];
    const timeStr = match[2];

    const time = timeStr.replace(/:(\d{2})/, ":$1 ").toLowerCase();
    return {date: dateStr, time: timeStr};
  }

  setCurrentUrl() {
    if (isPlatformBrowser(this.platformId)) {
      const url = this.windowRef.nativeWindow.location.href;
      sessionStorage.setItem('current-url-pulse', url);
    }
  }
}
