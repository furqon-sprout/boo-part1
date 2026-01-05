const request = require('supertest');
const express = require('express');
const Profile = require('../models/Profile');
const profileRouter = require('../routes/profile');

jest.mock('../models/Profile');

describe('Profile Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.set('view engine', 'ejs');
    app.use('/', profileRouter());
    jest.clearAllMocks();
  });

  describe('GET /create', () => {
    it('should render create_profile view', async () => {
      const response = await request(app).get('/create');
      expect(response.status).toBe(200);
    });
  });

  describe('POST /profiles', () => {
    it('should create a new profile and redirect to /', async () => {
      const mockProfile = {
        name: 'Test Profile',
        description: 'Test Description',
        mbti: 'INTJ',
        enneagram: '1w2',
        variant: 'sp/so',
        tritype: 135,
        socionics: 'LIE',
        sloan: 'RCOEI',
        psyche: 'FVEL',
        image: 'https://example.com/image.jpg',
        save: jest.fn().mockResolvedValue({}),
      };

      Profile.mockImplementation(() => mockProfile);

      const response = await request(app)
        .post('/profiles')
        .send({
          name: 'Test Profile',
          description: 'Test Description',
          mbti: 'INTJ',
          enneagram: '1w2',
          variant: 'sp/so',
          tritype: 135,
          socionics: 'LIE',
          sloan: 'RCOEI',
          psyche: 'FVEL',
          image: 'https://example.com/image.jpg',
        });

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe('/');
      expect(mockProfile.save).toHaveBeenCalled();
    });

    it('should handle profile creation errors', async () => {
      const mockError = new Error('Database error');
      Profile.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(mockError),
      }));

      const response = await request(app)
        .post('/profiles')
        .send({
          name: 'Test Profile',
          description: 'Test Description',
          mbti: 'INTJ',
          enneagram: '1w2',
          variant: 'sp/so',
          tritype: 135,
          socionics: 'LIE',
          sloan: 'RCOEI',
          psyche: 'FVEL',
          image: 'https://example.com/image.jpg',
        });

      expect(response.status).toBe(500);
    });
  });

  describe('GET /*', () => {
    it('should render profile_template with first profile', async () => {
      const mockProfiles = [
        {
          name: 'A Martinez',
          description: 'Adolph Larrue Martinez III.',
          mbti: 'ISFJ',
          enneagram: '9w3',
          variant: 'sp/so',
          tritype: 725,
          socionics: 'SEE',
          sloan: 'RCOEN',
          psyche: 'FEVL',
          image: 'https://soulverse.boo.world/images/1.png',
        },
      ];

      Profile.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockProfiles),
        }),
      });

      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });

    it('should return default profiles if database is empty', async () => {
      Profile.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([]),
        }),
      });

      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });
});