import { ref, push } from "firebase/database";
import { database } from "./config";
import getUserKey from "./getUserKey";
import { fetchSecureDate } from "../dates/fetchSecureDate";

export default async function setNewChallenge(user: string, challenge: Challenge) {
  const userKey = await getUserKey(user);
  const date = await fetchSecureDate();
  if (!userKey) return;

  const userChallengesRef = ref(database, "/Users/" + userKey + "/challenges");
  push(userChallengesRef, challenge);
}
