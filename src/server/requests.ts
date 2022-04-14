export function createLoaderRequest(
  to: string,
  headers?: {
    [key: string]: any;
  }
) {
  const url = new URL(to);
  const h: {
    [key: string]: string;
  } = {
    host: url.host,
    connection: "keep-alive",
    "sec-ch-ua":
      '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
    accept: "*/*",
    "sec-ch-ua-mobile": "?0",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: to,
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "ja,en-US;q=0.9,en;q=0.8",
    cookie: "__session=",
    ...headers,
  };
  const newHeaders = Object.keys(h).reduce(
    (o, key) => (o.append(key, h[key]), o),
    new Headers()
  );
  const request = new Request(to, {
    headers: newHeaders,
  });
  return request;
}
export function createActionRequest(
  action: string,
  formData: {
    [key: string]: any;
  }
) {
  const method = "POST";
  const body = Object.keys(formData).reduce(
    (o, key) => (o.set(key, formData[key]), o),
    new FormData()
  );
  const headers = {
    Accept: "application/json",
  };
  let request = new Request(action, {
    method,
    headers,
    body,
  });
  return request;
}

export function createStripeWebhookRequest(
  action: string,
  stripeSignature: string,
  obj: {
    [key: string]: any;
  }
) {
  const method = "POST";
  const body = JSON.stringify(obj);
  const headers = {
    Accept: "application/json",
    "stripe-signature": stripeSignature,
  };
  let request = new Request(action, {
    method,
    headers,
    body,
  });
  return request;
}
