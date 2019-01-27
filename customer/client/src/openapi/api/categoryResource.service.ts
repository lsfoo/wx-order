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

import { Inject, Injectable, Optional } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent
} from '@angular/common/http'
import { CustomHttpUrlEncodingCodec } from '../encoder'

import { Observable } from 'rxjs/Observable'

import { Category } from '../model/category'

import { BASE_PATH, COLLECTION_FORMATS } from '../variables'
import { Configuration } from '../configuration'

@Injectable()
export class CategoryResourceService {
  protected basePath = 'localhost:8080'
  public defaultHeaders = new HttpHeaders()
  public configuration = new Configuration()

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (basePath) {
      this.basePath = basePath
    }
    if (configuration) {
      this.configuration = configuration
      this.basePath = basePath || configuration.basePath || this.basePath
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data'
    for (const consume of consumes) {
      if (form === consume) {
        return true
      }
    }
    return false
  }

  /**
   * createCategory
   *
   * @param category category
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createCategoryUsingPOST(
    category: Category,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Category>
  public createCategoryUsingPOST(
    category: Category,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Category>>
  public createCategoryUsingPOST(
    category: Category,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Category>>
  public createCategoryUsingPOST(
    category: Category,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (category === null || category === undefined) {
      throw new Error(
        'Required parameter category was null or undefined when calling createCategoryUsingPOST.'
      )
    }

    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes)
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected)
    }

    return this.httpClient.post<Category>(
      `${this.basePath}/api/categories`,
      category,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    )
  }

  /**
   * deleteCategory
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteCategoryUsingDELETE(
    id: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>
  public deleteCategoryUsingDELETE(
    id: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>
  public deleteCategoryUsingDELETE(
    id: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>
  public deleteCategoryUsingDELETE(
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling deleteCategoryUsingDELETE.'
      )
    }

    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = []
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = []

    return this.httpClient.delete<any>(
      `${this.basePath}/api/categories/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    )
  }

  /**
   * getAllCategories
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllCategoriesUsingGET(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<Category>>
  public getAllCategoriesUsingGET(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<Category>>>
  public getAllCategoriesUsingGET(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<Category>>>
  public getAllCategoriesUsingGET(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = []

    return this.httpClient.get<Array<Category>>(
      `${this.basePath}/api/categories`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    )
  }

  /**
   * getCategory
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getCategoryUsingGET(
    id: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Category>
  public getCategoryUsingGET(
    id: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Category>>
  public getCategoryUsingGET(
    id: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Category>>
  public getCategoryUsingGET(
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling getCategoryUsingGET.'
      )
    }

    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = []

    return this.httpClient.get<Category>(
      `${this.basePath}/api/categories/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    )
  }

  /**
   * searchCategories
   *
   * @param query query
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public searchCategoriesUsingGET(
    query: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<Category>>
  public searchCategoriesUsingGET(
    query: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<Category>>>
  public searchCategoriesUsingGET(
    query: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<Category>>>
  public searchCategoriesUsingGET(
    query: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (query === null || query === undefined) {
      throw new Error(
        'Required parameter query was null or undefined when calling searchCategoriesUsingGET.'
      )
    }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec()
    })
    if (query !== undefined && query !== null) {
      queryParameters = queryParameters.set('query', <any>query)
    }

    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = []

    return this.httpClient.get<Array<Category>>(
      `${this.basePath}/api/_search/categories`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    )
  }

  /**
   * updateCategory
   *
   * @param category category
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateCategoryUsingPUT(
    category: Category,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Category>
  public updateCategoryUsingPUT(
    category: Category,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Category>>
  public updateCategoryUsingPUT(
    category: Category,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Category>>
  public updateCategoryUsingPUT(
    category: Category,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (category === null || category === undefined) {
      throw new Error(
        'Required parameter category was null or undefined when calling updateCategoryUsingPUT.'
      )
    }

    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes)
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected)
    }

    return this.httpClient.put<Category>(
      `${this.basePath}/api/categories`,
      category,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    )
  }
}