import React from "react";
import { useButton } from "@react-aria/button";

interface ButtonProps {
  onPress: () => void;
}
export const Button: React.FC<ButtonProps> = (props) => {
  const { onPress, children } = props;
  const buttonRef = React.useRef();

  const { buttonProps } = useButton(
    {
      onPress: onPress,
    },
    buttonRef
  );
  return (
    <button {...buttonProps} ref={buttonRef}>
      {children}
    </button>
  );
};
