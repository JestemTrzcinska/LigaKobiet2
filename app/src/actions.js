import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const configWithToken = (token) => {
  const y = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  return y;
};

const getData = async (path, config = {}) => {
  try {
    const res = await axios.get(path, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

const postData = async (path, formData, config = {}) => {
  try {
    const res = await axios.post(path, formData, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

//
// @desc  Get all players
export const getPlayers = async () => {
  return await getData(`http://localhost:3000/api/players`);
};

// @desc  Add player
export const addPlayer = async (formData) => {
  return await getData(`http://localhost:3000/api/players`, formData, config);
};

// @desc  Get player by ID
export const getPlayerById = async (id) => {
  return await getData(`http://localhost:3000/api/players/${id}`);
};

//
// @desc  Add club
export const addClub = async (formData) => {
  return await postData(`http://localhost:3000/api/clubs`, formData, config);
};

// @desc  Get all clubs
export const getClubs = async () => {
  return await getData(`http://localhost:3000/api/clubs`);
};

// @desc  Get club by ID
export const getClubById = async (id) => {
  return await getData(`http://localhost:3000/api/clubs/${id}`);
};

//
// @desc  Add game
export const addGame = async (formData) => {
  return await postData(`http://localhost:3000/api/games`, formData, config);
};

// @desc  Get all games
export const getGames = async () => {
  return await getData(`http://localhost:3000/api/games`);
};

// @desc  Get game by ID
export const getGameById = async (id) => {
  return await getData(`http://localhost:3000/api/games/${id}`);
};

//
// @desc  Get logged in user's profile
export const getUsersProfile = async (token) => {
  return await getData(`http://localhost:3000/api/profile/me`, { headers: { 'x-auth-token': token } });
};

// @desc  Add profile
export const addProfile = async (formData, token) => {
  return await postData(`http://localhost:3000/api/profile`, formData, configWithToken(token));
};

// @desc  Get all profiles
export const getProfiles = async () => {
  return await getData(`http://localhost:3000/api/profile`);
};

// @desc  Get profile by ID
export const getProfileById = async (id) => {
  return await getData(`http://localhost:3000/api/profile/user/${id}`);
};

// @desc  Get user by token
export const getUserByToken = async () => {
  return await getData(`http://localhost:3000/api/auth`);
};

// @desc  Authenticate user & get token
export const loginUser = async (formData) => {
  return await postData(`http://localhost:3000/api/auth`, formData, config);
};

// @desc  Register user
export const registerUser = async (formData) => {
  return await postData(`http://localhost:3000/api/users`, formData, config);
};

// @desc  Add league
export const addLeague = async (formData) => {
  return await postData(`http://localhost:3000/api/leagues`, formData, config);
};

// @desc  Get all leagues
export const getLeagues = async () => {
  return await getData(`http://localhost:3000/api/leagues`);
};

// @desc  Get league by ID
export const getLeagueById = async (id) => {
  return await getData(`http://localhost:3000/api/leagues/${id}`);
};

// @desc  Add season
export const addSeason = async (formData) => {
  return await postData(`http://localhost:3000/api/seasons`, formData, config);
};

// @desc  Get all seasons
export const getSeasons = async () => {
  return await getData(`http://localhost:3000/api/seasons`);
};

// @desc  Get season by ID
export const getSeasonById = async (id) => {
  return await getData(`http://localhost:3000/api/seasons/${id}`);
};

// @desc  Add news
export const addNews = async (formData) => {
  return await postData(`http://localhost:3000/api/news`, formData, config);
};

// @desc  Get all news
export const getNews = async () => {
  return await getData(`http://localhost:3000/api/news`);
};

// @desc  Get new by ID
export const getNewsById = async (id) => {
  return await getData(`http://localhost:3000/api/news/${id}`);
};
