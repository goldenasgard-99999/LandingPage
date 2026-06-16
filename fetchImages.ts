fetch('https://www.cebubestestate.com/property/city-clou/').then(r=>r.text()).then(html => {
  const matches = [...html.matchAll(/src="([^"]+?\.(?:jpg|png|webp|jpeg)[^"]*)"|data-src="([^"]+?\.(?:jpg|png|webp|jpeg)[^"]*)"/ig)];
  matches.forEach(m => console.log(m[1] || m[2]));
});
