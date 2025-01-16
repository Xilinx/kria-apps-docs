import os
import re
import glob

def replace_text_in_file(file_path, replacements):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    for old_text, new_text in replacements:
        content = re.sub(old_text, new_text, content)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def main():
    search_directory = os.path.dirname(os.path.abspath(__file__))
    os.chdir(search_directory)
    
    replacements = [
        (r'https://pages\.gitenterprise\.xilinx\.com/techdocs/SOM/', 'https://xilinx.github.io/kria-apps-docs/'),
        (r'\.md#', '.html#')
    ]

    file_count = 0
    for file_path in glob.glob('**/*.html', recursive=True):
        file_count += 1
        replace_text_in_file(file_path, replacements)
        print(f'Processed {file_count}: {file_path}')

    print("All files processed.")
    input("Press Enter to close the script...")

if __name__ == '__main__':
    main()