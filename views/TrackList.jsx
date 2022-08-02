const React = require('react');

module.exports = function TrackList({ tracks }) {
  return (
    <>
      {tracks.map((track) => (
        <tr>
          <td>{track.title}</td>
          <td>{track.Artist.title}</td>
          <td>
            <form id={track.id} action={`/tracks/${track.id}`} className="delete">
              <button type="submit">delete</button>
            </form>

          </td>
          <td>
            <form id={track.id} action={`/tracks/${track.id}`} className="edit">
              <button type="submit">edit</button>
            </form>

          </td>
        </tr>
      ))}
    </>
  );
};
