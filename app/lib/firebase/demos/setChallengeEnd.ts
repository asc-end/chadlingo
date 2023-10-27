import { fetchSecureDate } from "../../dates/fetchSecureDate";
import getDayDifference from "../../dates/getDayDifference";
import updateChallenge from "../updateChallenge";




export default async function setChallengeEnd(user: string, challenge: Challenge) {
  const date = await fetchSecureDate();
  if (!date) return;


  const dayDifference = getDayDifference(challenge?.beginDate, date)
  console.log("day difference", dayDifference)
  let minus = challenge?.nbDone == (dayDifference + 1) ? 1 : 0

  
  console.log(new Date(challenge.beginDate).getDate(), date?.getDate());
  challenge.beginDate = new Date(challenge.beginDate).setDate(
    new Date(challenge.beginDate).getDate() - (30 - challenge.nbDone + minus)
  );

  // challenge.nbDone = 30;
  console.log(new Date(challenge.beginDate), challenge.key);
  console.log(challenge);
  const dayDifference1 = getDayDifference(challenge.beginDate, date)
  console.log(dayDifference1)
  await updateChallenge(user, challenge)
}
