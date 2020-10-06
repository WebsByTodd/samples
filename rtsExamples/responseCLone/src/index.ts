type ClientHeaders = Map<string, string>;

// Manually inlined from 'Response' in lib.dom.d.ts.
type ResponseType =
  | "basic"
  | "cors"
  | "default"
  | "error"
  | "opaque"
  | "opaqueredirect";

interface ParsedResponse<T> {
  body: T | null;
  clientError?: any;

  // headers: Headers;
  originalResponse: Response;
}

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhYXAtbW9iaWxlIiwic2NvcGUiOlsib3BlbmlkIiwiY2xpZW50IiwidXNlciIsInRyYW5zYWN0aW9uIiwiaHViX3JvdXRlIl0sImV4cCI6MTU4MTE1OTU5OSwiaWF0IjoxNTgxMDg3NTk5LCJhdXRob3JpdGllcyI6WyJyb2xlX3N1cHBvcnRfZW5naW5lZXIiLCJST0xFX1VTRVIiLCJyb2xlX3VzZXIiXSwianRpIjoiNmEwYjc2MGEtZDc0NC00ZjVlLWE0YzItZGI5YjQ1ZDFiYzlkIiwiY2xpZW50X2lkIjoid2ViX2FwcCJ9.SiaeWOLGATO3UkkCZ4IokfThWfZNdtUPOfKlTGQio31IZDikNs72qkdz9eHUH7SG5UvGgfEuW5BdzbMm644YZoC7Gk-73BG3clFOOW_B50qVs54MDz3OS3qqlPqdpci5KpYXpdEfDfWrGIZI-iJBxJmDtSubUbNW8qosVneTduegUAdpnb2r3X9NNG9zoieniBLyAXA8F_dkOXuGVHbjLjk2r-z7COaJKweXsz8qGv8ijOja1KVzcq1kIfgkkreOjrSq-QM9NMHribKVWWGlYHP-XD_4_HW3hTEly_8hcdFc_Rfl7eaLW1Irg9DC14Vwn5GuEoJTt-pl-9QbxUiCrw";
const apiRoot = "https://dev-ui.aapedb2.com";
let clientHeaders: ClientHeaders = new Map();

function callEndpoint<T>(
  endpoint: string,
  options: CallApiOptions
): Promise<ParsedResponse<T>> {
  let requestUrl = apiRoot;
  if (endpoint.charAt(0) === "/") {
    requestUrl += endpoint;
  } else {
    requestUrl += "/" + endpoint;
  }

  let headers: { [key: string]: string } =
    Object.fromEntries(clientHeaders) || {};

  if (options.headers) {
    headers = { ...headers, ...options.headers };
  }

  if (options.body) {
    headers = { ...headers, "Content-Type": "application/json" };
  }

  headers = { ...headers, Accept: "application/json" };

  let requestInit: RequestInit = {
    method: options.method,
    headers: headers,
    body: options.body ? options.body : undefined
  };

  if (token) {
    requestInit.headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
  }

  console.log("******REQUEST******");
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Method: ${options.method}`);
  if (options.body) {
    console.log(`With body ${options.body}`);
  }
  console.log("*******************");
  console.log(`Fetching endpoint ${requestUrl}`);
  return new Promise<ParsedResponse<T>>(async (resolve, reject) => {
    console.log(`Fetch Options: ${JSON.stringify(requestInit)}`);
    let originalResponse: Response | undefined;
    try {
      const res = await fetch(requestUrl, requestInit);

      originalResponse = res;
      console.log("######INITIAL RESPONSE######");
      console.log(res);
      console.log(originalResponse);
      console.log("############################");
      const contentType = res.headers.get("content-type");
      if (res.ok) {
        if (contentType && contentType.indexOf("json") !== -1) {
          const json = await res.json();
          const parsedResponse = handleJson(json, originalResponse);
          return resolve(parsedResponse);
        }
        const newThing = cloneResponse(originalResponse);

        return resolve({ ...newThing, body: undefined });
      } else {
        const json = await res.json();
        console.log(json);
        const parsedResponse = handleJson(json, originalResponse);
        return reject(parsedResponse);
      }
    } catch (err) {
      console.log("Request error");
      console.error(err);
      if (originalResponse) {
        const nonParsedResponse = {
          ...cloneResponse(originalResponse),
          clientError: err
        };
        return reject(nonParsedResponse);
      } else {
        return reject({ clientError: err });
      }
    }
  });
}

function handleJson<T>(json: T, response: Response): ParsedResponse<T> {
  console.log("######JSON RESPONSE######");
  console.log(JSON.stringify(json));
  console.log("#########################");
  console.log("!!!!!!!!!!!!!!!!!!");
  const newThing = cloneResponse(response);
  return {
    ...newThing,
    body: json
  };
}

export interface OAuthToken {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  iat: number;
  jti: string;
}

export type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
export interface CallApiOptions {
  headers?: { [key: string]: string };
  method: HTTPMethod;
  body?: string;
}

const main = () => {
  callEndpoint(
    "/api/store/1/dispatch?pending=true&page=1&size=20&sortProperty=scheduledStartTime",
    { method: "GET" }
  ).then(res => {
    console.log("final response");
    console.log(res);
  });
};

main();

/**
 * For complex javascript reasons, Response objects are not cloneable using Object.assign or {...object} patterns.
 * This function does a lazy clone of the relevant response fields and returns as an any to allow it to be easily cast to other types
 * This function should be called explicitly while spreading the results. e.g. { ...cloneResponse(res), body: parsedBody }
 *
 * @param response
 */
function cloneResponse(response: Response): any {
  return {
    bodyUsed: response.bodyUsed,
    headers: response.headers,
    ok: response.ok,
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    trailer: response.trailer,
    type: response.type,
    url: response.url,
    arrayBuffer: response.arrayBuffer,
    blob: response.blob,
    clone: response.clone,
    formData: response.formData,
    json: response.json,
    text: response.text,
    body: response.body
  };
}
