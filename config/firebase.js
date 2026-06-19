const admin = require('firebase-admin')
const { initializeApp, getApps } = require('firebase-admin/app')

let serviceAccount

try {
  // التأكد من قراءة المتغير وفك التشفير بأمان من بيئة Railway
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
  process.exit(1) // إيقاف التشغيل لمنع الـ Crash العشوائي ووصف المشكلة بوضوح
}

// الحل الجذري للمشكلة: استخدام getApps() بدلاً من admin.apps
if (getApps().length === 0) {
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  console.log('🚀 Firebase Admin initialized successfully for Google Auth!')
}

module.exports = admin
