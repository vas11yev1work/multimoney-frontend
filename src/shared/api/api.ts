import ky from 'ky';

const URL = import.meta.env.VITE_API_URL;

export const api = () => {
  const instance = ky.create({
    prefixUrl: URL + '/api/v1',
  });

  function get<R, P extends Record<string, any> = never>(url: string, params?: P) {
    return instance
      .get(url, {
        searchParams: params,
      })
      .json<R>();
  }

  function post<R, B extends Record<string, any> = never, P extends Record<string, any> = never>(
    url: string,
    body?: B,
    params?: P
  ) {
    return instance
      .post(url, {
        searchParams: params,
        json: body,
      })
      .json<R>();
  }

  function put<R, B extends Record<string, any> = never, P extends Record<string, any> = never>(
    url: string,
    body?: B,
    params?: P
  ) {
    return instance
      .put(url, {
        searchParams: params,
        json: body,
      })
      .json<R>();
  }

  function del<R, P extends Record<string, any> = never>(url: string, params?: P) {
    return instance
      .delete(url, {
        searchParams: params,
      })
      .json<R>();
  }

  return {
    get,
    post,
    put,
    del,
  };
};
