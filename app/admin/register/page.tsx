import RegisterApp from '@/components/register/RegisterApp'
import { getRegisterBootstrap } from '@/lib/actions/register'

export default async function AdminRegisterPage() {
  const bootstrap = await getRegisterBootstrap()

  return <RegisterApp bootstrap={bootstrap} mode="admin" />
}
