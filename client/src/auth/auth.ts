// auth.ts
export const checkUserAuthentication = (): boolean => {
    const username = sessionStorage.getItem('username');
    return !!username;
  };
  
  export const login = (username: string): void => {
    sessionStorage.setItem('username', username);
  };
  
  export const signup = (username: string): void => {
    sessionStorage.setItem('username', username);
  };

  export const logout = (): void => {
    sessionStorage.removeItem('username');
    window.location.href = '/';
  };