import React from "react";
import { View, Text, SafeAreaView, TextInput, Button } from "react-native";
import { Formik } from "formik";

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
              <Button onPress={() => handleSubmit()} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};
