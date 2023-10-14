import { limitToFirst, query, get, ref, DataSnapshot } from "firebase/database";
import { database, flashCardsFolderRef } from "./config";
import getFlashcard from "./getFlashCard";

async function flashCardRefs_To_flashCardArray(snapshot: DataSnapshot) {
  let dataArray: Flashcard[] = [];
  for (let el in snapshot.val()) {
    await getFlashcard(el)
      .then((_flashCard) => {
        if (_flashCard) dataArray.push(_flashCard);
      })
      .catch((err) => console.error(err));
  }
  return dataArray;
}

export function getFlashCards(nbCards: number): Promise<Flashcard[] | null> | null {
  console.log("getFlashCards");
  const flashcardsRef = query(flashCardsFolderRef, limitToFirst(nbCards));
  console.log(flashcardsRef);
  const resp = get(flashcardsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let resp = flashCardRefs_To_flashCardArray(snapshot).then((cardArray) => cardArray);
        console.log("RESP",resp)
        return resp;
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  return resp;
}
