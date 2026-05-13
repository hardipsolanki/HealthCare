// components/common/AppBottomSheet.tsx

import React, {
    forwardRef,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
} from "react";

import { View } from "react-native";

import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

/**
 * Props
 */
type Props = {
  children: ReactNode;

  snapPoints?: string[];

  enablePanDownToClose?: boolean;
};

/**
 * Ref Methods
 */
export type AppBottomSheetRef = {
  open: () => void;

  close: () => void;
};

const AppBottomSheet = forwardRef<AppBottomSheetRef, Props>(
  ({ children, snapPoints = ["75%"], enablePanDownToClose = true }, ref) => {
    /**
     * Internal BottomSheet Ref
     */
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    /**
     * Memoized SnapPoints
     */
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    /**
     * Open BottomSheet
     */
    const open = useCallback(() => {
      bottomSheetRef.current?.present();
    }, []);

    /**
     * Close BottomSheet
     */
    const close = useCallback(() => {
      bottomSheetRef.current?.dismiss();
    }, []);

    /**
     * Expose methods outside
     */
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.4}
            pressBehavior="close"
          />
        )}
      >
        <View style={{ flex: 1 }}>{children}</View>
      </BottomSheetModal>
    );
  },
);

export default AppBottomSheet;
