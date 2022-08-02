const deleteButton = document.querySelector('.js-track-list');
if (deleteButton) {
  document.querySelector('.js-track-list').addEventListener('submit', async (event) => {
    if (event.target.classList.contains('delete')) {
      event.preventDefault();
      console.log(event.target);
      const { id } = event.target;
      const url = `tracks/${id}`;
      const response = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
      if (response.status === 200) {
        const card = event.target.parentNode.parentNode;
        card.remove();
      }
    }
  });
}
