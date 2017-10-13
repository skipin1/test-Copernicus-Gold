import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Rate } from './rate';

@Injectable()
export class ExchangeRateService {

  constructor(
    private http: Http,
  ) { }

  getExchangeRate(): Observable<Rate> {
    const url = 'https://testapi.copernicusgold.com/api/v1/rates?source=EUR&target=USD';
    return this.http.get(url)
      .map((res: Response) => {
        const rate = res.json();
        return rate;
      })
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
