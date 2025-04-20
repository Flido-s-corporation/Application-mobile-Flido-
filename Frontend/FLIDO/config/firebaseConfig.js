import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBg3yEJmUhLTwietWBSLSpqgEYgk0gdCOs",
    authDomain: "flido-b47f5.firebaseapp.com",
    projectId: "flido-b47f5",
    storageBucket: "flido-b47f5.firebasestorage.app",
    messagingSenderId: "458647214743",
    appId: "1:458647214743:web:e9802f3d958db8245da7d2",
    measurementId: "G-73K00871GB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
