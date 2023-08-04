import {boot} from 'quasar/wrappers'
import {Notify, LocalStorage, SessionStorage, Platform} from 'quasar'
import {initializeApp} from 'firebase/app'
import {
   getFirestore,
   connectFirestoreEmulator,
   initializeFirestore,
   getDoc,
   doc,
   updateDoc,
} from 'firebase/firestore'
import {
   connectAuthEmulator,
   onAuthStateChanged,
   initializeAuth,
   browserLocalPersistence,
   signInWithCustomToken,
   indexedDBLocalPersistence,
} from 'firebase/auth'
import {getStorage, connectStorageEmulator} from 'firebase/storage'
import {getAnalytics} from 'firebase/analytics'
import * as jose from 'jose'

const useEmulator = process.env.APP_ENV === 'local'

const firebaseConfig = useEmulator
   ? {
        projectId: 'demo-emulator-sandbox',
        authDomain: `demo-emulator-sandbox.firebaseapp.com`,
        apiKey: 'demo-emulator-sandbox-key',
        storageBucket: 'demo-emulator-sandbox.appspot.com',
     }
   : {
        apiKey: process.env.FIREBASE_APIKEY,
        authDomain: process.env.FIREBASE_AUTHDOMAIN,
        projectId: process.env.FIREBASE_PROJECTID,
        storageBucket: process.env.FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
        appId: process.env.FIREBASE_APPID,
        measurementId: process.env.FIREBASE_MEASUREMENTID,
     }

const firebaseApp = initializeApp(firebaseConfig)

let analytics
if (!useEmulator) {
   analytics = getAnalytics()
}
let auth
if (Platform.is.capacitor) {
   auth = initializeAuth(firebaseApp, {
      persistence: indexedDBLocalPersistence,
   })
} else {
   auth = initializeAuth(firebaseApp, {
      persistence: browserLocalPersistence,
   })
}
let db
if (useEmulator) {
   db = initializeFirestore(firebaseApp, {
      experimentalAutoDetectLongPolling: true,
   })
} else {
   db = getFirestore()
}
const storage = getStorage()

if (useEmulator) {
   // Must use local IP address with Capacitor/Cordova
   connectAuthEmulator(auth, 'http://192.168.0.200:9099')
   connectFirestoreEmulator(db, '192.168.0.200', 8081)
   connectStorageEmulator(storage, '192.168.0.200', 9199)
}

const updateUser = async (user) => {
   return new Promise(async (res, rej) => {
      try {
         // Update user with latest identity data and lastLogin
         const id = user.id
         delete user.id
         const docRef = doc(db, 'users', id)
         const updates = {
            ...user,
            lastLogin: new Date().valueOf(),
         }
         await updateDoc(docRef, updates)

         // Load and return latest version of the user
         const snapshot = await getDoc(docRef)
         user = {
            id: snapshot.id,
            ...snapshot.data(),
         }
         res(user)
      } catch (error) {
         rej(error.message)
      }
   })
}

export default boot(async ({app, router, store}) => {
   const killSession = () => {
      LocalStorage.clear()
      SessionStorage.clear()
   }

   onAuthStateChanged(auth, async (authUser) => {
      try {
         if (authUser) {
            if (!authUser.stsTokenManager.accessToken) {
               Notify.create({
                  type: 'negative',
                  message: 'Login failed',
               })
               killSession()
               return router.push({name: 'index'})
            }

            const decoded = jose.decodeJwt(authUser.stsTokenManager.accessToken)
            let user = {
               name: decoded.name,
               phone: decoded.phone || '',
               photoUrl: decoded.photoUrl || '',
               id: authUser.uid,
            }
            user = await updateUser({...user})

            store.commit('app/setUser', user)
            router.push({name: 'home'})
         } else {
            killSession()
            router.push({name: 'index'})
         }
      } catch (error) {
         Notify.create({type: 'negative', message: 'Login failed'})
         router.push({name: 'login'})
      }
   })

   if (analytics) {
      app.provide('analytics', analytics)
   }
   app.provide('auth', auth)
   app.provide('signInWithCustomToken', signInWithCustomToken)
   app.provide('db', db)
})

export {auth, db}
