#!/bin/bash

# Paths
repo_path="/home/ubuntu/node/Sefinek-Blocklist-Collection"  # Path to the repository
logs_dir="$repo_path/www/public/logs"  # Directory to store logs
output_file="$logs_dir/pull_$(date +'%Y-%m-%d').log"  # Path to the output log file

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git."
    exit 1
fi

# Create the logs directory if it doesn't exist
mkdir -p "$logs_dir"

# Write logs to the output file
{
    echo "========================================== $(date +'%Y-%m-%d %H:%M:%S') =========================================="
    echo "Repository path : $repo_path"
    echo "Logs directory  : $logs_dir"
    echo "Output file     : $output_file"
    echo

    # Check if the repository directory exists
    if [ -d "$repo_path" ]; then
        cd "$repo_path" || exit

        git --version
        echo

        if git fetch && git pull; then
            echo "Success! Date: $(date +'%Y-%m-%d %H:%M:%S')"
        else
            echo "Error during Git operations."
        fi
        echo
    else
        echo "Repository path $repo_path does not exist."
        exit 1
    fi
} >> "$output_file"

# Final
echo "Done. Output file has been created or updated: $output_file"