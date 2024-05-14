export const isTeacher = (userId?: string | null) => {
  const admins = process.env.NEXT_PUBLIC_TEACHER_IDS?.split(',');
  return admins?.includes(userId ?? '');
}