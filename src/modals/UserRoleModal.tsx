import firestore from "@react-native-firebase/firestore";
import React, { forwardRef, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacings, colors, fonts, Collection, User, AdminRequest } from "../common";
import { FormDropListPicker } from "../components";
import { Button } from "../components/Button";
import { ListPickerItem } from "../components/ListPicker";
import { ModalHeader } from "../components/ModalHeader";
import { IRadioButtonOption } from "../components/RadioButton";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { useOrganizations } from "../hooks/useOrganizations";

interface UserRoleModalProps {
  user: User;
  onClose: () => void;
}
export const UserRoleModal = forwardRef((props: UserRoleModalProps, ref) => {
  const [selectedUserRole, setSelectedUserRole] = useState<IRadioButtonOption | undefined>(
    undefined,
  );
  const [selectedOrg, setSelectedOrg] = useState<ListPickerItem | undefined>(undefined);
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
          .set({ isUserRolePending: false }, { merge: true });
      } else if (selectedUserRole?.id === "admin") {
        await firestore()
          .collection(Collection.users)
          .doc(props.user.uid)
          .set({ isAdmin: true, organizationId: selectedOrg?.id }, { merge: true });
        const adminRequestsCollectionRef = firestore().collection(Collection.adminRequests);
        const adminRequestId = adminRequestsCollectionRef.doc().id;
        const adminRequest: AdminRequest = {
          adminRequestId,
          organizationId: selectedOrg?.id,
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
              setSelectedOrg(undefined);
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
            {selectedUserRole?.id === "admin" && (
              <FormDropListPicker
                title={"Select Organization"}
                label={"Surfing Organization"}
                items={organizationOptions}
                onSelect={value => setSelectedOrg(value)}
                value={selectedOrg}
                style={{ marginBottom: spacings.base }}
              />
            )}
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
