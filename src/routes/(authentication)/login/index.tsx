import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { Button } from "src/components/Button/Button";
import { useLogin } from "src/lib/user/hooks/useLogin";
import { useUser } from "src/lib/user/hooks/useUser";

type FormData = {
  email: string;
  password: string;
};

export const Route = createFileRoute("/(authentication)/login/")({
  component: LoginIndexComponent,
});

function LoginIndexComponent(): JSX.Element {
  const { login, loginLoading, loginError } = useLogin();
  const { user } = useUser();
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

    await login({ email: formData.email, password: formData.password });

    // redirect on successful login
    navigate({ to: "/stream" });
  };

  useEffect(() => {
    user && navigate({ to: "/stream" });
  }, [user, navigate]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen w-screen bg-stone-300">
      {!!loginError && (
        <div className="p-6 border border-red-500 rounded-lg bg-red-100 text-red-500 max-w-sm w-full">
          Incorrect email or password.
        </div>
      )}
      <div className="flex flex-col gap-6 p-6 border bg-stone-100 border-black rounded-lg max-w-sm w-full shadow-light">
        <h1 className="text-4xl font-normal font-title tracking-tight text-black">
          SlipBox
        </h1>
        <form className="space-y-6" onSubmit={onSubmit}>
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
              {/*<Button styleType="link">Forgot password?</Button>*/}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={onChange}
                required
                className="block w-full p-2 bg-white text-black border border-black rounded-full placeholder:text-stone-500 focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <Button disabled={loginLoading} type="submit">
              {loginLoading ? "Loading..." : "Log in"}
            </Button>
          </div>
        </form>

        <div className="flex justify-center items-baseline">
          <p className="text-sm text-black">New to SlipBox?&nbsp;</p>
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              navigate({ to: "/signup" });
            }}
          >
            Create an account
          </Button>
        </div>
      </div>
    </div>
  );
}
