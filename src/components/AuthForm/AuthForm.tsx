import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "@features/auth/auth-api";
import Button from "@components/Button";
import { useNavigate } from "react-router-dom";

interface IAuthValues {
  username: string;
  email: string;
  password: string;
}

const AuthForm = () => {
  const [isFormLogin, setIsFormLogin] = useState(true);
  const navigate = useNavigate();

  const [registerTrigger] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthValues>();

  const handleRegister = async (credentials: IAuthValues) => {
    try {
      const res = await registerTrigger(credentials);
      if (!res.error) {
        navigate("/email");
        const { username, password } = credentials;

        localStorage.setItem(
          "userCredentials",
          JSON.stringify({ username, password })
        );
      }
    } catch (e) {
      console.error("Register error:", e);
    }
  };

  const handleLogIn = (credentials: IAuthValues) => {
    const expectedCredentials = localStorage.getItem("userCredentials");

    if (JSON.stringify(credentials) === expectedCredentials) {
      navigate("/email");
    }
  };

  const onSubmit: SubmitHandler<IAuthValues> = async (data) => {
    if (isFormLogin) {
      handleLogIn(data);
    } else {
      handleRegister(data);
    }

    reset();
  };

  return (
    <div className="w-[280px] md:w-[340px] p-6 rounded-lg bg-gradient-to-br bg-[#2e2e2e] shadow-md">
      <div className="flex gap-3 mb-4">
        <Button
          className={`font-medium transition-colors duration-200 rounded-2xl ${
            !isFormLogin
              ? "bg-[#4308d7] text-white"
              : "bg-white hover:bg-[#909dff]"
          }`}
          onClick={() => {
            setIsFormLogin(false);
          }}
        >
          Sign up
        </Button>
        <Button
          className={`font-medium transition-colors duration-200 rounded-2xl ${
            isFormLogin
              ? "bg-[#4308d7] text-white"
              : "bg-white hover:bg-[#909dff]"
          }`}
          onClick={() => {
            setIsFormLogin(true);
          }}
        >
          Log in
        </Button>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {!isFormLogin && (
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              className="bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            className="bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            id="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username must contain at least 4 characters",
              },
            })}
          />
          {errors.username && (
            <span className="text-red-600 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            className="bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-600 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-[#5318e7] text-white py-2 rounded-lg hover:bg-[#4308d7] transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
