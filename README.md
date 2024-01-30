<img width="40%" align="right" src="images/kitten.png" alt="Gigachad kitten">
<div align="center">
    <h1>
        The best Blocklist Collection<br> made by Sefinek ✋
    </h1>
    <img src="images/adlists.png" alt="Domains on Adlists" title="Screenshot from 30.01.2024 (DD.MM.YYYY).">
    <br><br>
    <img src="https://img.shields.io/github/stars/sefinek24/PiHole-Blocklist-Collection?label=STARS&style=for-the-badge" alt="Stars">
    <img src="https://img.shields.io/github/commit-activity/m/sefinek24/PiHole-Blocklist-Collection?label=COMMIT+ACTIVITY&style=for-the-badge" alt="Commit activity">
    <br>
    <a href="https://blocklist.sefinek.net/#stats" target="_blank">View more stats... »</a>
</div>
<br>
<div align="center">
    <a href="https://sefinek.net/blocklist-generator" title="Personalized Blocklist Generator - Take Full Control of Your Network">
        <img src="images/generator.png" width="90%" alt="">
    </a>
</div>

<div align="center">
    ⭐ <b>If you found this repository helpful or interesting, please consider giving it a star to show your support!</b> ⭐
    <br>
    👋 <b>Have fun and stay safe!</b> o(>ω<)o 👋
    <br><br>
    <img src="https://api.sefinek.net/api/v2/moecounter/@Sefinek-Blocklist-Collection?theme=rule34" alt="Views" title="Repository views">
</div>


## 📝 Information
False alarms occur very rarely.
If accidental blocking of a legitimate website occurs, please report it to its original Creator, as some lists in this repository ([blocklist/template/forks](blocklist/template/forks) directory) are only downloaded and converted into various formats.
Under no circumstances should they be modified because they will be overwritten by [GitHub Actions](.github/workflows/download-blocklists.yml).
However, if a blocklist is not located in the aforementioned folder, you can create a new [Pull request](https://github.com/sefinek24/Sefinek-Blocklist-Collection/pulls) or [Issue](https://github.com/sefinek24/Sefinek-Blocklist-Collection/issues).

If I come across a false alarm while browsing the internet, I usually eliminate it immediately if it is within my capabilities.

| Path                         | Modifying | Description                                                                                                                                                                                                   |
|------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `blocklist/template/forks/*` | ❎         | Files with lists downloaded by GitHub Actions and ready to be converted into various formats, e.g., from 0.0.0.0 example.com to another format.<br>**DO NOT MODIFY** THEM, EVEN IF YOU CREATE A PULL REQUEST! |
| `blocklist/template/*`       | ✅         | Modified copies of other blocklists or custom lists created for this repository.<br>**You can modify** them as they will never be overwritten in the future.                                                  |
| `blocklist/generated/*`      | ❎         | Blocklists generated in various formats from the template.<br>**DO NOT MODIFY** ANY FILE IN THIS FOLDER!                                                                                                      |

> **Note**
> You have two options. You can use the [default blocklist](https://github.com/sefinek24/Sefinek-Blocklist-Collection/blob/main/lists/Index.md) or [visit my website](https://sefinek.net/blocklist-generator) and use the list generator.


## 💸 Support me if you like this
Unfortunately, **my home internet connection doesn't allow me to host a blocklist**, so I'm asking for your support. Every donation will be helpful, and the VPS server will be available all the time. Additionally, this project will be continuously supported by me. Thank you! 😹😻
> https://sefinek.net/support-me  (Patreon, Ko-fi, GitHub Sponsors, Stripe)  
> https://paypal.me/sefinek (email for PayPal: contact@sefinek.net)


## 📥 Update frequency
- **Repository:**  
The blocklists in this repository are updated every `2 hours` by [GitHub Actions](.github/workflows/download-blocklists.yml).
- **Remote ([blocklist.sefinek.net](https://blocklist.sefinek.net)):**  
It is synchronized daily at `00:00` and `06:00`. 24-hour clock; Poland time zone `GMT+01:00`; Cron: `0 0,6 * * *`; At minute 0 past hour 0 and 6;
> [!IMPORTANT]
> Go [here](https://blocklist.sefinek.net/update-frequency) and see when the next repository synchronization is scheduled based on your time zone. It can help you determine the appropriate time for the cron job for your Pi-hole instance or any other ad blocker.


## 🌍 Links
- [Blocklist generator (sefinek.net)](https://sefinek.net/blocklist-generator)
- [Homepage of blocklist.sefinek.net (stats, updates frequency, API for devs etc.)](https://blocklist.sefinek.net)
- [File explorer (Index of /generated/)](https://blocklist.sefinek.net/generated)
- [Git pull logs (Last repo synchronizes)](https://blocklist.sefinek.net/logs): `Remote` [github.com] → `Local` [blocklist.sefinek.net]


## ✨ Default blocklist
- [**AMP Hosts:**](https://blocklist.sefinek.net/viewer/info/block/AMP_Hosts) Blocks Accelerated Mobile Pages (AMP) hosts that often serve ads and track user behavior.
- [**Abuse:**](https://blocklist.sefinek.net/viewer/info/block/Abuse) Blocks known domains involved in online abuse or harassment.
- [**Advertising:**](https://blocklist.sefinek.net/viewer/info/block/Advertising) Blocks domains that serve advertisements to visitors.
- [**Websites & Games:**](https://blocklist.sefinek.net/viewer/info/block/Block_websites_and_games) TikTok, Snapchat, Omegle, Riot Games, Valorant and League of Legends.
- [**CryptoJacking:**](https://blocklist.sefinek.net/viewer/info/block/CryptoJacking) Blocks domains that hijack your device to mine cryptocurrency.
- [**Dating Services:**](https://blocklist.sefinek.net/viewer/info/block/Dating_services) Blocks domains of dating websites and apps.
- [**Drugs:**](https://blocklist.sefinek.net/viewer/info/block/Drugs) Blocks domains that sell or promote drugs.
- [**Fake News:**](https://blocklist.sefinek.net/viewer/info/block/Fake_news) Blocks domains that are known to publish fake or misleading news.
- [**Gambling:**](https://blocklist.sefinek.net/viewer/info/block/Gambling) Blocks domains of online gambling websites.
- [**Hate & Junk:**](https://blocklist.sefinek.net/viewer/info/block/Hate_and_junk) Blocks domains promoting hate speech or spreading false information.
- [**Malicious:**](https://blocklist.sefinek.net/viewer/info/block/Malicious) Blocks domains that are considered dangerous or malicious.
- [**Phishing:**](https://blocklist.sefinek.net/viewer/info/block/Phishing) Blocks domains involved in phishing attempts.
- [**Piracy:**](https://blocklist.sefinek.net/viewer/info/block/Piracy) Blocks domains that distribute pirated software or media.
- [**Porn:**](https://blocklist.sefinek.net/viewer/info/block/Porn) Blocks domains of adult websites.
- [**Ransomware:**](https://blocklist.sefinek.net/viewer/info/block/Ransomware) Blocks domains involved in ransomware attacks.
- [**Redirect:**](https://blocklist.sefinek.net/viewer/info/block/Redirect) Blocks domains that redirect users to unintended websites.
- [**Scam:**](https://blocklist.sefinek.net/viewer/info/block/Scam) Blocks domains that are known to promote scams or fraudulent activity.
- [**Spam mails:**](https://blocklist.sefinek.net/viewer/info/block/Spam_mails) Blocks domains that send unsolicited email.
- [**Spyware:**](https://blocklist.sefinek.net/viewer/info/block/Telemetry_and_Tracking) Blocks domains that distribute spyware or adware.
- [**Telemetry & Tracking:**](https://blocklist.sefinek.net/viewer/info/block/Telemetry_and_Tracking) Blocks domains that track user activity for analytics purposes.
- [**Useless websites:**](https://blocklist.sefinek.net/viewer/info/block/Useless_websites) Blocks domains that offer little or no value to users.
- [**YouTube Ads:**](https://blocklist.sefinek.net/viewer/info/block/Useless_websites) Blocks ads on YouTube. Unfortunately, this will not be effective.

<h3 align="right">
    📃 <a href="lists/Index.md">Choose your adblocker and copy URL addresses »</a>
</h3>


## 🔧 Regex list
<h3 align="right">
    🔡 <a href="docs/info/What is Regex.md">View the regex list and read additional information »</a>
</h3>


## ✋ Warning
It is important to regularly check this repository for updates and potential changes.
However, it should be noted that while this blocking list can improve your privacy and security, it may unintentionally block legitimate content or services. Therefore, use it at your own risk.


## 🤔 Tutorials
- [How to install Pi-hole?](https://blocklist.sefinek.net/viewer/tutorials/How_to_install_Pi-hole)
- [How to install Unbound for Pi-hole?](https://blocklist.sefinek.net/viewer/tutorials/How_to_install_Unbound_for_Pi-hole)


## 🤝 Contributing
I appreciate your interest in contributing!
If you have any suggestions or additions that you think would improve this project, please don't hesitate to share them with me.
I warmly invite you to contribute to this project by submitting a Pull request, where you can contribute your changes.
Your efforts and insights will be greatly valued and will contribute to making this project even better and more beneficial for others.<br>
Thank you in advance for your valuable contribution!


## ✔️ Todo
1. Fix [create-everything-list.js](scripts/create-everything-list.js).
2. Improve all [scripts](scripts).


## 🌠 My other ~~useless~~ repositories
1. [sefinek24/pihole-ping-domains-util](https://github.com/sefinek24/pihole-ping-domains-util)
2. [sefinek24/cloudflare-waf-expressions](https://github.com/sefinek24/cloudflare-waf-expressions)


## 🐈 Source of used images
- https://pinterest.com
- https://www.freepik.com