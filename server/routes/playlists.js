// server/routes/playlists.js

const express  = require('express');
const router   = express.Router();
const Playlist = require('../models/Playlist');

// Create a new playlist
router.post('/create', async (req, res) => {
  const { userId, name } = req.body;
  try {
    const playlist = new Playlist({ userId, name, songs: [] });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

// Add a song to a playlist
router.post('/add', async (req, res) => {
  const { playlistId, song } = req.body;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    playlist.songs.push(song);
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add song' });
  }
});

// Get all playlists for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.params.userId });
    res.json(playlists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

module.exports = router;
