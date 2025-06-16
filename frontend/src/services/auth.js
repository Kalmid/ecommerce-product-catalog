

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export function getUserRole() {
  return localStorage.getItem('role');
}

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};




