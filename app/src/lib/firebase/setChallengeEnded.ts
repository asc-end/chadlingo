import { set, ref } from "firebase/database";
import { database } from "./config";
import getUserKey from "./getUserKey";
import updateChallenge from "./updateChallenge";

export default async function setChallengeEnded(user: string, challenge: Challenge) {
  challenge.state = "archived";
  const resp = await updateChallenge(user, challenge).then(() => "success");
  return resp;
}
