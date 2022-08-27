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
  User,
} from 'firebase/auth'

import { useFirebaseUserStore } from '~~/stores/userStore'

export const createUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  const firebaseUser = useFirebaseUserStore()
  let user: User
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      updateProfile(userCredential.user, {
        displayName: name,
      })
      firebaseUser.verified = userCredential.user.emailVerified
      firebaseUser.email = userCredential.user.email
      firebaseUser.name = name
      firebaseUser.error = ''
      user = userCredential.user
    })
    .catch((error) => {
      firebaseUser.email = ''
      firebaseUser.name = ''
      firebaseUser.verified = false
      firebaseUser.error = error.code
    })
  await sendEmailVerification(user)
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
      firebaseUser.verified = userCredential.user.emailVerified
      user = userCredential.user
    })
    .catch((error) => {
      firebaseUser.email = ''
      firebaseUser.name = ''
      firebaseUser.verified = false
      firebaseUser.error = error.code
    })
  return user
}

export const initUser = () => {
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)
  const firebaseUser = useFirebaseUserStore()

  const credentials = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      firebaseUser.email = user.email
      firebaseUser.name = user.displayName
      firebaseUser.verified = user.emailVerified
      firebaseUser.error = ''
    } else {
      // User is signed out
      firebaseUser.email = ''
      firebaseUser.name = ''
      firebaseUser.verified = false
      firebaseUser.error = ''
    }
  })
  return credentials
}

export const signOutUser = async () => {
  const auth = getAuth()
  await auth.signOut()
}
