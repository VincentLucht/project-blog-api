import { FormEvent, useState, useEffect } from 'react';
import { LoginInput } from './LoginInput';
import { handleLogin } from './handleLogin';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../auth/useAuthContext';

export interface ValidationError {
  type?: string;
  value?: string;
  msg: string;
  message?: string;
  path?: 'name' | 'password';
  location?: 'body';
}

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrors, setShowErrors] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const { login } = useAuthContext();

  // add smooth transitions for errors
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowErrors(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      );
    }, 50);
    return () => clearTimeout(timer);
  }, [errors]);

  // handle form submission
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Handle successful login here
      const token = await handleLogin(name, password);
      login(token.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      // Check if username or pw are wrong
      const loginError = error as Error;
      if (loginError.message === 'Authentication failed') {
        setErrors({ message: 'Incorrect Username or Password' });
      } else {
        // network error
        const validationError = error as { errors: ValidationError[] };
        if (loginError.message === 'Load failed') {
          setErrors({
            message: 'There was a connection error, please try again at a later time',
          });
          return;
        }

        // other errors
        const newErrors: { [key: string]: string } = {};
        validationError.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.msg;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="df calc-h-vw-1">
      <div className="flex-col rounded-xl border px-10 pb-12 pt-6 df">
        <h2 className="mb-6 h2">Login</h2>

        <form onSubmit={onSubmit} className="flex-col gap-8 df clamp-sm">
          {/* Name or pw are wrong */}
          {errors.message && (
            <div
              className={`flex gap-4 rounded bg-red-500 px-5 py-2 text-white transition-opacity duration-300
              ease-in-out clamp-sm
              ${showErrors.message ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <img src="alert.svg" alt="alert icon" className="w-8" />
              <p>{errors.message}</p>
            </div>
          )}

          {/* Name */}
          <LoginInput
            value={name}
            placeholder="Name"
            imgPath="user"
            setValue={setName}
            errors={errors}
          />

          {errors.name && (
            <div
              className={`ml-12 mt-[-20px] text-left text-sm text-red-500 transition-all duration-300 ease-in-out
              clamp-sm ${showErrors.name ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {errors.name}
            </div>
          )}

          {/* Password */}
          <LoginInput
            value={password}
            placeholder="Password"
            imgPath="lock"
            type="password"
            setValue={setPassword}
            errors={errors}
          />

          {errors.password && (
            <div
              className={`ml-12 mt-[-20px] text-left text-sm text-red-500 transition-all duration-300 ease-in-out
              clamp-sm ${showErrors.password ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {errors.password}
            </div>
          )}

          <button
            type="submit"
            className="rounded-3xl border bg-white px-5 py-3 font-bold text-black transition-colors
              duration-150 clamp-sm hover:bg-gray-100 active:bg-gray-200"
          >
            Login
          </button>

          <div className="gap-1 df">
            Don&apos;t have an account?
            <span className="font-bold hover:underline">
              <Link to="/register">Register</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
