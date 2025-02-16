import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { Button } from "src/components/Button/Button";
import { Input } from "src/components/Input/Input";
import { useLogin } from "src/models/users/hooks/useLogin";
import { useUser } from "src/models/users/hooks/useUser";

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
    <div className="flex flex-col gap-6 justify-center items-center h-screen w-screen bg-stone-100">
      {!!loginError && (
        <div className="p-6 border border-red-500 rounded-lg bg-red-100 text-red-500 max-w-sm w-full">
          Incorrect email or password.
        </div>
      )}
      <div className="flex flex-col gap-6 p-6 border bg-white border-stone-300 rounded-lg max-w-sm w-full drop-shadow">
        <h1 className="text-4xl font-normal font-title tracking-tight ">
          SlipStream
        </h1>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium leading-6 ">Email</label>
            <div>
              <Input
                onChange={onChange}
                id="email"
                type="email"
                value={formData.email}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium leading-6 ">Password</label>
              {/*<Button styleType="link">Forgot password?</Button>*/}
            </div>
            <div>
              <Input
                onChange={onChange}
                id="password"
                type="password"
                value={formData.password}
                required
              />
            </div>
          </div>

          <div>
            <Button disabled={loginLoading} type="submit">
              {loginLoading ? "Loading..." : "Log in"}
            </Button>
          </div>

          <div className="flex items-baseline">
            <p className="text-sm">New to SlipStream?&nbsp;</p>
            <Button
              variant="link"
              onClick={() => {
                navigate({ to: "/signup" });
              }}
            >
              Create an account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
