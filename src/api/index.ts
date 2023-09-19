import axios from 'axios/index';

interface IAnyObj {
  [index: string]: unknown;
}

export interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

export type ApiResponse<T> = Promise<[unknown, FcResponse<T> | undefined]>;

export const Get = <T>(url: string, params: IAnyObj = {}): ApiResponse<T> =>
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        let res = result.data as unknown as FcResponse<T>;
        resolve([null, res]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });

export const Post = <T>(url: string, data: IAnyObj, params: IAnyObj = {}): ApiResponse<T> =>
  new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        let res = result.data as unknown as FcResponse<T>;
        resolve([null, res]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
