// Helper Utility untuk manajemen localStorage AdopKucing (Demo Storage)

const KEYS = {
  USERS: 'adopKucing_users',
  CURRENT_USER: 'adopKucing_currentUser',
  REPORTS: 'adopKucing_reports',
  DONATIONS: 'adopKucing_donations',
  ADOPTIONS: 'adoption_submissions' // kunci aplikasi adopsi
}

// User & Auth Storage
export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]')
  } catch (e) {
    return []
  }
}

export const saveUser = (user) => {
  const users = getUsers()
  const existingIndex = users.findIndex(u => u.email === user.email)
  if (existingIndex > -1) {
    users[existingIndex] = { ...users[existingIndex], ...user }
  } else {
    users.push(user)
  }
  localStorage.setItem(KEYS.USERS, JSON.stringify(users))
}

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem(KEYS.CURRENT_USER)
    if (userStr) return JSON.parse(userStr)
    // fallback legacy user key jika ada
    const legacyUser = localStorage.getItem('user')
    if (legacyUser) return JSON.parse(legacyUser)
  } catch (e) {
    // fallback
  }
  return null
}

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isLoggedIn', 'true')
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER)
    localStorage.removeItem('user')
    localStorage.setItem('isLoggedIn', 'false')
  }
  window.dispatchEvent(new Event('login-state-changed'))
}

export const logoutUser = () => {
  setCurrentUser(null)
}

// Reports Storage
export const getReports = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.REPORTS) || '[]')
  } catch (e) {
    return []
  }
}

export const saveReport = (report) => {
  const reports = getReports()
  reports.unshift(report)
  localStorage.setItem(KEYS.REPORTS, JSON.stringify(reports))
}

// Donations Storage
export const getDonations = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.DONATIONS) || '[]')
  } catch (e) {
    return []
  }
}

export const saveDonation = (donation) => {
  const donations = getDonations()
  donations.unshift(donation)
  localStorage.setItem(KEYS.DONATIONS, JSON.stringify(donations))
}

// Adoption Submissions Storage
export const getAdoptions = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.ADOPTIONS) || '[]')
  } catch (e) {
    return []
  }
}

export default {
  getUsers,
  saveUser,
  getCurrentUser,
  setCurrentUser,
  logoutUser,
  getReports,
  saveReport,
  getDonations,
  saveDonation,
  getAdoptions
}
