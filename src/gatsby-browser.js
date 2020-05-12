import { webVitals } from './web-vitals'

export const onClientEntry = (_, pluginOptions = {}) => {
  let options = {
    trackingId: undefined,
    includeInDevelopment: false,
    debug: false,
    ...pluginOptions
  }

  console.log(options)

  if (!options.trackingId) {
    return null
  }

  if (options.includeInDevelopment || process.env.NODE_ENV === `production`) {
    webVitals(location.href, { options })
  }
}
