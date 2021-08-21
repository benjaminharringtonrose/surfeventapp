import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";

const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  } catch (error) {
    console.warn(error);
  }
};

export const updateMessagingToken = async (uid: string) => {
  try {
    await requestUserPermission();
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
  } catch (e) {
    console.warn(e);
  }
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
