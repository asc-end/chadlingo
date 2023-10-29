import { database, usersFolderRef} from "./config";
import { push } from "firebase/database";

export default function setNewUser(address:string){
    push(usersFolderRef, {address: address})
}