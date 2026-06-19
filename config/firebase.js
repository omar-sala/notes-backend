const admin = require('firebase-admin')
const { initializeApp, getApps } = require('firebase-admin/app')
const { cert } = require('firebase-admin/app') // استدعاء الـ cert بشكل منفصل وصحيح

let serviceAccount

try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT variable is missing in environment settings.'
    )
  }

  serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8')
  )
} catch (error) {
  console.error(
    '❌ Firebase initialization error (Secret Parsing):',
    error.message
  )
  process.exit(1)
}

// التعديل السحري هنا: استخدام الـ cert المستورد مباشرة بدلاً من admin.credential.cert
if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  })
  console.log('🚀 Firebase Admin initialized successfully for Google Auth!')
}

module.exports = admin
