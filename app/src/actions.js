import React from 'react';
import axios from 'axios';

export const getPlayers = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/players`);
    console.log(res.data);
  } catch (error) {
    console.log(err.message);
  }
};
