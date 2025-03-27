"use client";

import { Input } from "@/components/ui/input";

const InputField = ({ label, type, register, error, placeholder }) => {
  return (
    <div className="space-y-0.5">
      <div className="space-y-1.5 flex flex-col">
        <label className=" text-base font-medium">{label}</label>
        <Input
          className="px-2 border border-gray-500"
          placeholder={placeholder}
          type={type}
          {...register}
        />
      </div>
      {error && <p className="text-red-400 text-xs">{error.message}</p>}
    </div>
  );
};

export default InputField;
