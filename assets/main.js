document.addEventListener('DOMContentLoaded', () => {
  // Instagram Feed Loader
  async function loadInstagram() {
    const container = document.getElementById('insta-feed');
    if (!container) return;

    try {
      const res = await fetch('https://www.instagram.com/tridentrisklabs/?__a=1');
      const data = await res.json();
      const posts = data.graphql?.user?.edge_owner_to_timeline_edges || [];
      const recent = posts.slice(0, 6);
      container.innerHTML = '';

      recent.forEach(({ node }) => {
        const img = node.thumbnail_src;
        const link = node.permalink;
        const el = document.createElement('a');
        el.href = link;
        el.target = '_blank';
        el.innerHTML = `<img src="${img}" alt="Instagram post">`;
        container.appendChild(el);
      });
    } catch (err) {
      container.innerHTML = '<p class="text-gray-500">Unable to load Instagram feed.</p>';
    }
  }
  loadInstagram();

  // Form auto-fill honeypot handling
  const botField = document.querySelector('input[name="bot-field"]');
  if (botField) botField.style.display = 'none';
});