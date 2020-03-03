export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = ({id, email}) => ({
  type: LOGIN,
  id,
  email,
});

export const logout = () => ({type: LOGOUT});
