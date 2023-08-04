const {initializeApp} = require('firebase-admin/app')
const {getFirestore, FieldValue} = require('firebase-admin/firestore')
const {getAuth} = require('firebase-admin/auth')

if (process.env.APP_ENV === 'local') {
   initializeApp({projectId: 'demo-emulator-sandbox'})
} else {
   initializeApp()
}

exports.auth = getAuth()
exports.db = getFirestore()
exports.FieldValue = FieldValue
