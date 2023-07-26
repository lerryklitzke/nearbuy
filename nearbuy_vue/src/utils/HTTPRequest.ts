import superagent, { Response, ResponseError } from 'superagent';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface RequestWithCredentials {
  withCredentials?: boolean;
}
interface RequestWithBody<T> extends RequestWithCredentials {
  body: T;
}
interface Request extends RequestWithCredentials {
  method: Method; 
  endpoint: string;
  body?: Object;
}

export class HTTPRequest {
  public static async get(endpoint: string, options?: RequestWithCredentials) {
    const response = await this.request({ method: 'get', endpoint, ...options });
    return response;
  }
  public static async post(endpoint: string, options: RequestWithBody<Object>) {
    const response = await this.request({ method: 'post', endpoint, ...options });
    return response;
  }
  public static async put(endpoint: string, options: RequestWithBody<Object>) {
    const response = await this.request({ method: 'put', endpoint, ...options });
    return response;
  }
  public static async patch(endpoint: string, options: RequestWithBody<Object>) {
    const response = await this.request({ method: 'patch', endpoint, ...options });
    return response;
  }
  public static async delete(endpoint: string, options: RequestWithBody<Object | undefined>) {
    const response = await this.request({ method: 'delete', endpoint, ...options });
    return response;
  }

  private static async request(params: Request): Promise<Response | ResponseError> {
    const { method, endpoint, body, withCredentials } = params;
    const response = await superagent[`${method}`](import.meta.env.VITE_SERVER_URL + endpoint)
      .send(body)
      .withCredentials(withCredentials)
      .then((res) => res)
      .catch((err) => err)
    return response;
  }
}

export default HTTPRequest;
