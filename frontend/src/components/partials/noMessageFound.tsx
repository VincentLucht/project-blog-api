function NoMessageFound({ message }: { message: string }) {
  return (
    <div className="flex-col df">
      <div className="mt-10 text-lg font-semibold">{message}</div>
      <img
        className="w-96"
        src="./catNothingFound.gif"
        alt="gif of a cat poking a knitting ball"
      />
    </div>
  );
}

export default NoMessageFound;
