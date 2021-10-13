import React from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { fonts, spacings } from "../common";
import { FormInput } from "../components/FormInput";
import { NavigationProps } from "../navigation";
import { useColors } from "../hooks/useColors";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { signInRequested } from "../store/slices/authSlice";

interface LoginFormProps {
  email?: string;
  password?: string;
}

export const AuthLoginScreen = () => {
  const colors = useColors();
  const formRef = React.useRef<FormikProps<LoginFormProps>>(null);
  const loadingSignIn = useAppSelector(state => state.auth.loadingSignIn);
  const errorSignIn = useAppSelector(state => state.auth.errorSignIn);
  const navigation = useNavigation<NavigationProps["Login"]["navigation"]>();
  const dispatch = useAppDispatch();

  const onLogin = async (values: LoginFormProps) => {
    const { email, password } = values;
    if (!email || !password) return;
    dispatch(signInRequested({ email, password }));
  };

  const ProfileSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[fonts.header, { color: colors.headerText }]}>{"Welcome"}</Text>
        <Text style={[fonts.subheader, { color: colors.headerText }]}>{"Sign in below"}</Text>
      </View>
      <Formik
        innerRef={formRef}
        initialValues={{ email: "", password: "" }}
        validationSchema={ProfileSchema}
        onSubmit={onLogin}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View style={styles.fieldContainer}>
            <FormInput
              label={"Email"}
              placeholder={"jimmy123@gmail.com"}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
              touched={touched.email}
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
            {!!errorSignIn && (
              <Text style={[fonts.regular, { color: colors.error, paddingTop: spacings.base }]}>
                {"Login failed. Please try again."}
              </Text>
            )}
            <Button
              type={"contained"}
              label={"Login"}
              loading={loadingSignIn}
              onPress={() => handleSubmit()}
              style={{ marginTop: spacings.base }}
            />
            <Button
              type={"contained"}
              label={"Sign Up"}
              onPress={() => navigation.navigate("SignUp")}
              style={{ marginTop: spacings.base }}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "center" },
  headerContainer: { marginLeft: spacings.base, marginTop: spacings.large },
  fieldContainer: { flex: 1, marginHorizontal: spacings.base, marginTop: spacings.large },
});
