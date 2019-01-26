import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISpecs } from 'app/shared/model/specs.model';

type EntityResponseType = HttpResponse<ISpecs>;
type EntityArrayResponseType = HttpResponse<ISpecs[]>;

@Injectable({ providedIn: 'root' })
export class SpecsService {
    public resourceUrl = SERVER_API_URL + 'api/specs';

    constructor(protected http: HttpClient) {}

    create(specs: ISpecs): Observable<EntityResponseType> {
        return this.http.post<ISpecs>(this.resourceUrl, specs, { observe: 'response' });
    }

    update(specs: ISpecs): Observable<EntityResponseType> {
        return this.http.put<ISpecs>(this.resourceUrl, specs, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISpecs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISpecs[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
