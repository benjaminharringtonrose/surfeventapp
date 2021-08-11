import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";

import { Button } from "../components/Button";
import { spacings } from "../styles";
import { FormInput } from "../components/FormInput";

interface SignUpFormProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export const AuthSignUpScreen = () => {
  const formRef = React.useRef<FormikProps<SignUpFormProps>>(null);

  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<any>(undefined);

  const onSignUp = async (values: SignUpFormProps) => {
    if (!values.firstName || !values.lastName || !values.email || !values.password) {
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
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Formik
        innerRef={formRef}
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={ProfileSchema}
        onSubmit={onSignUp}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View style={{ marginHorizontal: spacings.base }}>
            <FormInput
              label={"First Name"}
              placeholder={"Jimmy"}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              error={errors.firstName}
              touched={touched.firstName}
              style={{ marginBottom: spacings.base }}
            />
            <FormInput
              label={"Last Name"}
              placeholder={"Neutron"}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              error={errors.lastName}
              touched={touched.lastName}
              style={{ marginBottom: spacings.base }}
            />
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
