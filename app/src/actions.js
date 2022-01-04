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
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Add player
export const addPlayer = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/players`, formData, config);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get player by ID
export const getPlayerById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/players/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

//
// @desc  Add club
export const addClub = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/clubs`, formData, config);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get all clubs
export const getClubs = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/clubs`);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get club by ID
export const getClubById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/clubs/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

//
// @desc  Add game
export const addGame = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/games`, formData, config);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get all games
export const getGames = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/games`);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

// @desc  Get game by ID
export const getGameById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/games/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};
