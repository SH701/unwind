"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { updateProfile } from "@/app/(me)/profile/edit/actions";
import UserIcon from "./icon";
import DeletePhoto from "./deletephoto";


interface EditFormProps {
  initialUsername: string;
  initialAvatar: string | null;
}

export default function EditForm({initialUsername,initialAvatar}: EditFormProps) {
  const [username, setUsername] = useState(initialUsername);
  const [preview, setPreview] = useState<string | null>(initialAvatar);
  const { pending } = useFormStatus();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <form
      action={updateProfile}
      className="space-y-4"
    >
      <div className="flex flex-col items-center gap-2">
        <input
          id="avatar-input"
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="avatar-input"
          className="cursor-pointer"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Avatar Preview"
              width={96}
              height={96}
              className="rounded-full"
            />
          ) : (
            <UserIcon className="w-32 h-32   rounded-full p-2" />
          )}
        </label>
        {preview?(
          <DeletePhoto/> 
        ):null}
      </div>
      <div className="flex flex-col mx-10">
        <label className="block text-md  mb-1">
          닉네임
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded-md bg-white"
          required
        />
      </div>
      <div className="mx-10">
      <button
        type="submit"
        disabled={pending}
        className="w-full btn py-2 rounded-md"
      >
        {pending ? "저장 중..." : "프로필 저장"}
      </button>
      </div>
    </form>
  );
}
