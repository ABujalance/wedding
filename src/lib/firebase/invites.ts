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
  };
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
