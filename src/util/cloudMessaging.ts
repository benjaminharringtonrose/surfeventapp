import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";

export const updateMessagingToken = async (uid: string) => {
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
  const token = await messaging().getToken();
  console.log("messaging.getToken", token);
  await saveMessagingTokenToUser(token, uid);
  // Listen to whether the token changes
  return messaging().onTokenRefresh((newToken: string) => {
    console.log("messaging token listerner - onTokenRefresh", newToken);
    saveMessagingTokenToUser(uid, newToken);
  });
};

export const saveMessagingTokenToUser = async (token: string, uid: string) => {
  try {
    // update 'messagingTokens' array to include our new token (if needed)
    await firestore()
      .collection("users")
      .doc(uid)
      .update({
        messagingTokens: firestore.FieldValue.arrayUnion(token),
      });
  } catch (error) {
    console.warn(ErrorUtils);
  }
};
