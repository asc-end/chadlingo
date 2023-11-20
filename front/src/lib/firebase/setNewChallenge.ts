import { ref, push } from "firebase/database";
import { database } from "./config";
import getUserKey from "./getUserKey";
import { fetchSecureDate } from "../dates/fetchSecureDate";
import { throws } from "assert";

export default async function setNewChallenge(user: string, challenge: LanguageChallenge | MeditationChallenge) {
  const userKey = await getUserKey(user);
  const date = await fetchSecureDate();
  if (!userKey) return;

  const userChallengesRef = ref(database, "/Users/" + userKey + "/challenges");
  let resp = await push(userChallengesRef, challenge).then((resp) => resp)
  return resp
}
