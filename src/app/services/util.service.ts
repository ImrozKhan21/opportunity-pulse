import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getDateAndTime(dateString: string): {date: string, time: string} {
    // Match the date and time components using a regular expression
    const match: any = dateString.match(/^(\w{3}\s\d{1,2},\s\d{4})\s(\d{1,2}:\d{2}:\d{2}\s[AP]M)$/);

// Extract the date and time components from the match
    const dateStr = match[1];
    const timeStr = match[2];

    const time = timeStr.replace(/:(\d{2})/, ":$1 ").toLowerCase();
    return {date: dateStr, time: timeStr};
  }
}
