import { equalTo, query, ref, get } from "firebase/database";
import { database, flashCardsFolderRef } from "./config";

export default async function getFlashcard(key: string): Promise<Flashcard | null> {
  const flashcardRef = ref(database, "/FlashCards/" + key);

  let resp = get(flashcardRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        //   console.log(snapshot.val())
        return snapshot.val();
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
