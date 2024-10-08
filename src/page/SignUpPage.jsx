import React, { useReducer } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  inputName: '',
  accountName: '',
  inputEmail: '',
  inputPassword: '',
  nameAlert: '',
  accountAlert: '',
  emailAlert: '',
  passwordAlert: '',
  errorMessage: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ALERT':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.value };
    default:
      return state;
  }
}

function SignUpPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    inputName,
    accountName,
    inputEmail,
    inputPassword,
    nameAlert,
    accountAlert,
    emailAlert,
    passwordAlert,
    errorMessage,
  } = state;
  const urlUsers = 'https://67038621bd7c8c1ccd41c412.mockapi.io/users';
  const navigate = useNavigate();

  function handleSignUp() {
    let valid = true;

    if (inputName === '') {
      valid = false;
      dispatch({ type: 'SET_ALERT', field: 'nameAlert', value: 'border-red-400' });
    } else {
      dispatch({ type: 'SET_ALERT', field: 'nameAlert', value: '' });
    }

    if (accountName === '') {
      valid = false;
      dispatch({ type: 'SET_ALERT', field: 'accountAlert', value: 'border-red-400' });
    } else {
      dispatch({ type: 'SET_ALERT', field: 'accountAlert', value: '' });
    }

    if (inputEmail === '') {
      valid = false;
      dispatch({ type: 'SET_ALERT', field: 'emailAlert', value: 'border-red-400' });
    } else if (!/\S+@\S+\.\S+/.test(inputEmail)) {
      valid = false;
      dispatch({ type: 'SET_ALERT', field: 'emailAlert', value: 'border-red-400' });
    } else {
      dispatch({ type: 'SET_ALERT', field: 'emailAlert', value: '' });
    }

    if (inputPassword.length < 5) {
      valid = false;
      dispatch({ type: 'SET_ALERT', field: 'passwordAlert', value: 'border-red-400' });
    } else {
      dispatch({ type: 'SET_ALERT', field: 'passwordAlert', value: '' });
    }

    if (valid) {
      axios
        .post(urlUsers, {
          userName: inputName,
          accountName,
          email: inputEmail,
          password: inputPassword,
          posts: [],
          following: [],
          followers: [],
          avatar: '',
          repostedPosts: [],
          likedPosts: [],
        })
        .then(() => {
          dispatch({ type: 'SET_FIELD', field: 'inputName', value: '' });
          dispatch({ type: 'SET_FIELD', field: 'accountName', value: '' });
          dispatch({ type: 'SET_FIELD', field: 'inputEmail', value: '' });
          dispatch({ type: 'SET_FIELD', field: 'inputPassword', value: '' });
          navigate('../login');
        })
        .catch(() => {
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            value: 'An error occurred while signing up. Please try again later.',
          });
        });
    }
  }

  return (
    <div className="container">
      <div className="flex justify-center items-center min-h-screen text-center gap-5">
        <div className="w-[40%] max-md:hidden flex flex-row-reverse">
          <svg
            className="w-[60%]"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 462.799"
          >
            <path
              fillRule="nonzero"
              d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
            />
          </svg>
        </div>
        <div className="w-[50%] max-md:w-full flex flex-col items-center">
          <svg
            className="w-10 mb-2"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 462.799"
          >
            <path
              fillRule="nonzero"
              d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Create your account</h1>
          {errorMessage && (
            <div className="text-red-400 mb-4">{errorMessage}</div>
          )}
          <form className="w-full max-w-sm text-left">
            <div className="mb-4">
              <label
                className="mx-2 block text-dim-100 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'inputName', value: e.target.value })
                }
                className={`peer w-full bg-transparent outline-none text-base py-3 px-4 rounded-md border-2 ${
                  nameAlert === '' ? `border-dim-200` : nameAlert
                } focus:border-[#4070f4] focus:shadow-md`}
                id="name"
                type="text"
                placeholder="Your Name"
                value={inputName}
              />
            </div>
            <div className="mb-4">
              <label
                className="mx-2 block text-dim-100 text-sm font-bold mb-2"
                htmlFor="accountName"
              >
                Account Name
              </label>
              <input
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'accountName', value: e.target.value })
                }
                className={`peer w-full bg-transparent outline-none text-base py-3 px-4 rounded-md border-2 ${
                  accountAlert === '' ? `border-dim-200` : accountAlert
                } focus:border-[#4070f4] focus:shadow-md`}
                id="accountName"
                type="text"
                placeholder="Your Account Name"
                value={accountName}
              />
            </div>
            <div className="mb-4">
              <label
                className="mx-2 block text-dim-100 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'inputEmail', value: e.target.value })
                }
                className={`peer w-full bg-transparent outline-none text-base py-3 px-4 rounded-md border-2 ${
                  emailAlert === '' ? `border-dim-200` : emailAlert
                } focus:border-[#4070f4] focus:shadow-md`}
                id="email"
                type="email"
                placeholder="Your Email"
                value={inputEmail}
              />
            </div>
            <div className="mb-4">
              <label
                className="mx-2 block text-dim-100 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'inputPassword', value: e.target.value })
                }
                className={`peer w-full bg-transparent outline-none text-base py-3 px-4 rounded-md border-2 ${
                  passwordAlert === '' ? `border-dim-200` : passwordAlert
                } focus:border-[#4070f4] focus:shadow-md`}
                id="password"
                type="password"
                placeholder="Your Password"
                value={inputPassword}
              />
            </div>
            <p>
              Do you have an account?{' '}
              <Link to={'./login'} className="text-dim-100">
                Login
              </Link>
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSignUp();
                }}
                className="bg-blue-400 w-48 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
