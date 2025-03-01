import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"
import dummyGoals from "../data/dummyGoals";

export const uploadGoals = async () => {
  const goalsRef = collection(db, "goals");

  for (const goal of dummyGoals) {
    await addDoc(goalsRef, {
      ...goal,
      createdAt: new Date(), // Firestore Timestamp
    });
  }

  console.log("Goals uploaded successfully!");
};


