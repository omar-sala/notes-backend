const admin = require('firebase-admin')
const { initializeApp, getApps, cert } = require('firebase-admin/app')

let serviceAccount

try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT variable is missing')
  }
  serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8')
  )
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message)
  process.exit(1)
}

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  })
  console.log('🚀 Firebase Admin initialized successfully!')
}

module.exports = admin
