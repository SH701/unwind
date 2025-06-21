'use server';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

export async function editTweet(formData: FormData) {
  const rawTweet = formData.get('tweet');
  if (typeof rawTweet !== 'string') {
    throw new Error('Tweet must be a string');
  }
  const newText = rawTweet;

  const rawId = formData.get('id');
  if (typeof rawId !== 'string') {
    throw new Error('Invalid tweet ID');
  }
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    throw new Error('Invalid tweet ID123');
  }

  
  await db.tweet.update({
    where: { id },
    data: { tweet: newText },
  });
  redirect(`/tweet/${id}`)
}

export async function getTweet(id: number) {
  const post = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      tweet:true,
      id: true,
    },
  });
  return post;
}
