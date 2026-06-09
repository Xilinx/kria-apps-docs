#!/usr/bin/env python3
"""
SOM_ghe2gh_link_converter.py
----------------------------
Scans HTML files in the same directory (recursively) where the script resides
and updates specific link patterns from the *internal GitEnterprise* format
to the *public GitHub Pages* format for the Kria SOM documentation set.

Also changes link fragments from `.md#` to `.html#`.

SPECIAL CASE:
    - If a line contains a specific known "foc-motor-ctrl" README link:
        https://github.com/Xilinx/foc-motor-ctrl/blob/main/README.md#build-instructions
      Then the script skips applying replacements to that line
      (to avoid breaking that reference).

REPLACEMENTS PERFORMED:
    1. Internal SOM doc root:
        From:
            https://pages.gitenterprise.xilinx.com/techdocs/SOM/
        To:
            https://xilinx.github.io/kria-apps-docs/
    2. Markdown anchors:
        From:
            .md#
        To:
            .html#

USAGE:
    python SOM_ghe2gh_link_converter.py

OUTPUT:
    - Modifies `.html` files in place
    - Prints progress to console

REQUIREMENTS:
    - Python 3.x
    - Read/write permissions on target files
"""

import os
import re
import glob

def replace_text_in_file(file_path, replacements):
    """
    Reads a file line-by-line, replacing text patterns according to `replacements`.

    Args:
        file_path (str): Path to the file to edit.
        replacements (list[tuple[str, str]]): List of (pattern, replacement) tuples
            where patterns are regex strings.

    Behaviour:
        - Skips replacements for lines containing a specific link to
          the foc-motor-ctrl README's build instructions.
        - Treats the `.md#` → `.html#` replacement specially, applying it only if `.md#`
          is present in the line.
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.readlines()

    with open(file_path, 'w', encoding='utf-8') as file:
        for line in content:
            if "https://github.com/Xilinx/foc-motor-ctrl/blob/main/README.md#build-instructions" not in line:
                for old_text, new_text in replacements:
                    # Apply the `.md#` rule only if `.md#` appears in the line
                    if old_text == r'\.md#' and '.md#' not in line:
                        continue
                    line = re.sub(old_text, new_text, line)
            file.write(line)

def main():
    # Ensure we run in the script's folder
    search_directory = os.path.dirname(os.path.abspath(__file__))
    os.chdir(search_directory)

    # Define the replacements: regex pattern -> replacement text
    replacements = [
        (r'https://pages\.gitenterprise\.xilinx\.com/techdocs/SOM/', 'https://xilinx.github.io/kria-apps-docs/'),
        (r'\.md#', '.html#')
    ]

    # Process all HTML files recursively
    file_count = 0
    for file_path in glob.glob('**/*.html', recursive=True):
        file_count += 1
        replace_text_in_file(file_path, replacements)
        print(f'Processed {file_count}: {file_path}')

    print("All files processed.")
    input("Press Enter to close the script...")

if __name__ == '__main__':
    main()
