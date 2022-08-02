const React = require('react');
const Layout = require('./Layout');

module.exports = function EditCard({ track }) {
  return (
    <Layout>
      <div>
        <form id="editTrack" action={`/tracks/${track.id}`} method="post">
          <p>{track.id}</p>
          <p>Исполнитель</p>
          <input className="ArtistTitle_input" type="text" name="artist" required defaultValue={track.Artist.title} />
          <p>Название</p>
          <input className="TrackTitle_input" type="text" name="track" required defaultValue={track.title} />
          <button type="submit" className="addForm_button">Сохранить изменения</button>
        </form>
        <div className="editTrackError" />
      </div>
    </Layout>
  );
};
