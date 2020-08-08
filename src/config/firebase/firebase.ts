import firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_UF3my4pSU9xme0sV2MYnDU8E4BpnaM4",
    authDomain: "nutrify-111d7.firebaseapp.com",
    databaseURL: "https://nutrify-111d7.firebaseio.com",
    projectId: "nutrify-111d7",
    storageBucket: "nutrify-111d7.appspot.com",
    messagingSenderId: "719151915446",
    appId: "1:719151915446:web:88654e46266cc323"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
