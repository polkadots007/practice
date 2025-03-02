import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Goal, GoalDocProps, NewGoalProps } from "@/helpers/types";

export const useReadGoals = (emailId: string) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const goalsRef = collection(db, "goals"); // Reference to 'goals' collection
    const q = query(goalsRef, where("createdBy", "==", emailId)); // Filter goals by userId
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setGoals(
          snapshot.docs
            .map((doc) => ({ docId: doc.id, ...(doc.data() as GoalDocProps) }))
            .sort((a, b) => b?.createdAt.seconds - a.createdAt.seconds)
        );
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { goals, loading, error };
};

export const getMaxGoalId = async (userEmail: string) => {
  try {
    const goalsRef = collection(db, "goals");

    // Query: Filter by user, sort by id in descending order, get only 1 result
    const q = query(goalsRef, where("createdBy", "==", userEmail));

    const querySnapshot = await getDocs(q);

    const goalIds = querySnapshot.docs
      .map((doc) => Number(doc.data().id))
      .filter((id) => !isNaN(id))
      .sort((a, b) => b - a);
    return goalIds.length > 0 ? goalIds[0] : 0; // Return max id found
  } catch (error) {
    console.error("Error fetching max goal ID:", error);
    return 0;
  }
};

export const uploadGoal = async (goal: NewGoalProps) => {
  try {
    const goalsRef = collection(db, "goals");

    const docRef = await addDoc(goalsRef, {
      ...goal,
      createdAt: new Date(), // Firestore Timestamp
    });
    console.log(`Goal ${docRef.id} uploaded successfully!`);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const updateGoal = async (docId: string, data: object) => {
  try {
    const docRef = doc(db, "goals", docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Document does not exist!");
      return;
    }
    await updateDoc(docRef, data);
    console.log("Document successfully updated!");
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const deleteGoal = async (docId: string) => {
  try {
    const docRef = doc(db, "goals", docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Document does not exist!");
      return;
    }
    await deleteDoc(docRef); // Resolves when successful
    console.log("Document deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

export const getDocumentById = async (docId: string) => {
  try {
    const docRef = doc(db, "goals", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document ID:", docSnap.id); // 🔴 This will throw an error! (see note below)
      console.log("Document Data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

export const getFilteredDocsWithIds = async (
  collectionName: string,
  field: string,
  value: any
) => {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const querySnapshot = await getDocs(q);

  const docs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(docs, querySnapshot.docs[0].id);
  return docs;
};
