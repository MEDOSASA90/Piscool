// Firebase is loaded via <script> tags in index.html, making it a global.
const firebase = (window as any).firebase;

// =================================================================================
// !! هام جداً: إعدادات Firebase !!
// !! VERY IMPORTANT: Firebase Configuration !!
//
// لاستخدام هذا التطبيق، يجب عليك إنشاء مشروع Firebase خاص بك ووضع
// بيانات الإعدادات الخاصة بك هنا.
// To use this application, you must create your own Firebase project and
// place your configuration credentials below.
//
// اتبع الخطوات التالية:
// Follow these steps:
// 1. اذهب إلى https://console.firebase.google.com/
//    Go to https://console.firebase.google.com/
// 2. أنشئ مشروعاً جديداً.
//    Create a new project.
// 3. في إعدادات المشروع، أنشئ تطبيق ويب جديد.
//    In your project settings, create a new web app.
// 4. سيمنحك Firebase كائن `firebaseConfig`. انسخه والصقه هنا.
//    Firebase will give you a `firebaseConfig` object. Copy and paste it here.
// 5. في Firebase console, اذهب إلى "Authentication" وقم بتفعيل "Email/Password".
//    In the Firebase console, go to "Authentication" and enable "Email/Password".
// 6. اذهب إلى "Cloud Firestore", أنشئ قاعدة بيانات وابدأ في وضع الاختبار.
//    Go to "Cloud Firestore", create a database, and start in test mode.
//
// استبدل القيم أدناه بالقيم الحقيقية من مشروعك.
// Replace the values below with the actual values from your project.
// =================================================================================
const firebaseConfig = {
  apiKey: "AIzaSyAKFLyOPURQ6PoGvTp_C0D_1heWhXaP8ic",
  authDomain: "gmezz-e8fb5.firebaseapp.com",
  projectId: "gmezz-e8fb5",
  storageBucket: "gmezz-e8fb5.firebasestorage.app",
  messagingSenderId: "1052763118049",
  appId: "1:1052763118049:web:5144cd6d9bd90398109aa0"
};

if (!firebase) {
  throw new Error("Firebase is not available. Check the script imports in index.html.");
}

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();