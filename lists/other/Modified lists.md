## 📝 Information
This repository contains a list of blocklists that have been downloaded and modified for your convenience.
The blocklists were modified to improve their effectiveness and to ensure they do not block legitimate traffic.

### pgl.yoyo.org
1. https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/ads/yoyo.AdsTrackersEtc.txt
   - **Added:** No additional domains have been added to this blocklist.
   - **Removed:**
   The domain `click.discord.com` has been removed from this blocklist. This domain is used by Discord for email verification and login attempts, and therefore should not be blocked.

### blocklistproject/Lists
1. https://blocklistproject.github.io/Lists/fraud.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/forks/TheBlockListProject.fraud.txt
   - **Added:** No additional domains have been added to this blocklist.
   - **Removed:**
   The domain `g2a.com` has been removed, as the website associated with it is safe and trusted. Norton Safe Web report: https://safeweb.norton.com/report/show?url=g2a.com

2. https://blocklistproject.github.io/Lists/ads.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/ads/TheBlockListProject.AdsList.txt
   - **Added:** No additional domains have been added to this blocklist.
   - **Removed:**
   The `arc.msn.com` domain has been removed from the list as it is necessary to receive benefits from Xbox Game Pass.


### DandelionSprout/adfilt
1. https://raw.githubusercontent.com/DandelionSprout/adfilt/master/GameConsoleAdblockList.txt
   - **Modified version:** https://blocklist.sefinek.net/generated/0.0.0.0/ads/DandelionSprout.GameConsoleAdblockList.txt
   - **Added:** No additional domains have been added to this blocklist. A warning for `arc.msn.com` explaining why it was removed and how you can add it have been added.
   - **Removed:**
   The `arc.msn.com` domain has been removed from the list as it is necessary to receive benefits from Xbox Game Pass. Bounties for ads have been also removed, see original list for bounty infomation. 

<!--
### jerryn70/GoodbyeAds
- **Modified version:** https://github.com/sefinek24/PiHole-Blocklist-Collection/blob/main/blocklist/GoodbyeAds.txt
- **Added:** No additional domains have been added to this blocklist.
- **Removed:**
  The `graph.facebook.com`...
-->
