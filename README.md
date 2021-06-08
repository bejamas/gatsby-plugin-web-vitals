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
    // An array with metrics you want to track and send to analytics
    metrics: [`FID`, `TTFB`, `LCP`, `CLS`, `FCP`],
    // Event Category (optional) { string }, default 'Web Vitals'
    eventCategory: 'Performance',
    // Include Web Vitals tracking in development
    // Defaults to false meaning Vitals will only be tracked in production.
    includeInDevelopment: false,
    // Prints metrics in the console when true
    debug: false,
  }
}
```

## Important note

Because Google Analytics metrics must be integers, all event values are rounded
before being sent. To be meaningful, CLS values are also multiplied by 1000.
This is the approach recommended in the [Web Vitals documentation](https://github.com/GoogleChrome/web-vitals#send-the-results-to-google-analytics) and will be
important to keep in mind when preparing your reports.

---

Plugin based on [`nuxt-vitals`](https://github.com/daliborgogic/nuxt-vitals).
