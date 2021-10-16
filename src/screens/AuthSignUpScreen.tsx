import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { Button } from "../components/Button";
import { fonts, spacings } from "../common";
import { FormInput } from "../components/FormInput";
import { useNavigation } from "@react-navigation/native";
import { ButtonBack } from "../components/ButtonBack";
import { NavigationProps } from "../navigation";
import { useColors } from "../hooks/useColors";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { signUpRequested } from "../store/slices/authSlice";

interface SignUpFormProps {
  email?: string;
  password?: string;
}

export const AuthSignUpScreen = () => {
  const colors = useColors();
  const formRef = React.useRef<FormikProps<SignUpFormProps>>(null);

  const loadingSignUp = useAppSelector(state => state.auth.loadingSignUp);
  const errorSignUp = useAppSelector(state => state.auth.errorSignOut);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps["SignUp"]["navigation"]>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return <ButtonBack onPress={() => navigation.pop()} />;
      },
    });
  }, []);

  const onSignUp = async (values: SignUpFormProps) => {
    const { email, password } = values;
    if (!email || !password) {
      return;
    }
    dispatch(signUpRequested({ email, password }));
  };

  const ProfileSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <SafeAreaView style={[styles.background, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[fonts.header, { color: colors.headerText }]}>{"Sign up below"}</Text>
        <Text style={[fonts.subheader, { color: colors.headerText }]}>
          {"Provide an email\n and password"}
        </Text>
      </View>
      <Formik
        innerRef={formRef}
        initialValues={{ email: "", password: "" }}
        validationSchema={ProfileSchema}
        onSubmit={onSignUp}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View style={styles.fieldWrapper}>
            <FormInput
              label={"Email"}
              placeholder={"jimmy123@gmail.com"}
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
            {!!errorSignUp && (
              <Text style={[fonts.regular, { color: colors.error, paddingTop: spacings.base }]}>
                {"Login failed. Please try again."}
              </Text>
            )}
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

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  headerContainer: { marginLeft: spacings.base, marginTop: spacings.large },
  fieldWrapper: { flex: 1, marginHorizontal: spacings.base, marginTop: spacings.large },
});
