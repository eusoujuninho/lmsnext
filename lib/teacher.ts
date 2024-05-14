export const isTeacher = (userId?: string | null) => {
  // Verifica se a variável de ambiente está configurada para permitir todos como admins
  if (process.env.NEXT_PUBLIC_ALLOW_ALL_ADMIN === 'true') {
    return true;
  }

  // Continua com a lógica de verificação original se não estiver configurado para permitir todos
  const admins = process.env.NEXT_PUBLIC_TEACHER_IDS?.split(',');
  return admins?.includes(userId ?? '');
}