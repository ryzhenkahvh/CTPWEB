//воркаем с данными из localStorage
class DatabaseService {
  constructor() {
    this.USERS_KEY = 'app_users';
    this.ACCOUNTS_KEY = 'user_accounts';
  }

  //инициализируем бд
  async init() {
    try {
      this.seedData();
      //на всякий случай свой логкэт:)))
      console.log('База данных инициализирована успешно');
    } catch (error) {
      console.error('Ошибка инициализации базы данных:', error);
      throw error;
    }
  }

  //исходные данные
  seedData() {
  //НОТ ВОРК!!!
    //суперадм существует?
    const accounts = this.getAccounts();
    const adminExists = accounts.find(account => account.username === 'admin');

    if (!adminExists) {
      //креатим суперадма
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

  //ворк с юзерами

  //получаем юзеров
  getAllAppUsers() {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  //добавляем юзеров
  addAppUser(userData) {
    const users = this.getAllAppUsers();
    const newUser = {
      id: Date.now(), //используем timestamp как ид
      ...userData,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return newUser.id;
  }

  //рефреш юзера
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

  //дел юза
  deleteAppUser(id) {
    const users = this.getAllAppUsers();
    const filteredUsers = users.filter(user => user.id !== id);

    if (filteredUsers.length < users.length) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(filteredUsers));
      return true;
    }
    return false;
  }

  //учётки

  //все акки
  getAccounts() {
    const accounts = localStorage.getItem(this.ACCOUNTS_KEY);
    return accounts ? JSON.parse(accounts) : [];
  }

  //учетка корректна?
  authenticateUser(username, password) {
    const accounts = this.getAccounts();
    return accounts.find(account =>
      account.username === username && account.password === password
    ) || null;
  }

  //рега
  registerUser(userData) {
    const accounts = this.getAccounts();

    //usname занят?
    const existingUser = accounts.find(account => account.username === userData.username);
    if (existingUser) {
      throw new Error('Пользователь с таким именем уже существует');
    }

    //адд нью юз
    const newUser = {
      id: Date.now(),
      username: userData.username,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role || 'user'
    };

    //адд в список
    accounts.push(newUser);
    localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));

    return newUser.id;
  }

  //чистим данные тестов
  clearAllData() {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.ACCOUNTS_KEY);
  }
}

//креатим бд
const databaseService = new DatabaseService();


export default databaseService;
