import { get, query } from "firebase/database";
import { flashCardsFolderRef } from "./config";

export default async function getFlashCardsExept(exeptions: (Flashcard | null)[], nbCards: number) {
  console.log("exeptions", exeptions);
  exeptions.map((el, i) => console.log("e", el?.english));
  const flashcardsRef = query(flashCardsFolderRef);
  const resp = get(flashcardsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let flashcards: Flashcard[] = [];
        for (let i = 0; i < Object.keys(snapshot.val()).length; i++) {
          let key = Object.keys(snapshot.val())[i];
          if (flashcards.length == nbCards) {
            return flashcards;
          }
          console.log(
            exeptions.some((exeption) => exeption?.english === snapshot.val()[key].english),
            snapshot.val()[key].english
          );
          if (!exeptions.some((exeption) => exeption?.english === snapshot.val()[key].english)) {
            let val: Flashcard = snapshot.val()[key];
            val.key = key;
            flashcards.push(val);
          }
        }
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
