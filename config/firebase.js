const admin = require('firebase-admin')
const { getApps } = require('firebase-admin/app')

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8')
)

if (getApps().length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

module.exports = admin
