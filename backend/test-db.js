const db = require('./config/db');

(async () => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', ['test@test.com']);
    console.log('Resultado de prueba:', rows);
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
})();
