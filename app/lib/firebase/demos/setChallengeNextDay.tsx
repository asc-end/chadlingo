import updateChallenge from "../updateChallenge"

export default function setChallengeNextDay(user: string, challenge: Challenge){
    challenge.nbDone += 1
    challenge.beginDate = new Date(challenge.beginDate).setDate(new Date(challenge.beginDate).getDate() -1)
    updateChallenge(user, challenge)
}