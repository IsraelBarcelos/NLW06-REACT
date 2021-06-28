import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const database = firebase.database();

export { auth, database, firebase}

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDQcZU0YtqXL8QexdsDlF5QYUYFqH9h5Sk",
    authDomain: "letmeask-nlw06-aff52.firebaseapp.com",
    databaseURL: "https://letmeask-nlw06-aff52-default-rtdb.firebaseio.com",
    projectId: "letmeask-nlw06-aff52",
    storageBucket: "letmeask-nlw06-aff52.appspot.com",
    messagingSenderId: "372681558380",
    appId: "1:372681558380:web:a9b72ab601cf0928bf8b49"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>

*/