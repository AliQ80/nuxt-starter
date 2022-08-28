// https://firebase.google.com/docs/auth/web/start

// add imports to activate firebase persistance
// setPersistence,
// browserLocalPersistence,

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

import { useFirebaseUserStore } from '~~/stores/userStore'

const setUserStore = (
  email: string,
  username: string,
  verified: boolean,
  error: string,
) => {
  const firebaseUser = useFirebaseUserStore()
  firebaseUser.email = email
  firebaseUser.name = username
  firebaseUser.verified = verified
  firebaseUser.error = error
}

export const createUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  // const firebaseUser = useFirebaseUserStore()
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      updateProfile(userCredential.user, {
        displayName: name,
      })
      const user = userCredential.user
      setUserStore(user.email, name, user.emailVerified, '')
      sendEmailVerification(user)
      return user
    })
    .catch((error) => {
      setUserStore('', '', false, error.code)
    })
}

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      setUserStore(user.email, user.displayName, user.emailVerified, '')
      return user
    })
    .catch((error) => {
      setUserStore('', '', false, error.code)
    })
}

export const initUser = () => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  // const firebaseUser = useFirebaseUserStore()
  const credentials = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUserStore(user.email, user.displayName, user.emailVerified, '')
    } else {
      // User is signed out
      setUserStore('', '', false, '')
    }
  })
  return credentials
}

export const googleSignIn = async () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  // const firebaseUser = useFirebaseUserStore()
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      setUserStore(user.email, user.displayName, user.emailVerified, '')

      return user
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code
      // const errorMessage = error.message
      // The email of the user's account used.
      // const email = error.customData.email
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error)
      setUserStore('', '', false, error.code)
    })
}

export const signOutUser = async () => {
  const auth = getAuth()
  await auth.signOut()
}
