import { query, ref, get, limitToFirst, orderByChild, orderByValue, equalTo } from "firebase/database";
import { fetchSecureDate } from "../dates/fetchSecureDate";
import getUserKey from "./getUserKey";
import { database, usersFolderRef } from "./config";
import getFlashcard from "./getFlashCard";
import getFlashCardsExept from "./getFlashCardsExept";
import { getFlashCards } from "./getFlashcards";

export default async function getFlashCardsByDate(nbCards: number, user = "marie", lang = "english") {
    const addressesRef = query(usersFolderRef, ...[orderByChild('address'), equalTo(user)]);
    const date = await fetchSecureDate();

    if (!date) return;
    let resp = await get(addressesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const _lang = snapshot.val()[Object.keys(snapshot.val())[0]].languages[lang]
            const sortedLang = Object.entries(_lang).sort((a: any, b: any) => a[1].date - b[1].date);

            async function fetchFlashCards() {
                let flashcards: (Flashcard | null)[] = [];
                for (let lang of sortedLang) {
                    console.log(lang)
                    //@ts-ignore
                    let flashcard = await getFlashcard(lang[1].key);
                    flashcards.push(flashcard);
                    if (flashcards.length == nbCards)
                        return flashcards
                }
                if (flashcards.length < nbCards) {
                    let newFlashCards = await getFlashCardsExept(flashcards, nbCards - flashcards.length)
                    console.log(flashcards.length, newFlashCards?.length)
                    if (newFlashCards)
                        flashcards = [...flashcards, ...newFlashCards]
                    console.log("AFTER", flashcards.length)
                    
                }
                return flashcards
            }
            return fetchFlashCards()
        }
        else {
            return getFlashCards(nbCards)
        }
    }).catch((err) => console.log(err))

    return resp
}