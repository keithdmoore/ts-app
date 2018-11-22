/* tslint:disable */
/**
 * This is generated by openapi-ts-client-gen - do not edit directly!
 */
import moment from 'moment';
import request from 'superagent';

export interface IRequestParams {
  method: string;
  url: string;
  queryParameters?: { [key: string]: string | boolean | number | Date | undefined };
  body?: Object;
}

export abstract class ApiService {
  protected executeRequest<T>(params: IRequestParams) {
    return new Promise<T>((resolve, reject) => {
      let req = request(params.method, params.url)
        .set('Content-Type', 'application/json');

      const queryParameters = params.queryParameters;
      if (queryParameters) {
        Object.keys(queryParameters).forEach(key => {
          const value = queryParameters[key];
          if (Object.prototype.toString.call(value) === '[object Date]') {
            queryParameters[key] = moment(value as Date).format();
          }
        });

        req = req.query(queryParameters);
      }
      if (params.body) { req.send(params.body); }

      req.end((error: any, response: any) => {
        if (error || !response.ok) {
          if (response && response.body) {
            const customError: any = new Error(response.body.message);
            customError.status = response.body.status;
            customError.type = response.body.type;
            reject(customError);
            return;
          }

          reject(error);
        } else {
          resolve(response.body);
        }
      });
    });
  }
}

export namespace Api {
  let baseApiUrl: string;

  export const Initialize = (params: { host: string; protocol?: string; }) => {
    baseApiUrl = `${params.protocol || 'https'}://${params.host}`;
  };


    export interface IWidget {
      id: number;
      label: string;
      color: string;
    }


    export interface IWidgetsGetWidgetParams {
      widgetId: number;
    }
    export class WidgetsService extends ApiService {

      public async get() {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/api/widgets`
        };
        return this.executeRequest<IWidget[]>(requestParams);
      }

      public async getWidget(_params: IWidgetsGetWidgetParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/api/widgets/${_params.widgetId}`
        };
        return this.executeRequest<IWidget>(requestParams);
      }
    }
}