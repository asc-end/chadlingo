import { fetchSecureDate } from "../../dates/fetchSecureDate";
import getUserChallenges from "../getUserChallenge";
import updateAllChallenges from "../updateAllChallenges";

export default async function demo_fastForwardKeepState(nb: number, user: string) {
  const date = await fetchSecureDate();
  if (!date) return;

  let challenges = await getUserChallenges(user);
  console.log(challenges);
  if (!challenges) return;

  let addTimestamp = 24 * 60 * 60 * 1000 * nb;

  let _challenges: Challenge[] = challenges.map((challenge: Challenge) => {
    const timeDifference = date!.getTime() - challenge.beginDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    const floor = Math.floor(daysDifference);

    console.log(challenge.nbDone, floor, daysDifference);
    return {
      ...challenge,
      beginDate: challenge.beginDate - addTimestamp,
      nbDone: challenge.nbDone <= floor ? challenge.nbDone : 30,
    };
  });
  const resp = await updateAllChallenges(user, _challenges).then((resp) => resp);
  return resp;
}
