import { createClient } from './supabase/server'

export async function checkPermission(permission: string, userId: string) {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('user_permissions')
      .select('permissions')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data.permissions.includes(permission)
  } catch (error) {
    console.error('Error checking permission:', error)
    return false
  }
}