import { IteratedDataSnapshot, get, push, query, ref, set } from "firebase/database";
import getUserKey from "./getUserKey";
import { database } from "./config";
import { fetchSecureDate } from "../dates/fetchSecureDate";

const groupLengths = [1, 2, 3, 5, 10, 30, 60, 90, 365];

function createNewData(key: string, validated: boolean, date: Date, currentGroup: number = 0) {
  let group;
  if(currentGroup > groupLengths.length - 1) currentGroup = groupLengths.length - 1
  
  if (validated) {
    group = currentGroup < groupLengths.length - 1? currentGroup + 1 : currentGroup;
  } else {
    group = currentGroup === 0 ? 0 : currentGroup - 1;
  }
  console.log(group)
  let _date = new Date(date.getTime());
  _date.setDate(_date.getDate() + groupLengths[group]);
  return { key: key, group: group, date: _date.getTime() };
}

export default async function pushCards(validation: boolean[], cards: Flashcard[], lang: string, user: string) {
  const userKey = await getUserKey(user);
  const date = await fetchSecureDate();
  if (!date) return;

  const languageRef = ref(database, "/Users/" + userKey + "/languages/" + lang);
  const _query = query(languageRef);

  
  const resp = get(_query).then((snapshot) => {
    if (snapshot.exists()) {
      cards.map((card, i) => {
        let exists: IteratedDataSnapshot | null = null;
        snapshot.forEach((childSnapshot) => {
          if (card.key === childSnapshot.val().key) {
            exists = childSnapshot;
          }
        })
        if (!exists) {
          let pushData = createNewData(card.key, validation[i], date);
          push(languageRef, pushData);
        }
        if (exists) {
          //@ts-ignore
          let pushData = createNewData(card.key, validation[i], date, exists.val().group);
          console.log(pushData)
          // @ts-ignore
          const existingRef = ref(database, "Users/" + userKey + "/languages/" + lang + "/" + exists.key);
          set(existingRef, pushData);
        }
      });
    } else {
      cards.map((el, i) => {
        let pushData = createNewData(el.key, validation[i], date);
        push(languageRef, pushData);
      });
    }
  });
}
