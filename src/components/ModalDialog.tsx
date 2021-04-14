import React from "react";
import { useOverlayTriggerState } from "@react-stately/overlays";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayProvider,
  OverlayContainer,
} from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { useButton } from "@react-aria/button";
import { Button } from "./Button";

interface ModalDialogProps {
  title: string;
}
export const ModalDialog: React.FC<
  Parameters<typeof useOverlay>[0] &
    Parameters<typeof useDialog>[0] &
    ModalDialogProps
> = (props) => {
  const { title, children } = props;
  const ref = React.useRef();
  const { overlayProps } = useOverlay(props, ref);
  usePreventScroll();

  const { modalProps } = useModal();
  const { dialogProps, titleProps } = useDialog(props, ref);
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          style={{
            background: "white",
            color: "black",
            padding: 30,
          }}
        >
          <h3 {...titleProps} style={{ marginTop: 0 }}>
            {title}
          </h3>
          {children}
        </div>
      </FocusScope>
    </div>
  );
};
