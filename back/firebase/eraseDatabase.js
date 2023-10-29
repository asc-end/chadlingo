import { ref, set, remove } from "firebase/database";
import { database } from "./config.js";

function eraseDatabase(){
        let rootRef = ref(database, "/")
        console.log(rootRef)
        remove(rootRef);
            
        // root.setValue(null);
}

eraseDatabase()
process.exit();
