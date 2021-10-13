import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { call, put, takeLatest } from "redux-saga/effects";
import { AuthUser, FirebaseUser } from "../../common";
import { getError } from "../../util";
import {
  signInFailed,
  signInRequested,
  SignInRequestedAction,
  signInSucceeded,
} from "../slices/authSlice";

function* signInSaga(action: SignInRequestedAction) {
  const { email, password } = action.payload;
  const firebaseAuth = auth();
  try {
    const response: FirebaseAuthTypes.UserCredential = yield call(
      [firebaseAuth, firebaseAuth.signInWithEmailAndPassword],
      email,
      password,
    );
    let authUser: AuthUser | undefined = undefined;
    const firebaseUser = response.user;
    authUser = {
      emailVerified: firebaseUser.emailVerified,
      uid: firebaseUser.uid,
      providerId: firebaseUser.providerId,
      providerData: firebaseUser.providerData,
      displayName: firebaseUser.displayName || undefined,
      email: firebaseUser.email || undefined,
      isAnonymous: firebaseUser.isAnonymous,
      photoURL: firebaseUser.photoURL || undefined,
      metadata: firebaseUser.metadata,
    };
    yield put(signInSucceeded({ user: authUser }));
  } catch (e) {
    const error = getError(e);
    yield put(signInFailed({ error }));
  }
}

function* authSaga() {
  yield takeLatest(signInRequested.type, signInSaga);
}

export default authSaga;
