#!/bin/bash

urls=(
  "https://adaway.org/hosts.txt,adaway.hosts.txt"
  "https://big.oisd.nl,oisd.big.txt"
  "https://blocklistproject.github.io/Lists/abuse.txt,blocklistproject.abuse.txt"
)

output_dir="/home/ubuntu/node/www/Sefinek-Blocklist-Collection/generated/blocklist/template/forks_beta"

for url in "${urls[@]}"; do
  url_parts=(${url//,/ })
  download_url=${url_parts[0]}
  filename=${url_parts[1]}

  echo "Downloading file: $download_url"
  wget --progress=bar:force -U "Mozilla/5.0 (compatible; SefinekBlocklistCollection/0.0.0.0; +https://blocklist.sefinek.net)" -P "$output_dir" --no-check-certificate -O "$output_dir/$filename" "$download_url" 2>&1 | \
  while IFS= read -r line; do
    echo "$line"
  done

  # Capture the HTTP status code
  http_status=$?

  # Handle HTTP errors
  if [ "$http_status" -eq 0 ]; then
    echo "Download completed successfully."
  elif [ "$http_status" -eq 8 ]; then
    echo "File does not exist (error 404)."
  elif [ "$http_status" -eq 4 ]; then
    echo "Access denied to the file (error 403)."
  else
    echo "An error occurred during download (status code: $http_status)."
  fi

  echo ""
done
