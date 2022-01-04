import React from 'react';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// @desc  Get all players
export const getPlayers = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/players`);
    console.log(res.data);
  } catch (error) {
    console.log(err.message);
  }
};

// @desc  Add player
export const addPlayer = async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/players`, formData, config);
    console.log(res.data);
  } catch (error) {
    console.log(err.message);
  }
};

// @desc  Get player by ID
export const getPlayerById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/players/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(err.message);
  }
};
