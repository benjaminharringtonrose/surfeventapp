import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import firestore, { firebase } from "@react-native-firebase/firestore";
import React, { forwardRef, useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { spacings, colors, ESA_DIVISIONS } from "../common";
import { Button } from "../components/Button";
import { FormModalDatePicker } from "../components/FormModalDatePicker";
import { useAppSelector } from "../hooks/redux";
import { ListPickerItem } from "../components/ListPicker";
import { FormDropSectionListPicker } from "../components/FormDropSectionListPicker";
import { FormInput } from "../components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackNavProp, RootStackParamList } from "../AppNavigator";
import { ButtonX } from "../components/ButtonX";
import { DIVISIONS, DIVISIONS_SECTIONS } from "../common/util";

interface HeatAddFormProps {
  division?: ListPickerItem;
  timeStart?: Date;
  dateStart?: Date;
  surfer1?: string;
  surfer2?: string;
  surfer3?: string;
  surfer4?: string;
  surfer5?: string;
  surfer6?: string;
}

interface HeatAddScreenProps {
  eventId?: string;
  onClose: () => void;
}
export const HeatAddScreen = forwardRef((props: HeatAddScreenProps, ref) => {
  const [loadingAddHeat, setLoadingAddHeat] = useState<boolean>(false);

  const formRef = React.useRef<FormikProps<HeatAddFormProps>>(null);
  const navigation = useNavigation<RootStackNavProp>();
  const uid = useAppSelector(state => state.auth.user?.uid);
  const { eventId } = useRoute<RouteProp<RootStackParamList, "AddHeat">>().params;

  useEffect(() => {
    navigation.setOptions({
      title: "Add Surf Heat",
      headerLeft: () => <ButtonX onPress={() => navigation.pop()} />,
    });
  }, []);

  const onSubmit = async (values: HeatAddFormProps) => {
    if (
      !values.division?.id ||
      !values.dateStart ||
      !values.timeStart ||
      !values.surfer1 ||
      !values.surfer2
    ) {
      return;
    }
    try {
      setLoadingAddHeat(true);
      firebase.firestore().settings({ ignoreUndefinedProperties: true });
      const heatsCollectionRef = firestore().collection("heats");
      const heatId = heatsCollectionRef.doc().id;
      await heatsCollectionRef.doc(heatId).set({
        uid: uid || "",
        heatId,
        eventId,
        division: values.division.id as string,
        dateStart: values.dateStart,
        timeStart: values.timeStart,
        surfers: firestore.FieldValue.arrayUnion(values.surfer1, values.surfer2),
      });
      if (values.surfer3) {
        await heatsCollectionRef.doc(heatId).set({
          surfers: firestore.FieldValue.arrayUnion(values.surfer3),
        });
      }
      if (values.surfer4) {
        await heatsCollectionRef.doc(heatId).set({
          surfers: firestore.FieldValue.arrayUnion(values.surfer4),
        });
      }
      setLoadingAddHeat(false);
      navigation.navigate("MainStack", {
        screen: "EventStack",
        params: {
          screen: "Events",
          params: {
            showAlert: true,
          },
        },
      });
    } catch (error) {
      setLoadingAddHeat(false);
      console.warn(error);
    }
  };

  const ProfileSchema = Yup.object().shape({
    division: Yup.object().required("Division required"),
    timeStart: Yup.date().required("Start time required"),
    dateStart: Yup.date().required("Start date required"),
    surfer1: Yup.string().required("At least 2 surfers required"),
    surfer2: Yup.string().required("At least 2 surfers required"),
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <Formik
        innerRef={formRef}
        initialValues={{
          division: undefined,
          dateStart: new Date(),
          timeStart: new Date(new Date().setHours(6, 0, 0, 0)),
          surfer1: undefined,
          surfer2: undefined,
          surfer3: undefined,
          surfer4: undefined,
        }}
        validationSchema={ProfileSchema}
        onSubmit={onSubmit}>
        {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
          <ScrollView style={{ margin: spacings.base }}>
            <FormDropSectionListPicker
              title={"Select Division"}
              label={"Division"}
              value={values.division}
              sections={DIVISIONS_SECTIONS}
              error={errors.division}
              touched={touched.division}
              onSelect={value => setFieldValue("division", value)}
              style={{ marginTop: spacings.base }}
            />
            <FormModalDatePicker
              label={"Start Time"}
              value={values.timeStart}
              mode={"time"}
              onSelectDate={value => setFieldValue("timeStart", value)}
              error={errors.timeStart}
              touched={touched.timeStart}
              style={{ marginTop: spacings.base }}
            />
            <FormModalDatePicker
              label={"Start Date"}
              value={values.dateStart}
              mode={"date"}
              onSelectDate={value => setFieldValue("dateStart", value)}
              error={errors.dateStart}
              touched={touched.dateStart}
              style={{ marginTop: spacings.base }}
            />
            <FormInput
              label={"Surfer #1 Name"}
              placeholder={""}
              onChangeText={handleChange("surfer1")}
              onBlur={handleBlur("surfer1")}
              autoCapitalize={"words"}
              autoCorrect={true}
              value={values.surfer1}
              error={errors.surfer1}
              touched={touched.surfer1}
              style={{ marginTop: spacings.base }}
            />
            <FormInput
              label={"Surfer #2 Name"}
              placeholder={""}
              onChangeText={handleChange("surfer2")}
              onBlur={handleBlur("surfer2")}
              autoCapitalize={"words"}
              autoCorrect={true}
              value={values.surfer2}
              error={errors.surfer2}
              touched={touched.surfer2}
              style={{ marginTop: spacings.base }}
            />
            <FormInput
              label={"Surfer #3 Name (Optional)"}
              placeholder={""}
              onChangeText={handleChange("surfer3")}
              onBlur={handleBlur("surfer3")}
              autoCapitalize={"words"}
              returnKeyType={"next"}
              autoCorrect={true}
              value={values.surfer3}
              error={errors.surfer3}
              touched={touched.surfer3}
              style={{ marginTop: spacings.base }}
            />
            <FormInput
              label={"Surfer #4 Name (Optional)"}
              placeholder={""}
              onChangeText={handleChange("surfer4")}
              onBlur={handleBlur("surfer4")}
              autoCapitalize={"words"}
              autoCorrect={true}
              value={values.surfer4}
              error={errors.surfer4}
              touched={touched.surfer4}
              style={{ marginTop: spacings.base }}
            />
            <Button
              type={"contained"}
              label={"Add"}
              loading={loadingAddHeat}
              onPress={() => handleSubmit()}
              style={{ marginTop: spacings.base }}
            />
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
});
