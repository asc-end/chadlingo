import sys
import json

def delete_duplicates(file_name):
    # Get the file name from command line arguments
    print(sys.argv[1])
    # Read the contents of the file
    with open(file_name, 'r') as file:
        data = json.load(file)

    # Remove duplicate dictionaries based on the "english" key
    unique_data = []
    english_set = set()
    for d in data:
        english = d["english"]
        if english not in english_set:
            unique_data.append(d)
            english_set.add(english)

    # Write the updated data back to the file
    with open(file_name, 'w') as file:
        json.dump(unique_data, file, indent=2)

def main():
    file_name = sys.argv[1]
    delete_duplicates(file_name=file_name)

if __name__ == "__main__":
    main()
