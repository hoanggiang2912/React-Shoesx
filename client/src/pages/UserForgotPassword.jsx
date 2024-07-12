import { AiOutlineMail } from "react-icons/ai";

function UserForgotPassword() {
  return (
    <form action="#">
      <h1 className="text-lg font-bold">Forgot Password</h1>
      <div className="form__group flex flex-col gap-2 mt-3">
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="primary-form-input"
        />
        <label htmlFor="email" className="text-sm text-gray-400 font-semibold">
          Please enter your email address. You will receive a link to create a
          new password via email.
        </label>
      </div>
      <div className="flex justify-end">
        <button className="primary-rounded-btn mt-3">
          <AiOutlineMail /> Send mail
        </button>
      </div>
    </form>
  );
}

export default UserForgotPassword;
