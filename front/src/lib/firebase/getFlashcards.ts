import { limitToFirst, query, get, ref, DataSnapshot } from "firebase/database";
import { flashCardsFolderRef } from "./config";
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

export default function getFlashCards(nbCards: number): Promise<Flashcard[] | null> | null {
  const flashcardsRef = query(flashCardsFolderRef, limitToFirst(nbCards));
  
  const resp = get(flashcardsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let resp = flashCardRefs_To_flashCardArray(snapshot).then((cardArray) => cardArray);
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
