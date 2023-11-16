import { fetchSecureDate } from "../../dates/fetchSecureDate";
import getUserChallenges from "../getUserChallenge";
import updateAllChallenges from "../updateAllChallenges";

export default async function demo_fastForward(nb: number, user: string) {
  const date = await fetchSecureDate();
  if (!date) return;

  let challenges = await getUserChallenges(user);
  if (!challenges) return;

  let addTimestamp = 24 * 60 * 60 * 1000 * nb;
  let _challenges: Challenge[] = challenges.map((challenge: Challenge) => ({
    ...challenge,
    beginDate: challenge.beginDate - addTimestamp,
  }));

  let resp = await updateAllChallenges(user, _challenges).then((resp) => resp);
  return resp;
}
