import { ref, query, orderByValue, get } from "firebase/database";
import getUserKey from "./getUserKey";
import { database } from "./config";

export default async function getUserChallenge(user: string) : Promise<Challenge> {
  const userKey = await getUserKey(user);

  const userChallengesRef = ref(database, "/Users/" + userKey + "/challenges");
  const _query = query(userChallengesRef);

  const resp = get(_query).then((snapshot) => {
    if (snapshot.exists()) {
        const challenges = snapshot.val();
        let maxBeginDate = 0;
        let _challenge
        for (let challenge in challenges) {
            if (challenges[challenge].beginDate > maxBeginDate && !challenges[challenge].ended) {
                maxBeginDate = challenges[challenge].beginDate;
                _challenge = {
                    ...challenges[challenge],
                    key: challenge
                }
            }
        }
        return (_challenge);
    }
  });
  return resp 
}
