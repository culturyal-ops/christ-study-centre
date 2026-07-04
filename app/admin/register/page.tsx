import RegisterApp from '@/components/register/RegisterApp'
import { getRegisterBootstrap } from '@/lib/actions/register'
import { requireAuth } from '@/lib/auth-utils'

export default async function AdminRegisterPage() {
  await requireAuth(['ADMIN'])
  const bootstrap = await getRegisterBootstrap()

  return <RegisterApp bootstrap={bootstrap} mode="admin" />
}
