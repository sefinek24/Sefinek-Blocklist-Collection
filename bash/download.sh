#!/bin/bash


# Directory
output_dir="blocklist/template/forks"
if [ ! -d $output_dir ]; then
  echo "Creating folder..."
  mkdir -p $output_dir
fi


# Blocklist urls
urls=(
  # adaway.org
  "https://adaway.org/hosts.txt,adaway.hosts.txt"

  # oisd
  "https://big.oisd.nl,oisd.big.txt"
  "https://nsfw.oisd.nl,oisd.nsfw.txt"

  # blocklistproject
  "https://blocklistproject.github.io/Lists/abuse.txt,blocklistproject.abuse.txt"
  "https://blocklistproject.github.io/Lists/ads.txt,blocklistproject.ads.txt"
  "https://blocklistproject.github.io/Lists/drugs.txt,blocklistproject.drugs.txt"
  "https://blocklistproject.github.io/Lists/fraud.txt,blocklistproject.fraud.txt"
  "https://blocklistproject.github.io/Lists/gambling.txt,blocklistproject.gambling.txt"
  "https://blocklistproject.github.io/Lists/malware.txt,blocklistproject.malware.txt"
  "https://blocklistproject.github.io/Lists/phishing.txt,blocklistproject.phishing.txt"
  "https://blocklistproject.github.io/Lists/piracy.txt,blocklistproject.piracy.txt"
  "https://blocklistproject.github.io/Lists/porn.txt,blocklistproject.porn.txt"
  "https://blocklistproject.github.io/Lists/ransomware.txt,blocklistproject.ransomware.txt"
  "https://blocklistproject.github.io/Lists/redirect.txt,blocklistproject.redirect.txt"
  "https://blocklistproject.github.io/Lists/scam.txt,blocklistproject.scam.txt"
  "https://blocklistproject.github.io/Lists/youtube.txt,blocklistproject.youtube.txt"

  # ente.dev
  "https://ente.dev/api/blocklist/google-amp-hosts,ente-dev.google-amp-hosts.txt"
  "https://ente.dev/api/blocklist/tv,ente-dev.tv.txt"

  # quidsup
  "https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt,quidsup.notrack-malware.txt"

  # cert.pl
  "https://hole.cert.pl/domains/domains_hosts.txt,hole-cert.domains_hosts.txt"

  # frogeye.fr
  "https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt,frogeye.firstparty-trackers-hosts.txt"

  # justdomains
  "https://justdomains.github.io/blocklists/lists/adguarddns-justdomains.txt,justdomains.adguarddns.txt"

  # malware-filter
  "https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-hosts-online.txt,malware-filter.urlhaus-filter-hosts-online.txt"

  # digitalside.it
  "https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt,digitalside.latestdomains.txt"

  # phishing.army
  "https://phishing.army/download/phishing_army_blocklist_extended.txt,phishingArmy.phishing_army_blocklist_extended.txt"

  # 0Zinc
  "https://raw.githubusercontent.com/0Zinc/easylists-for-pihole/master/easylist.txt,0Zinc.easylist.txt"
  "https://raw.githubusercontent.com/0Zinc/easylists-for-pihole/master/easyprivacy.txt,0Zinc.easyprivacy.txt"

  # 4skinSkywalker
  "https://raw.githubusercontent.com/4skinSkywalker/Anti-Porn-HOSTS-File/master/HOSTS.txt,4skinSkywalker.Anti-Porn.txt"

  # anudeepND
  "https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt,anudeepND.adservers.txt"

  # AssoEchap
  "https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/master/generated/hosts,AssoEchap.stalkerware-indicators.txt"

  # bigdargon
  "https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts,bigdargon.hostsVN.txt"

  # cbuijs
  "https://raw.githubusercontent.com/cbuijs/ut1/master/adult/domains.24733,cbuijs.adult-domains.txt"

  # chadmayfield
  "https://raw.githubusercontent.com/chadmayfield/my-pihole-blocklists/master/lists/pi_blocklist_porn_all.list,chadmayfield.pi_blocklist_porn_all.txt"

  # craiu
  "https://raw.githubusercontent.com/craiu/mobiletrackers/master/list.txt,craiu.mobiletrackers.txt"

  # crazy-max
  "https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt,crazy-max.WindowsSpyBlocker.hosts-spy.txt"

  # DandelionSprout
  "https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt,DandelionSprout-AntiMalwareHosts.txt"

  # deathbybandaid
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/CountryCodesLists/France.txt,deathbybandaid.CountryCodesLists-France.txt"
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/ParsedBlacklists/EasyList-Liste-FR.txt,deathbybandaid.ParsedBlacklists-easylist-fr.txt"
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/ParsedBlacklists/EasyList.txt,deathbybandaid.ParsedBlacklists-easylist.txt"

  # Dogino
  "https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/pihole-phishing-adlist.txt,Dogino.Discord-Phishing-URLs-phishing.txt"
  "https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/scam-urls.txt,Dogino.Discord-Phishing-URLs-scam.txt"

  # durablenapkin
  "https://raw.githubusercontent.com/durablenapkin/scamblocklist/master/hosts.txt,durablenapkin.scamblocklist.txt"

  # FadeMind
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts,FadeMind.add.2o7Net.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts,FadeMind.add.Risk.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts,FadeMind.add.Spam.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts,FadeMind.UncheckyAds.txt"

  # hoshsadiq
  "https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt,hoshsadiq.adblock-nocoin-list.txt"

  # kboghdady
  "https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/youtubelist.txt,kboghdady.youtubelist.txt"

  # MajkiIT
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adguard_host.txt,MajkiIT.adguard_host.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adguard_mobile_host.txt,MajkiIT.adguard_mobile_host.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/Ad_filter_list_by_Disconnect.txt,MajkiIT.Ad_filter_list_by_Disconnect.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/easy_privacy_host.txt,MajkiIT.easy_privacy_host.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/gambling-hosts.txt,MajkiIT.gambling-hosts.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/hostfile.txt,MajkiIT.hostfile.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/SmartTV_ads.txt,MajkiIT.SmartTV_ads.txt"

  # marktron
  "https://raw.githubusercontent.com/marktron/fakenews/master/fakenews,marktron.fakenews.txt"

  # mhhakim (DEPRECATED)
  "https://raw.githubusercontent.com/mhhakim/pihole-blocklist/master/custom-porn-blocklist.txt,mhhakim.custom-porn-blocklist.txt"

  # mitchellkrogza
  "https://raw.githubusercontent.com/mitchellkrogza/Stop.Google.Analytics.Ghost.Spam.HOWTO/master/output/domains/INACTIVE/list,mitchellkrogza.Stop.Google.Analytics.Ghost.Spam-INACTIVE.txt"

  # neodevpro
  "https://raw.githubusercontent.com/neodevpro/neodevhost/master/host,neodevpro.neodevhost.txt"

  # notracking
  "https://raw.githubusercontent.com/notracking/hosts-blocklists/master/hostnames.txt,notracking.hostnames.txt"

  # PolishFiltersTeam
  "https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt,PolishFiltersTeam.KADhosts.txt"

  # r-a-y
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardApps.txt,r-a-y.AdguardApps.txt"
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileAds.txt,r-a-y.AdguardMobileAds.txt"
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileSpyware.txt,r-a-y.AdguardMobileSpyware.txt"

  # RPiList
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/malware,RPiList-Malware.txt"
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Phishing-Angriffe,RPiList-Phishing.txt"
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/spam.mails,RPiList.Spam-Mails.txt"

  # Sinfonietta
  "https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/pornography-hosts,Sinfonietta.pornography-hosts.txt"

  # Snota418
  "https://raw.githubusercontent.com/Snota418/Youtube-spam-host-list/main/Crypto%20streams,Snota418.Crypto-streams.txt"

  # Spam404
  "https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt,Spam404.main-blacklist.txt"

  # StevenBlack
  "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-gambling-porn/hosts,StevenBlack.fakenews-gambling-porn.txt"
  "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts,StevenBlack.hosts.txt"

  # xlimit91
  "https://raw.githubusercontent.com/xlimit91/xlimit91-block-list/master/blacklist.txt,xlimit91.blacklist.txt"

  # lists.disconnect.me
  "https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt,disconnectme.simple_ad.txt"
  "https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt,disconnectme.simple_malvertising.txt"

  # abuse.ch
  "https://urlhaus.abuse.ch/downloads/hostfile,abuse.urlhaus.txt"

  # firebog.net
  "https://v.firebog.net/hosts/AdguardDNS.txt,firebog.AdguardDNS.txt"
  "https://v.firebog.net/hosts/Admiral.txt,firebog.Admiral.txt"
  "https://v.firebog.net/hosts/Easylist.txt,firebog.Easylist.txt"
  "https://v.firebog.net/hosts/Prigent-Ads.txt,firebog.Prigent-Ads.txt"
  "https://v.firebog.net/hosts/Prigent-Crypto.txt,firebog.Prigent-Crypto.txt"
  "https://v.firebog.net/hosts/static/w3kbl.txt,firebog.w3kbl.txt"

  # github.developerdan.com
  "https://www.github.developerdan.com/hosts/lists/amp-hosts-extended.txt,developerdan.amp-hosts-extended.txt"
  "https://www.github.developerdan.com/hosts/lists/dating-services-extended.txt,developerdan.dating-services-extended.txt"
  "https://www.github.developerdan.com/hosts/lists/hate-and-junk-extended.txt,developerdan.hate-and-junk-extended.txt"

  # stopforumspam.com
  "https://www.stopforumspam.com/downloads/toxic_domains_whole.txt,stopforumspam.toxic_domains_whole.txt"

  # CoinBlockerLists
  "https://zerodot1.gitlab.io/CoinBlockerLists/hosts,zerodot1.CoinBlockerLists.txt"

  # ShadowWhisperer
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Ads,ShadowWhisperer.Ads.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Adult,ShadowWhisperer.Adult.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Bloat,ShadowWhisperer.Bloat.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Chat,ShadowWhisperer.Chat.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Cryptocurrency,ShadowWhisperer.Cryptocurrency.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Dating,ShadowWhisperer.Dating.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Filter,ShadowWhisperer.Filter.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Free,ShadowWhisperer.Free.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Gambling,ShadowWhisperer.Gambling.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Junk,ShadowWhisperer.Junk.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Malware,ShadowWhisperer.Malware.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Marketing,ShadowWhisperer.Marketing.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Marketing-Email,ShadowWhisperer.Marketing-Email.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Microsoft,ShadowWhisperer.Microsoft.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Remote,ShadowWhisperer.Remote.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Risk,ShadowWhisperer.Risk.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Scam,ShadowWhisperer.Scam.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Shock,ShadowWhisperer.Shock.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Top_Level,ShadowWhisperer.Top_Level.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Tracking,ShadowWhisperer.Tracking.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Tunnels,ShadowWhisperer.Tunnels.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Typo,ShadowWhisperer.Typo.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/UrlShortener,ShadowWhisperer.UrlShortener.txt"

  # hagezi
  "https://raw.githubusercontent.com/hagezi/dns-blocklists/main/hosts/pro.txt,hagezi.pro.txt"
)

# Read version from package.json
package_json_path="./package.json"
if [ -f "$package_json_path" ]; then
  # Set the user agent with the version from package.json
  user_agent="Mozilla/5.0 (compatible; SefinekBlocklistsAgent/$(node -p "require('$package_json_path').version"); +https://blocklist.sefinek.net)"
else
  echo "✖ package.json file not found."
  exit 1
fi

# Download files
for url in "${urls[@]}"; do
  url_parts=(${url//,/ })
  download_url=${url_parts[0]}
  filename=${url_parts[1]}

  # Download the file using wget command
  wget -U "Mozilla/5.0 (compatible; SefinekBlocklistsAgent/$user_agent; +https://blocklist.sefinek.net)" -P "$output_dir" --no-check-certificate -O "$output_dir/$filename" "$download_url" 2>&1 |
  while IFS= read -r line; do
    if [[ $line == *%* ]]; then
      # Print download progress if line contains '%'
      echo -ne "\033[2K\r$line"
    else
      # Print other output lines
      echo "$line"
    fi
  done

  # Capture the HTTP status code
  http_status=$?

  # Handle HTTP errors
  if [ "$http_status" -eq 0 ]; then
    echo "✔ Download completed successfully."
  elif [ "$http_status" -eq 8 ]; then
    echo "✖ File does not exist (error 404)."
  elif [ "$http_status" -eq 4 ]; then
    echo "✖ Access denied to the file (error 403)."
  else
    echo "✖ An error occurred during download (status code: $http_status)."
  fi

  echo ""
  echo ""
done

echo "✔ Success! Finished at: $(date +'%Y-%m-%d %H:%M:%S')"
