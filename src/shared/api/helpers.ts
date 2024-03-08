import { HTTPError } from 'ky';

export interface SharedData<T> {
  data: T | null;
  error: boolean;
  loaded: boolean;
  loading: boolean;
}

interface LoadSharedDataParams<T, R> {
  promise: () => Promise<T>;
  currentData?: SharedData<R>;
  dataCallback?: (result: T) => R | void;
  throwWhenError?: boolean;
  returnData?: boolean;
}

export async function catchCustomError(error: any, callback: (error: string) => void) {
  if (error instanceof HTTPError) {
    const data = await error.response.json();
    callback(data.message || data.error);
    return;
  }
  callback('Unknown error');
}

export function loadSharedData<T, R>(params: LoadSharedDataParams<T, R>) {
  if (params.currentData) {
    params.currentData.error = false;
    params.currentData.loaded = false;
    params.currentData.loading = true;
  }

  return params
    .promise()
    .then((data: any) => {
      if (params.currentData) {
        if (params.dataCallback) {
          const returnedData = params.dataCallback(data);
          if (returnedData) {
            params.currentData.data = returnedData;
          }
        } else {
          params.currentData.data = data;
        }
      }
      if (params.dataCallback) {
        params.dataCallback(data);
      }
      if (params.returnData) return data as T;
    })
    .catch(error => {
      if (params.currentData && !params.throwWhenError) {
        params.currentData.error = true;
      }
      if (params.throwWhenError) throw error;
    })
    .finally(() => {
      if (params.currentData) {
        params.currentData.loaded = true;
        params.currentData.loading = false;
      }
    });
}

export const getDefaultSharedState = <T>(data?: Partial<SharedData<T>>) => ({
  data: null,
  error: false,
  loaded: false,
  loading: false,
  ...data,
});
