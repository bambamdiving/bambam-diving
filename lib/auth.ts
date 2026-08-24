import { cookies } from "next/headers";

export async function isAdminAuthed() {
  const cookieStore = await cookies();
  return (
    cookieStore.get("bambam_admin")?.value === process.env.ADMIN_PASSWORD &&
    Boolean(process.env.ADMIN_PASSWORD)
  );
}
