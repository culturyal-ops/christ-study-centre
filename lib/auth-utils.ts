import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export async function requireAuth(allowedRoles?: string[]) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }
  
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    // Redirect based on their actual role
    if (session.user.role === 'ADMIN') {
      redirect('/admin/dashboard')
    } else if (session.user.role === 'STUDENT') {
      redirect('/student/dashboard')
    } else {
      redirect('/')
    }
  }
  
  return session
}
