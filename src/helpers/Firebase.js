import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from '../constants/defaultValues';

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { auth, database };
