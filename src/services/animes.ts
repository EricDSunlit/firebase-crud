import { db } from '@/firebase/firebase-config'
import { Anime } from '@/types/anime'
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from '@firebase/firestore'

const animesCollectionRef = collection(db, 'animes')

export const getAnimes = async () => {
  const data = await getDocs(animesCollectionRef)
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Anime))
}

export const getAnime = async (id: string) => {
  const docRef = await doc(db, 'animes', id)
  const docSnap = await getDoc(docRef)
  return { ...docSnap.data(), id: docSnap.id } as Anime
}

export const createAnime = async (anime: Anime) => {
  const animeQuery = query(
    collection(db, 'animes'),
    where('name', '==', anime.name)
  )

  const existingAnime = await getDocs(animeQuery)

  if (!existingAnime.empty) throw new Error('Ya existe un anime con ese nombre')

  await addDoc(animesCollectionRef, anime)
}

export const updateAnime = async (id: string, anime: Anime) => {
  const animeQuery = query(
    collection(db, 'animes'),
    where('name', '==', anime.name)
  )

  const animes = await getDocs(animeQuery)
  const filteredAnimes = animes.docs.filter((doc) => doc.data().id !== id)
  const documents = filteredAnimes.map((doc) => ({ ...doc.data(), id: doc.id }))

  if (documents.length > 0) throw new Error('Ya existe un anime con ese nombre')

  const userDoc = doc(db, 'animes', id)
  await updateDoc(userDoc, anime)
}

export const deleteAnime = async (id: string) => {
  const userDoc = doc(db, 'animes', id)
  await deleteDoc(userDoc)
}
