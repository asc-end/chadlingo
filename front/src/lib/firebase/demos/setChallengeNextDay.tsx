import updateChallenge from "../updateChallenge"

export default async function setChallengeNextDay(user: string, challenge: Challenge){
    challenge.nbDone += 1
    challenge.beginDate = new Date(challenge.beginDate).setDate(new Date(challenge.beginDate).getDate() -1)
    await updateChallenge(user, challenge)
}