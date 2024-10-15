/* eslint-disable @typescript-eslint/no-explicit-any */
export function TextField({
  name,
  label,
  placeholder,
  register,
}: {
  name: string;
  label: string;
  placeholder: string;
  register?: any;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
          <input
            {...register(name)}
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent py-1.5 pl-3 text-white focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}

export default TextField;
