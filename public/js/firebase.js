const firebaseConfig = {
  apiKey: "AIzaSyAv0Dq-BelCiwDC74N-BX6E8jw3w_jST24",
  authDomain: "bookesc-a45ef.firebaseapp.com",
  projectId: "bookesc-a45ef",
  storageBucket: "bookesc-a45ef.appspot.com",
  messagingSenderId: "54131302420",
  appId: "1:54131302420:web:2ffbf3846e03e4a1a1c701",
  measurementId: "G-8RQKCJR9GG",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
