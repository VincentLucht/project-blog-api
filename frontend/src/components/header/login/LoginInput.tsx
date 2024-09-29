import { Dispatch, SetStateAction } from 'react';

interface LoginInputProps {
  value: string;
  placeholder: string;
  type?: string;
  imgPath: string;
  setValue: Dispatch<SetStateAction<string>>;
  errors: { name?: string | undefined };
}

export function LoginInput({
  value,
  placeholder,
  imgPath,
  type = 'text',
  setValue,
  errors,
}: LoginInputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`rounded-3xl border-2 px-5 py-3 pr-11 clamp-sm ${
          errors.name
            ? 'border-red-500'
            : 'border-transparent hover:border-white focus:border-transparent'
        }`}
      />

      <img
        src={`${imgPath}.svg`}
        alt={`${imgPath} logo`}
        className="pointer-events-none right-5 w-6 center-vertical"
      />
    </div>
  );
}
