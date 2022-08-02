const editForm = document.querySelector('#editTrack');
console.log(editForm);
const editError = document.querySelector('.editTrackError');

if (editForm) {
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      action, track, artist,
    } = event.target;
    console.log(action, track, artist);
    const response = await fetch(action, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trackNew: track.value,
        artistNew: artist.value,
      }),
    });
    const message = await response.json();
    if (response.status === 406) {
      editError.innerHTML = message.text;
    } else { window.location.replace('/'); }
  });
}
