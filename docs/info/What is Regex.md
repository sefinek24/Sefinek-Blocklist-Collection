<!-- SEO DATA FOR BLOCKLIST.SEIFNEK.NET
* Title       : What is Regex?
* Description : 
* Tags        :
* Canonical   : /viewer/info/What_is_Regex
-->

# 🔧 Regex
Pi-hole allows you to use regular expressions to create [custom blocklists](https://github.com/sefinek24/Sefinek-Blocklist-Collection/blob/main/info/regex/List.md#-----regex-filters-provided-by-mmotti). This means you can block an entire domain or specific parts of a domain using a single rule.

For example, the following regular expression would block all subdomains of the example.com domain:
```regexp
^([A-Za-z0-9-]+\.)*example\.com$
```
This regular expression matches any string that starts with any number of letters, numbers, or hyphens followed by a period, and then repeats that pattern any number of times. The string must end with "example.com".

You can also use regular expressions to block specific pages on a website. For example, the following regular expression would block any URL containing the word "tracking" on the example.com domain:
```regexp
^([A-Za-z0-9-]+\.)*example\.com/.*tracking.*
```
This regular expression matches any string that starts with any number of letters, numbers, or hyphens followed by a period, and then repeats that pattern any number of times. The string must then include "example.com/", followed by any number of characters, and the word "tracking".

Regular expressions can be a powerful tool for blocking unwanted content on your network. However, they can also be complex to create and maintain, so it's important to test your regex rules thoroughly before implementing them on your Pi-hole.

<h3 align="right">
    <a href="../lists/Regex.md">Go to recommended regex list »</a>
</h3>