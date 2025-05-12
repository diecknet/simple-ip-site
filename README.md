## About this project

This is a simple PHP + JavaScript website to plainly present the IP-Address of the visitor. The website itself doesn't need JavaScript to be enabled on the client. But having clientside JavaScript enabled adds an easy "Copy to Clipboard" function. The site is styled with pure CSS, using [W3.CSS](https://www.w3schools.com/w3css/default.asp).

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

## About the code

The source code consists of 2 main folders:
- [mainpage/](/mainpage/) - contains the mostly static portions aka "**the site**"
- [alt.simpleip.de/](/alt.simpleip.de/) - contains the PHP application as **[index.php](/alt.simpleip.de/index.php)**

### Getting the visitor's IP Address with a PHP script

I've put **[a small PHP script](/alt.simpleip.de/index.php)** on another webhost. The webhost is reachable with dedicated hostnames for IPv4 and IPv6. The script is just outputting the IP-Address of the client. The website fetches the info from the PHP script using client-side JavaScript/AJAX. **So if the website visitor has JavaScript disabled, the site will only show the primary IP-Address determined by the main page**.

## Cloudflare?

This used to be a small project that I created to try out serverless Cloudflare workers. You can still find that code in the [**old_main**](https://github.com/diecknet/simple-ip-site/tree/old_main) branch. But after a few years I decided that this part of the Internet does not need to be hosted on Cloudflare.

### MIT License

[This project is licensed under the terms of the MIT license](LICENSE.md).
