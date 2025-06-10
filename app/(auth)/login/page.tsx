"use client";

import { useActionState } from "react";
import { FormState, LoginForm } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";
import Link from "next/link";
import { Email, Password } from "@/components/icon";

export default function Login() {
  const [state, action] = useActionState<FormState, FormData>(LoginForm, {
    fieldErrors: {},
    success: false,
  });

  return (
    <div className="min-h-screen w-full px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10">Moments</h1>
      <form
        action={action}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          errors={state.fieldErrors?.email?.[0]}
          icon={<Email/>}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          errors={state.fieldErrors?.password?.[0]}
          icon={<Password/>}
        />
        <Button text="로그인" />
      </form>
      <div className="mt-6 text-sm text-gray-700">
        아직 계정이 없나요?{" "}
        <Link href="/create-account" className="text-sky-700 hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
}
