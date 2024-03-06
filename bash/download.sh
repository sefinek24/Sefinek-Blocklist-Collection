#!/bin/bash

# Each blocklist is stored in a directory named after its author
# and the downloaded file is prefixed with "fork" to indicate that it has been forked.

# List of URLs for blocklists. Each entry includes the URL and the desired path.
# The path now includes an author-specific folder and a "fork" prefix for the filename.
urls=(
  ## Abuse
  "https://blocklistproject.github.io/Lists/abuse.txt abuse/blocklistproject/hosts.fork.txt"
  "https://urlhaus.abuse.ch/downloads/hostfile abuse/urlhaus.abuse.ch/hostfile.fork.txt"

  ## Advertising
  "https://adaway.org/hosts.txt ads/adaway/hosts.fork.txt"
  "https://blocklistproject.github.io/Lists/ads.txt ads/blocklistproject/hosts.fork.txt"
  "https://blocklistproject.github.io/Lists/youtube.txt ads/blocklistproject/youtube.fork.txt"
  "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext ads/yoyo/ads-trackers-etc.fork.txt"
  "https://raw.githubusercontent.com/0Zinc/easylists-for-pihole/master/easylist.txt ads/0Zinc/easylist.fork.txt"
  "https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt ads/anudeepND/adservers.fork.txt"
  "https://raw.githubusercontent.com/craiu/mobiletrackers/master/list.txt ads/craiu/mobiletrackers.fork.txt"
  "https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt ads/crazy-max/spy.fork.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts ads/FadeMind/UncheckyAds.fork.txt"
  "https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Hosts/GoodbyeAds.txt ads/jerryn70/GoodbyeAds.fork.txt"
  "https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/youtubelist.txt ads/kboghdady/youtubelist.fork.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/SmartTV_ads.txt ads/MajkiIT/SmartTV-ads.fork.txt"
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileAds.txt ads/r-a-y/AdguardMobileAds.fork.txt"
  "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Ads ads/ShadowWhisperer/Ads.fork.txt"
  "https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt ads/disconnectme/simple-ad.fork.txt"
  "https://v.firebog.net/hosts/AdguardDNS.txt ads/firebog/AdguardDNS.fork.txt"
  "https://v.firebog.net/hosts/Admiral.txt ads/firebog/Admiral.fork.txt"
  "https://v.firebog.net/hosts/Easylist.txt ads/firebog/Easylist.fork.txt"
  "https://v.firebog.net/hosts/Prigent-Ads.txt ads/firebog/Prigent-Ads.fork.txt"

  ## AMP hosts
  "https://ente.dev/api/blocklist/google-amp-hosts amp/ente-dev/google-amp-hosts.fork.txt"
  "https://www.github.developerdan.com/hosts/lists/amp-hosts-extended.txt amp/developerdan/amp-hosts-extended.fork.txt"

  ## Tracking and telemetry
  "https://ente.dev/api/blocklist/tv tracking-and-telemetry/ente-dev/tv.fork.txt"
  "https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt tracking-and-telemetry/frogeye/firstparty-trackers-hosts.txt"
  "https://raw.githubusercontent.com/0Zinc/easylists-for-pihole/master/easyprivacy.txt tracking-and-telemetry/0Zinc/easyprivacy.fork.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adguard_mobile_host.txt tracking-and-telemetry/MajkiIT/adguard-mobile-host.fork.txt"
  "https://raw.githubusercontent.com/mitchellkrogza/Stop.Google.Analytics.Ghost.Spam.HOWTO/master/output/domains/INACTIVE/list tracking-and-telemetry/mitchellkrogza/INACTIVE.fork.txt"
  "https://raw.githubusercontent.com/neodevpro/neodevhost/master/host tracking-and-telemetry/neodevpro/host.fork.txt"

  ## Malicious
  "https://blocklistproject.github.io/Lists.malware.txt malicious/blocklistproject/malware.fork.txt"
  "https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt malicious/quidsup/notrack-malware.fork.txt"
  "https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-hosts-online.txt malicious/malware-filter/urlhaus-filter-hosts-online.fork.txt"
  "https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt malicious/digitalside/latestdomains.fork.txt"
  "https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/master/generated/hosts malicious/AssoEchap/stalkerware-indicators.fork.txt"
  "https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts malicious/bigdargon/hostsVN.fork.txt"
  "https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt malicious/DandelionSprout-AntiMalwareHosts.fork.txt"
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/malware malicious/RPiList/Malware.fork.txt"
  "https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt malicious/Spam404/main-blacklist.fork.txt"
  "https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt malicious/disconnectme/simple-malvertising.fork.txt"

  ## Phishing
  "https://blocklistproject.github.io/Lists/phishing.txt phishing/blocklistproject/phishing.fork.txt"
  "https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-phishing.txt phishing/quidsup/notrack-phishing.fork.txt"
  "https://phishing.army/download/phishing_army_blocklist_extended.txt phishing/phishing.army/blocklist-extended.fork.txt"
  "https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/pihole-phishing-adlist.txt phishing/Dogino/Discord-Phishing-URLs-phishing.fork.txt"
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Phishing-Angriffe phishing/RPiList/Phishing-Angriffe.fork.txt"

  ## Ransomware
  "https://blocklistproject.github.io/Lists/ransomware.txt ransomware/blocklistproject/ransomware.fork.txt"

  ## CryptoJacking
  "https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt cryptojacking/hoshsadiq/adblock-nocoin-list.fork.txt"
  "https://raw.githubusercontent.com/Snota418/Youtube-spam-host-list/main/Crypto%20streams cryptojacking/Snota418/Crypto-streams.fork.txt"
  "https://v.firebog.net/hosts/Prigent-Crypto.txt cryptojacking/firebog/Prigent/Crypto.fork.txt"
  "https://zerodot1.gitlab.io/CoinBlockerLists/hosts cryptojacking/zerodot1/CoinBlockerLists-hosts.fork.txt"

  ## Fraud
  "https://blocklistproject.github.io/Lists/fraud.txt fraud/blocklistproject/hosts.fork.txt"

  ## Spam
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts spam/FadeMind/add-Spam.fork.txt"
  "https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/spam.mails spam/RPiList/spam-mails.fork.txt"
  "https://www.stopforumspam.com/downloads/toxic_domains_whole.txt spam/stopforumspam/toxic-domains-whole.fork.txt"

  ## Piracy
  "https://blocklistproject.github.io/Lists/piracy.txt piracy/blocklistproject/piracy.fork.txt"

  ## Redirects
  "https://blocklistproject.github.io/Lists/redirect.txt redirect/blocklistproject/redirect.fork.txt"

  ## Scam
  "https://blocklistproject.github.io/Lists/scam.txt scam/blocklistproject/scam.fork.txt"
  "https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/scam-urls.txt scam/Dogino/Discord-Phishing-URLs-scam.fork.txt"
  "https://raw.githubusercontent.com/durablenapkin/scamblocklist/master/hosts.txt scam/durablenapkin/scamblocklist.fork.txt"

  ## Suspicious
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts suspicious/FadeMind/add-Risk.fork.txt"
  "https://v.firebog.net/hosts/static/w3kbl.txt suspicious/firebog/w3kbl.fork.txt"

  ## Extension
  "https://big.oisd.nl extension/oisd/big.fork.txt"
  "https://justdomains.github.io/blocklists/lists/adguarddns-justdomains.txt extension/justdomains/adguarddns-justdomains.fork.txt"
  "https://raw.githubusercontent.com/cbuijs/ut1/master/adult/domains.24733 extension/cbuijs/adult-domains-24733.fork.txt"
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/CountryCodesLists/France.txt extension/deathbybandaid/CountryCodesLists-France.fork.txt"
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/ParsedBlacklists/EasyList-Liste-FR.txt extension/deathbybandaid/ParsedBlacklists-EasyList-Liste-FR.fork.txt"
  "https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/ParsedBlacklists/EasyList.txt extension/deathbybandaid/ParsedBlacklists-EasyList.fork.txt"
  "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts extension/FadeMind/add-2o7Net.fork.txt"
  "https://raw.githubusercontent.com/hagezi/dns-blocklists/main/hosts/pro.txt extension/hagezi/pro.fork.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adguard_host.txt extension/MajkiIT/adguard-host.fork.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/easy_privacy_host.txt extension/MajkiIT/easy-privacy-host.fork.txt"
  "https://raw.githubusercontent.com/notracking/hosts-blocklists/master/hostnames.txt extension/notracking/hostnames.fork.txt"
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardApps.txt extension/r-a-y/AdguardApps.fork.txt"
  "https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileSpyware.txt extension/r-a-y/AdguardMobileSpyware.fork.txt"
  "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-gambling-porn/hosts extension/StevenBlack/fakenews-gambling"

  ## StevenBlack hosts
  "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts StevenBlack/hosts.fork.txt"

  ## Polish filters
  "https://hole.cert.pl/domains/domains_hosts.txt polish-blocklists/cert.pl/domains-hosts.fork.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/hostfile.txt polish-blocklists/MajkiIT/hostfile.fork.txt"
  "https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt polish-blocklists/PolishFiltersTeam/KADhosts.fork.txt"

  ## Porn
  "https://blocklistproject.github.io/Lists/porn.txt porn/blocklistproject/porn.fork.txt"
  "https://nsfw.oisd.nl porn/oisd/nsfw.fork.txt"
  "https://raw.githubusercontent.com/4skinSkywalker/Anti-Porn-HOSTS-File/master/HOSTS.txt porn/4skinSkywalker/hosts.fork.txt"
  "https://raw.githubusercontent.com/chadmayfield/my-pihole-blocklists/master/lists/pi_blocklist_porn_all.list porn/chadmayfield/pi-blocklist-porn-all.fork.txt"
  "https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/pornography-hosts porn/Sinfonietta/pornography-hosts.fork.txt"

  ## Hate and junk
  "https://www.github.developerdan.com/hosts/lists/hate-and-junk-extended.txt hate-and-junk/developerdan/extended.fork.txt"

  ## Drugs
  "https://blocklistproject.github.io/Lists/drugs.txt drugs/blocklistproject/drugs.fork.txt"

  ## Fake news
  "https://raw.githubusercontent.com/marktron/fakenews/master/fakenews fakenews/marktron/hosts.txt"

  ## Gambling
  "https://blocklistproject.github.io/Lists/gambling.txt gambling/blocklistproject/hosts.fork.txt"
  "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/gambling-hosts.txt gambling/MajkiIT/gambling-hosts.fork.txt"

  ## Dating services
  "https://www.github.developerdan.com/hosts/lists/dating-services-extended.txt dating-services/developerdan/extended.fork.txt"
)

# Verifying the presence of required tools: curl and node
if ! command -v curl &> /dev/null; then
    echo "❌ curl could not be found. Please install curl!"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ node could not be found. Please install Node.js!"
    exit 1
fi

# Setting up the base directory for blocklist downloads
base_output_dir="blocklist/template"

# Creating the base directory if it does not exist, notifying the user
if [ ! -d "$base_output_dir" ]; then
  mkdir -p "$base_output_dir"
  echo "🔵 Directory '$base_output_dir' was created"
fi

# Reading the version from package.json to use in the user agent
package_json_path="./package.json"
if [ -f "$package_json_path" ]; then
  version=$(node -p "require('$package_json_path').version")
  user_agent="Mozilla/5.0 (compatible; SefinekBlocklists/${version}; +https://blocklist.sefinek.net)"
else
  echo "🔴 package.json file not found"
  exit 1
fi

# Starting the download process
echo "🔵 Starting the download process..."
echo

for url in "${urls[@]}"; do
  # Splitting the URL and path for each blocklist
  IFS=' ' read -r download_url relative_path <<< "$url"
  old_ifs="$IFS"
  IFS=$'\n'

  # Constructing the full path and creating any missing directories
  full_path="$base_output_dir/$relative_path"
  file_dir=$(dirname "$full_path")
  if [ ! -d "$file_dir" ]; then
    mkdir -p "$file_dir"
    echo "🔵 Directory '$file_dir' was created"
  fi

  # Downloading the blocklist with curl
  filename=$(basename "$full_path")

  echo "📥 Downloading $filename from $download_url..."
  if ! file_size=$(curl -A "$user_agent" -L -o "$file_dir/$filename" "$download_url" -w "%{size_download}"); then
    echo "❌ An error occurred while downloading $download_url."
  else
    # Formatting the file size for better readability.
    if [ "$file_size" -ge 1048576 ]; then
      file_size=$(echo "scale=2; $file_size / 1048576" | bc)
      size_unit="MB"
    else
      file_size=$(echo "scale=2; $file_size / 1024" | bc)
      size_unit="KB"
    fi
    echo "✔️ Successfully downloaded $filename (Size: $file_size $size_unit)"
  fi

  echo

  IFS="$old_ifs"
done

echo
echo "✔️ Success! Finished at: $(date +'%Y-%m-%d %H:%M:%S')"