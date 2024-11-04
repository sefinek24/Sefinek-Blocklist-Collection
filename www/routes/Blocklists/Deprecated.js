const express = require('express');
const router = express.Router();
const path = require('node:path');

const ZeroZeroZeroZero = path.join(__dirname, '..', '..', '..', 'blocklists', 'generated', '0.0.0.0');
const localhost = path.join(__dirname, '..', '..', '..', 'blocklists', 'generated', '127.0.0.1');
const noIp = path.join(__dirname, '..', '..', '..', 'blocklists', 'generated', 'noip');
const adguard = path.join(__dirname, '..', '..', '..', 'blocklists', 'generated', 'adguard');
const dnsmasq = path.join(__dirname, '..', '..', '..', 'blocklists', 'generated', 'dnsmasq');

// ----------------- 0.0.0.0 -----------------
// Ads
router.get('/generated/0.0.0.0/ads/blocklistproject.ads.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/blocklistproject/hosts.fork.txt`));
router.get('/generated/0.0.0.0/ads/jerryn70.GoodbyeAds.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/jerryn70/GoodbyeAds.fork.txt`));
router.get('/generated/0.0.0.0/forks/kboghdady.youtubelist.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/kboghdady/youtubelist.fork.txt`));
router.get('/generated/0.0.0.0/ads/DandelionSprout.GameConsoleAdblockList.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/DandelionSprout.GameConsoleAdblockList.txt`));
router.get('/generated/0.0.0.0/ads/yoyo.AdsTrackersEtc.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/yoyo/ads-trackers-etc.fork.txt`));
router.get('/generated/0.0.0.0/forks/0Zinc.easylist.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/0.0.0.0/forks/ShadowWhisperer.Ads.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/ShadowWhisperer/Ads.fork.txt`));
router.get('/generated/0.0.0.0/forks/adaway.hosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/adaway/hosts.fork.txt`));
router.get('/generated/0.0.0.0/forks/anudeepND.adservers.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/anudeepND/adservers.fork.txt`));
router.get('/generated/0.0.0.0/forks/blocklistproject.youtube.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/blocklistproject/youtube.fork.txt`));
router.get('/generated/0.0.0.0/forks/craiu.mobiletrackers.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/craiu/mobiletrackers.fork.txt`));
router.get('/generated/0.0.0.0/forks/crazy-max.WindowsSpyBlocker.hosts-spy.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/crazy-max/spy.fork.txt`));
router.get('/generated/0.0.0.0/forks/disconnectme.simple_ad.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/disconnectme/simple-ad.fork.txt`));
router.get('/generated/0.0.0.0/forks/firebog.AdguardDNS.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/0.0.0.0/forks/firebog.Admiral.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/firebog/Admiral.fork.txt`));
router.get('/generated/0.0.0.0/forks/firebog.Easylist.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/0.0.0.0/forks/firebog.Prigent-Ads.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/firebog/Prigent-Ads.fork.txt`));
router.get('/generated/0.0.0.0/forks/MajkiIT.Ad_filter_list_by_Disconnect.txt', (req, res) => res.sendStatus(404));
router.get('/generated/0.0.0.0/forks/MajkiIT.SmartTV_ads.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/MajkiIT/SmartTV-ads.fork.txt`));
router.get('/generated/0.0.0.0/forks/r-a-y.AdguardMobileAds.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/r-a-y/AdguardMobileAds.fork.txt`));

// Tracking & telemetry
router.get('/generated/0.0.0.0/forks/0Zinc.easyprivacy.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/tracking-and-telemetry/0Zinc/easyprivacy.fork.txt`));
router.get('/generated/0.0.0.0/forks/ente-dev.tv.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/tracking-and-telemetry/ente-dev/tv.fork.txt`));
router.get('/generated/0.0.0.0/forks/frogeye.firstparty-trackers-hosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/tracking-and-telemetry/frogeye/firstparty-trackers-hosts.txt`));
router.get('/generated/0.0.0.0/forks/MajkiIT.adguard_mobile_host.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/tracking-and-telemetry/MajkiIT/adguard-mobile-host.fork.txt`));
router.get('/generated/0.0.0.0/forks/mitchellkrogza.Stop.Google.Analytics.Ghost.Spam-INACTIVE.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/tracking-and-telemetry/mitchellkrogza/INACTIVE.fork.txt`));
router.get('/generated/0.0.0.0/forks/neodevpro.neodevhost.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/tracking-and-telemetry/neodevpro/host.fork.txt`));

// AMP Hosts
router.get('/generated/0.0.0.0/forks/developerdan.amp-hosts-extended.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/amp/developerdan/amp-hosts-extended.fork.txt`));
router.get('/generated/0.0.0.0/forks/ente-dev.google-amp-hosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/amp/ente-dev/google-amp-hosts.fork.txt`));

// Malicious
router.get('/generated/0.0.0.0/forks/AssoEchap.stalkerware-indicators.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/AssoEchap/stalkerware-indicators.fork.txt`));
router.get('/generated/0.0.0.0/forks/bigdargon.hostsVN.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/bigdargon/hostsVN.fork.txt`));
router.get('/generated/0.0.0.0/forks/DandelionSprout-AntiMalwareHosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/DandelionSprout-AntiMalwareHosts.fork.txt`));
router.get('/generated/0.0.0.0/forks/digitalside.latestdomains.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/0.0.0.0/forks/disconnectme.simple_malvertising.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/disconnectme/simple-malvertising.fork.txt`));
router.get('/generated/0.0.0.0/forks/malware-filter.urlhaus-filter-hosts-online.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/malware-filter/urlhaus-filter-hosts-online.fork.txt`));
router.get('/generated/0.0.0.0/forks/quidsup.notrack-malware.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/quidsup/notrack-malware.fork.txt`));
router.get('/generated/0.0.0.0/forks/RPiList-Malware.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/RPiList/Malware.fork.txt`));
router.get('/generated/0.0.0.0/forks/Spam404.main-blacklist.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/Spam404/main-blacklist.fork.txt`));
router.get('/generated/0.0.0.0/malicious/blocklistproject.malware.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/blocklistproject/malware.fork.txt`));
router.get('/generated/0.0.0.0/malicious/main.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/sefinek.hosts1.txt`));
router.get('/generated/0.0.0.0/malicious/main-2.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/sefinek.hosts2.txt`));
router.get('/generated/0.0.0.0/malicious/reported-by-norton.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/reported-by-norton.txt`));
router.get('/generated/0.0.0.0/malicious/web-attacks.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/web-attacks.txt`));

// Phishing
router.get('/generated/0.0.0.0/forks/blocklistproject.phishing.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/phishing/blocklistproject/phishing.fork.txt`));
router.get('/generated/0.0.0.0/forks/Dogino.Discord-Phishing-URLs-phishing.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/phishing/Dogino/Discord-Phishing-URLs-phishing.fork.txt`));
router.get('/generated/0.0.0.0/forks/phishingArmy.phishing_army_blocklist_extended.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/phishing/phishing.army/blocklist-extended.fork.txt`));
router.get('/generated/0.0.0.0/forks/RPiList-Phishing.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/phishing/RPiList/Phishing-Angriffe.fork.txt`));
router.get('/generated/0.0.0.0/phishing.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/phishing/sefinek.hosts.txt`));
router.get('/generated/0.0.0.0/malicious/phishing.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/phishing/sefinek.hosts.txt`));

// Ransomware
router.get('/generated/0.0.0.0/forks/blocklistproject.ransomware.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ransomware/blocklistproject/ransomware.fork.txt`));

// Cryptojacking
router.get('/generated/0.0.0.0/forks/hoshsadiq.adblock-nocoin-list.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/crypto/cryptojacking/hoshsadiq/adblock-nocoin-list.fork.txt`));
router.get('/generated/0.0.0.0/forks/Snota418.Crypto-streams.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/crypto/cryptojacking/Snota418/Crypto-streams.fork.txt`));
router.get('/generated/0.0.0.0/forks/firebog.Prigent-Crypto.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/crypto/cryptojacking/firebog/Prigent/Crypto.fork.txt`));
router.get('/generated/0.0.0.0/forks/zerodot1.CoinBlockerLists.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/crypto/cryptojacking/zerodot1/CoinBlockerLists-hosts.fork.txt`));

// Abuse
router.get('/generated/0.0.0.0/forks/abuse.urlhaus.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}//abuse/urlhaus.abuse.ch/hostfile.fork.txt`));
router.get('/generated/0.0.0.0/malicious/blocklistproject.abuse.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/abuse/blocklistproject/hosts.fork.txt`));

// Fraud
router.get('/generated/0.0.0.0/malicious/blocklistproject.fraud.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/fraud/blocklistproject/hosts.fork.txt`));

// Spam
router.get('/generated/0.0.0.0/forks/RPiList.Spam-Mails.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/spam/RPiList/spam-mails.fork.txt`));
router.get('/generated/0.0.0.0/forks/stopforumspam.toxic_domains_whole.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/spam/stopforumspam/toxic-domains-whole.fork.txt`));

// Piracy
router.get('/generated/0.0.0.0/forks/blocklistproject.piracy.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/piracy/blocklistproject/piracy.fork.txt`));

// Redirect
router.get('/generated/0.0.0.0/forks/blocklistproject.redirect.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/redirect/blocklistproject/redirect.fork.txt`));

// Scam
router.get('/generated/0.0.0.0/forks/blocklistproject.scam.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/scam/blocklistproject/scam.fork.txt`));
router.get('/generated/0.0.0.0/forks/Dogino.Discord-Phishing-URLs-scam.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/scam/Dogino/Discord-Phishing-URLs-scam.fork.txt`));
router.get('/generated/0.0.0.0/forks/durablenapkin.scamblocklist.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/scam/durablenapkin/scamblocklist.fork.txt`));

// Suspicious
router.get('/generated/0.0.0.0/forks/firebog.w3kbl.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/suspicious/firebog/w3kbl.fork.txt`));

// Extension
router.get('/generated/0.0.0.0/forks/cbuijs.adult-domains.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/0.0.0.0/forks/deathbybandaid.CountryCodesLists-France.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/deathbybandaid/CountryCodesLists-France.fork.txt`));
router.get('/generated/0.0.0.0/forks/deathbybandaid.ParsedBlacklists-easylist-fr.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/deathbybandaid/ParsedBlacklists-EasyList-Liste-FR.fork.txt`));
router.get('/generated/0.0.0.0/forks/deathbybandaid.ParsedBlacklists-easylist.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/deathbybandaid/ParsedBlacklists-EasyList.fork.txt`));
router.get('/generated/0.0.0.0/forks/justdomains.adguarddns.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/0.0.0.0/forks/MajkiIT.adguard_host.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/MajkiIT/adguard-host.fork.txt`));
router.get('/generated/0.0.0.0/forks/MajkiIT.easy_privacy_host.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/MajkiIT/easy-privacy-host.fork.txt`));
router.get('/generated/0.0.0.0/forks/notracking.hostnames.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/notracking/hostnames.fork.txt`));
router.get('/generated/0.0.0.0/forks/oisd.big.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/oisd/big.fork.txt`));
router.get('/generated/0.0.0.0/forks/r-a-y.AdguardApps.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/0.0.0.0/forks/r-a-y.AdguardMobileSpyware.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/0.0.0.0/forks/StevenBlack.fakenews-gambling-porn.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/other/StevenBlack/fakenews-gambling-porn.fork.txt`));

// StevenBlack Hosts
router.get('/generated/0.0.0.0/forks/FadeMind.add.2o7Net.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/extensions/FadeMind/add-2o7Net.fork.txt`));
router.get('/generated/0.0.0.0/forks/FadeMind.add.Risk.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/suspicious/FadeMind/add-Risk.fork.txt`));
router.get('/generated/0.0.0.0/forks/FadeMind.add.Spam.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/spam/FadeMind/add-Spam.fork.txt`));
router.get('/generated/0.0.0.0/forks/FadeMind.UncheckyAds.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/ads/FadeMind/UncheckyAds.fork.txt`));
router.get('/generated/0.0.0.0/forks/StevenBlack.hosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/other/StevenBlack/hosts.fork.txt`));

// Polish Filters
router.get('/generated/0.0.0.0/forks/hole-cert.domains_hosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/other/polish-blocklists/cert.pl/domains-hosts.fork.txt`));
router.get('/generated/0.0.0.0/forks/MajkiIT.hostfile.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/other/polish-blocklists/MajkiIT/hostfile.fork.txt`));
router.get('/generated/0.0.0.0/forks/PolishFiltersTeam.KADhosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/other/polish-blocklists/PolishFiltersTeam/KADhosts.fork.txt`));

// Porn
router.get('/generated/0.0.0.0/forks/4skinSkywalker.Anti-Porn.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/porn/4skinSkywalker/hosts.fork.txt`));
router.get('/generated/0.0.0.0/forks/blocklistproject.porn.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/porn/blocklistproject/porn.fork.txt`));
router.get('/generated/0.0.0.0/forks/chadmayfield.pi_blocklist_porn_all.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/porn/chadmayfield/pi-blocklist-porn-all.fork.txt`));
router.get('/generated/0.0.0.0/forks/oisd.nsfw.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/porn/oisd/nsfw.fork.txt`));
router.get('/generated/0.0.0.0/forks/Sinfonietta.pornography-hosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/porn/Sinfonietta/pornography-hosts.fork.txt`));
router.get('/generated/0.0.0.0/porn.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/porn/sefinek.hosts.txt`));

// Hate and Junk
router.get('/generated/0.0.0.0/forks/developerdan.hate-and-junk-extended.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/hate-and-junk/developerdan/extended.fork.txt`));

// Drugs
router.get('/generated/0.0.0.0/forks/blocklistproject.drugs.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/drugs/blocklistproject/drugs.fork.txt`));

// Fake News
router.get('/generated/0.0.0.0/forks/marktron.fakenews.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/fakenews/marktron/hosts.fork.txt`));

// Gambling
router.get('/generated/0.0.0.0/forks/blocklistproject.gambling.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/gambling/blocklistproject/hosts.fork.txt`));
router.get('/generated/0.0.0.0/forks/MajkiIT.gambling-hosts.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/gambling/MajkiIT/gambling-hosts.fork.txt`));
router.get('/generated/0.0.0.0/gambling.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/gambling/sefinek.hosts.txt`));
router.get('/generated/v1/0.0.0.0/gambling.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/gambling/sefinek.hosts.txt`));

// Dating Services
router.get('/generated/0.0.0.0/forks/developerdan.dating-services-extended.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/dating-services/developerdan/extended.fork.txt`));

// Useless Websites
router.get('/generated/0.0.0.0/useless-websites.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/useless-websites/sefinek.hosts.txt`));
router.get('/generated/v1/0.0.0.0/useless-websites.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/useless-websites/sefinek.hosts.txt`));

// Anime
router.get('/generated/0.0.0.0/anime/shinden.pl.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/anime/shinden.pl.txt`));
router.get('/generated/0.0.0.0/anime/myanimelist.net.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/anime/myanimelist.net.txt`));

// Cryptocurrency
router.get('/generated/0.0.0.0/cryptocurrency.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/cryptocurrency.fork.txt`));

// Sites
router.get('/generated/0.0.0.0/sites/youtube.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/youtube.txt`));
router.get('/generated/0.0.0.0/sites/youtube-extended.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/youtube-extended.txt`));
router.get('/generated/0.0.0.0/sites/pinterest.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/pinterest.txt`));
router.get('/generated/0.0.0.0/sites/pixiv.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/pixiv.txt`));
router.get('/generated/0.0.0.0/sites/omegle.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/ometv.txt`));
router.get('/generated/v1/0.0.0.0/sites/omegle.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/ometv.txt`));
router.get('/generated/0.0.0.0/sites/gamebanana.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/gamebanana.txt`));
router.get('/generated/0.0.0.0/sites/booth.pm.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/booth.pm.txt`));
router.get('/generated/0.0.0.0/sites/patreon.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/patreon.txt`));

// Social Media
router.get('/generated/0.0.0.0/social/tiktok.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/social/tiktok.txt`));
router.get('/generated/0.0.0.0/social/facebook.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/social/facebook.txt`));
router.get('/generated/0.0.0.0/social/instagram.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/social/instagram.txt`));
router.get('/generated/0.0.0.0/social/snapchat.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/social/snapchat.txt`));
router.get('/generated/0.0.0.0/social/twitter.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/social/twitter.txt`));

// Apps
router.get('/generated/0.0.0.0/apps/spotify.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/apps/spotify.txt`));
router.get('/generated/0.0.0.0/apps/discord.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/apps/discord.txt`));
router.get('/generated/0.0.0.0/apps/skype.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/apps/skype.txt`));
router.get('/generated/0.0.0.0/apps/whatsapp.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/apps/whatsapp.txt`));

// Games and Game Services
router.get('/generated/0.0.0.0/sites/riotgames.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/riotgames.txt`));
router.get('/generated/0.0.0.0/games/league-of-legends.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/games/league-of-legends.txt`));
router.get('/generated/0.0.0.0/games/valorant.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/games/valorant.txt`));


// ----------------- 127.0.0.1 -----------------
// Ads
router.get('/generated/127.0.0.1/ads/blocklistproject.ads.txt', (req, res) => res.sendFile(`${localhost}/ads/blocklistproject/hosts.fork.txt`));
router.get('/generated/127.0.0.1/ads/jerryn70.GoodbyeAds.txt', (req, res) => res.sendFile(`${localhost}/ads/jerryn70/GoodbyeAds.fork.txt`));
router.get('/generated/127.0.0.1/forks/kboghdady.youtubelist.txt', (req, res) => res.sendFile(`${localhost}/ads/kboghdady/youtubelist.fork.txt`));
router.get('/generated/127.0.0.1/ads/DandelionSprout.GameConsoleAdblockList.txt', (req, res) => res.sendFile(`${localhost}/ads/DandelionSprout.GameConsoleAdblockList.txt`));
router.get('/generated/127.0.0.1/ads/yoyo.AdsTrackersEtc.txt', (req, res) => res.sendFile(`${localhost}/ads/yoyo/ads-trackers-etc.fork.txt`));
router.get('/generated/127.0.0.1/forks/ShadowWhisperer.Ads.txt', (req, res) => res.sendFile(`${localhost}/ads/ShadowWhisperer/Ads.fork.txt`));
router.get('/generated/127.0.0.1/forks/0Zinc.easylist.txt', (req, res) => res.sendFile(`${localhost}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/127.0.0.1/forks/adaway.hosts.txt', (req, res) => res.sendFile(`${localhost}/ads/adaway/hosts.fork.txt`));
router.get('/generated/127.0.0.1/forks/anudeepND.adservers.txt', (req, res) => res.sendFile(`${localhost}/ads/anudeepND/adservers.fork.txt`));
router.get('/generated/127.0.0.1/forks/blocklistproject.youtube.txt', (req, res) => res.sendFile(`${localhost}/ads/blocklistproject/youtube.fork.txt`));
router.get('/generated/127.0.0.1/forks/craiu.mobiletrackers.txt', (req, res) => res.sendFile(`${localhost}/ads/craiu/mobiletrackers.fork.txt`));
router.get('/generated/127.0.0.1/forks/crazy-max.WindowsSpyBlocker.hosts-spy.txt', (req, res) => res.sendFile(`${localhost}/ads/crazy-max/spy.fork.txt`));
router.get('/generated/127.0.0.1/forks/disconnectme.simple_ad.txt', (req, res) => res.sendFile(`${localhost}/ads/disconnectme/simple-ad.fork.txt`));
router.get('/generated/127.0.0.1/forks/firebog.AdguardDNS.txt', (req, res) => res.sendFile(`${localhost}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/127.0.0.1/forks/firebog.Admiral.txt', (req, res) => res.sendFile(`${localhost}/ads/firebog/Admiral.fork.txt`));
router.get('/generated/127.0.0.1/forks/firebog.Easylist.txt', (req, res) => res.sendFile(`${localhost}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/127.0.0.1/forks/firebog.Prigent-Ads.txt', (req, res) => res.sendFile(`${localhost}/ads/firebog/Prigent-Ads.fork.txt`));
router.get('/generated/127.0.0.1/forks/MajkiIT.Ad_filter_list_by_Disconnect.txt', (req, res) => res.sendStatus(404));
router.get('/generated/127.0.0.1/forks/MajkiIT.SmartTV_ads.txt', (req, res) => res.sendFile(`${localhost}/ads/MajkiIT/SmartTV-ads.fork.txt`));
router.get('/generated/127.0.0.1/forks/r-a-y.AdguardMobileAds.txt', (req, res) => res.sendFile(`${localhost}/ads/r-a-y/AdguardMobileAds.fork.txt`));

// Tracking & telemetry
router.get('/generated/127.0.0.1/forks/0Zinc.easyprivacy.txt', (req, res) => res.sendFile(`${localhost}/tracking-and-telemetry/0Zinc/easyprivacy.fork.txt`));
router.get('/generated/127.0.0.1/forks/ente-dev.tv.txt', (req, res) => res.sendFile(`${localhost}/tracking-and-telemetry/ente-dev/tv.fork.txt`));
router.get('/generated/127.0.0.1/forks/frogeye.firstparty-trackers-hosts.txt', (req, res) => res.sendFile(`${localhost}/tracking-and-telemetry/frogeye/firstparty-trackers-hosts.txt`));
router.get('/generated/127.0.0.1/forks/MajkiIT.adguard_mobile_host.txt', (req, res) => res.sendFile(`${localhost}/tracking-and-telemetry/MajkiIT/adguard-mobile-host.fork.txt`));
router.get('/generated/127.0.0.1/forks/mitchellkrogza.Stop.Google.Analytics.Ghost.Spam-INACTIVE.txt', (req, res) => res.sendFile(`${localhost}/tracking-and-telemetry/mitchellkrogza/INACTIVE.fork.txt`));
router.get('/generated/127.0.0.1/forks/neodevpro.neodevhost.txt', (req, res) => res.sendFile(`${localhost}/tracking-and-telemetry/neodevpro/host.fork.txt`));

// AMP Hosts
router.get('/generated/127.0.0.1/forks/developerdan.amp-hosts-extended.txt', (req, res) => res.sendFile(`${localhost}/amp/developerdan/amp-hosts-extended.fork.txt`));
router.get('/generated/127.0.0.1/forks/ente-dev.google-amp-hosts.txt', (req, res) => res.sendFile(`${localhost}/amp/ente-dev/google-amp-hosts.fork.txt`));

// Malicious
router.get('/generated/127.0.0.1/forks/AssoEchap.stalkerware-indicators.txt', (req, res) => res.sendFile(`${localhost}/malicious/AssoEchap/stalkerware-indicators.fork.txt`));
router.get('/generated/127.0.0.1/forks/bigdargon.hostsVN.txt', (req, res) => res.sendFile(`${localhost}/malicious/bigdargon/hostsVN.fork.txt`));
router.get('/generated/127.0.0.1/forks/DandelionSprout-AntiMalwareHosts.txt', (req, res) => res.sendFile(`${localhost}/malicious/DandelionSprout-AntiMalwareHosts.fork.txt`));
router.get('/generated/127.0.0.1/forks/digitalside.latestdomains.txt', (req, res) => res.sendFile(`${localhost}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/127.0.0.1/forks/disconnectme.simple_malvertising.txt', (req, res) => res.sendFile(`${localhost}/malicious/disconnectme/simple-malvertising.fork.txt`));
router.get('/generated/127.0.0.1/forks/malware-filter.urlhaus-filter-hosts-online.txt', (req, res) => res.sendFile(`${localhost}/malicious/malware-filter/urlhaus-filter-hosts-online.fork.txt`));
router.get('/generated/127.0.0.1/forks/quidsup.notrack-malware.txt', (req, res) => res.sendFile(`${localhost}/malicious/quidsup/notrack-malware.fork.txt`));
router.get('/generated/127.0.0.1/forks/RPiList-Malware.txt', (req, res) => res.sendFile(`${localhost}/malicious/RPiList/Malware.fork.txt`));
router.get('/generated/127.0.0.1/forks/Spam404.main-blacklist.txt', (req, res) => res.sendFile(`${localhost}/malicious/Spam404/main-blacklist.fork.txt`));
router.get('/generated/127.0.0.1/malicious/blocklistproject.malware.txt', (req, res) => res.sendFile(`${localhost}/malicious/blocklistproject/malware.fork.txt`));
router.get('/generated/127.0.0.1/malicious/main.txt', (req, res) => res.sendFile(`${localhost}/malicious/sefinek.hosts1.txt`));
router.get('/generated/127.0.0.1/malicious/main-2.txt', (req, res) => res.sendFile(`${localhost}/malicious/sefinek.hosts2.txt`));
router.get('/generated/127.0.0.1/malicious/reported-by-norton.txt', (req, res) => res.sendFile(`${localhost}/malicious/reported-by-norton.txt`));
router.get('/generated/127.0.0.1/malicious/web-attacks.txt', (req, res) => res.sendFile(`${localhost}/malicious/web-attacks.txt`));

// Phishing
router.get('/generated/127.0.0.1/forks/blocklistproject.phishing.txt', (req, res) => res.sendFile(`${localhost}/phishing/blocklistproject/phishing.fork.txt`));
router.get('/generated/127.0.0.1/forks/Dogino.Discord-Phishing-URLs-phishing.txt', (req, res) => res.sendFile(`${localhost}/phishing/Dogino/Discord-Phishing-URLs-phishing.fork.txt`));
router.get('/generated/127.0.0.1/forks/phishingArmy.phishing_army_blocklist_extended.txt', (req, res) => res.sendFile(`${localhost}/phishing/phishing.army/blocklist-extended.fork.txt`));
router.get('/generated/127.0.0.1/forks/RPiList-Phishing.txt', (req, res) => res.sendFile(`${localhost}/phishing/RPiList/Phishing-Angriffe.fork.txt`));
router.get('/generated/127.0.0.1/phishing.txt', (req, res) => res.sendFile(`${localhost}/phishing/sefinek.hosts.txt`));
router.get('/generated/127.0.0.1/malicious/phishing.txt', (req, res) => res.sendFile(`${localhost}/phishing/sefinek.hosts.txt`));

// Ransomware
router.get('/generated/127.0.0.1/forks/blocklistproject.ransomware.txt', (req, res) => res.sendFile(`${localhost}/ransomware/blocklistproject/ransomware.fork.txt`));

// Cryptojacking
router.get('/generated/127.0.0.1/forks/hoshsadiq.adblock-nocoin-list.txt', (req, res) => res.sendFile(`${localhost}/crypto/cryptojacking/hoshsadiq/adblock-nocoin-list.fork.txt`));
router.get('/generated/127.0.0.1/forks/Snota418.Crypto-streams.txt', (req, res) => res.sendFile(`${localhost}/crypto/cryptojacking/Snota418/Crypto-streams.fork.txt`));
router.get('/generated/127.0.0.1/forks/firebog.Prigent-Crypto.txt', (req, res) => res.sendFile(`${localhost}/crypto/cryptojacking/firebog/Prigent/Crypto.fork.txt`));
router.get('/generated/127.0.0.1/forks/zerodot1.CoinBlockerLists.txt', (req, res) => res.sendFile(`${localhost}/crypto/cryptojacking/zerodot1/CoinBlockerLists-hosts.fork.txt`));

// Abuse
router.get('/generated/127.0.0.1/forks/abuse.urlhaus.txt', (req, res) => res.sendFile(`${localhost}//abuse/urlhaus.abuse.ch/hostfile.fork.txt`));
router.get('/generated/127.0.0.1/malicious/blocklistproject.abuse.txt', (req, res) => res.sendFile(`${localhost}/abuse/blocklistproject/hosts.fork.txt`));

// Fraud
router.get('/generated/127.0.0.1/malicious/blocklistproject.fraud.txt', (req, res) => res.sendFile(`${localhost}/fraud/blocklistproject/hosts.fork.txt`));

// Spam
router.get('/generated/127.0.0.1/forks/RPiList.Spam-Mails.txt', (req, res) => res.sendFile(`${localhost}/spam/RPiList/spam-mails.fork.txt`));
router.get('/generated/127.0.0.1/forks/stopforumspam.toxic_domains_whole.txt', (req, res) => res.sendFile(`${localhost}/spam/stopforumspam/toxic-domains-whole.fork.txt`));

// Piracy
router.get('/generated/127.0.0.1/forks/blocklistproject.piracy.txt', (req, res) => res.sendFile(`${localhost}/piracy/blocklistproject/piracy.fork.txt`));

// Redirect
router.get('/generated/127.0.0.1/forks/blocklistproject.redirect.txt', (req, res) => res.sendFile(`${localhost}/redirect/blocklistproject/redirect.fork.txt`));

// Scam
router.get('/generated/127.0.0.1/forks/blocklistproject.scam.txt', (req, res) => res.sendFile(`${localhost}/scam/blocklistproject/scam.fork.txt`));
router.get('/generated/127.0.0.1/forks/Dogino.Discord-Phishing-URLs-scam.txt', (req, res) => res.sendFile(`${localhost}/scam/Dogino/Discord-Phishing-URLs-scam.fork.txt`));
router.get('/generated/127.0.0.1/forks/durablenapkin.scamblocklist.txt', (req, res) => res.sendFile(`${localhost}/scam/durablenapkin/scamblocklist.fork.txt`));

// Suspicious
router.get('/generated/127.0.0.1/forks/firebog.w3kbl.txt', (req, res) => res.sendFile(`${localhost}/suspicious/firebog/w3kbl.fork.txt`));

// Extension
router.get('/generated/127.0.0.1/forks/cbuijs.adult-domains.txt', (req, res) => res.sendFile(`${localhost}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/127.0.0.1/forks/deathbybandaid.CountryCodesLists-France.txt', (req, res) => res.sendFile(`${localhost}/extensions/deathbybandaid/CountryCodesLists-France.fork.txt`));
router.get('/generated/127.0.0.1/forks/deathbybandaid.ParsedBlacklists-easylist-fr.txt', (req, res) => res.sendFile(`${localhost}/extensions/deathbybandaid/ParsedBlacklists-EasyList-Liste-FR.fork.txt`));
router.get('/generated/127.0.0.1/forks/deathbybandaid.ParsedBlacklists-easylist.txt', (req, res) => res.sendFile(`${localhost}/extensions/deathbybandaid/ParsedBlacklists-EasyList.fork.txt`));
router.get('/generated/127.0.0.1/forks/justdomains.adguarddns.txt', (req, res) => res.sendFile(`${localhost}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/127.0.0.1/forks/MajkiIT.adguard_host.txt', (req, res) => res.sendFile(`${localhost}/extensions/MajkiIT/adguard-host.fork.txt`));
router.get('/generated/127.0.0.1/forks/MajkiIT.easy_privacy_host.txt', (req, res) => res.sendFile(`${localhost}/extensions/MajkiIT/easy-privacy-host.fork.txt`));
router.get('/generated/127.0.0.1/forks/notracking.hostnames.txt', (req, res) => res.sendFile(`${localhost}/extensions/notracking/hostnames.fork.txt`));
router.get('/generated/127.0.0.1/forks/oisd.big.txt', (req, res) => res.sendFile(`${localhost}/extensions/oisd/big.fork.txt`));
router.get('/generated/127.0.0.1/forks/r-a-y.AdguardApps.txt', (req, res) => res.sendFile(`${localhost}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/127.0.0.1/forks/r-a-y.AdguardMobileSpyware.txt', (req, res) => res.sendFile(`${localhost}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/127.0.0.1/forks/StevenBlack.fakenews-gambling-porn.txt', (req, res) => res.sendFile(`${localhost}/other/StevenBlack/fakenews-gambling-porn.fork.txt`));

// StevenBlack Hosts
router.get('/generated/127.0.0.1/forks/FadeMind.add.2o7Net.txt', (req, res) => res.sendFile(`${localhost}/extensions/FadeMind/add-2o7Net.fork.txt`));
router.get('/generated/127.0.0.1/forks/FadeMind.add.Risk.txt', (req, res) => res.sendFile(`${localhost}/suspicious/FadeMind/add-Risk.fork.txt`));
router.get('/generated/127.0.0.1/forks/FadeMind.add.Spam.txt', (req, res) => res.sendFile(`${localhost}/spam/FadeMind/add-Spam.fork.txt`));
router.get('/generated/127.0.0.1/forks/FadeMind.UncheckyAds.txt', (req, res) => res.sendFile(`${localhost}/ads/FadeMind/UncheckyAds.fork.txt`));
router.get('/generated/127.0.0.1/forks/StevenBlack.hosts.txt', (req, res) => res.sendFile(`${localhost}/other/StevenBlack/hosts.fork.txt`));

// Polish Filters
router.get('/generated/127.0.0.1/forks/hole-cert.domains_hosts.txt', (req, res) => res.sendFile(`${localhost}/other/polish-blocklists/cert.pl/domains-hosts.fork.txt`));
router.get('/generated/127.0.0.1/forks/MajkiIT.hostfile.txt', (req, res) => res.sendFile(`${localhost}/other/polish-blocklists/MajkiIT/hostfile.fork.txt`));
router.get('/generated/127.0.0.1/forks/PolishFiltersTeam.KADhosts.txt', (req, res) => res.sendFile(`${localhost}/other/polish-blocklists/PolishFiltersTeam/KADhosts.fork.txt`));

// Porn
router.get('/generated/127.0.0.1/forks/4skinSkywalker.Anti-Porn.txt', (req, res) => res.sendFile(`${localhost}/porn/4skinSkywalker/hosts.fork.txt`));
router.get('/generated/127.0.0.1/forks/blocklistproject.porn.txt', (req, res) => res.sendFile(`${localhost}/porn/blocklistproject/porn.fork.txt`));
router.get('/generated/127.0.0.1/forks/chadmayfield.pi_blocklist_porn_all.txt', (req, res) => res.sendFile(`${localhost}/porn/chadmayfield/pi-blocklist-porn-all.fork.txt`));
router.get('/generated/127.0.0.1/forks/oisd.nsfw.txt', (req, res) => res.sendFile(`${localhost}/porn/oisd/nsfw.fork.txt`));
router.get('/generated/127.0.0.1/forks/Sinfonietta.pornography-hosts.txt', (req, res) => res.sendFile(`${localhost}/porn/Sinfonietta/pornography-hosts.fork.txt`));
router.get('/generated/127.0.0.1/porn.txt', (req, res) => res.sendFile(`${localhost}/porn/sefinek.hosts.txt`));

// Hate and Junk
router.get('/generated/127.0.0.1/forks/developerdan.hate-and-junk-extended.txt', (req, res) => res.sendFile(`${localhost}/hate-and-junk/developerdan/extended.fork.txt`));

// Drugs
router.get('/generated/127.0.0.1/forks/blocklistproject.drugs.txt', (req, res) => res.sendFile(`${localhost}/drugs/blocklistproject/drugs.fork.txt`));

// Fake News
router.get('/generated/127.0.0.1/forks/marktron.fakenews.txt', (req, res) => res.sendFile(`${localhost}/fakenews/marktron/hosts.fork.txt`));

// Gambling
router.get('/generated/127.0.0.1/forks/blocklistproject.gambling.txt', (req, res) => res.sendFile(`${localhost}/gambling/blocklistproject/hosts.fork.txt`));
router.get('/generated/127.0.0.1/forks/MajkiIT.gambling-hosts.txt', (req, res) => res.sendFile(`${localhost}/gambling/MajkiIT/gambling-hosts.fork.txt`));
router.get('/generated/127.0.0.1/gambling.txt', (req, res) => res.sendFile(`${localhost}/gambling/sefinek.hosts.txt`));
router.get('/generated/v1/127.0.0.1/gambling.txt', (req, res) => res.sendFile(`${localhost}/gambling/sefinek.hosts.txt`));

// Dating Services
router.get('/generated/127.0.0.1/forks/developerdan.dating-services-extended.txt', (req, res) => res.sendFile(`${localhost}/dating-services/developerdan/extended.fork.txt`));

// Useless Websites
router.get('/generated/127.0.0.1/useless-websites.txt', (req, res) => res.sendFile(`${localhost}/useless-websites/sefinek.hosts.txt`));
router.get('/generated/v1/127.0.0.1/useless-websites.txt', (req, res) => res.sendFile(`${localhost}/useless-websites/sefinek.hosts.txt`));

// Anime
router.get('/generated/127.0.0.1/anime/shinden.pl.txt', (req, res) => res.sendFile(`${localhost}/anime/shinden.pl.txt`));
router.get('/generated/127.0.0.1/anime/myanimelist.net.txt', (req, res) => res.sendFile(`${localhost}/anime/myanimelist.net.txt`));

// Cryptocurrency
router.get('/generated/127.0.0.1/cryptocurrency.txt', (req, res) => res.sendFile(`${localhost}/cryptocurrency.fork.txt`));

// Sites
router.get('/generated/127.0.0.1/sites/youtube.txt', (req, res) => res.sendFile(`${localhost}/sites/youtube.txt`));
router.get('/generated/127.0.0.1/sites/youtube-extended.txt', (req, res) => res.sendFile(`${localhost}/sites/youtube-extended.txt`));
router.get('/generated/127.0.0.1/sites/pinterest.txt', (req, res) => res.sendFile(`${localhost}/sites/pinterest.txt`));
router.get('/generated/127.0.0.1/sites/pixiv.txt', (req, res) => res.sendFile(`${localhost}/sites/pixiv.txt`));
router.get('/generated/127.0.0.1/sites/omegle.txt', (req, res) => res.sendFile(`${localhost}/sites/ometv.txt`));
router.get('/generated/v1/127.0.0.1/sites/omegle.txt', (req, res) => res.sendFile(`${localhost}/sites/ometv.txt`));
router.get('/generated/127.0.0.1/sites/gamebanana.txt', (req, res) => res.sendFile(`${localhost}/sites/gamebanana.txt`));
router.get('/generated/127.0.0.1/sites/booth.pm.txt', (req, res) => res.sendFile(`${localhost}/sites/booth.pm.txt`));
router.get('/generated/127.0.0.1/sites/patreon.txt', (req, res) => res.sendFile(`${localhost}/sites/patreon.txt`));

// Social Media
router.get('/generated/127.0.0.1/social/tiktok.txt', (req, res) => res.sendFile(`${localhost}/social/tiktok.txt`));
router.get('/generated/127.0.0.1/social/facebook.txt', (req, res) => res.sendFile(`${localhost}/social/facebook.txt`));
router.get('/generated/127.0.0.1/social/instagram.txt', (req, res) => res.sendFile(`${localhost}/social/instagram.txt`));
router.get('/generated/127.0.0.1/social/snapchat.txt', (req, res) => res.sendFile(`${localhost}/social/snapchat.txt`));
router.get('/generated/127.0.0.1/social/twitter.txt', (req, res) => res.sendFile(`${localhost}/social/twitter.txt`));

// Apps
router.get('/generated/127.0.0.1/apps/spotify.txt', (req, res) => res.sendFile(`${localhost}/apps/spotify.txt`));
router.get('/generated/127.0.0.1/apps/discord.txt', (req, res) => res.sendFile(`${localhost}/apps/discord.txt`));
router.get('/generated/127.0.0.1/apps/skype.txt', (req, res) => res.sendFile(`${localhost}/apps/skype.txt`));
router.get('/generated/127.0.0.1/apps/whatsapp.txt', (req, res) => res.sendFile(`${localhost}/apps/whatsapp.txt`));

// Games and Game Services
router.get('/generated/127.0.0.1/sites/riotgames.txt', (req, res) => res.sendFile(`${localhost}/sites/riotgames.txt`));
router.get('/generated/127.0.0.1/games/league-of-legends.txt', (req, res) => res.sendFile(`${localhost}/games/league-of-legends.txt`));
router.get('/generated/127.0.0.1/games/valorant.txt', (req, res) => res.sendFile(`${localhost}/games/valorant.txt`));

// ----------------- No IP -----------------
// Ads
router.get('/generated/noip/ads/blocklistproject.ads.txt', (req, res) => res.sendFile(`${noIp}/ads/blocklistproject/hosts.fork.txt`));
router.get('/generated/noip/ads/jerryn70.GoodbyeAds.txt', (req, res) => res.sendFile(`${noIp}/ads/jerryn70/GoodbyeAds.fork.txt`));
router.get('/generated/noip/forks/kboghdady.youtubelist.txt', (req, res) => res.sendFile(`${noIp}/ads/kboghdady/youtubelist.fork.txt`));
router.get('/generated/noip/ads/DandelionSprout.GameConsoleAdblockList.txt', (req, res) => res.sendFile(`${noIp}/ads/DandelionSprout.GameConsoleAdblockList.txt`));
router.get('/generated/noip/ads/yoyo.AdsTrackersEtc.txt', (req, res) => res.sendFile(`${noIp}/ads/yoyo/ads-trackers-etc.fork.txt`));
router.get('/generated/noip/forks/0Zinc.easylist.txt', (req, res) => res.sendFile(`${noIp}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/noip/forks/ShadowWhisperer.Ads.txt', (req, res) => res.sendFile(`${noIp}/ads/ShadowWhisperer/Ads.fork.txt`));
router.get('/generated/noip/forks/adaway.hosts.txt', (req, res) => res.sendFile(`${noIp}/ads/adaway/hosts.fork.txt`));
router.get('/generated/noip/forks/anudeepND.adservers.txt', (req, res) => res.sendFile(`${noIp}/ads/anudeepND/adservers.fork.txt`));
router.get('/generated/noip/forks/blocklistproject.youtube.txt', (req, res) => res.sendFile(`${noIp}/ads/blocklistproject/youtube.fork.txt`));
router.get('/generated/noip/forks/craiu.mobiletrackers.txt', (req, res) => res.sendFile(`${noIp}/ads/craiu/mobiletrackers.fork.txt`));
router.get('/generated/noip/forks/crazy-max.WindowsSpyBlocker.hosts-spy.txt', (req, res) => res.sendFile(`${noIp}/ads/crazy-max/spy.fork.txt`));
router.get('/generated/noip/forks/disconnectme.simple_ad.txt', (req, res) => res.sendFile(`${noIp}/ads/disconnectme/simple-ad.fork.txt`));
router.get('/generated/noip/forks/firebog.AdguardDNS.txt', (req, res) => res.sendFile(`${noIp}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/noip/forks/firebog.Admiral.txt', (req, res) => res.sendFile(`${noIp}/ads/firebog/Admiral.fork.txt`));
router.get('/generated/noip/forks/firebog.Easylist.txt', (req, res) => res.sendFile(`${noIp}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/noip/forks/firebog.Prigent-Ads.txt', (req, res) => res.sendFile(`${noIp}/ads/firebog/Prigent-Ads.fork.txt`));
router.get('/generated/noip/forks/MajkiIT.Ad_filter_list_by_Disconnect.txt', (req, res) => res.sendStatus(404));
router.get('/generated/noip/forks/MajkiIT.SmartTV_ads.txt', (req, res) => res.sendFile(`${noIp}/ads/MajkiIT/SmartTV-ads.fork.txt`));
router.get('/generated/noip/forks/r-a-y.AdguardMobileAds.txt', (req, res) => res.sendFile(`${noIp}/ads/r-a-y/AdguardMobileAds.fork.txt`));

// Tracking & telemetry
router.get('/generated/noip/forks/0Zinc.easyprivacy.txt', (req, res) => res.sendFile(`${noIp}/tracking-and-telemetry/0Zinc/easyprivacy.fork.txt`));
router.get('/generated/noip/forks/ente-dev.tv.txt', (req, res) => res.sendFile(`${noIp}/tracking-and-telemetry/ente-dev/tv.fork.txt`));
router.get('/generated/noip/forks/frogeye.firstparty-trackers-hosts.txt', (req, res) => res.sendFile(`${noIp}/tracking-and-telemetry/frogeye/firstparty-trackers-hosts.txt`));
router.get('/generated/noip/forks/MajkiIT.adguard_mobile_host.txt', (req, res) => res.sendFile(`${noIp}/tracking-and-telemetry/MajkiIT/adguard-mobile-host.fork.txt`));
router.get('/generated/noip/forks/mitchellkrogza.Stop.Google.Analytics.Ghost.Spam-INACTIVE.txt', (req, res) => res.sendFile(`${noIp}/tracking-and-telemetry/mitchellkrogza/INACTIVE.fork.txt`));
router.get('/generated/noip/forks/neodevpro.neodevhost.txt', (req, res) => res.sendFile(`${noIp}/tracking-and-telemetry/neodevpro/host.fork.txt`));

// AMP Hosts
router.get('/generated/noip/forks/developerdan.amp-hosts-extended.txt', (req, res) => res.sendFile(`${noIp}/amp/developerdan/amp-hosts-extended.fork.txt`));
router.get('/generated/noip/forks/ente-dev.google-amp-hosts.txt', (req, res) => res.sendFile(`${noIp}/amp/ente-dev/google-amp-hosts.fork.txt`));

// Malicious
router.get('/generated/noip/forks/AssoEchap.stalkerware-indicators.txt', (req, res) => res.sendFile(`${noIp}/malicious/AssoEchap/stalkerware-indicators.fork.txt`));
router.get('/generated/noip/forks/bigdargon.hostsVN.txt', (req, res) => res.sendFile(`${noIp}/malicious/bigdargon/hostsVN.fork.txt`));
router.get('/generated/noip/forks/DandelionSprout-AntiMalwareHosts.txt', (req, res) => res.sendFile(`${noIp}/malicious/DandelionSprout-AntiMalwareHosts.fork.txt`));
router.get('/generated/noip/forks/digitalside.latestdomains.txt', (req, res) => res.sendFile(`${noIp}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/noip/forks/disconnectme.simple_malvertising.txt', (req, res) => res.sendFile(`${noIp}/malicious/disconnectme/simple-malvertising.fork.txt`));
router.get('/generated/noip/forks/malware-filter.urlhaus-filter-hosts-online.txt', (req, res) => res.sendFile(`${noIp}/malicious/malware-filter/urlhaus-filter-hosts-online.fork.txt`));
router.get('/generated/noip/forks/quidsup.notrack-malware.txt', (req, res) => res.sendFile(`${noIp}/malicious/quidsup/notrack-malware.fork.txt`));
router.get('/generated/noip/forks/RPiList-Malware.txt', (req, res) => res.sendFile(`${noIp}/malicious/RPiList/Malware.fork.txt`));
router.get('/generated/noip/forks/Spam404.main-blacklist.txt', (req, res) => res.sendFile(`${noIp}/malicious/Spam404/main-blacklist.fork.txt`));
router.get('/generated/noip/malicious/blocklistproject.malware.txt', (req, res) => res.sendFile(`${noIp}/malicious/blocklistproject/malware.fork.txt`));
router.get('/generated/noip/malicious/main.txt', (req, res) => res.sendFile(`${noIp}/malicious/sefinek.hosts1.txt`));
router.get('/generated/noip/malicious/main-2.txt', (req, res) => res.sendFile(`${noIp}/malicious/sefinek.hosts2.txt`));
router.get('/generated/noip/malicious/reported-by-norton.txt', (req, res) => res.sendFile(`${noIp}/malicious/reported-by-norton.txt`));
router.get('/generated/noip/malicious/web-attacks.txt', (req, res) => res.sendFile(`${noIp}/malicious/web-attacks.txt`));

// Phishing
router.get('/generated/noip/forks/blocklistproject.phishing.txt', (req, res) => res.sendFile(`${noIp}/phishing/blocklistproject/phishing.fork.txt`));
router.get('/generated/noip/forks/Dogino.Discord-Phishing-URLs-phishing.txt', (req, res) => res.sendFile(`${noIp}/phishing/Dogino/Discord-Phishing-URLs-phishing.fork.txt`));
router.get('/generated/noip/forks/phishingArmy.phishing_army_blocklist_extended.txt', (req, res) => res.sendFile(`${noIp}/phishing/phishing.army/blocklist-extended.fork.txt`));
router.get('/generated/noip/forks/RPiList-Phishing.txt', (req, res) => res.sendFile(`${noIp}/phishing/RPiList/Phishing-Angriffe.fork.txt`));
router.get('/generated/noip/phishing.txt', (req, res) => res.sendFile(`${noIp}/phishing/sefinek.hosts.txt`));
router.get('/generated/noip/malicious/phishing.txt', (req, res) => res.sendFile(`${noIp}/phishing/sefinek.hosts.txt`));

// Ransomware
router.get('/generated/noip/forks/blocklistproject.ransomware.txt', (req, res) => res.sendFile(`${noIp}/ransomware/blocklistproject/ransomware.fork.txt`));

// Cryptojacking
router.get('/generated/noip/forks/hoshsadiq.adblock-nocoin-list.txt', (req, res) => res.sendFile(`${noIp}/crypto/cryptojacking/hoshsadiq/adblock-nocoin-list.fork.txt`));
router.get('/generated/noip/forks/Snota418.Crypto-streams.txt', (req, res) => res.sendFile(`${noIp}/crypto/cryptojacking/Snota418/Crypto-streams.fork.txt`));
router.get('/generated/noip/forks/firebog.Prigent-Crypto.txt', (req, res) => res.sendFile(`${noIp}/crypto/cryptojacking/firebog/Prigent/Crypto.fork.txt`));
router.get('/generated/noip/forks/zerodot1.CoinBlockerLists.txt', (req, res) => res.sendFile(`${noIp}/crypto/cryptojacking/zerodot1/CoinBlockerLists-hosts.fork.txt`));

// Abuse
router.get('/generated/noip/forks/abuse.urlhaus.txt', (req, res) => res.sendFile(`${noIp}//abuse/urlhaus.abuse.ch/hostfile.fork.txt`));
router.get('/generated/noip/malicious/blocklistproject.abuse.txt', (req, res) => res.sendFile(`${noIp}/abuse/blocklistproject/hosts.fork.txt`));

// Fraud
router.get('/generated/noip/malicious/blocklistproject.fraud.txt', (req, res) => res.sendFile(`${noIp}/fraud/blocklistproject/hosts.fork.txt`));

// Spam
router.get('/generated/noip/forks/RPiList.Spam-Mails.txt', (req, res) => res.sendFile(`${noIp}/spam/RPiList/spam-mails.fork.txt`));
router.get('/generated/noip/forks/stopforumspam.toxic_domains_whole.txt', (req, res) => res.sendFile(`${noIp}/spam/stopforumspam/toxic-domains-whole.fork.txt`));

// Piracy
router.get('/generated/noip/forks/blocklistproject.piracy.txt', (req, res) => res.sendFile(`${noIp}/piracy/blocklistproject/piracy.fork.txt`));

// Redirect
router.get('/generated/noip/forks/blocklistproject.redirect.txt', (req, res) => res.sendFile(`${noIp}/redirect/blocklistproject/redirect.fork.txt`));

// Scam
router.get('/generated/noip/forks/blocklistproject.scam.txt', (req, res) => res.sendFile(`${noIp}/scam/blocklistproject/scam.fork.txt`));
router.get('/generated/noip/forks/Dogino.Discord-Phishing-URLs-scam.txt', (req, res) => res.sendFile(`${noIp}/scam/Dogino/Discord-Phishing-URLs-scam.fork.txt`));
router.get('/generated/noip/forks/durablenapkin.scamblocklist.txt', (req, res) => res.sendFile(`${noIp}/scam/durablenapkin/scamblocklist.fork.txt`));

// Suspicious
router.get('/generated/noip/forks/firebog.w3kbl.txt', (req, res) => res.sendFile(`${noIp}/suspicious/firebog/w3kbl.fork.txt`));

// Extension
router.get('/generated/noip/forks/cbuijs.adult-domains.txt', (req, res) => res.sendFile(`${noIp}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/noip/forks/deathbybandaid.CountryCodesLists-France.txt', (req, res) => res.sendFile(`${noIp}/extensions/deathbybandaid/CountryCodesLists-France.fork.txt`));
router.get('/generated/noip/forks/deathbybandaid.ParsedBlacklists-easylist-fr.txt', (req, res) => res.sendFile(`${noIp}/extensions/deathbybandaid/ParsedBlacklists-EasyList-Liste-FR.fork.txt`));
router.get('/generated/noip/forks/deathbybandaid.ParsedBlacklists-easylist.txt', (req, res) => res.sendFile(`${noIp}/extensions/deathbybandaid/ParsedBlacklists-EasyList.fork.txt`));
router.get('/generated/noip/forks/justdomains.adguarddns.txt', (req, res) => res.sendFile(`${noIp}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/noip/forks/MajkiIT.adguard_host.txt', (req, res) => res.sendFile(`${noIp}/extensions/MajkiIT/adguard-host.fork.txt`));
router.get('/generated/noip/forks/MajkiIT.easy_privacy_host.txt', (req, res) => res.sendFile(`${noIp}/extensions/MajkiIT/easy-privacy-host.fork.txt`));
router.get('/generated/noip/forks/notracking.hostnames.txt', (req, res) => res.sendFile(`${noIp}/extensions/notracking/hostnames.fork.txt`));
router.get('/generated/noip/forks/oisd.big.txt', (req, res) => res.sendFile(`${noIp}/extensions/oisd/big.fork.txt`));
router.get('/generated/noip/forks/r-a-y.AdguardApps.txt', (req, res) => res.sendFile(`${noIp}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/noip/forks/r-a-y.AdguardMobileSpyware.txt', (req, res) => res.sendFile(`${noIp}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/noip/forks/StevenBlack.fakenews-gambling-porn.txt', (req, res) => res.sendFile(`${noIp}/other/StevenBlack/fakenews-gambling-porn.fork.txt`));

// StevenBlack Hosts
router.get('/generated/noip/forks/FadeMind.add.2o7Net.txt', (req, res) => res.sendFile(`${noIp}/extensions/FadeMind/add-2o7Net.fork.txt`));
router.get('/generated/noip/forks/FadeMind.add.Risk.txt', (req, res) => res.sendFile(`${noIp}/suspicious/FadeMind/add-Risk.fork.txt`));
router.get('/generated/noip/forks/FadeMind.add.Spam.txt', (req, res) => res.sendFile(`${noIp}/spam/FadeMind/add-Spam.fork.txt`));
router.get('/generated/noip/forks/FadeMind.UncheckyAds.txt', (req, res) => res.sendFile(`${noIp}/ads/FadeMind/UncheckyAds.fork.txt`));
router.get('/generated/noip/forks/StevenBlack.hosts.txt', (req, res) => res.sendFile(`${noIp}/other/StevenBlack/hosts.fork.txt`));

// Polish Filters
router.get('/generated/noip/forks/hole-cert.domains_hosts.txt', (req, res) => res.sendFile(`${noIp}/other/polish-blocklists/cert.pl/domains-hosts.fork.txt`));
router.get('/generated/noip/forks/MajkiIT.hostfile.txt', (req, res) => res.sendFile(`${noIp}/other/polish-blocklists/MajkiIT/hostfile.fork.txt`));
router.get('/generated/noip/forks/PolishFiltersTeam.KADhosts.txt', (req, res) => res.sendFile(`${noIp}/other/polish-blocklists/PolishFiltersTeam/KADhosts.fork.txt`));

// Porn
router.get('/generated/noip/forks/4skinSkywalker.Anti-Porn.txt', (req, res) => res.sendFile(`${noIp}/porn/4skinSkywalker/hosts.fork.txt`));
router.get('/generated/noip/forks/blocklistproject.porn.txt', (req, res) => res.sendFile(`${noIp}/porn/blocklistproject/porn.fork.txt`));
router.get('/generated/noip/forks/chadmayfield.pi_blocklist_porn_all.txt', (req, res) => res.sendFile(`${noIp}/porn/chadmayfield/pi-blocklist-porn-all.fork.txt`));
router.get('/generated/noip/forks/oisd.nsfw.txt', (req, res) => res.sendFile(`${noIp}/porn/oisd/nsfw.fork.txt`));
router.get('/generated/noip/forks/Sinfonietta.pornography-hosts.txt', (req, res) => res.sendFile(`${noIp}/porn/Sinfonietta/pornography-hosts.fork.txt`));
router.get('/generated/noip/porn.txt', (req, res) => res.sendFile(`${noIp}/porn/sefinek.hosts.txt`));

// Hate and Junk
router.get('/generated/noip/forks/developerdan.hate-and-junk-extended.txt', (req, res) => res.sendFile(`${noIp}/hate-and-junk/developerdan/extended.fork.txt`));

// Drugs
router.get('/generated/noip/forks/blocklistproject.drugs.txt', (req, res) => res.sendFile(`${noIp}/drugs/blocklistproject/drugs.fork.txt`));

// Fake News
router.get('/generated/noip/forks/marktron.fakenews.txt', (req, res) => res.sendFile(`${noIp}/fakenews/marktron/hosts.fork.txt`));

// Gambling
router.get('/generated/noip/forks/blocklistproject.gambling.txt', (req, res) => res.sendFile(`${noIp}/gambling/blocklistproject/hosts.fork.txt`));
router.get('/generated/noip/forks/MajkiIT.gambling-hosts.txt', (req, res) => res.sendFile(`${noIp}/gambling/MajkiIT/gambling-hosts.fork.txt`));
router.get('/generated/noip/gambling.txt', (req, res) => res.sendFile(`${noIp}/gambling/sefinek.hosts.txt`));
router.get('/generated/v1/noip/gambling.txt', (req, res) => res.sendFile(`${noIp}/gambling/sefinek.hosts.txt`));

// Dating Services
router.get('/generated/noip/forks/developerdan.dating-services-extended.txt', (req, res) => res.sendFile(`${noIp}/dating-services/developerdan/extended.fork.txt`));

// Useless Websites
router.get('/generated/noip/useless-websites.txt', (req, res) => res.sendFile(`${noIp}/useless-websites/sefinek.hosts.txt`));
router.get('/generated/v1/noip/useless-websites.txt', (req, res) => res.sendFile(`${noIp}/useless-websites/sefinek.hosts.txt`));

// Anime
router.get('/generated/noip/anime/shinden.pl.txt', (req, res) => res.sendFile(`${noIp}/anime/shinden.pl.txt`));
router.get('/generated/noip/anime/myanimelist.net.txt', (req, res) => res.sendFile(`${noIp}/anime/myanimelist.net.txt`));

// Cryptocurrency
router.get('/generated/noip/cryptocurrency.txt', (req, res) => res.sendFile(`${noIp}/cryptocurrency.fork.txt`));

// Sites
router.get('/generated/noip/sites/youtube.txt', (req, res) => res.sendFile(`${noIp}/sites/youtube.txt`));
router.get('/generated/noip/sites/youtube-extended.txt', (req, res) => res.sendFile(`${noIp}/sites/youtube-extended.txt`));
router.get('/generated/noip/sites/pinterest.txt', (req, res) => res.sendFile(`${noIp}/sites/pinterest.txt`));
router.get('/generated/noip/sites/pixiv.txt', (req, res) => res.sendFile(`${noIp}/sites/pixiv.txt`));
router.get('/generated/noip/sites/omegle.txt', (req, res) => res.sendFile(`${noIp}/sites/ometv.txt`));
router.get('/generated/v1/noip/sites/omegle.txt', (req, res) => res.sendFile(`${noIp}/sites/ometv.txt`));
router.get('/generated/noip/sites/gamebanana.txt', (req, res) => res.sendFile(`${noIp}/sites/gamebanana.txt`));
router.get('/generated/noip/sites/booth.pm.txt', (req, res) => res.sendFile(`${noIp}/sites/booth.pm.txt`));
router.get('/generated/noip/sites/patreon.txt', (req, res) => res.sendFile(`${noIp}/sites/patreon.txt`));

// Social Media
router.get('/generated/noip/social/tiktok.txt', (req, res) => res.sendFile(`${noIp}/social/tiktok.txt`));
router.get('/generated/noip/social/facebook.txt', (req, res) => res.sendFile(`${noIp}/social/facebook.txt`));
router.get('/generated/noip/social/instagram.txt', (req, res) => res.sendFile(`${noIp}/social/instagram.txt`));
router.get('/generated/noip/social/snapchat.txt', (req, res) => res.sendFile(`${noIp}/social/snapchat.txt`));
router.get('/generated/noip/social/twitter.txt', (req, res) => res.sendFile(`${noIp}/social/twitter.txt`));

// Apps
router.get('/generated/noip/apps/spotify.txt', (req, res) => res.sendFile(`${noIp}/apps/spotify.txt`));
router.get('/generated/noip/apps/discord.txt', (req, res) => res.sendFile(`${noIp}/apps/discord.txt`));
router.get('/generated/noip/apps/skype.txt', (req, res) => res.sendFile(`${noIp}/apps/skype.txt`));
router.get('/generated/noip/apps/whatsapp.txt', (req, res) => res.sendFile(`${noIp}/apps/whatsapp.txt`));

// Games and Game Services
router.get('/generated/noip/sites/riotgames.txt', (req, res) => res.sendFile(`${noIp}/sites/riotgames.txt`));
router.get('/generated/noip/games/league-of-legends.txt', (req, res) => res.sendFile(`${noIp}/games/league-of-legends.txt`));
router.get('/generated/noip/games/valorant.txt', (req, res) => res.sendFile(`${noIp}/games/valorant.txt`));

// ----------------- AdGuard -----------------
// Ads
router.get('/generated/adguard/ads/blocklistproject.ads.txt', (req, res) => res.sendFile(`${adguard}/ads/blocklistproject/hosts.fork.txt`));
router.get('/generated/adguard/ads/jerryn70.GoodbyeAds.txt', (req, res) => res.sendFile(`${adguard}/ads/jerryn70/GoodbyeAds.fork.txt`));
router.get('/generated/adguard/forks/kboghdady.youtubelist.txt', (req, res) => res.sendFile(`${adguard}/ads/kboghdady/youtubelist.fork.txt`));
router.get('/generated/adguard/ads/DandelionSprout.GameConsoleAdblockList.txt', (req, res) => res.sendFile(`${adguard}/ads/DandelionSprout.GameConsoleAdblockList.txt`));
router.get('/generated/adguard/ads/yoyo.AdsTrackersEtc.txt', (req, res) => res.sendFile(`${adguard}/ads/yoyo/ads-trackers-etc.fork.txt`));
router.get('/generated/adguard/forks/0Zinc.easylist.txt', (req, res) => res.sendFile(`${adguard}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/adguard/forks/ShadowWhisperer.Ads.txt', (req, res) => res.sendFile(`${adguard}/ads/ShadowWhisperer/Ads.fork.txt`));
router.get('/generated/adguard/forks/adaway.hosts.txt', (req, res) => res.sendFile(`${adguard}/ads/adaway/hosts.fork.txt`));
router.get('/generated/adguard/forks/anudeepND.adservers.txt', (req, res) => res.sendFile(`${adguard}/ads/anudeepND/adservers.fork.txt`));
router.get('/generated/adguard/forks/blocklistproject.youtube.txt', (req, res) => res.sendFile(`${adguard}/ads/blocklistproject/youtube.fork.txt`));
router.get('/generated/adguard/forks/craiu.mobiletrackers.txt', (req, res) => res.sendFile(`${adguard}/ads/craiu/mobiletrackers.fork.txt`));
router.get('/generated/adguard/forks/crazy-max.WindowsSpyBlocker.hosts-spy.txt', (req, res) => res.sendFile(`${adguard}/ads/crazy-max/spy.fork.txt`));
router.get('/generated/adguard/forks/disconnectme.simple_ad.txt', (req, res) => res.sendFile(`${adguard}/ads/disconnectme/simple-ad.fork.txt`));
router.get('/generated/adguard/forks/firebog.AdguardDNS.txt', (req, res) => res.sendFile(`${adguard}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/adguard/forks/firebog.Admiral.txt', (req, res) => res.sendFile(`${adguard}/ads/firebog/Admiral.fork.txt`));
router.get('/generated/adguard/forks/firebog.Easylist.txt', (req, res) => res.sendFile(`${adguard}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/adguard/forks/firebog.Prigent-Ads.txt', (req, res) => res.sendFile(`${adguard}/ads/firebog/Prigent-Ads.fork.txt`));
router.get('/generated/adguard/forks/MajkiIT.Ad_filter_list_by_Disconnect.txt', (req, res) => res.sendStatus(404));
router.get('/generated/adguard/forks/MajkiIT.SmartTV_ads.txt', (req, res) => res.sendFile(`${adguard}/ads/MajkiIT/SmartTV-ads.fork.txt`));
router.get('/generated/adguard/forks/r-a-y.AdguardMobileAds.txt', (req, res) => res.sendFile(`${adguard}/ads/r-a-y/AdguardMobileAds.fork.txt`));

// Tracking & telemetry
router.get('/generated/adguard/forks/0Zinc.easyprivacy.txt', (req, res) => res.sendFile(`${adguard}/tracking-and-telemetry/0Zinc/easyprivacy.fork.txt`));
router.get('/generated/adguard/forks/ente-dev.tv.txt', (req, res) => res.sendFile(`${adguard}/tracking-and-telemetry/ente-dev/tv.fork.txt`));
router.get('/generated/adguard/forks/frogeye.firstparty-trackers-hosts.txt', (req, res) => res.sendFile(`${adguard}/tracking-and-telemetry/frogeye/firstparty-trackers-hosts.txt`));
router.get('/generated/adguard/forks/MajkiIT.adguard_mobile_host.txt', (req, res) => res.sendFile(`${adguard}/tracking-and-telemetry/MajkiIT/adguard-mobile-host.fork.txt`));
router.get('/generated/adguard/forks/mitchellkrogza.Stop.Google.Analytics.Ghost.Spam-INACTIVE.txt', (req, res) => res.sendFile(`${adguard}/tracking-and-telemetry/mitchellkrogza/INACTIVE.fork.txt`));
router.get('/generated/adguard/forks/neodevpro.neodevhost.txt', (req, res) => res.sendFile(`${adguard}/tracking-and-telemetry/neodevpro/host.fork.txt`));

// AMP Hosts
router.get('/generated/adguard/forks/developerdan.amp-hosts-extended.txt', (req, res) => res.sendFile(`${adguard}/amp/developerdan/amp-hosts-extended.fork.txt`));
router.get('/generated/adguard/forks/ente-dev.google-amp-hosts.txt', (req, res) => res.sendFile(`${adguard}/amp/ente-dev/google-amp-hosts.fork.txt`));

// Malicious
router.get('/generated/adguard/forks/AssoEchap.stalkerware-indicators.txt', (req, res) => res.sendFile(`${adguard}/malicious/AssoEchap/stalkerware-indicators.fork.txt`));
router.get('/generated/adguard/forks/bigdargon.hostsVN.txt', (req, res) => res.sendFile(`${adguard}/malicious/bigdargon/hostsVN.fork.txt`));
router.get('/generated/adguard/forks/DandelionSprout-AntiMalwareHosts.txt', (req, res) => res.sendFile(`${adguard}/malicious/DandelionSprout-AntiMalwareHosts.fork.txt`));
router.get('/generated/adguard/forks/digitalside.latestdomains.txt', (req, res) => res.sendFile(`${adguard}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/adguard/forks/disconnectme.simple_malvertising.txt', (req, res) => res.sendFile(`${adguard}/malicious/disconnectme/simple-malvertising.fork.txt`));
router.get('/generated/adguard/forks/malware-filter.urlhaus-filter-hosts-online.txt', (req, res) => res.sendFile(`${adguard}/malicious/malware-filter/urlhaus-filter-hosts-online.fork.txt`));
router.get('/generated/adguard/forks/quidsup.notrack-malware.txt', (req, res) => res.sendFile(`${adguard}/malicious/quidsup/notrack-malware.fork.txt`));
router.get('/generated/adguard/forks/RPiList-Malware.txt', (req, res) => res.sendFile(`${adguard}/malicious/RPiList/Malware.fork.txt`));
router.get('/generated/adguard/forks/Spam404.main-blacklist.txt', (req, res) => res.sendFile(`${adguard}/malicious/Spam404/main-blacklist.fork.txt`));
router.get('/generated/adguard/malicious/blocklistproject.malware.txt', (req, res) => res.sendFile(`${adguard}/malicious/blocklistproject/malware.fork.txt`));
router.get('/generated/adguard/malicious/main.txt', (req, res) => res.sendFile(`${adguard}/malicious/sefinek.hosts1.txt`));
router.get('/generated/adguard/malicious/main-2.txt', (req, res) => res.sendFile(`${adguard}/malicious/sefinek.hosts2.txt`));
router.get('/generated/adguard/malicious/reported-by-norton.txt', (req, res) => res.sendFile(`${adguard}/malicious/reported-by-norton.txt`));
router.get('/generated/adguard/malicious/web-attacks.txt', (req, res) => res.sendFile(`${adguard}/malicious/web-attacks.txt`));

// Phishing
router.get('/generated/adguard/forks/blocklistproject.phishing.txt', (req, res) => res.sendFile(`${adguard}/phishing/blocklistproject/phishing.fork.txt`));
router.get('/generated/adguard/forks/Dogino.Discord-Phishing-URLs-phishing.txt', (req, res) => res.sendFile(`${adguard}/phishing/Dogino/Discord-Phishing-URLs-phishing.fork.txt`));
router.get('/generated/adguard/forks/phishingArmy.phishing_army_blocklist_extended.txt', (req, res) => res.sendFile(`${adguard}/phishing/phishing.army/blocklist-extended.fork.txt`));
router.get('/generated/adguard/forks/RPiList-Phishing.txt', (req, res) => res.sendFile(`${adguard}/phishing/RPiList/Phishing-Angriffe.fork.txt`));
router.get('/generated/adguard/phishing.txt', (req, res) => res.sendFile(`${adguard}/phishing/sefinek.hosts.txt`));
router.get('/generated/adguard/malicious/phishing.txt', (req, res) => res.sendFile(`${adguard}/phishing/sefinek.hosts.txt`));

// Ransomware
router.get('/generated/adguard/forks/blocklistproject.ransomware.txt', (req, res) => res.sendFile(`${adguard}/ransomware/blocklistproject/ransomware.fork.txt`));

// Cryptojacking
router.get('/generated/adguard/forks/hoshsadiq.adblock-nocoin-list.txt', (req, res) => res.sendFile(`${adguard}/crypto/cryptojacking/hoshsadiq/adblock-nocoin-list.fork.txt`));
router.get('/generated/adguard/forks/Snota418.Crypto-streams.txt', (req, res) => res.sendFile(`${adguard}/crypto/cryptojacking/Snota418/Crypto-streams.fork.txt`));
router.get('/generated/adguard/forks/firebog.Prigent-Crypto.txt', (req, res) => res.sendFile(`${adguard}/crypto/cryptojacking/firebog/Prigent/Crypto.fork.txt`));
router.get('/generated/adguard/forks/zerodot1.CoinBlockerLists.txt', (req, res) => res.sendFile(`${adguard}/crypto/cryptojacking/zerodot1/CoinBlockerLists-hosts.fork.txt`));

// Abuse
router.get('/generated/adguard/forks/abuse.urlhaus.txt', (req, res) => res.sendFile(`${adguard}/abuse/urlhaus.abuse.ch/hostfile.fork.txt`));
router.get('/generated/adguard/malicious/blocklistproject.abuse.txt', (req, res) => res.sendFile(`${adguard}/abuse/blocklistproject/hosts.fork.txt`));

// Fraud
router.get('/generated/adguard/malicious/blocklistproject.fraud.txt', (req, res) => res.sendFile(`${adguard}/fraud/blocklistproject/hosts.fork.txt`));

// Spam
router.get('/generated/adguard/forks/RPiList.Spam-Mails.txt', (req, res) => res.sendFile(`${adguard}/spam/RPiList/spam-mails.fork.txt`));
router.get('/generated/adguard/forks/stopforumspam.toxic_domains_whole.txt', (req, res) => res.sendFile(`${adguard}/spam/stopforumspam/toxic-domains-whole.fork.txt`));

// Piracy
router.get('/generated/adguard/forks/blocklistproject.piracy.txt', (req, res) => res.sendFile(`${adguard}/piracy/blocklistproject/piracy.fork.txt`));

// Redirect
router.get('/generated/adguard/forks/blocklistproject.redirect.txt', (req, res) => res.sendFile(`${adguard}/redirect/blocklistproject/redirect.fork.txt`));

// Scam
router.get('/generated/adguard/forks/blocklistproject.scam.txt', (req, res) => res.sendFile(`${adguard}/scam/blocklistproject/scam.fork.txt`));
router.get('/generated/adguard/forks/Dogino.Discord-Phishing-URLs-scam.txt', (req, res) => res.sendFile(`${adguard}/scam/Dogino/Discord-Phishing-URLs-scam.fork.txt`));
router.get('/generated/adguard/forks/durablenapkin.scamblocklist.txt', (req, res) => res.sendFile(`${adguard}/scam/durablenapkin/scamblocklist.fork.txt`));

// Suspicious
router.get('/generated/adguard/forks/firebog.w3kbl.txt', (req, res) => res.sendFile(`${adguard}/suspicious/firebog/w3kbl.fork.txt`));

// Extension
router.get('/generated/adguard/forks/cbuijs.adult-domains.txt', (req, res) => res.sendFile(`${adguard}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/adguard/forks/deathbybandaid.CountryCodesLists-France.txt', (req, res) => res.sendFile(`${adguard}/extensions/deathbybandaid/CountryCodesLists-France.fork.txt`));
router.get('/generated/adguard/forks/deathbybandaid.ParsedBlacklists-easylist-fr.txt', (req, res) => res.sendFile(`${adguard}/extensions/deathbybandaid/ParsedBlacklists-EasyList-Liste-FR.fork.txt`));
router.get('/generated/adguard/forks/deathbybandaid.ParsedBlacklists-easylist.txt', (req, res) => res.sendFile(`${adguard}/extensions/deathbybandaid/ParsedBlacklists-EasyList.fork.txt`));
router.get('/generated/adguard/forks/justdomains.adguarddns.txt', (req, res) => res.sendFile(`${adguard}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/adguard/forks/MajkiIT.adguard_host.txt', (req, res) => res.sendFile(`${adguard}/extensions/MajkiIT/adguard-host.fork.txt`));
router.get('/generated/adguard/forks/MajkiIT.easy_privacy_host.txt', (req, res) => res.sendFile(`${adguard}/extensions/MajkiIT/easy-privacy-host.fork.txt`));
router.get('/generated/adguard/forks/notracking.hostnames.txt', (req, res) => res.sendFile(`${adguard}/extensions/notracking/hostnames.fork.txt`));
router.get('/generated/adguard/forks/oisd.big.txt', (req, res) => res.sendFile(`${adguard}/extensions/oisd/big.fork.txt`));
router.get('/generated/adguard/forks/r-a-y.AdguardApps.txt', (req, res) => res.sendFile(`${adguard}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/adguard/forks/r-a-y.AdguardMobileSpyware.txt', (req, res) => res.sendFile(`${adguard}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/adguard/forks/StevenBlack.fakenews-gambling-porn.txt', (req, res) => res.sendFile(`${adguard}/other/StevenBlack/fakenews-gambling-porn.fork.txt`));

// StevenBlack Hosts
router.get('/generated/adguard/forks/FadeMind.add.2o7Net.txt', (req, res) => res.sendFile(`${adguard}/extensions/FadeMind/add-2o7Net.fork.txt`));
router.get('/generated/adguard/forks/FadeMind.add.Risk.txt', (req, res) => res.sendFile(`${adguard}/suspicious/FadeMind/add-Risk.fork.txt`));
router.get('/generated/adguard/forks/FadeMind.add.Spam.txt', (req, res) => res.sendFile(`${adguard}/spam/FadeMind/add-Spam.fork.txt`));
router.get('/generated/adguard/forks/FadeMind.UncheckyAds.txt', (req, res) => res.sendFile(`${adguard}/ads/FadeMind/UncheckyAds.fork.txt`));
router.get('/generated/adguard/forks/StevenBlack.hosts.txt', (req, res) => res.sendFile(`${adguard}/other/StevenBlack/hosts.fork.txt`));

// Polish Filters
router.get('/generated/adguard/forks/hole-cert.domains_hosts.txt', (req, res) => res.sendFile(`${adguard}/other/polish-blocklists/cert.pl/domains-hosts.fork.txt`));
router.get('/generated/adguard/forks/MajkiIT.hostfile.txt', (req, res) => res.sendFile(`${adguard}/other/polish-blocklists/MajkiIT/hostfile.fork.txt`));
router.get('/generated/adguard/forks/PolishFiltersTeam.KADhosts.txt', (req, res) => res.sendFile(`${adguard}/other/polish-blocklists/PolishFiltersTeam/KADhosts.fork.txt`));

// Porn
router.get('/generated/adguard/forks/4skinSkywalker.Anti-Porn.txt', (req, res) => res.sendFile(`${adguard}/porn/4skinSkywalker/hosts.fork.txt`));
router.get('/generated/adguard/forks/blocklistproject.porn.txt', (req, res) => res.sendFile(`${adguard}/porn/blocklistproject/porn.fork.txt`));
router.get('/generated/adguard/forks/chadmayfield.pi_blocklist_porn_all.txt', (req, res) => res.sendFile(`${adguard}/porn/chadmayfield/pi-blocklist-porn-all.fork.txt`));
router.get('/generated/adguard/forks/oisd.nsfw.txt', (req, res) => res.sendFile(`${adguard}/porn/oisd/nsfw.fork.txt`));
router.get('/generated/adguard/forks/Sinfonietta.pornography-hosts.txt', (req, res) => res.sendFile(`${adguard}/porn/Sinfonietta/pornography-hosts.fork.txt`));
router.get('/generated/adguard/porn.txt', (req, res) => res.sendFile(`${adguard}/porn/sefinek.hosts.txt`));

// Hate and Junk
router.get('/generated/adguard/forks/developerdan.hate-and-junk-extended.txt', (req, res) => res.sendFile(`${adguard}/hate-and-junk/developerdan/extended.fork.txt`));

// Drugs
router.get('/generated/adguard/forks/blocklistproject.drugs.txt', (req, res) => res.sendFile(`${adguard}/drugs/blocklistproject/drugs.fork.txt`));

// Fake News
router.get('/generated/adguard/forks/marktron.fakenews.txt', (req, res) => res.sendFile(`${adguard}/fakenews/marktron/hosts.fork.txt`));

// Gambling
router.get('/generated/adguard/forks/blocklistproject.gambling.txt', (req, res) => res.sendFile(`${adguard}/gambling/blocklistproject/hosts.fork.txt`));
router.get('/generated/adguard/forks/MajkiIT.gambling-hosts.txt', (req, res) => res.sendFile(`${adguard}/gambling/MajkiIT/gambling-hosts.fork.txt`));
router.get('/generated/adguard/gambling.txt', (req, res) => res.sendFile(`${adguard}/gambling/sefinek.hosts.txt`));
router.get('/generated/v1/adguard/gambling.txt', (req, res) => res.sendFile(`${adguard}/gambling/sefinek.hosts.txt`));

// Dating Services
router.get('/generated/adguard/forks/developerdan.dating-services-extended.txt', (req, res) => res.sendFile(`${adguard}/dating-services/developerdan/extended.fork.txt`));

// Useless Websites
router.get('/generated/adguard/useless-websites.txt', (req, res) => res.sendFile(`${adguard}/useless-websites/sefinek.hosts.txt`));
router.get('/generated/v1/adguard/useless-websites.txt', (req, res) => res.sendFile(`${adguard}/useless-websites/sefinek.hosts.txt`));

// Anime
router.get('/generated/adguard/anime/shinden.pl.txt', (req, res) => res.sendFile(`${adguard}/anime/shinden.pl.txt`));
router.get('/generated/adguard/anime/myanimelist.net.txt', (req, res) => res.sendFile(`${adguard}/anime/myanimelist.net.txt`));

// Cryptocurrency
router.get('/generated/adguard/cryptocurrency.txt', (req, res) => res.sendFile(`${adguard}/cryptocurrency.fork.txt`));

// Sites
router.get('/generated/adguard/sites/youtube.txt', (req, res) => res.sendFile(`${adguard}/sites/youtube.txt`));
router.get('/generated/adguard/sites/youtube-extended.txt', (req, res) => res.sendFile(`${adguard}/sites/youtube-extended.txt`));
router.get('/generated/adguard/sites/pinterest.txt', (req, res) => res.sendFile(`${adguard}/sites/pinterest.txt`));
router.get('/generated/adguard/sites/pixiv.txt', (req, res) => res.sendFile(`${adguard}/sites/pixiv.txt`));
router.get('/generated/adguard/sites/omegle.txt', (req, res) => res.sendFile(`${adguard}/sites/ometv.txt`));
router.get('/generated/v1/adguard/sites/omegle.txt', (req, res) => res.sendFile(`${adguard}/sites/ometv.txt`));
router.get('/generated/adguard/sites/gamebanana.txt', (req, res) => res.sendFile(`${adguard}/sites/gamebanana.txt`));
router.get('/generated/adguard/sites/booth.pm.txt', (req, res) => res.sendFile(`${adguard}/sites/booth.pm.txt`));
router.get('/generated/adguard/sites/patreon.txt', (req, res) => res.sendFile(`${adguard}/sites/patreon.txt`));

// Social Media
router.get('/generated/adguard/social/tiktok.txt', (req, res) => res.sendFile(`${adguard}/social/tiktok.txt`));
router.get('/generated/adguard/social/facebook.txt', (req, res) => res.sendFile(`${adguard}/social/facebook.txt`));
router.get('/generated/adguard/social/instagram.txt', (req, res) => res.sendFile(`${adguard}/social/instagram.txt`));
router.get('/generated/adguard/social/snapchat.txt', (req, res) => res.sendFile(`${adguard}/social/snapchat.txt`));
router.get('/generated/adguard/social/twitter.txt', (req, res) => res.sendFile(`${adguard}/social/twitter.txt`));

// Apps
router.get('/generated/adguard/apps/spotify.txt', (req, res) => res.sendFile(`${adguard}/apps/spotify.txt`));
router.get('/generated/adguard/apps/discord.txt', (req, res) => res.sendFile(`${adguard}/apps/discord.txt`));
router.get('/generated/adguard/apps/skype.txt', (req, res) => res.sendFile(`${adguard}/apps/skype.txt`));
router.get('/generated/adguard/apps/whatsapp.txt', (req, res) => res.sendFile(`${adguard}/apps/whatsapp.txt`));

// Games and Game Services
router.get('/generated/adguard/sites/riotgames.txt', (req, res) => res.sendFile(`${adguard}/sites/riotgames.txt`));
router.get('/generated/adguard/games/league-of-legends.txt', (req, res) => res.sendFile(`${adguard}/games/league-of-legends.txt`));
router.get('/generated/adguard/games/valorant.txt', (req, res) => res.sendFile(`${adguard}/games/valorant.txt`));

// ----------------- Dnsmasq -----------------
// Ads
router.get('/generated/dnsmasq/ads/blocklistproject.ads.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/blocklistproject/hosts.fork.txt`));
router.get('/generated/dnsmasq/ads/jerryn70.GoodbyeAds.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/jerryn70/GoodbyeAds.fork.txt`));
router.get('/generated/dnsmasq/forks/kboghdady.youtubelist.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/kboghdady/youtubelist.fork.txt`));
router.get('/generated/dnsmasq/ads/DandelionSprout.GameConsoleAdblockList.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/DandelionSprout.GameConsoleAdblockList.txt`));
router.get('/generated/dnsmasq/ads/yoyo.AdsTrackersEtc.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/yoyo/ads-trackers-etc.fork.txt`));
router.get('/generated/dnsmasq/forks/0Zinc.easylist.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/dnsmasq/forks/ShadowWhisperer.Ads.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/ShadowWhisperer/Ads.fork.txt`));
router.get('/generated/dnsmasq/forks/adaway.hosts.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/adaway/hosts.fork.txt`));
router.get('/generated/dnsmasq/forks/anudeepND.adservers.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/anudeepND/adservers.fork.txt`));
router.get('/generated/dnsmasq/forks/blocklistproject.youtube.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/blocklistproject/youtube.fork.txt`));
router.get('/generated/dnsmasq/forks/craiu.mobiletrackers.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/craiu/mobiletrackers.fork.txt`));
router.get('/generated/dnsmasq/forks/crazy-max.WindowsSpyBlocker.hosts-spy.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/crazy-max/spy.fork.txt`));
router.get('/generated/dnsmasq/forks/disconnectme.simple_ad.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/disconnectme/simple-ad.fork.txt`));
router.get('/generated/dnsmasq/forks/firebog.AdguardDNS.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/dnsmasq/forks/firebog.Admiral.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/firebog/Admiral.fork.txt`));
router.get('/generated/dnsmasq/forks/firebog.Easylist.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/0Zinc/easylist.fork.txt`));
router.get('/generated/dnsmasq/forks/firebog.Prigent-Ads.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/firebog/Prigent-Ads.fork.txt`));
router.get('/generated/dnsmasq/forks/MajkiIT.Ad_filter_list_by_Disconnect.txt', (req, res) => res.sendStatus(404));
router.get('/generated/dnsmasq/forks/MajkiIT.SmartTV_ads.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/MajkiIT/SmartTV-ads.fork.txt`));
router.get('/generated/dnsmasq/forks/r-a-y.AdguardMobileAds.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/r-a-y/AdguardMobileAds.fork.txt`));

// Tracking & telemetry
router.get('/generated/dnsmasq/forks/0Zinc.easyprivacy.txt', (req, res) => res.sendFile(`${dnsmasq}/tracking-and-telemetry/0Zinc/easyprivacy.fork.txt`));
router.get('/generated/dnsmasq/forks/ente-dev.tv.txt', (req, res) => res.sendFile(`${dnsmasq}/tracking-and-telemetry/ente-dev/tv.fork.txt`));
router.get('/generated/dnsmasq/forks/frogeye.firstparty-trackers-hosts.txt', (req, res) => res.sendFile(`${dnsmasq}/tracking-and-telemetry/frogeye/firstparty-trackers-hosts.txt`));
router.get('/generated/dnsmasq/forks/MajkiIT.adguard_mobile_host.txt', (req, res) => res.sendFile(`${dnsmasq}/tracking-and-telemetry/MajkiIT/adguard-mobile-host.fork.txt`));
router.get('/generated/dnsmasq/forks/mitchellkrogza.Stop.Google.Analytics.Ghost.Spam-INACTIVE.txt', (req, res) => res.sendFile(`${dnsmasq}/tracking-and-telemetry/mitchellkrogza/INACTIVE.fork.txt`));
router.get('/generated/dnsmasq/forks/neodevpro.neodevhost.txt', (req, res) => res.sendFile(`${dnsmasq}/tracking-and-telemetry/neodevpro/host.fork.txt`));

// AMP Hosts
router.get('/generated/dnsmasq/forks/developerdan.amp-hosts-extended.txt', (req, res) => res.sendFile(`${dnsmasq}/amp/developerdan/amp-hosts-extended.fork.txt`));
router.get('/generated/dnsmasq/forks/ente-dev.google-amp-hosts.txt', (req, res) => res.sendFile(`${dnsmasq}/amp/ente-dev/google-amp-hosts.fork.txt`));

// Malicious
router.get('/generated/dnsmasq/forks/AssoEchap.stalkerware-indicators.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/AssoEchap/stalkerware-indicators.fork.txt`));
router.get('/generated/dnsmasq/forks/bigdargon.hostsVN.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/bigdargon/hostsVN.fork.txt`));
router.get('/generated/dnsmasq/forks/DandelionSprout-AntiMalwareHosts.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/DandelionSprout-AntiMalwareHosts.fork.txt`));
router.get('/generated/dnsmasq/forks/digitalside.latestdomains.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/dnsmasq/forks/disconnectme.simple_malvertising.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/disconnectme/simple-malvertising.fork.txt`));
router.get('/generated/dnsmasq/forks/malware-filter.urlhaus-filter-hosts-online.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/malware-filter/urlhaus-filter-hosts-online.fork.txt`));
router.get('/generated/dnsmasq/forks/quidsup.notrack-malware.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/quidsup/notrack-malware.fork.txt`));
router.get('/generated/dnsmasq/forks/RPiList-Malware.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/RPiList/Malware.fork.txt`));
router.get('/generated/dnsmasq/forks/Spam404.main-blacklist.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/Spam404/main-blacklist.fork.txt`));
router.get('/generated/dnsmasq/malicious/blocklistproject.malware.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/blocklistproject/malware.fork.txt`));
router.get('/generated/dnsmasq/malicious/main.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/sefinek.hosts1.txt`));
router.get('/generated/dnsmasq/malicious/main-2.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/sefinek.hosts2.txt`));
router.get('/generated/dnsmasq/malicious/reported-by-norton.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/reported-by-norton.txt`));
router.get('/generated/dnsmasq/malicious/web-attacks.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/web-attacks.txt`));

// Phishing
router.get('/generated/dnsmasq/forks/blocklistproject.phishing.txt', (req, res) => res.sendFile(`${dnsmasq}/phishing/blocklistproject/phishing.fork.txt`));
router.get('/generated/dnsmasq/forks/Dogino.Discord-Phishing-URLs-phishing.txt', (req, res) => res.sendFile(`${dnsmasq}/phishing/Dogino/Discord-Phishing-URLs-phishing.fork.txt`));
router.get('/generated/dnsmasq/forks/phishingArmy.phishing_army_blocklist_extended.txt', (req, res) => res.sendFile(`${dnsmasq}/phishing/phishing.army/blocklist-extended.fork.txt`));
router.get('/generated/dnsmasq/forks/RPiList-Phishing.txt', (req, res) => res.sendFile(`${dnsmasq}/phishing/RPiList/Phishing-Angriffe.fork.txt`));
router.get('/generated/dnsmasq/phishing.txt', (req, res) => res.sendFile(`${dnsmasq}/phishing/sefinek.hosts.txt`));
router.get('/generated/dnsmasq/malicious/phishing.txt', (req, res) => res.sendFile(`${dnsmasq}/phishing/sefinek.hosts.txt`));

// Ransomware
router.get('/generated/dnsmasq/forks/blocklistproject.ransomware.txt', (req, res) => res.sendFile(`${dnsmasq}/ransomware/blocklistproject/ransomware.fork.txt`));

// Cryptojacking
router.get('/generated/dnsmasq/forks/hoshsadiq.adblock-nocoin-list.txt', (req, res) => res.sendFile(`${dnsmasq}/crypto/cryptojacking/hoshsadiq/adblock-nocoin-list.fork.txt`));
router.get('/generated/dnsmasq/forks/Snota418.Crypto-streams.txt', (req, res) => res.sendFile(`${dnsmasq}/crypto/cryptojacking/Snota418/Crypto-streams.fork.txt`));
router.get('/generated/dnsmasq/forks/firebog.Prigent-Crypto.txt', (req, res) => res.sendFile(`${dnsmasq}/crypto/cryptojacking/firebog/Prigent/Crypto.fork.txt`));
router.get('/generated/dnsmasq/forks/zerodot1.CoinBlockerLists.txt', (req, res) => res.sendFile(`${dnsmasq}/crypto/cryptojacking/zerodot1/CoinBlockerLists-hosts.fork.txt`));

// Abuse
router.get('/generated/dnsmasq/forks/abuse.urlhaus.txt', (req, res) => res.sendFile(`${dnsmasq}//abuse/urlhaus.abuse.ch/hostfile.fork.txt`));
router.get('/generated/dnsmasq/malicious/blocklistproject.abuse.txt', (req, res) => res.sendFile(`${dnsmasq}/abuse/blocklistproject/hosts.fork.txt`));

// Fraud
router.get('/generated/dnsmasq/malicious/blocklistproject.fraud.txt', (req, res) => res.sendFile(`${dnsmasq}/fraud/blocklistproject/hosts.fork.txt`));

// Spam
router.get('/generated/dnsmasq/forks/RPiList.Spam-Mails.txt', (req, res) => res.sendFile(`${dnsmasq}/spam/RPiList/spam-mails.fork.txt`));
router.get('/generated/dnsmasq/forks/stopforumspam.toxic_domains_whole.txt', (req, res) => res.sendFile(`${dnsmasq}/spam/stopforumspam/toxic-domains-whole.fork.txt`));

// Piracy
router.get('/generated/dnsmasq/forks/blocklistproject.piracy.txt', (req, res) => res.sendFile(`${dnsmasq}/piracy/blocklistproject/piracy.fork.txt`));

// Redirect
router.get('/generated/dnsmasq/forks/blocklistproject.redirect.txt', (req, res) => res.sendFile(`${dnsmasq}/redirect/blocklistproject/redirect.fork.txt`));

// Scam
router.get('/generated/dnsmasq/forks/blocklistproject.scam.txt', (req, res) => res.sendFile(`${dnsmasq}/scam/blocklistproject/scam.fork.txt`));
router.get('/generated/dnsmasq/forks/Dogino.Discord-Phishing-URLs-scam.txt', (req, res) => res.sendFile(`${dnsmasq}/scam/Dogino/Discord-Phishing-URLs-scam.fork.txt`));
router.get('/generated/dnsmasq/forks/durablenapkin.scamblocklist.txt', (req, res) => res.sendFile(`${dnsmasq}/scam/durablenapkin/scamblocklist.fork.txt`));

// Suspicious
router.get('/generated/dnsmasq/forks/firebog.w3kbl.txt', (req, res) => res.sendFile(`${dnsmasq}/suspicious/firebog/w3kbl.fork.txt`));

// Extension
router.get('/generated/dnsmasq/forks/cbuijs.adult-domains.txt', (req, res) => res.sendFile(`${dnsmasq}/malicious/digitalside/latestdomains.fork.txt`));
router.get('/generated/dnsmasq/forks/deathbybandaid.CountryCodesLists-France.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/deathbybandaid/CountryCodesLists-France.fork.txt`));
router.get('/generated/dnsmasq/forks/deathbybandaid.ParsedBlacklists-easylist-fr.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/deathbybandaid/ParsedBlacklists-EasyList-Liste-FR.fork.txt`));
router.get('/generated/dnsmasq/forks/deathbybandaid.ParsedBlacklists-easylist.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/deathbybandaid/ParsedBlacklists-EasyList.fork.txt`));
router.get('/generated/dnsmasq/forks/justdomains.adguarddns.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/firebog/AdguardDNS.fork.txt`));
router.get('/generated/dnsmasq/forks/MajkiIT.adguard_host.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/MajkiIT/adguard-host.fork.txt`));
router.get('/generated/dnsmasq/forks/MajkiIT.easy_privacy_host.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/MajkiIT/easy-privacy-host.fork.txt`));
router.get('/generated/dnsmasq/forks/notracking.hostnames.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/notracking/hostnames.fork.txt`));
router.get('/generated/dnsmasq/forks/oisd.big.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/oisd/big.fork.txt`));
router.get('/generated/dnsmasq/forks/r-a-y.AdguardApps.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/dnsmasq/forks/r-a-y.AdguardMobileSpyware.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/r-a-y/AdguardApps.fork.txt`));
router.get('/generated/dnsmasq/forks/StevenBlack.fakenews-gambling-porn.txt', (req, res) => res.sendFile(`${dnsmasq}/other/StevenBlack/fakenews-gambling-porn.fork.txt`));

// StevenBlack Hosts
router.get('/generated/dnsmasq/forks/FadeMind.add.2o7Net.txt', (req, res) => res.sendFile(`${dnsmasq}/extensions/FadeMind/add-2o7Net.fork.txt`));
router.get('/generated/dnsmasq/forks/FadeMind.add.Risk.txt', (req, res) => res.sendFile(`${dnsmasq}/suspicious/FadeMind/add-Risk.fork.txt`));
router.get('/generated/dnsmasq/forks/FadeMind.add.Spam.txt', (req, res) => res.sendFile(`${dnsmasq}/spam/FadeMind/add-Spam.fork.txt`));
router.get('/generated/dnsmasq/forks/FadeMind.UncheckyAds.txt', (req, res) => res.sendFile(`${dnsmasq}/ads/FadeMind/UncheckyAds.fork.txt`));
router.get('/generated/dnsmasq/forks/StevenBlack.hosts.txt', (req, res) => res.sendFile(`${dnsmasq}/other/StevenBlack/hosts.fork.txt`));

// Polish Filters
router.get('/generated/dnsmasq/forks/hole-cert.domains_hosts.txt', (req, res) => res.sendFile(`${dnsmasq}/other/polish-blocklists/cert.pl/domains-hosts.fork.txt`));
router.get('/generated/dnsmasq/forks/MajkiIT.hostfile.txt', (req, res) => res.sendFile(`${dnsmasq}/other/polish-blocklists/MajkiIT/hostfile.fork.txt`));
router.get('/generated/dnsmasq/forks/PolishFiltersTeam.KADhosts.txt', (req, res) => res.sendFile(`${dnsmasq}/other/polish-blocklists/PolishFiltersTeam/KADhosts.fork.txt`));

// Porn
router.get('/generated/dnsmasq/forks/4skinSkywalker.Anti-Porn.txt', (req, res) => res.sendFile(`${dnsmasq}/porn/4skinSkywalker/hosts.fork.txt`));
router.get('/generated/dnsmasq/forks/blocklistproject.porn.txt', (req, res) => res.sendFile(`${dnsmasq}/porn/blocklistproject/porn.fork.txt`));
router.get('/generated/dnsmasq/forks/chadmayfield.pi_blocklist_porn_all.txt', (req, res) => res.sendFile(`${dnsmasq}/porn/chadmayfield/pi-blocklist-porn-all.fork.txt`));
router.get('/generated/dnsmasq/forks/oisd.nsfw.txt', (req, res) => res.sendFile(`${dnsmasq}/porn/oisd/nsfw.fork.txt`));
router.get('/generated/dnsmasq/forks/Sinfonietta.pornography-hosts.txt', (req, res) => res.sendFile(`${dnsmasq}/porn/Sinfonietta/pornography-hosts.fork.txt`));
router.get('/generated/dnsmasq/porn.txt', (req, res) => res.sendFile(`${dnsmasq}/porn/sefinek.hosts.txt`));

// Hate and Junk
router.get('/generated/dnsmasq/forks/developerdan.hate-and-junk-extended.txt', (req, res) => res.sendFile(`${dnsmasq}/hate-and-junk/developerdan/extended.fork.txt`));

// Drugs
router.get('/generated/dnsmasq/forks/blocklistproject.drugs.txt', (req, res) => res.sendFile(`${dnsmasq}/drugs/blocklistproject/drugs.fork.txt`));

// Fake News
router.get('/generated/dnsmasq/forks/marktron.fakenews.txt', (req, res) => res.sendFile(`${dnsmasq}/fakenews/marktron/hosts.fork.txt`));

// Gambling
router.get('/generated/dnsmasq/forks/blocklistproject.gambling.txt', (req, res) => res.sendFile(`${dnsmasq}/gambling/blocklistproject/hosts.fork.txt`));
router.get('/generated/dnsmasq/forks/MajkiIT.gambling-hosts.txt', (req, res) => res.sendFile(`${dnsmasq}/gambling/MajkiIT/gambling-hosts.fork.txt`));
router.get('/generated/dnsmasq/gambling.txt', (req, res) => res.sendFile(`${dnsmasq}/gambling/sefinek.hosts.txt`));
router.get('/generated/v1/dnsmasq/gambling.txt', (req, res) => res.sendFile(`${dnsmasq}/gambling/sefinek.hosts.txt`));

// Dating Services
router.get('/generated/dnsmasq/forks/developerdan.dating-services-extended.txt', (req, res) => res.sendFile(`${dnsmasq}/dating-services/developerdan/extended.fork.txt`));

// Useless Websites
router.get('/generated/dnsmasq/useless-websites.txt', (req, res) => res.sendFile(`${dnsmasq}/useless-websites/sefinek.hosts.txt`));
router.get('/generated/v1/dnsmasq/useless-websites.txt', (req, res) => res.sendFile(`${dnsmasq}/useless-websites/sefinek.hosts.txt`));

// Anime
router.get('/generated/dnsmasq/anime/shinden.pl.txt', (req, res) => res.sendFile(`${dnsmasq}/anime/shinden.pl.txt`));
router.get('/generated/dnsmasq/anime/myanimelist.net.txt', (req, res) => res.sendFile(`${dnsmasq}/anime/myanimelist.net.txt`));

// Cryptocurrency
router.get('/generated/dnsmasq/cryptocurrency.txt', (req, res) => res.sendFile(`${dnsmasq}/cryptocurrency.fork.txt`));

// Sites
router.get('/generated/dnsmasq/sites/youtube.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/youtube.txt`));
router.get('/generated/dnsmasq/sites/youtube-extended.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/youtube-extended.txt`));
router.get('/generated/dnsmasq/sites/pinterest.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/pinterest.txt`));
router.get('/generated/dnsmasq/sites/pixiv.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/pixiv.txt`));
router.get('/generated/dnsmasq/sites/omegle.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/ometv.txt`));
router.get('/generated/v1/dnsmasq/sites/omegle.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/ometv.txt`));
router.get('/generated/dnsmasq/sites/gamebanana.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/gamebanana.txt`));
router.get('/generated/dnsmasq/sites/booth.pm.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/booth.pm.txt`));
router.get('/generated/dnsmasq/sites/patreon.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/patreon.txt`));

// Social Media
router.get('/generated/dnsmasq/social/tiktok.txt', (req, res) => res.sendFile(`${dnsmasq}/social/tiktok.txt`));
router.get('/generated/dnsmasq/social/facebook.txt', (req, res) => res.sendFile(`${dnsmasq}/social/facebook.txt`));
router.get('/generated/dnsmasq/social/instagram.txt', (req, res) => res.sendFile(`${dnsmasq}/social/instagram.txt`));
router.get('/generated/dnsmasq/social/snapchat.txt', (req, res) => res.sendFile(`${dnsmasq}/social/snapchat.txt`));
router.get('/generated/dnsmasq/social/twitter.txt', (req, res) => res.sendFile(`${dnsmasq}/social/twitter.txt`));

// Apps
router.get('/generated/dnsmasq/apps/spotify.txt', (req, res) => res.sendFile(`${dnsmasq}/apps/spotify.txt`));
router.get('/generated/dnsmasq/apps/discord.txt', (req, res) => res.sendFile(`${dnsmasq}/apps/discord.txt`));
router.get('/generated/dnsmasq/apps/skype.txt', (req, res) => res.sendFile(`${dnsmasq}/apps/skype.txt`));
router.get('/generated/dnsmasq/apps/whatsapp.txt', (req, res) => res.sendFile(`${dnsmasq}/apps/whatsapp.txt`));

// Games and Game Services
router.get('/generated/dnsmasq/sites/riotgames.txt', (req, res) => res.sendFile(`${dnsmasq}/sites/riotgames.txt`));
router.get('/generated/dnsmasq/games/league-of-legends.txt', (req, res) => res.sendFile(`${dnsmasq}/games/league-of-legends.txt`));
router.get('/generated/dnsmasq/games/valorant.txt', (req, res) => res.sendFile(`${dnsmasq}/games/valorant.txt`));

module.exports = router;