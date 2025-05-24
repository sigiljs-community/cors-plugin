import { SigilPlugin } from "@sigiljs/sigil"
import { IncomingHeaders, IncomingRequestProcessorResponse } from "@sigiljs/sigil/requests/containers"
import { Exception, SigilResponse } from "@sigiljs/sigil/responses"

export interface CorsPluginConfiguration {
  allowOrigins?: string[]
  allowMethods?: string[]
  allowHeaders?: string[]
  allowCredentials?: boolean
  maxAge?: number
  exposeHeaders?: string[]
}

export default class CorsPlugin extends SigilPlugin<CorsPluginConfiguration> {
  public static name = "CorsPlugin"

  constructor() {
    super()
  }

  public onInitialize(): any {
    const { allowOrigins, allowMethods, allowHeaders, exposeHeaders, allowCredentials, maxAge } = this.$pluginConfig

    this.sigil.addMiddleware((request, response, mod) => {
      const origin = request.headers.get("origin")
      if (!origin || request.method !== "OPTIONS") return
      if (allowOrigins && !allowOrigins.includes(origin)) return

      const headers = new IncomingHeaders({ "Access-Control-Allow-Origin": origin })

      if (maxAge) headers.set("Access-Control-Max-Age", maxAge.toString())
      if (allowMethods) headers.set("Access-Control-Allow-Methods", allowMethods.join(","))
      if (allowHeaders) headers.set("Access-Control-Allow-Headers", allowHeaders.join(","))
      if (allowCredentials) headers.set("Access-Control-Allow-Credentials", allowCredentials ? "true" : "false")
      if (exposeHeaders) headers.set("Access-Control-Expose-Headers", exposeHeaders.join(","))

      if (mod.headers) Object.entries(mod.headers).forEach(([key, value]) => headers.append(key, value))

      return response.rawResponse(null, headers, 204)
    })
  }

  public onBeforeResponseSent(request: IncomingRequestProcessorResponse | null, response: SigilResponse | Exception) {
    if (!request) return

    response.headers.set("Access-Control-Allow-Origin", request.host)
    response.headers.set("Access-Control-Allow-Credentials", "true")
  }
}