## About this project

This is a simple serverside/serverless JavaScript website to plainly present the IP-Address of the visitor. It's made specifically to work on [Cloudflare Workers Sites](https://developers.cloudflare.com/workers/platform/sites). The website itself doesn't need JavaScript to be enabled on the client. But having clientside JavaScript enabled adds an easy "Copy to Clipboard" function. The site is styled with pure CSS, using [W3.CSS](https://www.w3schools.com/w3css/default.asp).

### Benefits 🤩

- 💖 Not commercial, no ulterior motives 💖
- ❌ No Ads
- ❌ No Tracking
- ❌ No unnecessary Logs
- ❌ No other unnecessary information
- ✅ Absolutely free to use
- ✅ Open Source - feel free to host it yourself and change according to your needs
- ✅ IPv4 and IPv6 support
- ✅ Simple, clean and responsive layout
- ✅ Works without (client-side) JavaScript

### Live version / Demo

➡ [Demo on SimpleIP.de](https://simpleip.de)

### Deploy for yourself

You can selfhost this project on [Cloudflare Workers](https://workers.cloudflare.com/), which is free 🥰 for upto 100,000 requests **per day**.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/diecknet/simple-ip-site)

## About the code

The source code consists of 2 main folders:
- [public/](/public/) - contains the mostly static portions aka "**the site**"
- [workers-site/](/workers-site/) - contains the JavaScript application as **[index.js](/workers-site/index.js)**

### Getting the visitor's IP Address with Cloudflare Workers

The magic is happening in `getClientIPInfo(request)`. Cloudflare is providing informations like visitor IP-Address and location and we can easily use it.

```javascript
// get country from cloudflare
let location = (request.cf || {}).country
    // if we know which city, prepend to location
    if((request.cf || {}).city) {
        location = ((request.cf || {}).city)+', '+location
    }
// [...]
/* get client ip address by Cloudflare header 'CF-Connecting-IP' */
      ipaddress: request.headers.get('CF-Connecting-IP')
```

### Getting the visitor's IP Address with a PHP script

Since Cloudflare Workers has no method to force IPv4 or IPv6 usage, I've put **[a small PHP script](/alt.simpleip.de/index.php)** on another webhost. The webhost is reachable with dedicated hostnames for IPv4 and IPv6. The script is just outputting the IP-Address of the client. The website fetches the info from the PHP script using client-side JavaScript/AJAX. **So if the website visitor has JavaScript disabled, the site will only show the primary IP-Address determined by Cloudflare**.

### Build status

|Status|Branch|Note|
|---|---|---|
|[![Deploy to Cloudflare Workers](https://github.com/diecknet/simple-ip-site/actions/workflows/deploy.yml/badge.svg)](https://github.com/diecknet/simple-ip-site/actions/workflows/deploy.yml)|main|Release/live version|
|[![Test Build](https://github.com/diecknet/simple-ip-site/actions/workflows/dev_build.yml/badge.svg?branch=dev)](https://github.com/diecknet/simple-ip-site/actions/workflows/dev_build.yml)|dev|Development version|

### MIT License

[This project is licensed under the terms of the MIT license](LICENSE.md).
