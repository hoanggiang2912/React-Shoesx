import { AiOutlineMail } from "react-icons/ai";
import { emailValidation } from "../utils/inputValidations";
import Input from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import useAuth, { useAuthRedirect } from "../contexts/AuthContext";
import { FaC } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import FormMessage from "../components/FormMessage";

function UserForgotPassword() {
  // authentication check
  useAuthRedirect();

  const { user, isLoading, forgotPassword, message, isError } = useAuth();

  // set up react hook form
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) =>
    forgotPassword({
      id: user._id,
      email: data.email,
    })
  );

  return (
    <FormProvider {...methods}>
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        {message && (
          <AnimatePresence mode="wait" initial={false}>
            {message && <FormMessage message={message} isError={isError} />}
          </AnimatePresence>
        )}
        <h1 className="text-lg font-bold">Forgot Password</h1>
        <div className="form__group flex flex-col gap-2 mt-3">
          <Input inputClassName="primary-form-input" {...emailValidation} />
          <label
            htmlFor="email"
            className="text-sm text-gray-400 font-semibold"
          >
            Please enter your email address. You will receive a link to create a
            new password via email.
          </label>
        </div>
        <div className="flex justify-end">
          <button className="primary-rounded-btn mt-3" onClick={onSubmit}>
            {isLoading ? (
              <>
                <FaC className="animate-spin"></FaC>
                Sending Email...
              </>
            ) : (
              <>
                <AiOutlineMail className="mr-2"></AiOutlineMail>
                Send Email
              </>
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default UserForgotPassword;
