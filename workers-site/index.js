import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

/* cloudflare event listener + handler */
addEventListener('fetch', function(event) {
    try {
        const response = handleEvent(event) // pass event to handleEvent()
        event.respondWith(response)
    } catch (e) {
        if (DEBUG) {
          return event.respondWith(
            new Response(e.message || e.toString(), {
              status: 500,
            }),
          )
        }
        event.respondWith(new Response('Internal Error', { status: 500 }))
      }
  })
  
/**
 * Receives a HTTP request and replies with a response.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleEvent(event) {
const { request } = event
const { url } = request
const { host, pathname } = new URL(url)
let options = {}

if (DEBUG) {
    // customize caching
    options.cacheControl = {
        bypassCache: true,
    }
    }

switch (pathname) {
    case '/robots.txt':
        return new Response(null, { status: 204 })
        break;
    default:
        
        try {
            // get requested resource from KV cache
            const page = await getAssetFromKV(event, options)
            // allow headers to be altered
            const response = new Response(page.body, page)
            // add some headers
            response.headers.set('X-XSS-Protection', '1; mode=block')
            response.headers.set('X-Content-Type-Options', 'nosniff')
            response.headers.set('X-Frame-Options', 'DENY')
            response.headers.set('Referrer-Policy', 'strict-origin')
            response.headers.set('Permissions-Policy', 'none')
            
            // if the main page / or /index is requested, we apply a HTMLRewriter to inject the IP-Address and location info
            if(pathname == '/' || pathname == '/index.html') {
                options.cacheControl = {
                    browserTTL: 0,
                    edgeTTL: 0,
                    bypassCache: true
                }
                response.headers.set('Cache-Control', 'no-store')
                let ipInfo = getClientIPInfo(request)
                let rewrittenResponse = new HTMLRewriter()
                    .on('input', new ElementHandler(ipInfo))
                    .on('h1', new ElementHandler())
                    .transform(response)
                return rewrittenResponse
            }
            return response
        } catch(e) {
            // if an error is thrown try to serve the asset at 404.html
            if (!DEBUG) {
                try {
                let notFoundResponse = await getAssetFromKV(request, {
                    mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
                })
        
                return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
                } catch (e) {}
            }
        
            return new Response(e.message || e.toString(), { status: 500 })
        }

}
}
  
  function getClientIPInfo(request) {
    /* get clientdata from cloudflare */
    /* the ||-comparison is to prevent errors in the workers quick edit mode */
    let location = (request.cf || {}).country
    // if we know which city, prepend to location
    if((request.cf || {}).city) {
        location = ((request.cf || {}).city)+', '+location
    }
    const clientIPInfo = {
      /* get client ip address by Cloudflare header 'CF-Connecting-IP' */
      ipaddress: request.headers.get('CF-Connecting-IP'),
      /* location of client ip address */
      location: location
    }
    return clientIPInfo
  }
  
/* handles elements to inject values using HTMLRewriter */
class ElementHandler {
    constructor(ipInfo=null) {
        this.ipInfo = ipInfo
    }
    element(element) {
        // get element id
        const elementid = element.getAttribute('id')
        // some debug output
        if(DEBUG) { 
            console.log(`Incoming element: ${element.tagName} - id ${elementid}`)
        }
        switch(element.tagName) {
            case 'h1':
                if(DEBUG) {
                    element.append(' DEBUG MODE')
                    element.setAttribute('style','color: #ff0000')
                }
                if(ENVIRONMENT==="dev") {
                    element.append(' { DEV ENVIRONMENT }')
                    element.setAttribute('style','color: #eb7171')
                }
            break;
            case 'input':
                // depending on which element-id we have, put ipaddress or location in
                switch(elementid) {
                    case 'ipaddress':
                        // set value of ipaddress-field in HTML
                        element.setAttribute('value',this.ipInfo.ipaddress)
                        break;
                    case 'location':
                        // set value of location-field in HTML
                        element.setAttribute('value',this.ipInfo.location)
                        break;
                }
            break;
        }
    }
}  