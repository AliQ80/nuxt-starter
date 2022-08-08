// https://firebase.google.com/docs/auth/web/start

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import { useFirebaseUserStore } from '~~/stores/userStore'

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  const firebaseUser = useFirebaseUserStore()
  let user = {}
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      updateProfile(userCredential.user, {
        displayName: name,
      })
      firebaseUser.email = email
      firebaseUser.name = name
      firebaseUser.error = ''
      user = userCredential.user
    })
    .catch((error) => {
      firebaseUser.email = ''
      firebaseUser.name = ''
      firebaseUser.error = error.code
    })
  return user
}

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth()
  let user = {}
  // await setPersistence(auth, browserLocalPersistence)
  const firebaseUser = useFirebaseUserStore()
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      firebaseUser.email = userCredential.user.email
      firebaseUser.name = userCredential.user.displayName
      firebaseUser.error = ''
      user = userCredential.user
    })
    .catch((error) => {
      firebaseUser.email = ''
      firebaseUser.name = ''
      firebaseUser.error = error.code
    })
  return user
}

export const initUser = async () => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  const firebaseUser = useFirebaseUserStore()

  const credentials = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      firebaseUser.email = user.email
      firebaseUser.name = user.displayName
      firebaseUser.error = ''
    } else {
      // User is signed out
      firebaseUser.email = ''
      firebaseUser.name = ''
      firebaseUser.error = ''
    }
  })
  return credentials
}

export const signOutUser = async () => {
  const auth = getAuth()
  await auth.signOut()
}
