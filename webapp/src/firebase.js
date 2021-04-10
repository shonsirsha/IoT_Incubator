import firebase from "firebase";
import "firebase/auth";
console.log("AAA");
console.log(process.env.REACT_APP_FIREBASE_KEY);
const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
});

const db = firebase.database();
const auth = firebase.auth();

// db.enablePersistence();

export { db, auth, app, firebase };
