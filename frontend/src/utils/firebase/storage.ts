import { app } from "@libs/firebase";
import irebase, { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Get a non-default Storage bucket
app
const firebaseApp = getApp();
const storage = getStorage(firebaseApp, "gs://study-next-eed94.appspot.com");


export async function uploadImg(file: File) {
    console.log(file);
    const storageRef = ref(storage, `images/testing.png`);

    const result = await uploadBytes(storageRef, file);

    console.log("success =>", result);
}