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
      user = userCredential.user
    })
    .catch((error) => {
      const errorCode = error.code
      firebaseUser.error = errorCode
      const errorMessage = error.message
    })
  return user
}

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })
  return credentials
}

export const initUser = async () => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  const firebaseUser = useFirebaseUserStore()
  firebaseUser.user = auth.currentUser

  const credentials = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid
      firebaseUser.email = user.email
      firebaseUser.name = user.displayName
      // console.log('Auth changed', user)
    } else {
      // User is signed out
      // console.log('Auth changed', user)
      firebaseUser.email = ''
    }
    firebaseUser.user = user
  })
  return credentials
}

export const signOutUser = async () => {
  const auth = getAuth()
  const result = await auth.signOut()
  // console.log('sign out: ', result)
  return result
}
