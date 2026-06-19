const admin = require('firebase-admin')
const { initializeApp, getApps } = require('firebase-admin/app')

// 1. التأكد من وجود البيئة وفك تشفير الـ Service Account بأمان
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error(
    '❌ الخطأ: FIREBASE_SERVICE_ACCOUNT مش موجودة في ملف الـ .env'
  )
}

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8')
)

// 2. التحقق من عدم تكرار الـ Initialization
if (getApps().length === 0) {
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  console.log('✅ تم تشغيل الـ Firebase Admin بنجاح!')
}

// 3. تصدير الموديول للاستخدام في الـ Controllers
module.exports = admin
