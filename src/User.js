import React from "react";
import { collection, getDocs } from "firebase/firestore";

// export const User = ({ email, setUser }) => {
//   const fetchFirebaseData = async () => {
//     const collRef = collection(db, "users");
//     const snapshot = await getDocs(collRef);
//     if (snapshot.empty) return;
//   };
// };

export const User = ({ email, setUser, db }) => {
  useEffect(() => {
    const fetchFirebaseData = async () => {
      // Create a reference to the specific document by email
      const docRef = doc(db, "users", email);
      // Fetch the document
      const docSnapshot = await getDoc(docRef);

      // Check if the document exists and has all required fields
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (
          userData.firstName &&
          userData.lastName &&
          typeof userData.admin === "boolean"
        ) {
          // User is valid, update state
          setUser({
            email: email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            admin: userData.admin,
          });
        } else {
          // Some user data is missing
          setUser("unknown user");
        }
      } else {
        // Document does not exist
        setUser("unknown user");
      }
    };

    fetchFirebaseData();
  }, [email, setUser, db]); // Depend on email, setUser, and db so the effect reruns if they change

  return null; // This component does not render anything
};
