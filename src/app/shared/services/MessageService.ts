import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subjectFilterDates = new Subject<any>();

    sendMessage(messageDates: string[]) {
        this.subjectFilterDates.next(messageDates);
    }

    clearMessages() {
        this.subjectFilterDates.next();
    }

    onMessage(): Observable<any> {
        return this.subjectFilterDates.asObservable();
    }
}