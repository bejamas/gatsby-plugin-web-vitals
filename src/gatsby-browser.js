import { webVitals } from "./web-vitals";

export const onClientEntry = (_, pluginOptions = {}) => {
  let options = {
    trackingId: undefined,
    includeInDevelopment: false,
    debug: false,
    eventCategory: `Web Vitals`,
    metrics: [`FID`, `TTFB`, `LCP`, `CLS`, `FCP`],
    ...pluginOptions,
  };

  if (!options.trackingId) {
    return null;
  }

  if (options.includeInDevelopment || process.env.NODE_ENV === `production`) {
    webVitals({ options });
  }
};
