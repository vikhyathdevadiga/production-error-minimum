"use client";

import { getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, initializeFirestore, onSnapshot, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { useEffect, useState } from "react";

const options = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_databaseURL,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};

const firebaseApp = initializeApp(options);

console.log("Firebase App Initialized", options, firebaseApp);

if (typeof window !== "undefined" && window.localStorage.getItem("offlineEnabled")) {
  initializeFirestore(firebaseApp, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
}

export default function FirebaseTest({ app }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(`FirebaseTest started`, getApps());

    const handler = onSnapshot(doc(getFirestore(), `devices/FirebaseTest`), (snapshot) => {
      setValue(`${snapshot.exists()}`);
    });

    console.log(`FirebaseTest onSnapshot`);

    return handler;
  }, []);

  return (
    <>
      {value}
      {app}
    </>
  );
}
