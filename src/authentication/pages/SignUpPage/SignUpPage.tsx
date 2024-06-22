import { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "src/authentication/hooks/useSignUp";
import { useUser } from "src/authentication/hooks/useUser";
import { Button } from "src/common/components/Button/Button";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpPage = (): JSX.Element => {
  const { signUp, signUpLoading, signUpError } = useSignUp();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (e: { target: { name: string; value: string } }) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await signUp(formData);

    // redirect on successful sign up
    navigate("/");
  };

  useEffect(() => {
    currentUser && navigate("/");
  }, []);

  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen w-screen bg-stone-300">
      {!!signUpError && (
        // TODO: show actual error message
        <div className="p-6 border border-red-500 rounded-lg bg-red-100 text-red-500 max-w-sm w-full">
          Something went wrong. Please try again
        </div>
      )}
      <div className="flex flex-col gap-6 p-6 border bg-stone-100 border-black rounded-lg max-w-sm w-full shadow-light">
        <h1 className="text-4xl font-normal font-title tracking-tight text-black">
          Sign Up
        </h1>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium leading-6 text-black">
                Name
              </label>
            </div>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                onChange={onChange}
                required
                className="block w-full p-2 bg-white text-black border border-black rounded-full placeholder:text-stone-500 focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium leading-6 text-black">
              Email
            </label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={onChange}
                required
                className="block w-full p-2 bg-white text-black border border-black rounded-full placeholder:text-stone-500 focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium leading-6 text-black">
                Password
              </label>
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                onChange={onChange}
                required
                className="block w-full p-2 bg-white text-black border border-black rounded-full placeholder:text-stone-500 focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium leading-6 text-black">
                Confirm Password
              </label>
            </div>
            <div>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                onChange={onChange}
                required
                className="block w-full p-2 bg-white text-black border border-black rounded-full placeholder:text-stone-500 focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <Button
              disabled={signUpLoading}
              colour={{
                border: "black",
                background: "orange-500",
                text: "black",
              }}
              type="submit"
              width="full"
              size="large"
            >
              {signUpLoading ? "Loading..." : "Sign up"}
            </Button>
          </div>
        </form>

        <div className="flex justify-center items-baseline">
          <p className="text-sm text-black">Already have an account?&nbsp;</p>
          <Button
            styleType="link"
            size="small"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
