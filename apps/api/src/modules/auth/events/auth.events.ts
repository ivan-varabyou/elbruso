export interface AuthEvents {
  'user.registered': { userId: string; email: string };
  'user.loggedin': { userId: string };
  'user.password.reset': { userId: string };
}
