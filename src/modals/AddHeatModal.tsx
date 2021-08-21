import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacings, colors, ESA_DIVISIONS } from "../common";
import { Button } from "../components/Button";
import { FormDropdownPicker } from "../components/FormDropdownPicker";
import { ModalHeader } from "../components/ModalHeader";
import { FormModalDatePicker } from "../components/FormModalDatePicker";
import { useAppSelector } from "../hooks/redux";

interface AddHeatFormProps {
  division?: string;
  dateStart?: Date;
  timeStart?: Date;
}

interface AddHeatModalProps {
  eventId?: string;
  onClose: () => void;
}
export const AddHeatModal = forwardRef((props: AddHeatModalProps, ref) => {
  const formRef = React.useRef<FormikProps<AddHeatFormProps>>(null);
  const [loadingAddHeat, setLoadingAddHeat] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const uid = useAppSelector(state => state.auth.user?.uid);

  useEffect(() => {}, []);

  const onSubmit = async (values: AddHeatFormProps) => {
    if (!values.division || !values.dateStart || !values.timeStart) {
      return;
    }
    try {
      setLoadingAddHeat(true);
      const heatsCollectionRef = firestore().collection("heats");
      const heatId = heatsCollectionRef.doc().id;
      await heatsCollectionRef.doc(heatId).set({
        uid: uid || "",
        heatId,
        eventId: props?.eventId,
        division: values.division,
        dateStart: values.dateStart,
        timeStart: values.timeStart,
      });
      setLoadingAddHeat(false);
      props.onClose();
    } catch (error) {
      setLoadingAddHeat(false);
      console.warn(error);
    }
  };

  const ProfileSchema = Yup.object().shape({
    division: Yup.string().required("Required"),
    timeStart: Yup.date().required("Required"),
  });

  return (
    <Portal>
      <Modalize
        ref={ref as Ref<Modalize>}
        adjustToContentHeight={true}
        childrenStyle={{
          paddingBottom: insets.bottom,
          backgroundColor: colors.greyscale9,
        }}
        HeaderComponent={() => (
          <ModalHeader title={"Add Surf Heat"} showCloseButton={true} onClose={props.onClose} />
        )}>
        <Formik
          innerRef={formRef}
          initialValues={{
            division: undefined,
            dateStart: new Date(),
            timeStart: undefined,
          }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}>
          {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
            <View style={{ marginHorizontal: spacings.base }}>
              <FormDropdownPicker
                title={"Select Division"}
                label={"Division"}
                value={values.division}
                items={DIVISIONS}
                error={errors.division}
                touched={touched.division}
                onSelect={value => setFieldValue("division", value)}
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
              <FormModalDatePicker
                label={"Start Time"}
                value={values.timeStart}
                mode={"time"}
                onSelectDate={value => setFieldValue("timeStart", value)}
                error={errors.timeStart}
                touched={touched.timeStart}
                style={{ marginTop: spacings.base }}
              />
              <Button
                type={"bordered"}
                label={"Add"}
                loading={loadingAddHeat}
                onPress={() => handleSubmit()}
                style={{ marginTop: spacings.base }}
              />
            </View>
          )}
        </Formik>
      </Modalize>
    </Portal>
  );
});

export const DIVISIONS = [
  { id: ESA_DIVISIONS.BOYSU12, label: "Boys 11 & Under" },
  { id: ESA_DIVISIONS.BOYSU14, label: "Boys 13 & Under" },
  { id: ESA_DIVISIONS.BOYSU16, label: "Boys 15 & Under" },
  { id: ESA_DIVISIONS.JMENU18, label: "Junior Men 17 & Under" },
  { id: ESA_DIVISIONS.MEN, label: "Men 18-29" },
  { id: ESA_DIVISIONS.GIRLSU12, label: "Girls 11 & Under" },
  { id: ESA_DIVISIONS.GIRLSU14, label: "Girls 13 & Under" },
  { id: ESA_DIVISIONS.GIRLSU16, label: "Girls 15 & Under" },
  { id: ESA_DIVISIONS.JWOMENU18, label: "Junior Women 17 & Under" },
  { id: ESA_DIVISIONS.WOMEN, label: "Women 18-39" },
  { id: ESA_DIVISIONS.LADIES, label: "Ladies 40 & Over" },
  { id: ESA_DIVISIONS.MASTERS, label: "Masters 30-39" },
  { id: ESA_DIVISIONS.SMEN, label: "Senior Men 40-49" },
  { id: ESA_DIVISIONS.LEGENDS, label: "Legends 50 & Over" },
  { id: ESA_DIVISIONS.GLEGENDS, label: "Grand Legends 60 & Over" },
];

export const EVENTS = [
  { id: "EVENT1", label: "ESA Event #1" },
  { id: "EVENT2", label: "ESA Event #2" },
  { id: "EVENT3", label: "ESA Event #3" },
  { id: "EVENT4", label: "ESA Event #4" },
];
