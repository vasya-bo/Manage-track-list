const trackRoute = require('express').Router();

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Artist, Track } = require('../db/models');
const isThisMonetochka = require('../isThisMonetochka');
const EditForm = require('../views/EditForm');

trackRoute.post('/new', async (req, res) => {
  const { artistTitle, trackTitle } = req.body;
  if (isThisMonetochka(artistTitle)) {
    res.status(406).json({ text: 'Нам не нравится Монеточка.' });
  } else {
    try {
      const newTrack = await Track.create(
        {
          title: trackTitle,
          Artist: [
            { title: artistTitle }],
        },
        { include: [Track.Artist] },
      );
      res.status(200).json({ text: 'new track was added' });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const artist = await Artist.findOne({ where: { title: artistTitle } });
        const newTrack = await Track.create({ title: trackTitle, artist_id: artist.id });
        res.status(200).json({ text: 'new track was added' });
      } else {
        console.log(error.message);
        res.status(500).json({ text: 'Извините, произошла ошибка' });
      }
    }
  }
});

trackRoute.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const trackDelete = await Track.findOne({ where: { id } });
    await trackDelete.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
});

trackRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const track = await Track.findOne({ where: { id }, include: [Artist] });
  const editForm = React.createElement(EditForm, { track });
  const html = ReactDOMServer.renderToStaticMarkup(editForm);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

trackRoute.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { trackNew, artistNew } = req.body;
  if (isThisMonetochka(artistNew)) {
    res.status(406).json({ text: 'Повторяем, нам не нравится Монеточка.' });
  } else {
    try {
      const trackEdit = await Track.findOne({ where: { id } });
      const artist = await Artist.findOne({ where: { title: artistNew } });
      if (artist) {
        trackEdit.title = trackNew;
        trackEdit.artist_id = await artist.id;
        await trackEdit.save();
        res.status(200).json({ text: 'sucsessfull edit' });
      } else {
        const artistAdd = await Artist.create({ title: artistNew });
        trackEdit.title = trackNew;
        trackEdit.artist_id = await artistAdd.id;
        await trackEdit.save();

        res.status(200).json({ text: 'sucsessfull edit' });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});

module.exports = trackRoute;
