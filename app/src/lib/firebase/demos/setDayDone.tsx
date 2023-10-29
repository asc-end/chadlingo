import updateChallenge from "../updateChallenge"

export default async function setDayDone(user: string, challenge: Challenge){
    challenge.nbDone += 1
    await updateChallenge(user, challenge)
}