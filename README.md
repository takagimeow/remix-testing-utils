# Remix Testing Utils [![](http://img.shields.io/npm/dm/remix-testing-utils.svg?style=flat)](https://www.npmjs.org/package/remix-testing-utils) [![NPM version](https://img.shields.io/npm/v/remix-testing-utils.svg?style=flat-square)](https://npmjs.com/package/remix-testing-utils) [![CI](https://github.com/takagimeow/remix-testing-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/takagimeow/remix-testing-utils/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT) 

This package contains simple utility functions to test with Remix.run.

## Installation

```shell
npm install --save-dev remix-testing-utils
```

## API Reference

### createLoaderRequest

This createLoaderRequest function is used to create a dummy instance of the request needed when testing the loader function.

```ts
const req = createLoaderRequest("http://localhost:3000/", {
    cookie: "__session=helloworld"
  });
await loader({
  request: req,
  context: {},
  params: {},
})
```

### createActionRequest

This createActionRequest function is used to generate a dummy instance of the request needed when testing the action function.

```ts
const req = createActionRequest("http://localhost:3000/", {
    id: "user-id",
    name: "user-name",
  });
await action({
  request: req,
  context: {},
  params: {},
});
```
### createStripeWebhookRequest

This createsStripeWebhookRequest function is not directly related to Remix, but is used to create a dummy of the request instance needed when testing the Stripe webhook implemented by the action function.

```ts
const request = createStripeWebhookRequest(
  "http://localhost:3000/api/webhook/stripe",
  "stripe-signature",
  customerSubscriptionUpdatedEventPayload
);
await action({
  request,
  context: {},
  params: {},
});
```

## Author

- [Keisuke Takagi](https://twitter.com/takagimeow)

## License

- MIT License