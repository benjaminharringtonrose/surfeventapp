import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";
import React, { forwardRef, useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { spacings, colors } from "../common";
import { Button } from "../components/Button";
import { FormModalDatePicker } from "../components/FormModalDatePicker";
import { useAppSelector } from "../hooks/redux";
import { ListPickerItem } from "../components/ListPicker";
import { FormDropSectionListPicker } from "../components/FormDropSectionListPicker";
import { FormDropListPicker, FormInput } from "../components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps, RootStackParamList } from "../navigation";
import { ButtonX } from "../components/ButtonX";
import { DIVISIONS_SECTIONS } from "../common/constants";
import { useEvent } from "../hooks/useEvent";
import { getEventDaysListPickerItems } from "../common/util";
import { v4 as uuidv4 } from "uuid";

interface HeatAddFormProps {
  division?: ListPickerItem;
  timeStart?: Date;
  dateStart?: ListPickerItem;
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
  const navigation = useNavigation<NavigationProps["AddHeat"]["navigation"]>();
  const uid = useAppSelector(state => state.auth.user?.uid);
  const { eventId } = useRoute<RouteProp<RootStackParamList, "AddHeat">>().params;
  const { event } = useEvent(eventId);

  useEffect(() => {
    navigation.setOptions({
      title: "Add Surf Heat",
      headerLeft: () => (
        <ButtonX onPress={() => navigation.pop()} style={{ paddingHorizontal: spacings.base }} />
      ),
    });
  }, []);

  const onSubmit = async (values: HeatAddFormProps) => {
    if (
      !values.division?.id ||
      !values.dateStart?.id ||
      !values.timeStart ||
      !values.surfer1 ||
      !values.surfer2
    ) {
      return;
    }
    try {
      setLoadingAddHeat(true);
      const heatsCollectionRef = firestore().collection("heats");
      const heatId = heatsCollectionRef.doc().id;
      await heatsCollectionRef.doc(heatId).set({
        uid: uid || "",
        heatId,
        eventId,
        division: values.division.id as string,
        dateStart: values.dateStart.id as Date, // beware changing
        timeStart: values.timeStart,
        scores: {
          [uuidv4()]: {
            surfer: values.surfer1,
            waves: [],
          },
          [uuidv4()]: {
            surfer: values.surfer2,
            waves: [],
          },
        },
      });
      if (values.surfer3) {
        await heatsCollectionRef.doc(heatId).set(
          {
            scores: {
              [uuidv4()]: {
                surfer: values.surfer3,
                waves: [],
              },
            },
          },
          { merge: true },
        );
      }
      if (values.surfer4) {
        await heatsCollectionRef.doc(heatId).set(
          {
            scores: {
              [uuidv4()]: {
                surfer: values.surfer4,
                waves: [],
              },
            },
          },
          { merge: true },
        );
      }
      setLoadingAddHeat(false);
      navigation.navigate("EventStack", {
        screen: "Events",
        params: {
          showAlert: true,
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
    dateStart: Yup.object().required("Start date required"),
    surfer1: Yup.string().required("At least 2 surfers required"),
    surfer2: Yup.string().required("At least 2 surfers required"),
  });

  if (!event) return null;

  const dates = getEventDaysListPickerItems(event?.dateStart.toDate(), event?.dateEnd.toDate());

  console.log(dates);

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
          dateStart: dates[0],
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
            <FormDropListPicker
              title={"Select Day"}
              label={"Day"}
              value={values.dateStart}
              items={dates}
              error={errors.dateStart}
              touched={touched.dateStart}
              onSelect={value => setFieldValue("dateStart", value)}
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
