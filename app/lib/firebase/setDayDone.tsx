import updateChallenge from "./updateChallenge";


export default function setDayDone(user: string, challenge: Challenge){
  challenge.nbDone += 1
  updateChallenge(user, challenge);
}