// https://firebase.google.com/docs/auth/web/start

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export const creatUser = async (email: string, password: string) => {
  const auth = getAuth()
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
  return credentials
}

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth()
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
  const credentials = await onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid
      console.log('Auth changed', user)
    } else {
      // User is signed out
      console.log('Auth changed', user)
    }
  })
  return credentials
}

export const signOutUser = async () => {
  const auth = getAuth()
  const result = await auth.signOut()
  // console.log('sign out: ', result)
  return result
}
