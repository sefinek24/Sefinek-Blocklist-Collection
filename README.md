<img width="41%" align="right" src="images/kitten.png" alt="Gigachad kitten">

<div align="center">
    <h1>
        ✋ Best Block List Collection<br>
        for Pi-hole
    </h1>
    <a href="https://raw.githubusercontent.com/sefinek24/PiHole-Blocklist-Collection/main/images/adlists.png"><img src="images/adlists.png" alt="Domains on Adlists"></a>
    <br><br>
    <img src="https://img.shields.io/github/stars/sefinek24/PiHole-Blocklist-Collection?label=STARS&style=for-the-badge" alt="Stars">
    <img src="https://img.shields.io/github/commit-activity/m/sefinek24/PiHole-Blocklist-Collection?label=COMMIT+ACTIVITY&style=for-the-badge" alt="Commit activity">
</div>
<br>

# 📝 Information
I use this list every day on my PiHole (Raspberry Pi 4), and I haven't had any problems with false positives. [Here](https://cdn.sefinek.net/resources/PiHole-Blocklist-Collection/<FileName>.txt) is a link to my official CDN. Please star the repository if you liked it. Have fun and stay safe! o(>ω<)o

# 😎 Block...
- [**AMP Hosts:**](info/AMP%20Hosts.md) Blocks Accelerated Mobile Pages (AMP) hosts that often serve ads and track user behavior.
- **Abuse:** Blocks known domains involved in online abuse or harassment.
- [**Analytics and telemetry:**](info/Analytics%20and%20telemetry.md) Blocks domains that track user activity for analytics purposes.
- **Block:** TikTok, Snapchat, Omegle, Riot Games, Valorant and League of Legends.
- **CryptoJacking:** Blocks domains that hijack your device to mine cryptocurrency.
- [**Dating services:**](info/Dating%20services.md) Blocks domains of dating websites and apps.
- **Drugs:** Blocks domains that sell or promote drugs.
- **Fake news:** Blocks domains that are known to publish fake or misleading news.
- **Gambling:** Blocks domains of online gambling websites.
- **Hate & junk:** Blocks domains promoting hate speech or spreading false information.
- [**Malvertising:**](info/Malvertising.md) Blocks domains that distribute malware via ads.
- [**Malware:**](info/Malware.md) Blocks domains that are known to host or distribute malware.
- [**Phishing:**](info/Phishing.md) Blocks domains involved in phishing attempts.
- **Piracy:** Blocks domains that distribute pirated software or media.
- **Porn:** Blocks domains of adult websites.
- **Ransomware:** Blocks domains involved in ransomware attacks.
- **Redirect:** Blocks domains that redirect users to unintended websites.
- **Scam:** Blocks domains that are known to promote scams or fraudulent activity.
- **Spam mails:** Blocks domains that send unsolicited email (spam).
- **Spyware:** Blocks domains that distribute spyware or adware.
- [**Tracking:**](info/Tracking.md) Blocks domains that track user activity without user consent.
- [**Useless websites:**](info/Useless%20websites.md) Blocks domains that offer little or no value to users.
- [**YouTube and mobile ads etc.:**](info/YouTube%20and%20mobile%20ads%20etc..md)  Blocks domains that serve ads on YouTube and mobile devices.

# 📃 List / 101 URLs / +6 milion domains
<h3 align="center">
    <a href="List.md">Click here to go to the main list file »</a>
</h3>

# 🔧 Regex
Pi-hole allows you to use regular expressions to create [custom blocklists](https://github.com/mmotti/pihole-regex/blob/master/regex.list#L16). This means you can block an entire domain or specific parts of a domain using a single rule.

For example, the following regular expression would block all subdomains of the example.com domain:
```bash
^([A-Za-z0-9-]+\.)*example\.com$
```
This regular expression matches any string that starts with any number of letters, numbers, or hyphens followed by a period, and then repeats that pattern any number of times. The string must end with "example.com".

You can also use regular expressions to block specific pages on a website. For example, the following regular expression would block any URL containing the word "tracking" on the example.com domain:
```bash
^([A-Za-z0-9-]+\.)*example\.com\/.*tracking.*
```
This regular expression matches any string that starts with any number of letters, numbers, or hyphens followed by a period, and then repeats that pattern any number of times. The string must then include "example.com/", followed by any number of characters, and the word "tracking".

Regular expressions can be a powerful tool for blocking unwanted content on your network. However, they can also be complex to create and maintain, so it's important to test your regex rules thoroughly before implementing them on your Pi-hole.

<h3 align="right">
    <a href="https://github.com/mmotti/pihole-regex/blob/master/regex.list#L16">Go to recommended regex list »</a>
</h3>

# 😻 Contributing
If you have additional domains that you believe should be included in this list, please feel free to contribute by submitting a pull request.

# ✋ Disclaimer
Please note that while this blocklist can improve privacy and security, it may also block legitimate content or services. Use at your own risk.

# 🌠 My other repositories
- [sefinek24/pihole-ping-domains-util](https://github.com/sefinek24/pihole-ping-domains-util)
- [sefinek24/cloudflare-waf-expressions](https://github.com/sefinek24/cloudflare-waf-expressions)

# 🐈 Source of used images
- https://pinterest.com/pin/673288213025042151