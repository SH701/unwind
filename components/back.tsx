'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface Props{
    className?:string
}

export default function Back({className}:Props) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={`${className} py-2 cursor-pointer`} >
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
}
