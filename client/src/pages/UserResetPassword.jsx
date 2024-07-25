import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/Input";
import {
  passwordConfirmValidation,
  passwordValidation,
} from "../utils/inputValidations";
import useAuth, { useAuthRedirect } from "../contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import FormMessage from "../components/FormMessage";

function UserResetPassword() {
  useAuthRedirect();

  const { idUser } = useParams();
  const [params, setParams] = useSearchParams();
  const token = params.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  const methods = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { message, updatePassword } = useAuth();

  // validate token
  // if token is valid, show reset password form
  // if token is invalid, show error message
  // if token is expired, show error message

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/auth/forgot-password/validate-reset-token/${idUser}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (response.ok) {
          setIsLoading(false);
          setError(false);
        } else {
          setIsLoading(false);
          setError(true);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsLoading(false);
        setError(true);
      }
    })();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  // console.log("idUser: ", idUser);
  // console.log("params: ", params);
  // console.log("token: ", token);

  const onSubmit = methods.handleSubmit((data) => {
    updatePassword({
      id: idUser,
      password: data.password,
    });
  });

  return (
    <div>
      <FormProvider {...methods}>
        <form action="#" className="form" onSubmit={(e) => e.preventDefault()}>
          {message && (
            <AnimatePresence mode="wait" initial={false}>
              {message && <FormMessage message={message} isError={isError} />}
            </AnimatePresence>
          )}
          <h1 className="text-base mb-4 font-semibold">Reset Password</h1>
          <Input
            isShowLabel={true}
            inputClassName={"primary-form-input"}
            {...passwordValidation}
            label={"New Password"}
          />
          <Input
            isShowLabel={true}
            inputClassName={"primary-form-input"}
            {...passwordConfirmValidation}
            labelClassName={"mt-4"}
          />
          <div className="flex justify-end">
            <button className="primary-rounded-btn" onClick={onSubmit}>
              Save Change
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default UserResetPassword;
