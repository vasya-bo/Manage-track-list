const React = require('react');
const Layout = require('./Layout');
const Tracklist = require('./TrackList');

module.exports = function Home({ tracks }) {
  return (
    <Layout>
      <div className="SearchBox" style={{ border: 'solid', margin: '10px', padding: '10px' }}>
        <h1>Поиск</h1>
        <form id="searchTracksByArtist" action="/search" method="get">
          <p>По исполнителям</p>
          <input className="ArtistTitle_input" type="text" name="artist" />
          <button type="submit" className="searchTrack_button" style={{ margin: '10px' }}>Искать!</button>
        </form>
        <form id="searchTracksByTitle" action="/search" method="get">
          <p>По трекам</p>
          <input className="TrackTitle_input" type="text" name="track" />

          <button type="submit" className="searchTrack_button" style={{ margin: '10px' }}>Искать!</button>
        </form>

        <p>По дате добавления</p>
        <form id="searchTracksByDate" action="/search" method="get">
          <input className="ArtistTitle_input" type="datetime-local" name="dateAfter" />
          <input className="ArtistTitle_input" type="datetime-local" name="dateBefore" />
          <button type="submit" className="searchTrack_button" style={{ margin: '10px' }}>Искать!</button>
        </form>
      </div>
      <div className="AddBox" style={{ border: 'solid', margin: '10px', padding: '10px' }}>
        <h1>Добавление</h1>
        <form id="addNewTrack" action="/tracks/new" method="post">
          <p>Исполнитель</p>
          <input className="ArtistTitle_input" type="text" name="artist" required />
          <p>Название</p>
          <input className="TrackTitle_input" type="text" name="track" required />
          <br />
          <button type="submit" className="addNewTrack_button" style={{ margin: '10px' }}>Добавить</button>
        </form>

        <div className="addNewTrackError" style={{ color: 'red' }} />
      </div>
      <div className="js-track-list">
        <table>
          <Tracklist tracks={tracks} />
        </table>
      </div>
    </Layout>
  );
};
