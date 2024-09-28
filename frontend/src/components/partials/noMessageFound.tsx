interface NoMessageFoundProps {
  message: string;
  secondMessage?: string;
}

function NoMessageFound({ message, secondMessage }: NoMessageFoundProps) {
  return (
    <div className="flex-col df">
      <div className="mt-10 text-lg font-semibold">{message}</div>

      {secondMessage && (
        <div className="mt-10 text-lg font-semibold">{secondMessage}</div>
      )}

      <img
        className="w-96"
        src="./catNothingFound.gif"
        alt="gif of a cat poking a knitting ball"
      />
    </div>
  );
}

export default NoMessageFound;
