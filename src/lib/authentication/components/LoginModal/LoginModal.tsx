import { useState, type FormEvent } from "react";
import { useAuthentication } from "src/lib/authentication/hooks/useAuthentication";

type FormData = {
  email: string;
  password: string;
};

const LoginModal = (): JSX.Element => {
  const { login, logInLoading, logInError } = useAuthentication();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  //TODO: { name: string; value: string } }
  const onChange = (e: FormEvent) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    await login(formData.email, formData.password);
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen w-screen bg-stone-100">
      {!!logInError && (
        <div className="p-6 border border-red-500 text-red-500 max-w-sm w-full">
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
                className="block w-full p-2 bg-stone-100 text-stone-700 border border-stone-700 placeholder:text-stone-300 focus:border-orange-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-6 text-stone-700">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="text-orange-500 hover:text-orange-700">
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={onChange}
                required
                className="block w-full p-2 bg-stone-100 text-stone-700 border border-stone-700 placeholder:text-stone-300 focus:border-orange-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button // TODO: use button component
              disabled={logInLoading}
              type="submit"
              className="flex w-full justify-center bg-stone-700 p-2 text-sm font-semibold leading-6 text-stone-100 hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              {logInLoading ? "Loading..." : "Log in"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-stone-700">
          New to SlipBox?
          <a
            href="#"
            className="ml-1 leading-6 text-orange-500 hover:text-orange-700"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export { LoginModal };
