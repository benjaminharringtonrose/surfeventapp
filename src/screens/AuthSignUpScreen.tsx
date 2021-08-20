import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";

import { Button } from "../components/Button";
import { colors, fonts, spacings } from "../common";
import { FormInput } from "../components/FormInput";
import { useNavigation } from "@react-navigation/native";
import { SignUpNavProp } from "../AppNavigator";
import { ButtonBack } from "../components/ButtonBack";

interface SignUpFormProps {
  email?: string;
  password?: string;
}

export const AuthSignUpScreen = () => {
  const formRef = React.useRef<FormikProps<SignUpFormProps>>(null);

  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<any>(undefined);

  const navigation = useNavigation<SignUpNavProp>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return <ButtonBack onPress={() => navigation.pop()} />;
      },
    });
  }, []);

  const onSignUp = async (values: SignUpFormProps) => {
    if (!values.email || !values.password) {
      return;
    }
    setLoadingSignUp(true);
    setSignUpError(undefined);
    try {
      await auth().createUserWithEmailAndPassword(values.email, values.password);
      console.log("User account created and signed in");
      setLoadingSignUp(false);
      setSignUpError(undefined);
    } catch (error) {
      setLoadingSignUp(false);
      console.warn(error);
    }
  };

  const ProfileSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: colors.background }}>
      <View style={{ marginLeft: spacings.base, marginTop: spacings.large }}>
        <Text style={fonts.header}>{"Sign up below"}</Text>
        <Text style={fonts.subheader}>{"Provide an email\n and password"}</Text>
      </View>
      <Formik
        innerRef={formRef}
        initialValues={{ email: "", password: "" }}
        validationSchema={ProfileSchema}
        onSubmit={onSignUp}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View style={{ flex: 1, marginHorizontal: spacings.base, marginTop: spacings.large }}>
            <FormInput
              label={"Email"}
              placeholder={"Jimmy123@gmail.com"}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              style={{ marginTop: spacings.base }}
            />
            <FormInput
              label={"Password"}
              placeholder={"*********"}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
              touched={touched.password}
              secureTextEntry={true}
              style={{ marginTop: spacings.base }}
            />
            <Button
              type={"contained"}
              label={"Sign Up"}
              loading={loadingSignUp}
              onPress={() => handleSubmit()}
              style={{ marginTop: spacings.base }}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
