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
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import moment from "moment";
import { setEventId } from "../store/slices/eventsSlice";

interface EventEditFormProps {
  eventName?: string;
  dateStart?: Date;
  timeStart?: Date;
  dateEnd?: Date;
}

interface EventEditModalProps {
  onClose: () => void;
  onAlert: () => void;
}
export const EventEditModal = forwardRef((props: EventEditModalProps, ref) => {
  const [loadingEditEvent, setLoadingEditEvent] = useState<boolean>(false);
  const formRef = React.useRef<FormikProps<EventEditFormProps>>(null);
  const uid = useAppSelector(state => state.auth.user?.uid);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: EventEditFormProps) => {
    if (!values.eventName || !values.dateStart || !values.dateEnd || !values.timeStart) {
      return;
    }
    try {
      setLoadingEditEvent(true);
      const eventsCollectionRef = firestore().collection("events");
      const eventId = eventsCollectionRef.doc().id;
      await eventsCollectionRef.doc(eventId).set(
        {
          uid: uid || "",
          eventId,
          eventName: values.eventName,
          dateStart: values.dateStart,
          dateEnd: values.dateEnd,
          timeStart: values.timeStart,
        },
        { merge: true },
      );
      dispatch(setEventId({ eventId }));
      setLoadingEditEvent(false);
      props.onClose();
      props.onAlert();
    } catch (error) {
      setLoadingEditEvent(false);
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
                placeholder={"NSSA Event #1"}
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
                loading={loadingEditEvent}
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
