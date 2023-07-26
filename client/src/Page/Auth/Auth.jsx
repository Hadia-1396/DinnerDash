import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./style.css";

const Auth = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [login, setLogin] = useState(true);

  const submit = (values) => {
    if (login) {
      axios
        .post(process.env.REACT_APP_BASE_URL + `auth/signin/${role}`, values)
        .then((response) => {
          localStorage.setItem("id", response.data.existingUser._id);
          localStorage.setItem("name", response.data.existingUser.name);
          localStorage.setItem("role", response.data.existingUser.role);
          localStorage.setItem("token", response.data.token);
          if (role === "customer") {
            navigate("/");
          } else {
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setPasswordError(error.response.data.message);
          } else {
            setPasswordError("");
          }
          if (error.response.status === 404) {
            setEmailError(error.response.data.message);
          } else {
            setEmailError("");
          }
        });
    } else {
      axios
        .post(process.env.REACT_APP_BASE_URL + "auth/signup", {
          ...values,
          role,
        })
        .then((response) => console.log(response))
        .catch((error) => {
          if (error.response.status === 402) {
            setPasswordError(error.response.data.message);
          } else {
            setPasswordError("");
          }
          if (error.response.status === 401) {
            setEmailError(error.response.data.message);
          } else {
            setEmailError("");
          }
        });
    }
  };

  return (
    <div className="login-background">
      <div className="inner-div row">
        <div className="col-7 left-side text-center">
          <h1 className="side-text">Welcome to webiste</h1>
          <p className="side-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
            animi ea cum est obcaecati doloremque deleniti deserunt
            voluptatibus, itaque magnam placeat totam quam corrupti. Voluptas
            neque atque maiores doloribus natus?
          </p>
        </div>
        <div className="col-5">
          {login ? (
            <form className="login-form" onSubmit={handleSubmit(submit)}>
              <h1 className="mb-5">Sign In</h1>
              <span>Please enter your login information or &nbsp;</span>
              <Link
                to={{ pathname: `/auth/${role}` }}
                onClick={() => setLogin(false)}
              >
                Click here
              </Link>
              <span>&nbsp; to registration</span> <br />
              <input
                type="email"
                placeholder="Email"
                className="mt-5 text-fields"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.email && errors.email.message}
                {!errors.email && emailError}
              </p>
              <input
                type="password"
                placeholder="Password"
                className="mt-2 text-fields"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.password && errors.password.message}
                {!errors.password && passwordError}
              </p>
              <button type="submit" className="mt-1 login-button">
                Sign In
              </button>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleSubmit(submit)}>
              <h1 className="mb-5">Sign Up</h1>
              <span>Please enter your information or &nbsp;</span>
              <Link
                to={{ pathname: `/auth/${role}` }}
                onClick={() => setLogin(true)}
              >
                Click here
              </Link>
              <span>&nbsp; if you already have an account</span> <br />
              <input
                type="text"
                placeholder="Name"
                className="mt-4 text-fields"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.name && errors.name.message}
              </p>
              <input
                type="text"
                placeholder="Display Name"
                className="mt-2 text-fields"
                {...register("displayName", {
                  validate: {
                    range: (v) =>
                      (v.length > 2 && v.length < 32) ||
                      v.length == 0 ||
                      "Display name should be more than 2 characters and less than 32 characters",
                  },
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.displayName && errors.displayName.message}
              </p>
              <input
                type="email"
                placeholder="Email"
                className="mt-2 text-fields"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.email && errors.email.message}
                {!errors.email && emailError}
              </p>
              <input
                type="password"
                placeholder="Password"
                className="mt-2 text-fields"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.password && errors.password.message}
              </p>
              <input
                type="password"
                placeholder="Confirm Password"
                className="mt-2 text-fields"
                {...register("confirmPassword", {
                  required: "Confirm Password  is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.confirmPassword && errors.confirmPassword.message}
                {!errors.confirmPassword && passwordError}
              </p>
              <button type="submit" className="mt-1 login-button">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
