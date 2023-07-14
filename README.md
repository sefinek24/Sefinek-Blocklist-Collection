<img width="40%" align="right" src="images/kitten.png" alt="Gigachad kitten">
<div align="center">
    <h1>
        The best BlockList Collection<br> made by Sefinek ✋
    </h1>
    <img src="images/adlists.png" alt="Domains on Adlists" title="Screenshot from 20.06.2023 (DD.MM.YYYY).">
    <br><br>
    <img src="https://img.shields.io/github/stars/sefinek24/PiHole-Blocklist-Collection?label=STARS&style=for-the-badge" alt="Stars">
    <img src="https://img.shields.io/github/commit-activity/m/sefinek24/PiHole-Blocklist-Collection?label=COMMIT+ACTIVITY&style=for-the-badge" alt="Commit activity">
    <br>
    <a href="https://blocklist.sefinek.net">View more stats... »</a>
</div>
<br>
<div align="center">
    <a href="https://sefinek.net/blocklist-generator" title="Blocklist Customization - Sefinek's Website">
        <img src="images/generator.png" width="90%" alt="">
    </a>
</div>

<div align="center">
    ⭐ <b>If you found this repository helpful or interesting, please consider giving it a star to show your support!</b> ⭐
    <br>
    👋 <b>Have fun and stay safe!</b> o(>ω<)o 👋
    <br><br>
    <img src="https://count.getloli.com/get/@Sefinek-Blocklist-Collection?theme=rule34" alt="Views" title="Repository views">
</div>

## 📝 Information
False alarms occur very rarely.
If accidental blocking of a legitimate website occurs, please report it to its original Creator, as some lists in this repository ([blocklist/template/forks](blocklist/template/forks) directory) are only downloaded and converted into various formats.
Under no circumstances should they be modified because they will be overwritten by GitHub Actions.
However, if a blocklist is not located in the aforementioned folder, you can create a new Pull Request or Issue.

If I come across a false alarm while browsing the internet, I usually eliminate it immediately if it is within my capabilities.

**To summarize:**
- `blocklist/template/forks/*` - Files with lists downloaded by GitHub Actions and ready to be converted into various formats, e.g., from 0.0.0.0 example.com to another format. **DO NOT MODIFY** THEM, EVEN IF YOU CREATE A PULL REQUEST!
- `blocklist/template/*` - Modified copies of other blocklists or custom lists created for this repository. **You can modify** them as they will never be overwritten in the future.
- `blocklist/generated/*` - Blocklists generated in various formats from the template. **DO NOT MODIFY** ANY FILE IN THIS FOLDER!

> You have two options. You can use the [default blocklist](lists/Index.md) or [visit my website](https://sefinek.net/blocklist-generator) and use the list generator. You will be able to choose what should be blocked.


## ✋ Warning
It is important to regularly check this repository for updates and potential changes.
However, it should be noted that while this blocking list can improve your privacy and security, it may unintentionally block legitimate content or services. Therefore, use it at your own risk.

## 📥 Update frequency
- **Repository:**  
The blocklists in this repository are updated every `2 hours` by [GitHub Actions](.github/workflows/download-blocklists.yml).
- **Remote ([blocklist.sefinek.net](https://blocklist.sefinek.net)):**  
It is synchronized daily at `00:00` and `06:00`. 24-hour clock; Poland time zone `GMT+01:00`; Cron: `0 0,6 * * *`; At minute 0 past hour 0 and 6;
> **Note**: Go [here](https://blocklist.sefinek.net/update-frequency) and see when the next repository synchronization is scheduled based on your time zone. It can help you determine the appropriate time for the cron job for your Pi-hole instance or any other ad blocker.

## 🌍 Links
- [Homepage (stats, other urls)](https://blocklist.sefinek.net)
- [File explorer (Index of /generated/)](https://blocklist.sefinek.net/generated)
- [Git pull logs (Last repo synchronizes)](https://blocklist.sefinek.net/logs): `Remote` [github.com] → `Local` [blocklist.sefinek.net]

## ✨ Default blocklist
- [**Abuse:**](info/block/Abuse.md) Blocks known domains involved in online abuse or harassment.
- [**Advertising:**](info/block/Advertising.md) Blocks domains that serve advertisements to visitors.
- [**AMP Hosts:**](info/block/AMP%20Hosts.md) Blocks Accelerated Mobile Pages (AMP) hosts that often serve ads and track user behavior.
- [**Websites & Games:**](info/block/Block%20websites%20and%20games.md) TikTok, Snapchat, Omegle, Riot Games, Valorant and League of Legends.
- [**CryptoJacking:**](info/block/CryptoJacking.md) Blocks domains that hijack your device to mine cryptocurrency.
- [**Dating Services:**](info/block/Dating%20services.md) Blocks domains of dating websites and apps.
- [**Drugs:**](info/block/Drugs.md) Blocks domains that sell or promote drugs.
- [**Fake News:**](info/block/Fake%20news.md) Blocks domains that are known to publish fake or misleading news.
- [**Gambling:**](info/block/Gambling.md) Blocks domains of online gambling websites.
- [**Hate & Junk:**](info/block/Hate%20and%20junk.md) Blocks domains promoting hate speech or spreading false information.
- [**Malicious:**](info/block/Malicious.md) Blocks domains that are considered dangerous or malicious.
- [**Phishing:**](info/block/Phishing.md) Blocks domains involved in phishing attempts.
- [**Piracy:**](info/block/Piracy.md) Blocks domains that distribute pirated software or media.
- [**Porn:**](info/block/Porn.md) Blocks domains of adult websites.
- [**Ransomware:**](info/block/Ransomware.md) Blocks domains involved in ransomware attacks.
- [**Redirect:**](info/block/Redirect.md) Blocks domains that redirect users to unintended websites.
- [**Scam:**](info/block/Scam.md) Blocks domains that are known to promote scams or fraudulent activity.
- [**Spam mails:**](info/block/Spam%20mails.md) Blocks domains that send unsolicited email.
- [**Spyware:**](info/block/Spyware.md) Blocks domains that distribute spyware or adware.
- [**Telemetry & Tracking:**](info/block/Telemetry%20and%20Tracking.md) Blocks domains that track user activity for analytics purposes.
- [**Useless websites:**](info/block/Useless%20websites.md) Blocks domains that offer little or no value to users.

<h3 align="right">
    <a href="lists/Index.md">📃 Choose your adblocker and copy URL addresses »</a>
</h3>

## 🔧 Regex list
<h3 align="right">
    <a href="info/What is Regex.md">View the regex list and read additional information »</a>
</h3>

## 🤔 Tutorials
- [How to install Pi-hole?](tutorials/How%20to%20install%20Pi-hole.md)
- [How to install Unbound for Pi-hole?](tutorials/How%20to%20install%20Unbound%20for%20Pi-hole.md)

## 🤝 Contributing
I welcome your contributions!
If you know of any additional domains that you believe should be included in this list, I would be grateful if you could share them with me.
I kindly invite you to contribute to this project by submitting a [Pull request](https://github.com/sefinek24/Sefinek-Blocklist-Collection/pulls).
Your effort and input will be highly appreciated and will help me make this list even more comprehensive and useful for others.
Thank you in advance for your valuable contribution!

## 🌠 My other repositories
1. [sefinek24/pihole-ping-domains-util](https://github.com/sefinek24/pihole-ping-domains-util)
2. [sefinek24/cloudflare-waf-expressions](https://github.com/sefinek24/cloudflare-waf-expressions)

## 🐈 Source of used images
- https://pinterest.com
- https://www.freepik.com
