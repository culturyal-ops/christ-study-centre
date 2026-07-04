import AdminDashboardView from '@/components/admin/AdminDashboardView'
import { getAdminDashboardData } from '@/lib/actions/register'

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData()

  return <AdminDashboardView data={data} />
}
