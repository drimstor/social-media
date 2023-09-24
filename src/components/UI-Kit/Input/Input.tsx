import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import useInput from "hooks/useValidatiton/useInput";
import { useEffect } from "react";
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
  name: string;
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
  name,
  icon,
}: InputProps) => {
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
        ? checkValidate(name, useValid.validateError, useValid.inputValue)
        : checkValidate(name, "", useValid.inputValue);
    }
  }, [isCheckError]);

  //--------------- Password ----------------//

  // const [isShowPassword, setIsShowPassword] = useState(false)
  // const showPasswordHandler = () => {
  //   setIsShowPassword(!isShowPassword)
  // }

  return (
    <div className={s.inputWrapper}>
      <FontAwesomeIcon icon={icon} />
      <input
        type={type}
        name={name}
        required
        value={useValid.inputValue}
        onChange={useValid.onChange}
        className={clsx(className && className)}
      />
      <span>{label}</span>
    </div>
  );
};

export default Input;
