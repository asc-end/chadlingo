import updateChallenge from "../updateChallenge"

export default function setChallengeEnd(user: string, challenge: Challenge){
    console.log(new Date(challenge.beginDate))
    challenge.beginDate = new Date(challenge.beginDate).setDate(new Date(challenge.beginDate).getDate() -(30 - challenge.nbDone))
    challenge.nbDone = 30
    console.log(new Date(challenge.beginDate), challenge.key)
    console.log(challenge)
    updateChallenge(user, challenge)
}