import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from 'firebase/firestore';
import { firebaseDB } from './firebaseConfig';

const COLLECTION_NAME = 'guests';

export type BusOrigin = 'Sevilla' | 'Huelva' | 'Lucena';

export interface Guest {
  id: string;
  fullName: string;
  allergies?: string;
  busOrigin?: BusOrigin;
  confirmed?: boolean;
  isChild?: boolean;
  lastUpdate: Date;
  inviteId: string;
}

const guestsCol = collection(firebaseDB, COLLECTION_NAME);

function mapGuest(
  doc:
    | QueryDocumentSnapshot<DocumentData, DocumentData>
    | DocumentSnapshot<DocumentData, DocumentData>,
): Guest | null {
  const data = doc.data();
  if (!data) {
    return null;
  }
  const mappedDoc: Guest = {
    id: doc.id,
    fullName: data.fullName,
    lastUpdate: data.lastUpdate.toDate(),
    allergies: data.allergies,
    busOrigin: data.busOrigin,
    confirmed: data.confirmed,
    isChild: data.isChild,
    inviteId: data.inviteId,
  };
  return mappedDoc;
}

export async function getGuestsFromInviteId(
  inviteId: string,
): Promise<(Guest | null)[]> {
  const q = query(guestsCol, where('inviteId', '==', inviteId));
  const guestSnapshot = await getDocs(q);
  return guestSnapshot.docs.map(mapGuest);
}

export async function getAllGuests(): Promise<Guest[]> {
  const guestSnapshot = await getDocs(guestsCol);
  return guestSnapshot.docs.map(mapGuest).filter((guest) => guest !== null);
}

export async function getGuest(guestId: string): Promise<Guest | null> {
  const docRef = guestDoc(guestId);
  const guestSnapshot = await getDoc(docRef);
  console.log({ guestSnapshot });
  return mapGuest(guestSnapshot);
}

export async function updateGuest(guest: Guest): Promise<void> {
  const docRef = guestDoc(guest.id);
  await setDoc(
    docRef,
    {
      fullName: guest.fullName,
      allergies: guest.allergies,
      busOrigin: guest.busOrigin,
      confirmed: guest.confirmed,
      isChild: guest.isChild,
      lastUpdate: new Date(),
    },
    { merge: true },
  );
}

export async function createGuest(
  guest: Omit<Guest, 'id' | 'lastUpdate'>,
): Promise<Guest> {
  const newGuestRef = doc(guestsCol);
  const newGuest: Guest = {
    id: newGuestRef.id,
    lastUpdate: new Date(),
    ...guest,
  };

  await setDoc(newGuestRef, newGuest, { merge: true });
  return newGuest;
}

function guestDoc(guestId: string) {
  return doc(firebaseDB, COLLECTION_NAME, guestId);
}
