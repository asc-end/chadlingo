CREATE TABLE IF NOT EXISTS Flashcard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    English TEXT NOT NULL,
    Portuguese TEXT NOT NULL,
    French TEXT NOT NULL,
    Spanish TEXT NOT NULL,
    Italian TEXT NOT NULL,
    German TEXT NOT NULL,
    -- Type TEXT NOT NULL CHECK (Type IN ('adverb', 'verb', 'noun', 'number', 'pronoun'))
);

CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT NOT NULL,
    mainLanguage TEXT
)

CREATE TABLE IF NOT EXISTS UserCard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    card_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    nextReview INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (card_id) REFERENCES Flashcard(id)
);