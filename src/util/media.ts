import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { Collection } from "../common";

export const uploadPhotoAsync = async (uri: RequestInfo, filename: string | undefined) => {
  return new Promise(async (res, rej) => {
    const response = await fetch(uri);
    const file = await response.blob();
    let upload = storage().ref(filename).put(file);
    upload.on(
      "state_changed",
      snapshot => {},
      err => {
        rej(err);
      },
      async () => {
        const url = await upload.snapshot?.ref.getDownloadURL();
        res(url as string);
      },
    );
  }).catch(error => {
    console.error(error);
  });
};

export const uploadAvatarAsync = async (uri: RequestInfo, uid: string) => {
  try {
    const avatarUri = await uploadPhotoAsync(uri, `userImages/${uid}/avatar`);
    await firestore().collection(Collection.users).doc(uid).set(
      {
        avatar: avatarUri,
      },
      { merge: true },
    );
  } catch (error) {
    console.warn(error);
  }
};
