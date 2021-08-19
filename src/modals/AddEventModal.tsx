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
  dateStart?: Date;
  timeStart?: Date;
  dateEnd?: Date;
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
    if (!values.eventName || !values.dateStart || !values.dateEnd || !values.timeStart) {
      return;
    }
    try {
      setLoadingAddEvent(true);
      const eventsCollectionRef = firestore().collection("events");
      const eventId = eventsCollectionRef.doc().id;
      await eventsCollectionRef.doc(eventId).set({
        uid: uid || "",
        eventId,
        eventName: values.eventName,
        dateStart: moment(values.dateStart).format("YYYY-MM-DD"),
        dateEnd: moment(values.dateEnd).format("YYYY-MM-DD"),
        timeStart: moment(values.timeStart).format("h:mma"),
      });
      setLoadingAddEvent(false);
      props.onClose();
    } catch (error) {
      setLoadingAddEvent(false);
      console.warn(error);
    }
  };

  const ProfileSchema = Yup.object().shape({
    eventName: Yup.string().required("Required"),
    dateStart: Yup.date().required("Required"),
    dateEnd: Yup.date().required("Required"),
    timeStart: Yup.date().required("Required"),
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
          <ModalHeader title={"Add Surf Event"} showCloseButton={true} onClose={props.onClose} />
        )}>
        <Formik
          innerRef={formRef}
          initialValues={{
            eventName: undefined,
            dateStart: undefined,
            timeStart: undefined,
            dateEnd: undefined,
          }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}>
          {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
            <View style={{ marginHorizontal: spacings.base }}>
              <FormInput
                label={"Event Name"}
                placeholder={"...type here"}
                onChangeText={handleChange("eventName")}
                onBlur={handleBlur("eventName")}
                value={values.eventName}
                error={errors.eventName}
                touched={touched.eventName}
              />
              <FormModalDatePicker
                label={"Start Date"}
                value={values.dateStart}
                mode={"date"}
                onSelectDate={dateStart => setFieldValue("dateStart", dateStart)}
                error={errors.dateStart}
                touched={touched.dateStart}
                style={{ marginTop: spacings.base }}
              />
              <FormModalDatePicker
                label={"Time"}
                value={values.timeStart}
                mode={"time"}
                onSelectDate={timeStart => setFieldValue("timeStart", timeStart)}
                error={errors.timeStart}
                touched={touched.timeStart}
                style={{ marginTop: spacings.base }}
              />
              <FormModalDatePicker
                label={"End Date"}
                value={values.dateEnd}
                mode={"date"}
                onSelectDate={dateEnd => setFieldValue("dateEnd", dateEnd)}
                error={errors.dateEnd}
                touched={touched.dateEnd}
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
