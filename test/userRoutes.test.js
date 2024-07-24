const request = require('supertest');
const app = require('../src/app'); // Caminho para seu arquivo app.js
const sequelize = require('../src/config/database');

beforeAll(async () => {
    await sequelize.sync({ force: true }); // force: true irá descartar as tabelas e recriá-las
  });
  
describe('User Registration', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/users/register')
        .send({
          username: 'testuser',
          password: 'password123',
          email: 'test@example.com'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('userId');
    });
  });

  afterAll(async () => {
    await sequelize.close(); // Fecha a conexão com o banco de dados
  });