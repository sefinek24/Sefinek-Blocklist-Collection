#!/bin/bash

# Paths
repo_path="/home/ubuntu/node/Sefinek-Blocklist-Collection"  # Path to the repository
logs_dir="$repo_path/www/public/logs"  # Directory to store logs
output_file="$logs_dir/pull_$(date +'%Y-%m-%d').log"  # Path to the output log file

# Change to the repository directory or exit if it fails
cd "$repo_path" || { echo "Error: Could not change to the repository directory"; exit 1; }

# Create the logs directory if it doesn't exist
mkdir -p "$logs_dir" || { echo "Error: Could not create the logs directory"; exit 1; }

# Redirect all output to the log file
exec >> "$output_file" 2>&1

# Write the full date and time to the output file
echo "========================================== $(date +'%Y-%m-%d %H:%M:%S') =========================================="
echo "Repository path : $repo_path"
echo "Logs directory  : $logs_dir"
echo "Output file     : $output_file"
echo

# Check Git version and append it to the output file
git --version

# Fetch the latest changes from the remote repository (main branch only) and append output to the log file
git fetch origin main:main

# Pull the latest changes from the remote repository (main branch only) and append output to the log file
git pull origin main

echo
echo
echo "Success! Date: $(date +'%Y-%m-%d %H:%M:%S')"  # Add a success message with the current date and time to the output file
echo

# Print a message indicating that the script has finished and the output file location
echo "Done. Output file has been created or updated: $output_file"
