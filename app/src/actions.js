import React from 'react';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

//
// @desc  Get all players
export const getPlayers = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/players`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Add player
export const addPlayer = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/players`, formData, config);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get player by ID
export const getPlayerById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/players/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

//
// @desc  Add club
export const addClub = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/clubs`, formData, config);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get all clubs
export const getClubs = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/clubs`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get club by ID
export const getClubById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/clubs/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

//
// @desc  Add game
export const addGame = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/games`, formData, config);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get all games
export const getGames = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/games`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get game by ID
export const getGameById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/games/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

//
// @desc  Get logged in user's profile
export const getUsersProfile = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/profile/me`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Add profile
export const addProfile = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/profile`, formData, config);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get all profiles
export const getProfiles = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/profile`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get profile by ID
export const getProfileById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/profile/user/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get user by token
export const getUserByToken = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/auth`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Authenticate user & get token
export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/auth`, formData, config);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
