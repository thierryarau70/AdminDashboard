export function useAuth() {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
  const isAdmin = user?.role === 'admin'
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true'
  return { user, isAdmin, isLoggedIn }
}
