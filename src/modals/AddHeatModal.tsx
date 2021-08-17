import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacings, colors } from "../common";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";
import { FormDropdownPicker } from "../components/FormDropdownPicker";
import { ModalHeader } from "../components/ModalHeader";
import { FormModalDatePicker } from "../components/FormModalDatePicker";

interface AddHeatFormProps {
  eventName?: string;
  division?: string;
  date?: Date;
}

interface AddHeatModalProps {
  onClose: () => void;
}
export const AddHeatModal = forwardRef((props: AddHeatModalProps, ref) => {
  const formRef = React.useRef<FormikProps<AddHeatFormProps>>(null);
  const [loadingAddHeat, setLoadingAddHeat] = useState<boolean>(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {}, []);

  const onSubmit = (values: AddHeatFormProps) => {
    if (!values.division) {
      return;
    }
    // const userDocRef = firestore().collection("users").doc(user?.uid);
  };

  const ProfileSchema = Yup.object().shape({
    eventName: Yup.string().required("Required"),
    division: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
  });
  return (
    <Portal>
      <Modalize
        ref={ref as Ref<Modalize>}
        adjustToContentHeight={true}
        childrenStyle={{
          paddingBottom: insets.bottom,
          backgroundColor: colors.background,
        }}
        HeaderComponent={() => (
          <ModalHeader title={"Add Surf Heat"} showCloseButton={true} onClose={props.onClose} />
        )}>
        <Formik
          innerRef={formRef}
          initialValues={{ division: undefined, date: undefined }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}>
          {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
            <View style={{ marginHorizontal: spacings.base }}>
              <FormDropdownPicker
                title={"Select Event"}
                label={"Event Name"}
                value={values.eventName}
                items={EVENTS}
                error={errors.eventName}
                touched={touched.eventName}
                onSelect={value => setFieldValue("eventName", value)}
                style={{ marginTop: spacings.base }}
              />
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
                label={"Date"}
                value={values.date}
                onSelectDate={date => setFieldValue("date", date)}
                error={errors.date}
                touched={touched.date}
                style={{ marginTop: spacings.base }}
              />
              <Button
                type={"contained"}
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
  { id: "BOYSU12", label: "Boys 11 & Under" },
  { id: "BOYSU14", label: "Boys 13 & Under" },
  { id: "BOYSU16", label: "Boys 15 & Under" },
  { id: "JMENU18", label: "Junior Men 17 & Under" },
  { id: "MEN", label: "Men 18-29" },
  { id: "GIRLSU12", label: "Girls 11 & Under" },
  { id: "GIRLSU14", label: "Girls 13 & Under" },
  { id: "GIRLSU16", label: "Girls 15 & Under" },
  { id: "JWOMENU18", label: "Junior Women 17 & Under" },
  { id: "WOMEN", label: "Women 18-39" },
  { id: "LADIES", label: "Ladies 40 & Over" },
  { id: "MASTERS", label: "Masters 30-39" },
  { id: "SMEN", label: "Senior Men 40-49" },
  { id: "LEGENDS", label: "Legends 50 & Over" },
  { id: "GLEGENDS", label: "Grand Legends 60 & Over" },
];

export const EVENTS = [
  { id: "EVENT1", label: "ESA Event #1" },
  { id: "EVENT2", label: "ESA Event #2" },
  { id: "EVENT3", label: "ESA Event #3" },
  { id: "EVENT4", label: "ESA Event #4" },
];
