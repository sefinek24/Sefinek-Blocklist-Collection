#!/bin/bash

repo_path="/home/ubuntu/node/www/Sefinek-Blocklist-Collection"
output_file="$repo_path/www/public/logs/pull_$(date +'%Y-%m-%d').log"

# Change to the repository directory
cd "$repo_path"

# Write the full date and time to the output file
echo "================================ $(date +'%Y-%m-%d %H:%M:%S') ================================\n" >> "$output_file"

# GitHub
git -v >> "$output_file" 2>&1
git fetch >> "$output_file" 2>&1
git pull >> "$output_file" 2>&1

# Final
echo "\n\n" >> "$output_file" 2>&1
echo "Done. Output file has been created: $output_file"