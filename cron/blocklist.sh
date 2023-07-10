#!/bin/bash

# Paths
repo_path="/home/ubuntu/node/www/Sefinek-Blocklist-Collection"
logs_dir="$repo_path/www/public/logs"
output_file="$logs_dir/pull_$(date +'%Y-%m-%d').log"

# Change to the repository directory
cd "$repo_path"

# Create the logs directory if it doesn't exist
mkdir -p "$logs_dir"

# Write the full date and time to the output file
echo "========================================== $(date +'%Y-%m-%d %H:%M:%S') ==========================================" >> "$output_file"
echo "Repository path: $repo_path" >> "$output_file"
echo "Logs directory: $logs_dir" >> "$output_file"
echo "Output file: $output_file" >> "$output_file"
echo "" >> "$output_file"

# Git
git --version >> "$output_file" 2>&1
echo "" >> "$output_file" 2>&1
git fetch >> "$output_file" 2>&1
git pull >> "$output_file" 2>&1

echo "\n\nSuccess! Date: $(date +'%Y-%m-%d %H:%M:%S')\n\n" >> "$output_file" 2>&1

# Final
echo "Done. Output file has been created: $output_file"
