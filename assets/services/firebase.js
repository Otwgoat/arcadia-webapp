
import { initializeApp } from "firebase/app";
import { doc, getFirestore, increment, setDoc,collection, getDocs, query  } from "firebase/firestore";

import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
  deleteObject,
  listAll, getMetadata
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
  const db = getFirestore(app);

  const uploadFile = (file, itemId, loadingSetter, filesSetter, folder ,principalSelectedFile) => {
    loadingSetter(true);
    let imagePath;
    return new Promise((resolve, reject) => {
   
      imagePath = `${folder}/${itemId}/${file.name}`;
      const storageRef = ref(storage, imagePath);
      
      const metadata = {
        customMetadata: {
          isPrincipal: (principalSelectedFile && file.name) && (file.name === principalSelectedFile.name) ? 'true' : 'false'
        }
      };
      
      const uploadTask = uploadBytesResumable(storageRef, file , metadata);
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
          resolve(downloadURL);
        }
      );
     
    
    });
  };

  const getFiles = async (folder) => {
    try {
      const storageRef = ref(storage, `${folder}`);
      const filesList =  await listAll(storageRef);
      
      const images = await Promise.all(
        filesList.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url , isPrincipal: (await getMetadata(itemRef)).customMetadata.isPrincipal};
        })
      );
      return images;
    } catch (error) {
      console.error("Error in firebase API call:", error);
      throw error;
    }
  }
  const deleteFile = async (fileUrl) => {
    try {
      let fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error("Error in firebase API call:", error);
      throw error;
    }
  };
  
  const incrementAnimalViews = async (animalId) => {
    const animalRef = doc(db, "animals", animalId.toString());
    try {
    await setDoc(animalRef, {
      views: increment(1)
    }, { merge: true }); 
  } catch (error) {
    console.error("Error incrementing animal views: ", error);
  }
  };

  const getViewsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "animals"));
      const animalList = [];
      querySnapshot.forEach((doc) => {
        
        animalList.push({ animalId: doc.id, ...doc.data() });
      });
      return animalList; 
    } catch (error) {
      console.error("Error fetching animal data: ", error);
      return []; 
    }
  }
  
  export {
        uploadFile,
        deleteFile,
        getFiles,
        incrementAnimalViews,
        getViewsData
  };