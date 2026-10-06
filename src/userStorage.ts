export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  dpUrl: string;
  ludoId: string;
  createdAt: string;
}

const STORAGE_USERS_KEY = 'yallaludo_registered_users_db';
const STORAGE_CURRENT_USER_KEY = 'yallaludo_current_session_user';

// Initial mock database of registered players
const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr_1',
    name: 'Ahmad Khan',
    email: 'ahmad.ludo@gmail.com',
    password: 'password123',
    dpUrl: '/images/emoji-character.png',
    ludoId: '98420182',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'usr_2',
    name: 'Champion Bilal',
    email: 'bilal.gamer@gmail.com',
    password: 'password123',
    dpUrl: '/images/horse-3d-character-2.png',
    ludoId: '87291034',
    createdAt: '2026-02-14T12:00:00Z'
  }
];

export const userStorage = {
  // Get all registered users from localStorage
  getAllUsers(): UserAccount[] {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_USERS;
    }
  },

  // Find user by email
  findByEmail(email: string): UserAccount | undefined {
    const users = this.getAllUsers();
    return users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
  },

  // Register a new user
  register(name: string, email: string, password?: string, dpUrl?: string, ludoId?: string): { success: boolean; error?: string; user?: UserAccount } {
    const trimmedEmail = email.toLowerCase().trim();
    if (!trimmedEmail) return { success: false, error: 'Email address is required' };
    
    if (this.findByEmail(trimmedEmail)) {
      return { success: false, error: 'An account with this email already exists. Please login instead!' };
    }

    const newUser: UserAccount = {
      id: 'usr_' + Date.now(),
      name: name.trim() || 'Ludo Player',
      email: trimmedEmail,
      password: password || '123456',
      dpUrl: dpUrl || '/images/emoji-character.png',
      ludoId: ludoId || Math.floor(10000000 + Math.random() * 90000000).toString(),
      createdAt: new Date().toISOString()
    };

    const users = this.getAllUsers();
    users.push(newUser);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    this.setCurrentSession(newUser);
    return { success: true, user: newUser };
  },

  // Login user with email & password check
  login(email: string, password?: string): { success: boolean; error?: string; user?: UserAccount } {
    const user = this.findByEmail(email);
    if (!user) {
      return { success: false, error: 'No account found with this email. Please register first!' };
    }
    if (password && user.password && user.password !== password) {
      return { success: false, error: 'Invalid password. Please try again or reset password.' };
    }
    this.setCurrentSession(user);
    return { success: true, user };
  },

  // Update profile
  updateUser(updated: Partial<UserAccount> & { id: string }): UserAccount | null {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === updated.id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updated };
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    
    const current = this.getCurrentSession();
    if (current && current.id === updated.id) {
      const updatedCurrent = { ...current, ...updated };
      this.setCurrentSession(updatedCurrent);
    }
    return users[index];
  },

  // Session persistence
  getCurrentSession(): UserAccount | null {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setCurrentSession(user: UserAccount | null) {
    if (!user) {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    } else {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    }
  },

  logout() {
    this.setCurrentSession(null);
  }
};
