import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/cat404.webp" alt="" className="mb-4 w-full max-w-[684px]" />

      <h1 className="mb-4 text-4xl font-bold text-white">404 - Page Not Found</h1>
      <p className="text-lg text-gray-300">
        <Link to="/" className="hover:underline">
          Sorry, the page you are looking for does not exist.
          <br />
          <span className="text-sm">(Click here to return)</span>
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
