import { query, ref, get, limitToFirst, orderByChild, orderByValue, equalTo } from "firebase/database";
import { fetchSecureDate } from "../dates/fetchSecureDate";
import getUserKey from "./getUserKey";
import { database, usersFolderRef } from "./config";
import getFlashCardsExept from "./getFlashCardsExept";
import getFlashCards from "./getFlashCards";

export default async function getFlashCardsByDate(nbCards: number, user: string, lang = "english") {
    const addressesRef = query(usersFolderRef, ...[orderByChild('address'), equalTo(user)]);
    const date = await fetchSecureDate();

    if (!date) return;
    let resp = await get(addressesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const _lang = snapshot.val()[Object.keys(snapshot.val())[0]].languages?.[lang]
            let sortedLang = _lang ? Object.entries(_lang)
                .filter((entry: any) => new Date(entry[1].date).getDate() <= date.getDate())
                .sort((a: any, b: any) => a[1].date - b[1].date) : undefined

            async function fetchFlashCards() {
                let flashcards: (Flashcard | null)[] = [];
                if (sortedLang) {
                    for (let lang of sortedLang) {
                        //@ts-ignore
                        let flashcard = await getFlashcard(lang[1].key);
                        flashcards.push(flashcard);
                        if (flashcards.length == nbCards)
                            return flashcards
                    }
                }
                if (flashcards.length < nbCards) {
                    let newFlashCards = await getFlashCardsExept(flashcards, nbCards - flashcards.length)
                    if (newFlashCards)
                        flashcards = [...flashcards, ...newFlashCards]
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