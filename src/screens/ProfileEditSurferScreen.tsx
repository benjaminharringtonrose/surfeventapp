import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import * as Yup from "yup";
import ImageCropPicker from "react-native-image-crop-picker";
import { EventNavProp } from "../AppNavigator";
import { colors, fonts, shared, spacings, User } from "../common";
import { Button, FormDropListPicker, FormInput } from "../components";
import { useUser } from "../hooks/useUser";
import { isEqual } from "lodash";
import { uploadAvatarAsync } from "../util/media";
import { ListPickerItem } from "../components/ListPicker";

interface FormProps {
  firstName?: string;
  lastName?: string;
  gender?: ListPickerItem;
}

interface ProfileEditSurferScreenProps {
  user: User;
  navigation: EventNavProp;
}

export const ProfileEditSurferScreen = (props: ProfileEditSurferScreenProps) => {
  const formRef = React.useRef<FormikProps<FormProps>>(null);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [loadingProfilePhoto, setLoadingProfilePhoto] = useState<boolean>(false);

  const user = useUser();

  const onSelectProfileImage = () => {
    setLoadingProfilePhoto(true);
    ImageCropPicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    })
      .then(async image => {
        try {
          await uploadAvatarAsync(image.path, user?.uid!);
        } catch (e) {
          console.warn(e);
          Alert.alert(
            "Error",
            "An error occurred. Check your network connection or try again later.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          );
        }
      })
      .catch(e => {
        if (e?.message?.includes("permission")) {
          console.log("permission issue");
          Alert.alert(
            "No Photo Access",
            "SurfEvent must have access to your camera or photo library to upload photos. Please grant access in your Settings app, then try again!",
          );
        }
        console.log("image picker cancelled or errored. noop.", e);
      })
      .finally(() => {
        setLoadingProfilePhoto(false);
      });
  };

  const onSubmit = (values: FormProps) => {
    if (!values.firstName || !values.lastName || !values.gender) {
      return;
    }
    if (
      isEqual(values, {
        firstName: user?.firstName,
        lastName: user?.lastName,
        gender: user?.gender,
      })
    ) {
      props.navigation.goBack();
    } else {
      setLoadingUpdate(true);
      const profileUpdate: Partial<User> = {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender.id,
      };
      firestore()
        .collection("users")
        .doc(user?.uid)
        .set(profileUpdate, { merge: true })
        .then(() => {
          console.log("User profile updated!");
          setLoadingUpdate(false);
          props.navigation.goBack();
        })
        .catch(error => {
          console.log(error);
          setLoadingUpdate(false);
          Alert.alert(
            "Error",
            "An error occurred. Check your network connection or try again later.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          );
        });
    }
  };

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    gender: Yup.object().required("Required"),
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View style={styles.profilePhotoContainer}>
        <TouchableOpacity
          disabled={loadingProfilePhoto}
          style={styles.profilePhotoTouchable}
          onPress={() => onSelectProfileImage()}>
          <ImageBackground
            source={require("../../assets/default_avatar.png")}
            style={{
              width: 150,
              height: 150,
              alignItems: "center",
              justifyContent: "center",
            }}>
            {loadingProfilePhoto ? (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator color={colors.grey800} />
              </View>
            ) : !user?.avatar && !loadingProfilePhoto ? (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 10,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    backgroundColor: colors.almostBlack,
                    paddingHorizontal: spacings.small,
                    paddingVertical: spacings.xsmall,
                    borderRadius: shared.borderRadius,
                    opacity: 0.8,
                  }}>
                  <Text style={[fonts.large, { color: colors.grey100, fontWeight: "500" }]}>
                    Upload Photo
                  </Text>
                </View>
              </View>
            ) : (
              <>
                <Image source={{ uri: user?.avatar }} style={styles.firebaseImage} />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 10,
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.almostBlack,
                      paddingHorizontal: spacings.small,
                      paddingVertical: spacings.xsmall,
                      borderRadius: shared.borderRadius,
                      opacity: 0.8,
                    }}>
                    <Text style={[fonts.large, { color: colors.grey100, fontWeight: "500" }]}>
                      Change
                    </Text>
                  </View>
                </View>
              </>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.marginHorizontal}>
        <Formik
          innerRef={formRef}
          initialValues={{
            firstName: user?.firstName || undefined,
            lastName: user?.lastName || undefined,
            gender: undefined,
          }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}>
          {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
            <View style={styles.marginTop}>
              <FormInput
                label={"First Name"}
                placeholder={"Suzie"}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                error={errors.firstName}
                touched={touched.firstName}
                style={styles.marginTop}
              />
              <FormInput
                label={"Last Name"}
                placeholder={"Smith"}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                error={errors.lastName}
                touched={touched.lastName}
                style={styles.marginTop}
              />
              <FormDropListPicker
                title={"Select Gender"}
                label={"Gender"}
                value={values.gender}
                items={GENDERS}
                error={errors.gender}
                touched={touched.gender}
                onSelect={value => setFieldValue("gender", value)}
                style={[styles.marginTop, styles.marginBottom]}
              />
              <Button
                type="contained"
                label="Save"
                onPress={() => handleSubmit()}
                style={styles.marginTop}
                loading={loadingUpdate}
              />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const GENDERS = [
  {
    id: "male",
    label: "male",
  },
  {
    id: "female",
    label: "female",
  },
  {
    id: "other",
    label: "other",
  },
];

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profilePhotoContainer: {
    marginTop: spacings.base,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePhotoTouchable: {
    backgroundColor: colors.grey200,
    width: 200,
    height: 200,
    borderRadius: shared.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  firebaseImage: {
    width: 200,
    height: 200,
    borderRadius: shared.borderRadius,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  marginTop: {
    marginTop: spacings.base,
  },
  marginBottom: {
    marginBottom: spacings.base,
  },
  marginHorizontal: {
    marginHorizontal: spacings.base,
  },
});
