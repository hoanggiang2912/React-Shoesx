import useAuth, { useAuthRedirect } from "../contexts/AuthContext";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/Input";
import {
  addressValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
} from "../utils/inputValidations";
import { AnimatePresence } from "framer-motion";
import FormMessage from "../components/FormMessage";
import { FaC } from "react-icons/fa6";

function UserGeneral() {
  const { user, isAuthenticated, isLoading, isError, message, updateProfile } =
    useAuth();
  // console.log(user);

  const methods = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
    },
  });

  // Authenticated user can access this page
  useAuthRedirect();

  const onSubmit = methods.handleSubmit((data) =>
    updateProfile(user._id, data)
  );

  return (
    <div>
      <h1 className="text-lg font-semibold">User General Informations</h1>
      <FormProvider {...methods}>
        <form action="#" className="mt-3" onSubmit={(e) => e.preventDefault()}>
          {message && (
            <AnimatePresence
              mode="wait"
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
            >
              {message && <FormMessage message={message} isError={isError} />}
            </AnimatePresence>
          )}

          <div className="form__group flex flex-col">
            <Input
              inputClassName={"primary-form-input"}
              isShowLabel={true}
              {...nameValidation}
              label={"Full name"}
            />
          </div>
          <div className="form__group flex flex-col mt-3">
            <Input
              isShowLabel={true}
              inputClassName="primary-form-input"
              {...emailValidation}
            />
          </div>
          <div className="form__group flex flex-col mt-3">
            <Input
              isShowLabel={true}
              inputClassName="primary-form-input"
              {...phoneValidation}
            />
          </div>
          <div className="form__group flex flex-col mt-3">
            <Input
              isShowLabel={true}
              inputClassName="primary-form-input"
              {...addressValidation}
            />
          </div>
          <div className="flex justify-end items-center gap-4">
            <button className="primary-rounded-btn" onClick={onSubmit}>
              {!isLoading ? (
                <>
                  <p>Update</p>
                </>
              ) : (
                <>
                  <FaC className="animate-spin"></FaC>
                  <p>Updating...</p>
                </>
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default UserGeneral;
