import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import { Button } from "../components/Button";
import { spacings } from "../common";
import { FormInput } from "../components/FormInput";
import { LoginNavProp } from "../AppNavigator";

interface LoginFormProps {
  email?: string;
  password?: string;
}

export const AuthLoginScreen = () => {
  const formRef = React.useRef<FormikProps<LoginFormProps>>(null);

  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<any>(undefined);

  const navigation = useNavigation<LoginNavProp>();

  const onLogin = async (values: LoginFormProps) => {
    if (!values.email || !values.password) {
      return;
    }
    setLoadingLogin(true);
    setLoginError(undefined);
    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
      console.log("User account created & signed in!");
      setLoadingLogin(false);
      setLoginError(undefined);
    } catch (error) {
      setLoadingLogin(false);
      setLoginError(error);
      console.warn(error);
    }
  };

  const ProfileSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Formik
        innerRef={formRef}
        initialValues={{ email: "", password: "" }}
        validationSchema={ProfileSchema}
        onSubmit={onLogin}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View style={{ marginHorizontal: spacings.base }}>
            <FormInput
              label={"Email"}
              placeholder={"Jimmy123@gmail.com"}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              style={{ marginBottom: spacings.base }}
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
              style={{ marginBottom: spacings.base }}
            />
            <Button
              type={"contained"}
              label={"Login"}
              loading={loadingLogin}
              onPress={() => handleSubmit()}
              style={{ marginBottom: spacings.base }}
            />
            <Button
              type={"contained"}
              label={"Sign Up"}
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
