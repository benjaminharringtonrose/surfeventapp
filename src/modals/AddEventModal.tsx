import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";
import React, { forwardRef, Ref, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacings, colors } from "../common";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";
import { ModalHeader } from "../components/ModalHeader";
import { FormModalDatePicker } from "../components/FormModalDatePicker";
import { useAppSelector } from "../hooks/redux";
import moment from "moment";

interface AddEventFormProps {
  eventName?: string;
  datetime?: Date;
}

interface AddEventModalProps {
  onClose: () => void;
}
export const AddEventModal = forwardRef((props: AddEventModalProps, ref) => {
  const formRef = React.useRef<FormikProps<AddEventFormProps>>(null);
  const [loadingAddEvent, setLoadingAddEvent] = useState<boolean>(false);

  const uid = useAppSelector(state => state.auth.user?.uid);
  const insets = useSafeAreaInsets();

  const onSubmit = async (values: AddEventFormProps) => {
    if (!values.eventName || !values.datetime) {
      return;
    }
    try {
      await firestore()
        .collection("events")
        .add({
          uid: uid || "",
          eventName: values.eventName,
          date: moment(values.datetime).format("YYYY-MM-DD"),
          time: moment(values.datetime).format("h:mm a"),
        });
      props.onClose();
    } catch (error) {
      console.warn(error);
    }
  };

  const ProfileSchema = Yup.object().shape({
    eventName: Yup.string().required("Required"),
    datetime: Yup.date().required("Required"),
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
          initialValues={{ eventName: undefined, datetime: undefined }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}>
          {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
            <View style={{ marginHorizontal: spacings.base }}>
              <FormInput
                label={"Event Name"}
                placeholder={"...type event name here"}
                onChangeText={handleChange("eventName")}
                onBlur={handleBlur("eventName")}
                value={values.eventName}
                error={errors.eventName}
                touched={touched.eventName}
              />
              <FormModalDatePicker
                label={"When"}
                value={values.datetime}
                mode={"datetime"}
                onSelectDate={datetime => setFieldValue("datetime", datetime)}
                error={errors.datetime}
                touched={touched.datetime}
                style={{ marginTop: spacings.base }}
              />
              <Button
                type={"contained"}
                label={"Add"}
                loading={loadingAddEvent}
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
