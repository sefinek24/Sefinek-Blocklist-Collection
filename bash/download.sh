#!/bin/bash

# Each blocklist is stored in a directory named after its author,
# and the downloaded file is prefixed with "fork" to indicate that it has been forked.

# List of URLs for blocklists. Each entry includes the URL and the desired path.
# The path now includes an author-specific folder and a "fork" prefix for the filename.
urls=(
  # Ads
  "https://blocklistproject.github.io/Lists/ads.txt ads/blocklistproject/ads.fork.txt"
  "https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Hosts/GoodbyeAds.txt ads/jerryn70/GoodbyeAds.fork.txt"
  "https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/youtubelist.txt ads/kboghdady/youtubelist.fork.txt"
  "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext ads/yoyo.AdsTrackersEtc.fork.txt"
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
  echo "🔵 Directory '$base_output_dir' was created."
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