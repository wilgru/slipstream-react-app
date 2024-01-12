import { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { Button } from "src/common/components/Button/Button";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = (): JSX.Element => {
  const { currentUser, login, logInLoading, logInError } = useAuthentication();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const onChange = (e: { target: { name: string; value: string } }) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // redirect on successful login
    login(formData.email, formData.password).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    currentUser && navigate("/");
  }, []);

  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen w-screen bg-stone-100">
      {!!logInError && (
        <div className="p-6 border bg-red-100 border-red-500 text-red-500 max-w-sm w-full">
          Incorrect email or password.
        </div>
      )}
      <div className="flex flex-col gap-6 p-6 border bg-stone-100 border-stone-700 max-w-sm w-full">
        <h1 className="text-4xl font-normal font-title tracking-tight text-stone-700">
          SlipBox
        </h1>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium leading-6 text-stone-700">
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
                className="block w-full p-2 bg-stone-100 text-stone-700 border border-stone-700 placeholder:text-stone-500 focus:border-orange-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium leading-6 text-stone-700">
                Password
              </label>
              <Button styleType="link">Forgot password?</Button>
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={onChange}
                required
                className="block w-full p-2 bg-stone-100 text-stone-700 border border-stone-700 placeholder:text-stone-500 focus:border-orange-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button
              disabled={logInLoading}
              type="submit"
              width="full"
              size="large"
            >
              {logInLoading ? "Loading..." : "Log in"}
            </Button>
          </div>
        </form>

        <div className="flex justify-center items-baseline">
          <p className="text-sm text-stone-700">New to SlipBox?&nbsp;</p>
          <Button styleType="link" size="small">
            Create an account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
