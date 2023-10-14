import { database } from "./config.js";

import nouns from "../corpus/nouns.json" assert { type: "json" };
import verbs from "../corpus/verbs.json" assert { type: "json" };
import numbers from "../corpus/numbers.json" assert { type: "json" };
import prepositions from "../corpus/prepositions.json" assert { type: "json" };
import adjectives from "../corpus/adjectives.json" assert { type: "json" };
import { ref, push} from "firebase/database";
const pushToFirebase = async (collectionName, data) => {
  const dbRef = ref(database, collectionName);
  await push(dbRef, data);
};

const main = async () => {
  console.log("0")
  for (let i = 0; i < nouns.length; i++) {
    await pushToFirebase("FlashCards", nouns[i]);
    if(i == nouns.length - 1) console.log("element", i);
  }
  console.log("1")
  for (let i = 0; i < numbers.length; i++) {
    await pushToFirebase("FlashCards", numbers[i]);
  }
  for (let i = 0; i < prepositions.length; i++) {
    await pushToFirebase("FlashCards", prepositions[i]);
  }
  for (let i = 0; i < adjectives.length; i++) {
    await pushToFirebase("FlashCards", adjectives[i]);
  }
  for (let i = 0; i < verbs.length; i++) {
    await pushToFirebase("FlashCards", verbs[i]);
    if(i == verbs.length - 1) console.log("element", i);
  }

  console.log(nouns.length + numbers.length + prepositions.length + adjectives.length + verbs.length);
  console.log("Population finished");
  process.exit();
};

main();

