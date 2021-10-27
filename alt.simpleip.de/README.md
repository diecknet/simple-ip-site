# PHP Script for alt.simpleip.de

This folder contains [`index.php`](index.php). This small PHP Script is hosted on a webhost and can get called via these hostnames:

- ipv4.alt.simpleip.de
- ipv6.alt.simpleip.de

The hostnames should only respond to request with the corresponding IP protocol version.

I decided to this, because Cloudflare Workers have no option for IPv4-/IPv6-only hosts.
