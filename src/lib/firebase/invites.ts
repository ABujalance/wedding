import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { firebaseDB } from './firebaseConfig';

const COLLECTION_NAME = 'invites';

export interface Invite {
  id: string;
  displayName: string;
  notes?: string;
  email?: string;
  phone?: string;
  lastUpdate?: Date;
}

function mapInvite(
  doc:
    | QueryDocumentSnapshot<DocumentData, DocumentData>
    | DocumentSnapshot<DocumentData, DocumentData>,
): Invite | null {
  const data = doc.data();
  if (!data) {
    return null;
  }

  return {
    id: doc.id,
    displayName: data.displayName,
    notes: data.notes,
    email: data.email,
    phone: data.phone,
    lastUpdate: data.lastUpdate ? new Date(data.lastUpdate) : undefined,
  };
}

export async function getAllInvites(): Promise<Invite[]> {
  const invitesCol = collection(firebaseDB, COLLECTION_NAME);
  const inviteSnapshot = await getDocs(invitesCol);
  return inviteSnapshot.docs.map(mapInvite).filter((invite) => invite !== null);
}

export async function getInvites(): Promise<(Invite | null)[]> {
  const invitesCol = collection(firebaseDB, COLLECTION_NAME);
  const inviteSnapshot = await getDocs(invitesCol);
  return inviteSnapshot.docs.map(mapInvite);
}

export async function getInvite(inviteId: string): Promise<Invite | null> {
  const docRef = inviteDoc(inviteId);
  const inviteSnapshot = await getDoc(docRef);
  return mapInvite(inviteSnapshot);
}

function inviteDoc(inviteId: string) {
  return doc(firebaseDB, COLLECTION_NAME, inviteId);
}
