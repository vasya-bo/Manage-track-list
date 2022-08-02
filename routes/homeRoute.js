const homeRoute = require('express').Router();
const { Op } = require('sequelize');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Artist, Track } = require('../db/models');
const Home = require('../views/Home.jsx');

homeRoute.get('/', async (req, res) => {
  const tracks = await Track.findAll({ order: [['id', 'DESC']], include: Artist });
  const home = React.createElement(Home, { tracks });
  const html = ReactDOMServer.renderToStaticMarkup(home);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

homeRoute.get('/search', async (req, res) => {
  const searchArtist = req.query.artist;
  const searchTrack = req.query.track;
  const searchDateAfter = req.query.dateAfter;
  const searchDateBefore = req.query.dateBefore;

  if (searchArtist) {
    const tracks = await Track.findAll({
      include:
    { model: Artist, where: { title: searchArtist } },
    });
    const home = React.createElement(Home, { tracks });
    const html = ReactDOMServer.renderToStaticMarkup(home);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } else if (searchTrack) {
    const tracks = await Track.findAll({
      where: { title: searchTrack },
      include:
      { model: Artist },
    });
    const home = React.createElement(Home, { tracks });
    const html = ReactDOMServer.renderToStaticMarkup(home);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } else if (searchDateAfter && !searchDateBefore) {
    const tracks = await Track.findAll({
      where: {
        createdAt: { [Op.between]: [new Date(searchDateAfter), new Date()] },
      },
      include:
      { model: Artist },
    });
    const home = React.createElement(Home, { tracks });
    const html = ReactDOMServer.renderToStaticMarkup(home);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } else if (!searchDateAfter && searchDateBefore) {
    const tracks = await Track.findAll({
      where: {
        createdAt: { [Op.between]: [new Date('1995-12-17T03:24:00'), new Date(searchDateBefore)] },
      },
      include:
      { model: Artist },
    });
    const home = React.createElement(Home, { tracks });
    const html = ReactDOMServer.renderToStaticMarkup(home);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } else if (searchDateAfter && searchDateBefore) {
    const tracks = await Track.findAll({
      where: {
        createdAt: { [Op.between]: [new Date(searchDateAfter), new Date(searchDateBefore)] },
      },
      include:
      { model: Artist },
    });
    const home = React.createElement(Home, { tracks });
    const html = ReactDOMServer.renderToStaticMarkup(home);
    res.write('<!DOCTYPE html>');
    res.end(html);
  }
});
module.exports = homeRoute;
