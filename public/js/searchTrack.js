const searchByArtistForm = document.querySelector('#searchTracksByArtist');
const addTrackError = document.querySelector('.addNewTrackError');

if (searchByArtistForm) {
  searchByArtistForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      action, method, track, artist,
    } = event.target;
    console.log(artist.value, track.value);
    const response = await fetch(action, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trackTitle: track.value,
        artistTitle: artist.value,
      }),
    });
    const message = await response.json();
    if (response.status === 200) { window.location.replace('/'); } else {
      addTrackError.innerHTML = message.text;
    }
  });
}
