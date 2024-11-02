<div align="center"><h1>The best Blocklist Collection ✋<br>made by Sefinek</h1></div>
<img width="37%" align="right" src="images/kitten.png" alt="Orange kittyo">
<div align="center">
    <br><br>
    <img src="https://api.sefinek.net/api/v2/moecounter/@Sefinek-Blocklist-Collection" alt="README.md views" title="Repository views">
    <br>
    <img src="https://img.shields.io/github/stars/sefinek/Sefinek-Blocklist-Collection?label=STARS&style=for-the-badge" alt="Stars">
    <img src="https://img.shields.io/github/commit-activity/m/sefinek/Sefinek-Blocklist-Collection?label=COMMIT+ACTIVITY&style=for-the-badge" alt="Commit activity">
    <br>
    <a href="https://blocklist.sefinek.net/#stats" target="_blank">View more stats... »</a>
    <br><br>
    <p>If you found this repository helpful or interesting, please consider giving it a star to show your support! ⭐</p>
</div>

## 📝 Information
Visit the official website of the project at [blocklist.sefinek.net](https://blocklist.sefinek.net) for more details.  
New lists were added to the [generator](https://sefinek.net/blocklist-generator) on **October 19, 2024**. Please update your collection on your end ;)

<h2>💗 Powered by Storm Server Hosting</h2>
<div align="center">
  <a href="https://stormserverhosting.com" target="_blank">
    <img src="https://cdn.sefinek.net/images/stormserverhosting/banner-white.png" height="130" alt="Storm Server Hosting">
  </a>
</div>

## 📦 How to Acquire the Blocklist
- The first option is to [generate your own list](https://sefinek.net/blocklist-generator), which is recommended for all users as it allows for customization based on specific needs and preferences.
- The second option is to use the [default list](https://github.com/sefinek/Sefinek-Blocklist-Collection/tree/main/docs/lists/md) provided. This option is ideal for users who prefer a quick, straightforward solution without customization.


## ❌ How to Report a False Positive?
You can report a false positive by creating a new [Issue](https://github.com/sefinek/Sefinek-Blocklist-Collection/issues), [creating a new PR](https://github.com/sefinek/Sefinek-Blocklist-Collection/pulls) (just remember to follow the required syntax, see [whitelists/main.txt](https://github.com/sefinek/Sefinek-Blocklist-Collection/blob/main/whitelists/main.txt#L10)), sending me a message on [Discord](https://sefinek.net), or contacting me via [email](https://sefinek.net).
Within 48 hours, I will add the domain or subdomain to the [whitelist](whitelists/main.txt).
Shortly afterward, the false positive will be automatically removed from the blocklist via [GitHub Actions](.github/workflows/generate-blocklists.yml).
The blocklists on the primary server ([blocklist.sefinek.net](https://blocklist.sefinek.net)) are updated every 25 hours (cron schedule: 0 1,6 * * *).


## 📥 Update Schedule
- **This repository:**  
  The blocklists in this repository are updated every `2 hours` by [GitHub Actions](.github/workflows/download-blocklists.yml).
- **Remote ([blocklist.sefinek.net](https://blocklist.sefinek.net)):**  
  Synchronization occurs daily at `01:00` and `06:00` (24-hour clock, Poland time zone: `GMT+01:00`). Cron: `0 1,6 * * *` (at minute 0 past hour 1 and 6).
> [!IMPORTANT]  
> Visit [this subpage](https://blocklist.sefinek.net/update-schedule) to check the next repository synchronization schedule in your time zone.  
> This will help you set the optimal time for the cron job on your [Pi-hole](https://pi-hole.net) instance or other blocking software, including DNS servers.


## 🌍 Links
- [Blocklist generator (for Pi-hole, AdGuard, etc.)](https://sefinek.net/blocklist-generator)
- [Homepage of blocklist.sefinek.net (stats, update schedule, API for devs, etc.)](https://blocklist.sefinek.net)
- [File explorer (Index of /generated/v1)](https://blocklist.sefinek.net/generated/v1)
- [Git pull logs (Last repo synchronization)](https://blocklist.sefinek.net/logs/v1): `Remote` [github.com] → `Local` [blocklist.sefinek.net]


## ✨ Default Blocklist
- **Abuse:** Blocks known domains involved in online abuse or harassment.
- **Advertising:** Blocks domains that serve advertisements to visitors.
- **AMP Hosts:** Blocks Accelerated Mobile Pages (AMP) hosts that often serve ads and track user behavior.
- **CryptoJacking:** Blocks domains that hijack your device to mine cryptocurrency.
- **Dating Services:** Blocks domains of dating websites and apps.
- **Drugs:** Blocks domains that sell or promote drugs.
- **Fake News:** Blocks domains known for publishing fake or misleading news.
- **Gambling:** Blocks domains of online gambling websites.
- **Hate & Junk:** Blocks domains promoting hate speech or spreading misinformation.
- **LGBTQ+ Content:** Blocks domains related to LGBTQ+ content.
- **Malicious:** Blocks domains considered dangerous or malicious.
- **Phishing:** Blocks domains involved in phishing attempts.
- **Piracy:** Blocks domains distributing pirated software, etc.
- **Porn:** Blocks domains of adult websites.
- **Ransomware:** Blocks domains involved in ransomware attacks.
- **Redirect:** Blocks domains that redirect users to unintended websites.
- **Scam:** Blocks domains known for promoting scams or fraudulent activities.
- **Spam Mails:** Blocks domains that send unsolicited emails.
- **Spyware:** Blocks domains distributing spyware or adware.
- **Telemetry & Tracking:** Blocks domains that track user activity for analytics purposes.
- **Useless Websites:** Blocks low-value or parked domains that offer little to no value to users.
- **Websites & Games:** TikTok, Snapchat, Omegle, Riot Games, Valorant, and League of Legends.


<h3 align="right">
    📃 <a href="docs/lists/Index.md">Select your DNS server and copy the URLs »</a><br>
    🔡 <a href="docs/lists/Regex.md">View the regex list »</a>
</h3>


## ✋ Warning
It is important to regularly check this repository for updates and potential changes.
Please note that while this blocklist can enhance your privacy and security, it may unintentionally block legitimate content or services.

New lists are added periodically. You can install the [Sefinek Blocklists](https://apps.microsoft.com/detail/9p3tnt3pjd0j) app from the Microsoft Store for quick and easy access to these lists.


## 🤝 Contributing
I truly appreciate your interest in contributing!
If you have any suggestions or ideas that could enhance this project, please feel free to share them with me.
I warmly encourage you to contribute by submitting a [Pull request](https://github.com/sefinek/Sefinek-Blocklist-Collection) with your proposed changes.
Your efforts and insights are highly valued and will help make this project even better and more useful for others.
Thank you in advance for your valuable contribution!


## 📥 How to Clone the Repository?
```bash
git clone --branch main --single-branch https://github.com/sefinek/Sefinek-Blocklist-Collection
```


## 🌠 My Other Repositories
1. [Cloudflare-WAF-Expressions](https://github.com/sefinek/Cloudflare-WAF-Expressions)
2. [Node-Cloudflare-WAF-AbuseIPDB](https://github.com/sefinek/Node-Cloudflare-WAF-AbuseIPDB)
3. [UFW-AbuseIPDB-Reporter](https://github.com/sefinek/UFW-AbuseIPDB-Reporter)


## 🐈 Sources of Images Used
- https://pinterest.com
- https://www.freepik.com


## 🔒 License
<div align="center">
  <code>CC BY-NC-ND 4.0</code><br><br>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fsefinek%2FSefinek-Blocklist-Collection?ref=badge_large">
    <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsefinek%2FSefinek-Blocklist-Collection.svg?type=large" alt="FOSSA Status">
  </a>
</div>