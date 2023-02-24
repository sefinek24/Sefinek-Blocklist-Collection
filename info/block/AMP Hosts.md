## 🚫 AMP domains
AMP (Accelerated Mobile Pages) is an open-source framework developed by Google to speed up the loading of mobile web pages. 
The technology is designed to deliver content quickly on mobile devices by removing unnecessary features and optimizing the HTML code.

When a web page is published in AMP format, it uses a different set of HTML tags and a streamlined version of CSS.
This allows the page to load much faster and use fewer network resources, resulting in a better user experience on mobile devices with slower internet connections.

To enable AMP, website owners need to publish their content using AMP HTML, which is a subset of HTML designed for mobile devices.
Publishers can also choose to serve their AMP pages through a Content Delivery Network (CDN) such as Google AMP Cache or Cloudflare AMP Cache.

However, some users may prefer to block access to AMP pages for various reasons, such as privacy concerns or to reduce data usage.
If you want to block access to AMP pages on your network, you can add the AMP domains to your Pi-hole blocklist to prevent your devices from loading the content.

Please note that the following is a list of URLs available for blocking in Pi-hole, but it may not be comprehensive.
These URLs are associated with certain domains that you may wish to block on your network to improve online safety and reduce potential risks.
Please use this list as a reference and consider other measures to further enhance online safety.

Here's a sample list of AMP Hosts that you can block in [Pi-hole](../What%20is%20Pi-hole.md):
- amp.cloudflare.com
- cdn.ampproject.org
- amp.twimg.com
- amp.wordpress.com

By blocking these domains with Pi-hole, you can prevent your data from being shared with third-party companies without your consent, and also improve your browsing experience by avoiding stripped-down web pages.

## 🐈 Thank you for reading
By adding [my list](https://github.com/sefinek24/PiHole-Blocklist-Collection/blob/main/List.md) of URLs to your [Pi-hole](../What%20is%20Pi-hole.md), you can block the listed domains.
Let me know if you have any other questions or if there's anything else I can help you with.