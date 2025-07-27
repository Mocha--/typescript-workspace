#!/bin/bash

# Script to sort and format dictionary files
# This script sorts all words alphabetically and removes duplicates

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to sort a dictionary file
sort_dictionary() {
    local file_path="$1"
    local temp_file="${file_path}.tmp"

    if [[ ! -f "$file_path" ]]; then
        print_error "File not found: $file_path"
        return 1
    fi

    print_status "Sorting $file_path..."

    # Create backup
    cp "$file_path" "${file_path}.backup"

    # Sort the file, remove duplicates, and remove empty lines
    sort -u "$file_path" | grep -v '^[[:space:]]*$' > "$temp_file"

    # Check if sorting changed anything
    if cmp -s "$file_path" "$temp_file"; then
        print_status "No changes needed for $file_path"
        rm "$temp_file"
        rm "${file_path}.backup"
    else
        # Move temp file to original location
        mv "$temp_file" "$file_path"
        print_status "Successfully sorted $file_path"
        print_status "Backup saved as ${file_path}.backup"
    fi
}

# Main script
main() {
    print_status "Starting dictionary formatting..."

    # Get the script directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    DICT_DIR="$(dirname "$SCRIPT_DIR")/dictionaries"

    # Check if dictionaries directory exists
    if [[ ! -d "$DICT_DIR" ]]; then
        print_error "Dictionaries directory not found: $DICT_DIR"
        exit 1
    fi

    # Sort all .txt files in the dictionaries directory
    local txt_files=($(find "$DICT_DIR" -name "*.txt" -type f))

    if [[ ${#txt_files[@]} -eq 0 ]]; then
        print_warning "No .txt files found in $DICT_DIR"
        return 0
    fi

    print_status "Found ${#txt_files[@]} .txt file(s) to sort:"
    for file in "${txt_files[@]}"; do
        echo "  - $(basename "$file")"
    done
    echo

    for file in "${txt_files[@]}"; do
        sort_dictionary "$file"
    done

    print_status "Dictionary formatting completed!"
}

# Run the main function
main "$@"
