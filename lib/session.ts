import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  id: number;
}

export async function getSession() {
  return await getIronSession<SessionData>(await cookies(), {
    cookieName: "tweet",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}

export async function LoginSession(user: SessionData) {
  const session = await getSession();
  session.id = user.id;
  await session.save();
}
