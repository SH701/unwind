"use client";

import Input from "@/components/input";
import { useActionState } from "react";
import { createAccount, FormState } from "./actions";
import Button from "@/components/button";
import { Email, Password, Username } from "@/components/icon";
import Link from "next/link";

export default function CreateAccount() {
  const [state, action] = useActionState<FormState, FormData>(createAccount, {
    fieldErrors: {},
    success: false,
  });

  return (
    <div className="min-h-screen w-full flex items-start justify-center px-6 pt-24">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">환영합니다!</h1>
          <p className="text-sm text-gray-600">간단한 정보를 입력하고 Unwind에 함께하세요.</p>
        </div>
        <form action={action} className="flex flex-col gap-4">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state.fieldErrors?.username?.[0]}
            icon={<Username />}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state.fieldErrors?.email?.[0]}
            icon={<Email />}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={state.fieldErrors?.password?.[0]}
            icon={<Password />}
          />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            errors={state.fieldErrors?.confirm_password?.[0]}
            icon={<Password />}
          />
          <Button text="회원가입" />
        </form>
        <div className="text-md text-gray-700 flex items-center justify-center">
        <span>계정이 이미 존재하나요?</span>
        <Link href="/login" className="text-green-700 font-medium hover:underline pl-2">
          로그인
        </Link>
      </div>
      </div>
    </div>
  );
}
