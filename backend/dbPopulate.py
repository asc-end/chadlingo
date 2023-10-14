import sqlite3
import json

# Connect to the SQLite database
conn = sqlite3.connect('corpus.db')
cursor = conn.cursor()

# Create the necessary tables
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Verbs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        english TEXT NOT NULL,
        portuguese TEXT,
        french TEXT,
        spanish TEXT,
        italian TEXT,
        german TEXT
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS Prepositions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        english TEXT NOT NULL,
        portuguese TEXT,
        french TEXT,
        spanish TEXT,
        italian TEXT,
        german TEXT
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS Numbers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        english TEXT NOT NULL,
        portuguese TEXT,
        french TEXT,
        spanish TEXT,
        italian TEXT,
        german TEXT
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS Nouns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        english TEXT NOT NULL,
        portuguese TEXT,
        french TEXT,
        spanish TEXT,
        italian TEXT,
        german TEXT
    )
''')

# Read and insert data from verbs.json
with open('app/corpus/verbs.json') as file:
    verbs = json.load(file)
    for verb in verbs:
        cursor.execute('''
            INSERT INTO Verbs (english) VALUES (?)
        ''', (verb['english'],))

# Read and insert data from prepositions.json
with open('app/corpus/prepositions.json') as file:
    prepositions = json.load(file)
    for preposition in prepositions:
        cursor.execute('''
            INSERT INTO Prepositions (english, portuguese, french, spanish, italian, german)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            preposition['english'],
            preposition['portuguese'],
            preposition['french'],
            preposition['spanish'],
            preposition['italian'],
            preposition['german']
        ))

with open('app/corpus/numbers.json') as file:
    numbers = json.load(file)
    for number in numbers:
        cursor.execute('''
            INSERT INTO Numbers (english, portuguese, french, spanish, italian, german)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            number['english'],
            number['portuguese'],
            number['french'],
            number['spanish'],
            number['italian'],
            number['german']
        ))

# Read and insert data from nouns.json
with open('app/corpus/nouns.json') as file:
    nouns = json.load(file)
    for noun in nouns:
        cursor.execute('''
            INSERT INTO Nouns (english, portuguese, french, spanish, italian, german)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            noun['english'],
            noun['portuguese'],
            noun['french'],
            noun['spanish'],
            noun['italian'],
            noun['german']
        ))

# Commit the changes and close the connection
conn.commit()
conn.close()