# gatsby-plugin-web-vitals

> [Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

This plugin sends Web Vitals metrics to Google Analytics.

## Install

`npm i gatsby-plugin-web-vitals`

or

`yarn add gatsby-plugin-web-vitals`

## Usage

```js
// gatsby-config.js
{
  resolve: 'gatsby-plugin-web-vitals',
  options: {
    // The Google Analytics property ID; the reporting code won't be generated without it
    trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
    // Prints metrics in the console when true
    debug: true,
    // An array with metrics you want to track and send to analytics
    // By default all metrics are sending
    metrics: [`FID`, `TTFB`, `LCP`, `CLS`, `FCP`],
    // Include Web Vitals tracking in development
    // Defaults to false meaning Vitals will only be tracked in production.
    includeInDevelopment: false
  }
}
```

---

Plugin inspired by [`nuxt-vitals`](https://github.com/daliborgogic/nuxt-vitals).
