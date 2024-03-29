import { db } from "./firebaseConfig.js";
import { collection, getDocs, Timestamp } from "firebase/firestore";

// Major Issue:  Getting Error Messages when importing db.

// use the specific user from AdminPage.  Will need to pass it into the function...

projectsList = []

const fetchProjectData = async () => {
    const collRef = collection(db, "users", user, "projects");
    const snapshot = await getDocs(collRef);
  
    if (snapshot.empty) return;
  
    let projectData = snapshot.docs.map(doc => doc.data());
  
    projectData.forEach(project => {
        projectsList.push(project);
    });
}

export const