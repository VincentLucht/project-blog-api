function ConnectionError() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/cat503.webp" alt="" className="mb-4 w-full max-w-[684px]" />

      <h1 className="mb-4 text-4xl font-bold text-white">503 - Service Unavailable</h1>
      <p className="text-lg text-gray-300">
        <span className="mb-2 block">
          Oops! It seems there&apos;s a problem with the connection.
        </span>
        Please try refreshing the page or check your internet connection.
      </p>
    </div>
  );
}

export default ConnectionError;
