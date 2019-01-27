/**
 * gateway API
 * gateway API documentation
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { OrderDetails } from '../model/orderDetails';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class OrderDetailsResourceService {

    protected basePath = 'localhost:8080/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * createOrderDetails
     * 
     * @param orderDetails orderDetails
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createOrderDetailsUsingPOST(orderDetails: OrderDetails, observe?: 'body', reportProgress?: boolean): Observable<OrderDetails>;
    public createOrderDetailsUsingPOST(orderDetails: OrderDetails, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDetails>>;
    public createOrderDetailsUsingPOST(orderDetails: OrderDetails, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDetails>>;
    public createOrderDetailsUsingPOST(orderDetails: OrderDetails, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (orderDetails === null || orderDetails === undefined) {
            throw new Error('Required parameter orderDetails was null or undefined when calling createOrderDetailsUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<OrderDetails>(`${this.basePath}/api/order-details`,
            orderDetails,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteOrderDetails
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteOrderDetailsUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteOrderDetailsUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteOrderDetailsUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteOrderDetailsUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteOrderDetailsUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/api/order-details/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllOrderDetails
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllOrderDetailsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<OrderDetails>>;
    public getAllOrderDetailsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrderDetails>>>;
    public getAllOrderDetailsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrderDetails>>>;
    public getAllOrderDetailsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<OrderDetails>>(`${this.basePath}/api/order-details`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getOrderDetails
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOrderDetailsUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<OrderDetails>;
    public getOrderDetailsUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDetails>>;
    public getOrderDetailsUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDetails>>;
    public getOrderDetailsUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getOrderDetailsUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<OrderDetails>(`${this.basePath}/api/order-details/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * searchOrderDetails
     * 
     * @param query query
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public searchOrderDetailsUsingGET(query: string, observe?: 'body', reportProgress?: boolean): Observable<Array<OrderDetails>>;
    public searchOrderDetailsUsingGET(query: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrderDetails>>>;
    public searchOrderDetailsUsingGET(query: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrderDetails>>>;
    public searchOrderDetailsUsingGET(query: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (query === null || query === undefined) {
            throw new Error('Required parameter query was null or undefined when calling searchOrderDetailsUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', <any>query);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<OrderDetails>>(`${this.basePath}/api/_search/order-details`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateOrderDetails
     * 
     * @param orderDetails orderDetails
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOrderDetailsUsingPUT(orderDetails: OrderDetails, observe?: 'body', reportProgress?: boolean): Observable<OrderDetails>;
    public updateOrderDetailsUsingPUT(orderDetails: OrderDetails, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDetails>>;
    public updateOrderDetailsUsingPUT(orderDetails: OrderDetails, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDetails>>;
    public updateOrderDetailsUsingPUT(orderDetails: OrderDetails, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (orderDetails === null || orderDetails === undefined) {
            throw new Error('Required parameter orderDetails was null or undefined when calling updateOrderDetailsUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<OrderDetails>(`${this.basePath}/api/order-details`,
            orderDetails,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
