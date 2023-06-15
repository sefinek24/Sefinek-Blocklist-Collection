## 📝 Information
This repository contains a list of blocklists that have been downloaded and modified for your convenience.
The blocklists were modified to improve their effectiveness and to ensure they do not block legitimate traffic.


### pgl.yoyo.org
1. https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/ads/yoyo.AdsTrackersEtc.txt
   - **Removed:**
   The domain `click.discord.com` has been removed from this blocklist. This domain is used by Discord for email verification and login attempts, and therefore should not be blocked.


### blocklistproject/Lists
1. https://blocklistproject.github.io/Lists/abuse.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/forks/theblocklistproject.fraud.txt
     - **Removed:**
       - `download.komputerswiat.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=download.komputerswiat.pl)
       - `komputerswiat.pl` - This website is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=komputerswiat.pl)
       - `www.komputerswiat.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=www.komputerswiat.pl)

2. https://blocklistproject.github.io/Lists/malware.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/forks/theblocklistproject.malware.txt
      - **Removed:**
         - `download.komputerswiat.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=download.komputerswiat.pl)
         - `komputerswiat.pl` - This website is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=komputerswiat.pl)
         - `www.komputerswiat.pl` - This subdomain is safe - [Norton Safe Web report](https://safeweb.norton.com/report/show?url=www.komputerswiat.pl)

3. https://blocklistproject.github.io/Lists/fraud.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/forks/theblocklistproject.fraud.txt
   - **Removed:**
   The domain `g2a.com` has been removed, as the website associated with it is safe and trusted. Norton Safe Web report: https://safeweb.norton.com/report/show?url=g2a.com

4. https://blocklistproject.github.io/Lists/ads.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/ads/theblocklistproject.AdsList.txt
   - **Removed:**
   The `arc.msn.com` domain has been removed from the list as it is necessary to receive benefits from Xbox Game Pass.


### DandelionSprout/adfilt
1. https://raw.githubusercontent.com/DandelionSprout/adfilt/master/GameConsoleAdblockList.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/ads/DandelionSprout.GameConsoleAdblockList.txt
   - **Removed:**
   The `arc.msn.com` domain has been removed from the list as it is necessary to receive benefits from Xbox Game Pass. Bounties for ads have been also removed, see original list for bounty infomation. 


### jerryn70/GoodbyeAds
1. https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Hosts/GoodbyeAds.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/ads/jerryn70.GoodbyeAds.txt
   - **Fixed:**
      * trk.mail.ru,ping [[#379]](https://github.com/jerryn70/GoodbyeAds/pull/379)