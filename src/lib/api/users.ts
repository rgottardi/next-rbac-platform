import { createClient } from "@/lib/supabase/server"
import { logger } from "@/lib/logger"

export type User = {
  id: string
  email: string
  role: string
  status: 'active' | 'inactive'
  created_at: string
  last_sign_in_at: string | null
}

export async function getUsers(): Promise<User[]> {
  const supabase = createClient()

  try {
    const { data: users, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      logger.error({ error }, 'Error fetching users')
      throw error
    }

    return users
  } catch (error) {
    logger.error({ error }, 'Error in getUsers')
    return []
  }
}

export async function createUser({
  email,
  password,
  role = 'user'
}: {
  email: string
  password: string
  role?: string
}) {
  const supabase = createClient()

  try {
    const { data: authUser, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (signUpError) throw signUpError

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authUser.user.id,
          email: authUser.user.email,
          role,
          status: 'active'
        }
      ])

    if (profileError) throw profileError

    return { success: true }
  } catch (error) {
    logger.error({ error }, 'Error creating user')
    throw error
  }
}

export async function updateUser(
  userId: string,
  data: Partial<Pick<User, 'role' | 'status'>>
) {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    logger.error({ error }, 'Error updating user')
    throw error
  }
}

export async function deleteUser(userId: string) {
  const supabase = createClient()

  try {
    // Delete from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId)
    if (authError) throw authError

    // Delete profile
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId)

    if (profileError) throw profileError

    return { success: true }
  } catch (error) {
    logger.error({ error }, 'Error deleting user')
    throw error
  }
}