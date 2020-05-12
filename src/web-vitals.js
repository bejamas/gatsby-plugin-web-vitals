import { getCLS, getFID, getLCP, getTTFB, getFCP } from "web-vitals";

const KEY = "ga:user";
const UID = (localStorage[KEY] =
  localStorage[KEY] || Math.random() + "." + Math.random());

function onError(err) {
  console.error("[web-vitals]", err); // eslint-disable-line no-console
}

function onDebug(label, payload) {
  console.log(label, payload); // eslint-disable-line no-console
}

function encode(obj) {
  let k;
  let str = "https://www.google-analytics.com/collect?v=1";
  for (k in obj) {
    if (obj[k]) {
      str += `&${k}=${encodeURIComponent(obj[k])}`;
    }
  }
  return str;
}

function sendToAnalytics(fullPath, metric, options) {
  const { name, delta, id, entries } = metric;

  if (!options.metrics.includes(name)) {
    return;
  }

  const opts = {
    ec: options.eventCategory,
    ea: name,
    el: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    ev: parseInt(delta),
    dp: fullPath,
    ni: true,
  };

  // Calculate the request time by subtracting from TTFB
  // everything that happened prior to the request starting.
  if (name === "TTFB") {
    opts.ev = parseInt(delta - entries[0].requestStart);
  }

  const args = { tid: options.trackingId, cid: UID, ...opts };
  const obj = { t: "event", ...args, ...opts, z: Date.now() };
  const url = encode(obj);

  if (options.debug) {
    onDebug(name, JSON.stringify(obj, null, 2));
    onDebug(name + " URL", url);
  }

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, null);
  } else {
    fetch(url, { method: "POST", keepalive: true }).catch(onError);
  }
}

export async function webVitals(fullPath, { options }) {
  try {
    if (options.trackingId) {
      getFID((metric) => sendToAnalytics(fullPath, metric, options));
      getTTFB((metric) => sendToAnalytics(fullPath, metric, options));
      getLCP((metric) => sendToAnalytics(fullPath, metric, options));
      getCLS((metric) => sendToAnalytics(fullPath, metric, options));
      getFCP((metric) => sendToAnalytics(fullPath, metric, options));
    }
  } catch (err) {
    onError(err);
  }
}
