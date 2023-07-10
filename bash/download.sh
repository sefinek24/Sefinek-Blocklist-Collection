#!/bin/bash

output_dir="/home/ubuntu/node/www/Sefinek-Blocklist-Collection/blocklist/template/forks"

if [ ! -d $output_dir ]; then
  echo "Creating folder..."
  mkdir -p $output_dir
else
  echo "Folder already exists"
fi

urls=(
  "https://adaway.org/hosts.txt,adaway.hosts.txt"
  "https://big.oisd.nl,oisd.big.txt"
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
  "https://ente.dev/api/blocklist/google-amp-hosts,ente-dev.google-amp-hosts.txt"
  "https://ente.dev/api/blocklist/tv,ente-dev.tv.txt"
  "https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt,quidsup.notrack-malware.txt"
  "https://hole.cert.pl/domains/domains_hosts.txt,hole-cert.domains_hosts.txt"
  "https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt,frogeye.firstparty-trackers-hosts.txt"
  "https://justdomains.github.io/blocklists/lists/adguarddns-justdomains.txt,justdomains.adguarddns.txt"
  "https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-hosts-online.txt,malware-filter.urlhaus-filter-hosts-online.txt"
  "https://nsfw.oisd.nl,oisd.nsfw.txt"
  "https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt,digitalside.latestdomains.txt"
  "https://phishing.army/download/phishing_army_blocklist_extended.txt,phishingArmy.phishing_army_blocklist_extended.txt"
  "https://raw.githubusercontent.com/0Zinc/easylists-for-pihole/master/easylist.txt,0Zinc.easylist.txt"
  "https://raw.githubusercontent.com/0Zinc/easylists-for-pihole/master/easyprivacy.txt,0Zinc.easyprivacy.txt"
  "https://raw.githubusercontent.com/4skinSkywalker/Anti-Porn-HOSTS-File/master/HOSTS.txt,4skinSkywalker.Anti-Porn.txt"
  "https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt,anudeepND.adservers.txt"
  "https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/master/generated/hosts,AssoEchap.stalkerware-indicators.txt"
  "https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts,bigdargon.hostsVN.txt"
  "https://raw.githubusercontent.com/cbuijs/ut1/master/adult/domains.24733,cbuijs.adult-domains.txt"
  "https://raw.githubusercontent.com/chadmayfield/my-pihole-blocklists/master/lists/pi_blocklist_porn_all.list,chadmayfield.pi_blocklist_porn_all.txt"
  "https://raw.githubusercontent.com/craiu/mobiletrackers/master/list.txt,craiu.mobiletrackers.txt"
  "https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt,crazy-max.WindowsSpyBlocker.hosts-spy.txt"
  "https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt,DandelionSprout-AntiMalwareHosts.txt"
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/CountryCodesLists/France.txt,deathbybandaid.CountryCodesLists-France.txt"
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/ParsedBlacklists/EasyList-Liste-FR.txt,deathbybandaid.ParsedBlacklists-easylist-fr.txt"
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/ParsedBlacklists/EasyList.txt,deathbybandaid.ParsedBlacklists-easylist.txt"
  "https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/pihole-phishing-adlist.txt,Dogino.Discord-Phishing-URLs-phishing.txt"
  "https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/scam-urls.txt,Dogino.Discord-Phishing-URLs-scam.txt"
  "https://raw.githubusercontent.com/durablenapkin/scamblocklist/master/hosts.txt,durablenapkin.scamblocklist.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts,FadeMind.add.2o7Net.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts,FadeMind.add.Risk.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts,FadeMind.add.Spam.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts,FadeMind.UncheckyAds.txt"
  "https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt,hoshsadiq.adblock-nocoin-list.txt"
  "https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/youtubelist.txt,kboghdady.youtubelist.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adguard_host.txt,MajkiIT.adguard_host.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adguard_mobile_host.txt,MajkiIT.adguard_mobile_host.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/Ad_filter_list_by_Disconnect.txt,MajkiIT.Ad_filter_list_by_Disconnect.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/easy_privacy_host.txt,MajkiIT.easy_privacy_host.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/gambling-hosts.txt,MajkiIT.gambling-hosts.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/hostfile.txt,MajkiIT.hostfile.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/SmartTV_ads.txt,MajkiIT.SmartTV_ads.txt"
  "https://raw.githubusercontent.com/marktron/fakenews/master/fakenews,marktron.fakenews.txt"
  "https://raw.githubusercontent.com/mhhakim/pihole-blocklist/master/custom-porn-blocklist.txt,mhhakim.custom-porn-blocklist.txt"
  "https://raw.githubusercontent.com/mhhakim/pihole-blocklist/master/porn.txt,mhhakim.porn.txt"
  "https://raw.githubusercontent.com/mitchellkrogza/Stop.Google.Analytics.Ghost.Spam.HOWTO/master/output/domains/INACTIVE/list,mitchellkrogza.Stop.Google.Analytics.Ghost.Spam-INACTIVE.txt"
  "https://raw.githubusercontent.com/neodevpro/neodevhost/master/host,neodevpro.neodevhost.txt"
  "https://raw.githubusercontent.com/notracking/hosts-blocklists/master/hostnames.txt,notracking.hostnames.txt"
  "https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt,PolishFiltersTeam.KADhosts.txt"
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardApps.txt,r-a-y.AdguardApps.txt"
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileAds.txt,r-a-y.AdguardMobileAds.txt"
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileSpyware.txt,r-a-y.AdguardMobileSpyware.txt"
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/malware,RPiList-Malware.txt"
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Phishing-Angriffe,RPiList-Phishing.txt"
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/spam.mails,RPiList.Spam-Mails.txt"
  "https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/pornography-hosts,Sinfonietta.pornography-hosts.txt"
  "https://raw.githubusercontent.com/Snota418/Youtube-spam-host-list/main/Crypto%20streams,Snota418.Crypto-streams.txt"
  "https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt,Spam404.main-blacklist.txt"
  "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-gambling-porn/hosts,StevenBlack.fakenews-gambling-porn.txt"
  "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts,StevenBlack.hosts.txt"
  "https://raw.githubusercontent.com/xlimit91/xlimit91-block-list/master/blacklist.txt,xlimit91.blacklist.txt"
  "https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt,disconnectme.simple_ad.txt"
  "https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt,disconnectme.simple_malvertising.txt"
  "https://urlhaus.abuse.ch/downloads/hostfile,abuse.urlhaus.txt"
  "https://v.firebog.net/hosts/AdguardDNS.txt,firebog.AdguardDNS.txt"
  "https://v.firebog.net/hosts/Admiral.txt,firebog.Admiral.txt"
  "https://v.firebog.net/hosts/Easylist.txt,firebog.Easylist.txt"
  "https://v.firebog.net/hosts/Prigent-Ads.txt,firebog.Prigent-Ads.txt"
  "https://v.firebog.net/hosts/Prigent-Crypto.txt,firebog.Prigent-Crypto.txt"
  "https://v.firebog.net/hosts/static/w3kbl.txt,firebog.w3kbl.txt"
  "https://www.github.developerdan.com/hosts/lists/amp-hosts-extended.txt,developerdan.amp-hosts-extended.txt"
  "https://www.github.developerdan.com/hosts/lists/dating-services-extended.txt,developerdan.dating-services-extended.txt"
  "https://www.github.developerdan.com/hosts/lists/hate-and-junk-extended.txt,developerdan.hate-and-junk-extended.txt"
  "https://www.stopforumspam.com/downloads/toxic_domains_whole.txt,stopforumspam.toxic_domains_whole.txt"
  "https://zerodot1.gitlab.io/CoinBlockerLists/hosts,zerodot1.CoinBlockerLists.txt"
)



for url in "${urls[@]}"; do
  url_parts=(${url//,/ })
  download_url=${url_parts[0]}
  filename=${url_parts[1]}

  # Pobieranie pliku przy użyciu curl z wyświetlaniem paska postępu, adresem IP, rozmiarem pliku i prędkością pobierania
  curl -A "Mozilla/5.0 (compatible; SefinekBlocklistCollection/0.0.0.0; +https://blocklist.sefinek.net)" -L -o "$output_dir/$filename" --progress-bar "$download_url" 2>&1 | \
    awk -v url="$download_url" -v location="$output_dir/$filename" '/^[0-9]/ {progress=$0; next} /Content-Length:/ {size=$2; next} /[^0-9]B\/s/ {speed=$2} END {print progress; print "Adres URL: " url; print "Lokalizacja pliku: " location; system("host " url " | grep -oE \"([0-9]{1,3}\\.){3}[0-9]{1,3}\")"; print "Rozmiar pliku: " size; print "Prędkość pobierania: " speed}'

  # Sprawdzanie kodu statusu odpowiedzi HTTP
  http_status=$?

  # Obsługa błędów HTTP
  if [ "$http_status" -eq 0 ]; then
    echo "✔ Pobieranie zakończone sukcesem."
  elif [ "$http_status" -eq 8 ]; then
    echo "✖ Plik nie istnieje (błąd 404)."
  elif [ "$http_status" -eq 4 ]; then
    echo "✖ Brak dostępu do pliku (błąd 403)."
  else
    echo "✖ Wystąpił błąd podczas pobierania (kod statusu: $http_status)."
  fi

  echo
done

echo "Sukces! Zakończono o: $(date +'%Y-%m-%d %H:%M:%S')"


