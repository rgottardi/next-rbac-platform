import { createClient } from './supabase/server'

export async function getCurrentUser() {
  const supabase = createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}