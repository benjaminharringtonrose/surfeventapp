import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";
import React, { forwardRef, Ref, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacings, User } from "../common";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";
import { ModalHeader } from "../components/ModalHeader";
import { FormModalDatePicker } from "../components/FormModalDatePicker";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setEventId } from "../store/slices/eventsSlice";
import { useColors } from "../hooks/useColors";

interface EventAddFormProps {
  eventName?: string;
  dateStart?: Date;
  timeStart?: Date;
  dateEnd?: Date;
}

interface EventAddModalProps {
  user: User;
  onClose: () => void;
  onAlert: () => void;
}
export const EventAddModal = forwardRef((props: EventAddModalProps, ref) => {
  const formRef = React.useRef<FormikProps<EventAddFormProps>>(null);
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const dispatch = useAppDispatch();
  const [loadingAddEvent, setLoadingAddEvent] = useState<boolean>(false);

  const onSubmit = async (values: EventAddFormProps) => {
    if (!values.eventName || !values.dateStart || !values.dateEnd || !values.timeStart) {
      return;
    }
    try {
      setLoadingAddEvent(true);
      const eventsCollectionRef = firestore().collection("events");
      const eventId = eventsCollectionRef.doc().id;
      await eventsCollectionRef.doc(eventId).set({
        uid: props.user.uid || "",
        eventId,
        eventName: values.eventName,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        timeStart: values.timeStart,
      });
      dispatch(setEventId({ eventId }));
      setLoadingAddEvent(false);
      props.onClose();
      props.onAlert();
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
          backgroundColor: colors.greyscale9,
        }}
        HeaderComponent={() => (
          <ModalHeader title={"Add Surf Event"} showCloseButton={true} onClose={props.onClose} />
        )}>
        <Formik
          innerRef={formRef}
          initialValues={{
            eventName: undefined,
            dateStart: new Date(),
            timeStart: new Date(new Date().setHours(6, 0, 0, 0)),
            dateEnd: new Date(),
          }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}>
          {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
            <View style={{ marginHorizontal: spacings.base }}>
              <FormInput
                label={"Event Name"}
                placeholder={"Contest #1"}
                onChangeText={handleChange("eventName")}
                onBlur={handleBlur("eventName")}
                autoCapitalize={"words"}
                autoCorrect={true}
                value={values.eventName}
                error={errors.eventName}
                touched={touched.eventName}
              />
              <FormModalDatePicker
                label={"Start Time"}
                value={values.timeStart}
                mode={"time"}
                onSelectDate={timeStart => setFieldValue("timeStart", timeStart)}
                error={errors.timeStart}
                touched={touched.timeStart}
                style={{ marginTop: spacings.base }}
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
