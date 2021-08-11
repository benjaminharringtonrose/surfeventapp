import React, { useState } from "react";
import { View, SafeAreaView, TextInput } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { Button } from "../components/Button";
import { spacings } from "../styles";
import { FormInput } from "../components/FormInput";

interface LoginFormProps {
  email?: string;
  password?: string;
}

export const AuthLoginScreen = () => {
  const formRef = React.useRef<FormikProps<LoginFormProps>>(null);

  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const onLogin = (values: any) => {
    console.log(values);
  };

  const ProfileSchema = Yup.object().shape({
    email: Yup.string().min(2, "Too Short!").max(40, "Too Long!").required("Required"),
    password: Yup.string().min(2, "Too Short!").max(40, "Too Long!").required("Required"),
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Formik
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
            />
            <Button
              type={"contained"}
              label={"Sign In"}
              loading={loadingLogin}
              onPress={() => handleSubmit()}
              style={{ marginTop: spacings.base }}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
