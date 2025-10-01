// Сервис для работы с данными через LocalStorage
class DatabaseService {
  constructor() {
    this.USERS_KEY = 'app_users';
    this.ACCOUNTS_KEY = 'user_accounts';
  }

  // Инициализация базы данных
  async init() {
    try {
      // Создаем тестовые данные если их нет
      this.seedData();
      console.log('База данных инициализирована успешно');
    } catch (error) {
      console.error('Ошибка инициализации базы данных:', error);
      throw error;
    }
  }

  // Добавление начальных данных
  seedData() {
    // Проверяем есть ли главный админ
    const accounts = this.getAccounts();
    const adminExists = accounts.find(account => account.username === 'admin');

    if (!adminExists) {
      // Создаем главного админа
      const masterAdmin = {
        id: 1,
        username: 'admin',
        password: 'gunkoloh483',
        firstName: 'Главный',
        lastName: 'Админ',
        email: 'wouldress@gmail.com',
        role: 'master_admin',
        created_at: new Date().toISOString()
      };

      accounts.push(masterAdmin);
      localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
      console.log('Главный админ создан');
    }
  }

  // Методы для работы с пользователями системы

  // Получить всех пользователей системы
  getAllAppUsers() {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Добавить пользователя системы
  addAppUser(userData) {
    const users = this.getAllAppUsers();
    const newUser = {
      id: Date.now(), // Используем timestamp как ID
      ...userData,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return newUser.id;
  }

  // Обновить пользователя системы
  updateAppUser(id, userData) {
    const users = this.getAllAppUsers();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      return true;
    }
    return false;
  }

  // Удалить пользователя системы
  deleteAppUser(id) {
    const users = this.getAllAppUsers();
    const filteredUsers = users.filter(user => user.id !== id);

    if (filteredUsers.length < users.length) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(filteredUsers));
      return true;
    }
    return false;
  }

  // Методы для работы с учетными записями

  // Получить все аккаунты
  getAccounts() {
    const accounts = localStorage.getItem(this.ACCOUNTS_KEY);
    return accounts ? JSON.parse(accounts) : [];
  }

  // Проверить учетные данные пользователя
  authenticateUser(username, password) {
    const accounts = this.getAccounts();
    return accounts.find(account =>
      account.username === username && account.password === password
    ) || null;
  }

  // Добавить нового пользователя (регистрация)
  registerUser(userData) {
    const accounts = this.getAccounts();

    // Проверяем, существует ли пользователь с таким username
    const existingUser = accounts.find(account => account.username === userData.username);
    if (existingUser) {
      throw new Error('Пользователь с таким именем уже существует');
    }

    // Создаем нового пользователя
    const newUser = {
      id: Date.now(),
      username: userData.username,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role || 'user'
    };

    // Добавляем в список аккаунтов
    accounts.push(newUser);
    localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));

    return newUser.id;
  }

  // Очистить все данные (для тестирования)
  clearAllData() {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.ACCOUNTS_KEY);
  }
}

// Создаем экземпляр сервиса базы данных
const databaseService = new DatabaseService();

export default databaseService;