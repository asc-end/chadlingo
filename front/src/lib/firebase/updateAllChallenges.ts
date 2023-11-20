import { ref, set } from "firebase/database";
import getUserKey from "./getUserKey";
import { database } from "./config";

export default async function updateAllChallenges(user: string, challenges: Challenge[]){
    const userKey = await getUserKey(user);
    const challengesRef = ref(database, "/Users/" + userKey + "/challenges/")
    let resp =  await set(challengesRef, challenges).then(()=> "success")
    return resp
}