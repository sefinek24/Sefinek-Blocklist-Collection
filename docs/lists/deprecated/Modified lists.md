<div align="center">
  <h1>📝 Information</h1>
  This file contains a collection of blocklists (their sources) that have been modified to not block trusted domains.

  <h1>📥 Last update</h1>
  30.01.2024<br>
  <code>DD.MM.YYYY</code>
</div>


## pgl.yoyo.org
#### 1. [[Modified version](https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/yoyo.AdsTrackersEtc.txt)] • https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext
- 🗑️ **Removed:**
  1. `click.discord.com` - This subdomain is used by [Discord](https://discord.com) for email verification and login attempts, and therefore should not be blocked.


## blocklistproject/Lists
#### 1. [[Modified version](https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/blocklistproject.abuse.txt)] • https://blocklistproject.github.io/Lists/abuse.txt
- 🗑️ **Removed:**
  1. `download.komputerswiat.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=download.komputerswiat.pl)
  2. `komputerswiat.pl` - This website is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=komputerswiat.pl)
  3. `www.komputerswiat.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=www.komputerswiat.pl)
  4. `forum.pclab.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=forum.pclab.pl)

#### 2. [[Modified version](https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/blocklistproject.malware.txt)] • https://blocklistproject.github.io/Lists/malware.txt
- 🗑️ **Removed:**
  1. `download.komputerswiat.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=download.komputerswiat.pl)
  2. `komputerswiat.pl` - This website is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=komputerswiat.pl)
  3. `www.komputerswiat.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=www.komputerswiat.pl)
  4. `forum.pclab.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=forum.pclab.pl)

#### 3. [[Modified version](https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/blocklistproject.fraud.txt)] • https://blocklistproject.github.io/Lists/fraud.txt
- 🗑️ **Removed:**
  1. `g2a.com` - This domain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=g2a.com)

#### 4. [[Modified version](https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/blocklistproject.ads.txt)] • https://blocklistproject.github.io/Lists/ads.txt
- 🗑️ **Removed:**
  1. `arc.msn.com` - This subdomain has been removed from the list as it is necessary to receive benefits from [Xbox Game Pass](https://www.xbox.com/en-US/xbox-game-pass).
  2. `widget.trustpilot.com` - The subdomain is responsible for displaying the [trustpilot.com](https://www.trustpilot.com) widget. This widget is not an advertisement and can be useful in determining whether a particular website is trustworthy (e.g., an online store) based on user reviews. The majority of companies use Trustpilot to enhance their customer trust.
  3. `obs.line-scdn.net` - This subdomain is utilized by [LINE](https://line.me). Blocking this subdomain may result in issues with the display or use of stickers in the chat, particularly in the PC version of the application.

## DandelionSprout/adfilt
#### 1. [[Modified version](https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/DandelionSprout.GameConsoleAdblockList.txt)] • https://raw.githubusercontent.com/DandelionSprout/adfilt/master/GameConsoleAdblockList.txt
- 🗑️ **Removed:**
  1. `arc.msn.com` - This subdomain has been removed from the list as it is necessary to receive benefits from [Xbox Game Pass](https://www.xbox.com/en-US/xbox-game-pass). Bounties for ads have been also removed, see original list for bounty information.


## jerryn70/GoodbyeAds
#### 1. [[Modified version](https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/jerryn70.GoodbyeAds.txt)] • https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Hosts/GoodbyeAds.txt
- ✔️ **Fixed:**
  1. `trk.mail.ru,ping` - [[PR #379]](https://github.com/jerryn70/GoodbyeAds/pull/379)

## kboghdady/youTube_ads_4_pi-hole
#### 1. [[Modified version](https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/jerryn70.GoodbyeAds.txt)] • https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/youtubelist.txt
- 🗑️ **Removed:**
  1. `manifest.googlevideo.com` - This subdomain should not be blocked. Programs like [Vividl](https://github.com/Bluegrams/Vividl) that convert videos from YouTube rely on it. Blocking this subdomain could lead to issues with the conversion of YouTube videos.