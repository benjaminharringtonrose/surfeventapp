import React from "react";
import { View, SafeAreaView, TextInput } from "react-native";
import { Formik } from "formik";
import { Button } from "../components/Button";

export const AuthLoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Formik initialValues={{ email: "" }} onSubmit={values => console.log(values)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <Button onPress={() => handleSubmit()} label="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};
