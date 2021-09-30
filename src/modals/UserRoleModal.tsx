import React, { forwardRef, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { View, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacings, fonts, Collection, User, AdminRequest } from "../common";
import { Button } from "../components/Button";
import { ModalHeader } from "../components/ModalHeader";
import { IRadioButtonOption } from "../components/RadioButton";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useOrganizations } from "../hooks/useOrganizations";
import { useColors } from "../hooks/useColors";

interface UserRoleModalProps {
  user: User;
  onClose: () => void;
}
export const UserRoleModal = forwardRef((props: UserRoleModalProps, ref) => {
  const colors = useColors();
  const [selectedUserRole, setSelectedUserRole] = useState<IRadioButtonOption | undefined>(
    undefined,
  );
  const insets = useSafeAreaInsets();
  const organizations = useOrganizations();

  const onRadioSelect = (useRoles: IRadioButtonOption[]) => {
    const selectedUserRole = useRoles.filter(userRole => !!userRole.selected).pop();
    setSelectedUserRole(selectedUserRole);
  };

  const onSubmitUserRole = async () => {
    try {
      if (selectedUserRole?.id === "surfer") {
        await firestore()
          .collection(Collection.users)
          .doc(props.user.uid)
          .set({ state: "approved" }, { merge: true });
      } else if (selectedUserRole?.id === "admin") {
        await firestore()
          .collection(Collection.users)
          .doc(props.user.uid)
          .set({ isAdmin: true, state: "pending" }, { merge: true });
        const adminRequestsCollectionRef = firestore().collection(Collection.adminRequests);
        const adminRequestId = adminRequestsCollectionRef.doc().id;
        const adminRequest: AdminRequest = {
          adminRequestId,
          organizationId: props.user?.organizationId || "",
          uid: props.user.uid,
        };
        await adminRequestsCollectionRef.doc(adminRequestId).set(adminRequest);
      }
    } catch (e) {
      console.log(e);
    }
    props.onClose();
  };

  const organizationOptions = organizations
    ? organizations.map(o => {
        return {
          id: o.organizationId,
          label: o.name,
        };
      })
    : [];

  return (
    <Portal>
      <Modalize
        ref={ref as React.Ref<Modalize>}
        disableScrollIfPossible={true}
        adjustToContentHeight={true}
        HeaderComponent={() => (
          <ModalHeader
            title={"User Role"}
            showCloseButton={true}
            onClose={() => {
              props.onClose();
              setSelectedUserRole(undefined);
            }}
          />
        )}>
        <View style={{ backgroundColor: colors.background, paddingBottom: insets.bottom }}>
          <View style={{ marginHorizontal: spacings.base }}>
            <Text style={[fonts.regular, { marginTop: spacings.base, color: colors.almostWhite }]}>
              {"Please select your user role"}
            </Text>
            <RadioButtonGroup
              options={[
                {
                  id: "surfer",
                  label: "Surfer",
                  selected: false,
                },
                {
                  id: "admin",
                  label: "Administrator",
                  selected: false,
                },
              ]}
              onPress={useRoles => onRadioSelect(useRoles)}
              style={{ marginTop: spacings.base }}
            />
            <Text style={[fonts.small, { marginBottom: spacings.base, color: colors.grey700 }]}>
              {
                "If you're requesting to become an organization administrator, we'll contact the surfing organization to confirm. Your account will be pending until confirmed."
              }
            </Text>

            <Button
              type={"contained"}
              label={"Submit"}
              onPress={onSubmitUserRole}
              style={{ marginBottom: spacings.base }}
            />
          </View>
        </View>
      </Modalize>
    </Portal>
  );
});
