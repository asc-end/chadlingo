import { query, equalTo, get, orderByChild } from "firebase/database";
import { database, usersFolderRef } from "./config";

export default async function getUserKey(user: string ) {
  const addressesRef = query(usersFolderRef, ...[orderByChild('address'), equalTo(user)]);
//   const fliteredAdd = query(addressesRef, equalTo(user));
  let resp = await get(addressesRef).then((snapshot) => {
    if(snapshot.exists()){
        const userKey = Object.keys(snapshot.val())[0];
        return(userKey)
    }
  }).catch((err) => console.log(err))
  return resp

}
