#!/bin/bash

repo_path="/home/ubuntu/node/www/Sefinek-Blocklist-Collection"
output_file="$repo_path/www/public/logs/pull_$(date +'%Y-%m-%d').log"

# Change to the repository directory
cd "$repo_path"

# Write the full date and time to the output file
echo "\n\n== Date and time: $(date +'%Y-%m-%d %H:%M:%S') ==\n" >> "$output_file"

# Execute the git fetch command and append the output to the file
git fetch >> "$output_file" 2>&1

# Execute the git pull command and append the output to the file
git pull >> "$output_file" 2>&1

echo "Output file has been created: $output_file"
