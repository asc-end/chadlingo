import { ref, push } from "firebase/database";
import { database } from "./config";
import getUserKey from "./getUserKey";
import { fetchSecureDate } from "../dates/fetchSecureDate";

export default async function setNewChallenge(user: string, language: string) {
  const userKey = await getUserKey(user);
  const date = await fetchSecureDate();
  if (!date || !userKey) return;

  const userChallengesRef = ref(database, "/Users/" + userKey + "/challenges");
  push(userChallengesRef, { beginDate: date.getTime(), language: language, nbDone: 0, ended: false});
}
