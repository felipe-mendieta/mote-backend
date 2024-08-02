import express from 'express';
import { generateJWT } from './../helpers/generate-jwt.helper';
import UserService from '../services/user.service';
const express = require('express');
const { generateJWT } = require('./../helpers/generate-jwt.helper')
const router = express.Router();
const userService = new UserService();

// Ruta para autenticar un usuario
router.post('/login', async (req, res, next) => {
  try {
    const data = req.body;
    let newUser;

    // Check if user exists
    const userExists = await userService.getByEmail(data.email);

    if (!userExists) {
      // Create new user
      newUser = await userService.create({
        name: data.name,
        email: data.email,
        idGoogle: data.aud,
        avatar: data.picture
      });
    } else {
      // Get user from database
      newUser = userExists;
    }

    const token = await generateJWT(newUser._id);

    res.status(200).json({
      ok: true,
      token: token,
      userId: newUser._id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
