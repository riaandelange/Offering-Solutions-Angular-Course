import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent {

    name$: Observable<any>;

    constructor(private http: HttpClient) {
        let data = new Observable((observer: Observer<number>) => {
            setTimeout(() => {
                observer.next(42);
            }, 1000);

            setTimeout(() => {
                observer.next(43);
            }, 2000);

            setTimeout(() => {
                observer.complete();
            }, 3000);
        });

        let subscription = data
            // .map(x => <number>x + 1)
            .subscribe((value: number) => {
                console.log(value);
            },
            (error: number) => {
                console.log(error);
            },
            () => console.log('finished'));



        subscription.unsubscribe();

        this.name$ = this.getNameAsync();
    }


    getNameAsync(): Observable<any> {
        return this.http.get<any>('https://swapi.co/api/people/1/');
    }
}