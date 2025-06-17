import { createStyle, useThemeStyle } from "./createStyle";
import { View, Modal as RNModal, Text, TouchableOpacity } from "react-native";
import { rgba } from "polished";
import { colors } from "@shared/design/colors";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";

interface ModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const modalAtom = atom<ModalProps>({
  visible: false,
  title: "",
  description: "",
  confirmText: "확인",
  cancelText: "취소",
});

export const useModal = () => {
  const setModal = useSetAtom(modalAtom);

  const showModal = useCallback(
    (
      modalProps: Omit<ModalProps, "visible"> &
        Required<Pick<ModalProps, "title" | "description">>
    ) => {
      setModal({
        visible: true,
        ...modalProps,
      });
    },
    [setModal]
  );

  const hideModal = useCallback(() => {
    setModal({ visible: false });
  }, [setModal]);

  return useMemo(
    () => ({
      showModal,
      hideModal,
    }),
    [showModal, hideModal]
  );
};

export function Modal() {
  const styles = useThemeStyle(themedStyles);

  const {
    visible,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  } = useAtomValue(modalAtom);

  const showCancalButton = !!cancelText && !!onCancel;

  return (
    <RNModal animationType="fade" transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.background}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.buttonContainer}>
              {showCancalButton && (
                <TouchableOpacity style={styles.button} onPress={onCancel}>
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>
                    {cancelText}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.button} onPress={onConfirm}>
                <Text style={[styles.buttonText, styles.confirmButtonText]}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const themedStyles = createStyle(({ themeColor, typo }) => ({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: rgba(colors.basic.black, 0.5),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  content: {
    backgroundColor: themeColor.background.secondary,
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  title: {
    fontSize: typo.sizes.h2,
    fontWeight: typo.weights.bold,
    color: themeColor.text.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: typo.sizes.bodyMedium,
    fontWeight: typo.weights.regular,
    color: themeColor.text.primary,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  button: {
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: typo.sizes.bodyMedium,
    fontWeight: typo.weights.bold,
  },
  confirmButtonText: {
    color: themeColor.brand.primary,
  },
  cancelButtonText: {
    color: themeColor.status.error,
  },
}));
