import { initializeApp } from "firebase/app";
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL
} from "firebase/storage";
import "firebase/storage";

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  const uploadFile = (file, itemId, itemName, loadingSetter, filesSetter, principalSelectedFile, resultArraySetter, apiDeleter) => {
    loadingSetter(true);
    let imagePath;
    console.log("Lancement de uploadFile");
    return new Promise((resolve, reject) => {
      if (principalSelectedFile && file.name === principalSelectedFile.name) {
        imagePath = `animals/${itemId}/principal/${file.name}`;
      } else {
        imagePath = `animals/${itemId}/${file.name}`;
      }
      const storageRef = ref(storage, imagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          filesSetter((prev) => {
            const newFiles = [...prev];
            const fileIndex = newFiles.findIndex(
              (item) => item.name === file.name
            );
            if (fileIndex >= 0) {
              newFiles[fileIndex].progress = progress.toFixed(0);
            } else {
              newFiles.push({ name: file.name, progress });
            }
            return newFiles;
          });
          
        },
        async (error)  => {
          setSelectImagesError(error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          resultArraySetter((prev) => {
            const newImages = [...prev];
            newImages.push({
              name: file.name,
              description: `Photo de ${itemName}`,
              url: downloadURL,
              principal:
                principalSelectedFile &&
                file.name === principalSelectedFile.name &&
                file.size === principalSelectedFile.size
                  ? 1
                  : 0,
            });
            return newImages;
          });
          resolve(downloadURL);
        }
      );
    });
  };

  export {
        uploadFile
  };