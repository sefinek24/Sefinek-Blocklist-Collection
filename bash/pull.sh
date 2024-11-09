#!/bin/bash

# Paths
repo_path="/home/sefinek/node/Sefinek-Blocklist-Collection" # Path to the repository
logs_dir="$repo_path/www/public/logs" # Directory to store logs
output_file="$logs_dir/pull_$(date +'%Y-%m-%d').log" # Path to the output log file

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git."
    exit 1
fi

echo -e "Please wait...\n"

# Create the logs directory if it doesn't exist
mkdir -p "$logs_dir"

# Write logs to the output file
{
    echo "========================================== $(date +'%Y-%m-%d %H:%M:%S') =========================================="
    echo

    # Check if the repository directory exists
    if [ -d "$repo_path" ]; then
        cd "$repo_path" || exit

        if git pull; then
            npm install --omit=dev
            # pm2 restart blocklist

            echo -e "\nSuccess! Finished at: $(date +'%Y-%m-%d %H:%M:%S')"
        else
            echo -e "\nError during Git operations!"
        fi
        echo
    else
        echo "Repository path $repo_path does not exist."
        exit 1
    fi
} >> "$output_file"

# Final
echo -e "\nDone! Output file has been created or updated: $output_file"