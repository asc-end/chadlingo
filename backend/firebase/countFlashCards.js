import { database } from "./config.js";
import { ref, get } from "firebase/database";

async function count() {
  const flashcardsRef = ref(database, "FlashCards");
  get(flashcardsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const flashcardsCount = Object.keys(snapshot.val()).length;
        console.log(flashcardsCount);
      } else {
        console.log("No data available");
      }
      process.exit();
    })
    .catch((error) => {
      console.error(error);
      process.exit();
    });
}

count();
