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

//
// @desc  Get all players
export const getPlayers = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/players`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Add player
export const addPlayer = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/players`, formData, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get player by ID
export const getPlayerById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/players/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

//
// @desc  Add club
export const addClub = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/clubs`, formData, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get all clubs
export const getClubs = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/clubs`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get club by ID
export const getClubById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/clubs/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

//
// @desc  Add game
export const addGame = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/games`, formData, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get all games
export const getGames = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/games`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get game by ID
export const getGameById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/games/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

//
// @desc  Get logged in user's profile
export const getUsersProfile = async (token) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/profile/me`, { headers: { 'x-auth-token': token } });
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Add profile
export const addProfile = async (formData, token) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/profile`, formData, configWithToken(token));
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get all profiles
export const getProfiles = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/profile`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get profile by ID
export const getProfileById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/profile/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get user by token
export const getUserByToken = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/auth`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Authenticate user & get token
export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/auth`, formData, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Register user
export const registerUser = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/users`, formData, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Add league
export const addLeague = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/leagues`, formData, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get all leagues
export const getLeagues = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/leagues`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get league by ID
export const getLeagueById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/leagues/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Add season
export const addSeason = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/seasons`, formData, config);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get all seasons
export const getSeasons = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/seasons`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// @desc  Get season by ID
export const getSeasonById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/seasons/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};
