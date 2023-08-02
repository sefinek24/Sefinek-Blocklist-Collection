#!/bin/bash

# Paths
repo_path="/home/ubuntu/node/www/Sefinek-Blocklist-Collection"  # Path to the repository
logs_dir="$repo_path/www/public/logs"  # Directory to store logs
output_file="$logs_dir/pull_$(date +'%Y-%m-%d').log"  # Path to the output log file

# Change to the repository directory
cd "$repo_path" || exit

# Create the logs directory if it doesn't exist
mkdir -p "$logs_dir"

# Write the full date and time to the output file
echo "========================================== $(date +'%Y-%m-%d %H:%M:%S') ==========================================" >> "$output_file"
echo "Repository path : $repo_path" >> "$output_file"
echo "Logs directory  : $logs_dir" >> "$output_file"
echo "Output file     : $output_file" >> "$output_file"
echo >> "$output_file"

# Git
git --version >> "$output_file" 2>&1  # Check Git version and append it to the output file
echo >> "$output_file"

git fetch >> "$output_file" 2>&1  # Fetch the latest changes from the remote repository and append output to the log file
git pull >> "$output_file" 2>&1  # Pull the latest changes from the remote repository and append output to the log file

echo >> "$output_file" 2>&1
echo >> "$output_file" 2>&1
echo "Success! Date: $(date +'%Y-%m-%d %H:%M:%S')" >> "$output_file" 2>&1  # Add a success message with the current date and time to the output file
echo >> "$output_file" 2>&1

# Final
echo "Done. Output file has been created: $output_file"  # Print a message indicating that the script has finished and the output file location
