import {
  collection,
  deleteDoc,
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
export type Dish = 'marisco' | 'carne';

export type Group =
  | 'Novios'
  | 'Familia Alberto Bujalance Muñoz'
  | 'Familia Verónica'
  | 'Sevilla'
  | 'Amigos Alberto Bujalance Muñoz'
  | 'Amigos comunes'
  | 'Amigos Padres Alberto'
  | 'Amigos Padres Vero'
  | 'Amigos Verónica'
  | 'Marchanes';

export interface Guest {
  id: string;
  fullName: string;
  allergies?: string;
  busOrigin?: BusOrigin;
  confirmed?: boolean;
  isChild?: boolean;
  dish?: Dish;
  group?: Group;
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
    lastUpdate: data.lastUpdate ? new Date(data.lastUpdate) : new Date(),
    allergies: data.allergies,
    busOrigin: data.busOrigin,
    confirmed: data.confirmed,
    isChild: data.isChild,
    dish: data.dish,
    group: data.group,
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
  return mapGuest(guestSnapshot);
}

export async function updateGuest(
  guestId: string,
  updates: Partial<Omit<Guest, 'id' | 'lastUpdate'>>,
): Promise<void> {
  const docRef = guestDoc(guestId);

  // Only include fields that are actually provided (not undefined)
  const cleanUpdates = Object.fromEntries(
    Object.entries(updates).filter(([, value]) => value !== undefined),
  );

  await setDoc(
    docRef,
    {
      ...cleanUpdates,
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

export async function deleteGuest(guestId: string): Promise<void> {
  const docRef = guestDoc(guestId);
  await deleteDoc(docRef);
}

function guestDoc(guestId: string) {
  return doc(firebaseDB, COLLECTION_NAME, guestId);
}
