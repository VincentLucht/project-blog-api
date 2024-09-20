import { FormEvent, useState } from 'react';
import { useAuthContext } from '../useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import ShowFormError from './ShowFormError';
import { LoginInput } from '../../header/login/LoginInput';
import { createUser } from './createUser';

import { toast } from 'react-toastify';
import { handleLogin } from '../../header/login/handleLogin';
import { ValidationError } from '../../header/login/Login';

function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'BASIC' | 'AUTHOR'>('BASIC');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (role === 'AUTHOR') setRole('BASIC');
    else setRole('AUTHOR');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createUser(name, password, confirmPassword, role);
      // login using token
      const response = await handleLogin(name, password);
      login(response.token);
      toast.success('Successfully created an account and logged in.');
      navigate('/');
    } catch (error) {
      const validationError = error as { errors: ValidationError[] };

      const newErrors: { [key: string]: string } = {};
      validationError.errors.forEach((err) => {
        if (err.path) {
          newErrors[err.path] = err.msg;
        }
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="df calc-h-vw-1">
      <div className="flex-col rounded-xl border px-10 pb-12 pt-6 df">
        <h2 className="mb-6 h2">Sign Up</h2>

        <form onSubmit={onSubmit} className="flex-col gap-8 df">
          {/* Name */}
          <LoginInput
            value={name}
            setValue={setName}
            imgPath="user"
            type="text"
            placeholder="Name"
            errors={errors}
          />
          <ShowFormError error={errors.name} />

          {/* Password */}
          <LoginInput
            value={password}
            setValue={setPassword}
            imgPath="lock"
            type="password"
            placeholder="Password"
            errors={{ name: errors.password }}
          />
          <ShowFormError error={errors.password} />

          {/* Confirm Password */}
          <LoginInput
            value={confirmPassword}
            setValue={setConfirmPassword}
            imgPath="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            errors={{ name: errors.confirm_password }}
          />
          <ShowFormError error={errors.confirm_password} />

          {/* Role */}
          <div className="gap-4 df">
            <div className="text-lg font-semibold">
              {role === 'BASIC' ? 'Reader' : 'Author'}
            </div>

            <div
              className={`flex h-8 w-14 cursor-pointer items-center rounded-full p-1 ${
                role === 'BASIC' ? 'bg-gray-300' : 'bg-green-400' }`}
              onClick={handleToggle}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300
                  ease-in-out ${role === 'AUTHOR' ? 'translate-x-6' : ''}`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-3xl border bg-white px-5 py-3 font-bold text-black transition-colors
              duration-150 clamp-sm hover:bg-gray-100 active:bg-gray-200"
          >
            Sign up
          </button>

          <div className="gap-1 df">
            Already have an account?
            <span className="font-bold hover:underline">
              <Link to="/login">Log In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
