import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import useInput from "hooks/useValidatiton/useInput";
import { useEffect, useState } from "react";
import s from "styles/authentication.module.scss";

interface InputProps {
  label: string;
  type: "email" | "text" | "password" | string;
  placeholder?: string;
  className?: string;
  initialValue?: string;
  required?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  isCheckError?: boolean;
  checkValidate?: (key: string, error: string, value: string) => void;

  helperText?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    isEmpty?: boolean;
    isEmail?: boolean;
    isLink?: boolean;
  };
  icon?: any;
}

const Input = ({
  className,
  type,
  label,
  initialValue,
  validation,
  isCheckError,
  checkValidate,
  icon,
}: InputProps) => {
  //------------------- Name Formation ----------------------//

  const [formattedName, setFormattedName] = useState(label);
  useEffect(() => {
    const name = formattedName.toLowerCase().split(" ");
    const correctName = name
      .map((name, index) =>
        index ? name[0].toUpperCase() + name.slice(1) : name
      )
      .join("");
    setFormattedName(correctName);
  }, []);

  //--------------- Validation ----------------//

  const useValid = useInput(initialValue ?? "", {
    isEmail: type === "email",
    isEmpty: true,
    ...validation,
  });

  useEffect(() => {
    if (isCheckError && checkValidate) {
      useValid.onBlur();
      useValid.validateError
        ? checkValidate(
            formattedName,
            useValid.validateError,
            useValid.inputValue
          )
        : checkValidate(formattedName, "", useValid.inputValue);
    }
  }, [isCheckError]);

  //--------------- Password ----------------//

  // const [isShowPassword, setIsShowPassword] = useState(false)
  // const showPasswordHandler = () => {
  //   setIsShowPassword(!isShowPassword)
  // }

  return (
    <div
      className={clsx(
        s.inputWrapper,
        useValid.inputValue.length > 0 && s.focused
      )}
    >
      <FontAwesomeIcon icon={icon} />
      <input
        type={type}
        name={formattedName}
        value={useValid.inputValue}
        onChange={useValid.onChange}
        className={clsx(className && className)}
      />
      <span>{label}</span>
    </div>
  );
};

export default Input;
