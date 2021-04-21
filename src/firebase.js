import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyBipp9XipDs1LpZTJ4lZSM93FROMKYccbI",
	authDomain: "ctreactchatap.firebaseapp.com",
	databaseURL: "https://ctreactchatap-default-rtdb.firebaseio.com",
	projectId: "ctreactchatap",
	storageBucket: "ctreactchatap.appspot.com",
	messagingSenderId: "809303828595",
	appId: "1:809303828595:web:37d93bf06e9e6f7d516206",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
