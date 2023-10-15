import { set, ref } from "firebase/database";
import { database } from "./config";
import getUserKey from "./getUserKey";

export default async function updateChallenge(user: string, challenge: Challenge) {
  const userKey = await getUserKey(user);
  const challengeRef = ref(database, "/Users/" + userKey + "/challenges/" + challenge.key);
  delete challenge.key
  set(challengeRef, challenge);
}
