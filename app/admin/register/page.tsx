import RegisterApp from '@/components/register/RegisterApp'
import { getRegisterBootstrap } from '@/lib/actions/register'
import { resolveRegisterView } from '@/lib/register/utils'
import type { RegisterView } from '@/lib/register/constants'

export default async function AdminRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; batch?: string }>
}) {
  const params = await searchParams
  const bootstrap = await getRegisterBootstrap()
  const initialView: RegisterView | undefined = resolveRegisterView(
    params.view,
    params.batch
  )

  return (
    <RegisterApp bootstrap={bootstrap} mode="admin" initialView={initialView} />
  )
}
