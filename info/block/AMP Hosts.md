## ✅ AMP Domains
AMP (Accelerated Mobile Pages) is an open-source framework developed by Google to help speed up the loading of mobile web pages.
It is designed to deliver content quickly on mobile devices by removing unnecessary features and optimizing the HTML code.

When a web page is published in AMP format, it uses a different set of HTML tags and a streamlined version of CSS.
This allows the page to load much faster and use fewer network resources, resulting in a better user experience on mobile devices with slower internet connections.

To enable AMP, website owners need to publish their content using AMP HTML, which is a subset of HTML designed for mobile devices.
Publishers can also choose to serve their AMP pages through a Content Delivery Network (CDN) such as Google AMP Cache or Cloudflare AMP Cache.

However, some users may prefer to block access to AMP pages for various reasons, such as privacy concerns or to reduce data usage.
While blocking AMP pages might improve page load times and reduce data usage, it's important to note that not all AMP pages are harmful or intrusive.

If you want to block access to AMP pages on your network, you can add the AMP domains to your Pi-hole blocklist to prevent your devices from loading the content.
However, blocking AMP pages may not be the best solution for everyone.

Here are some sample URLs with a list of domains:
- https://ente.dev/api/blocklist/google-amp
- https://ente.dev/api/blocklist/google-amp-hosts
- https://www.github.developerdan.com/hosts/lists/amp-hosts-extended.txt

By blocking these domains with Pi-hole, you can prevent your data from being shared with third-party companies without your consent, and potentially improve your browsing experience.
However, it's worth noting that some websites may not function correctly without AMP pages, and blocking them could lead to a degraded user experience.

## 🐈 Thank you for reading
If you're interested in using [Pi-hole](../What%20is%20Pi-hole.md) to block unwanted domains, you can find a complete list of blocklists [here](../../List.md).
Please consider supporting this repository by starring it if you found this information helpful.
If you have any questions or need further assistance, don't hesitate to ask.