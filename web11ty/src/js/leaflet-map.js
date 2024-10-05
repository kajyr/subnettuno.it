(function () {
  const elements = document.querySelectorAll('.map-element');
  for (const elem of elements) {
    const map = L.map(elem, { scrollWheelZoom: false }).setView(
      [44.4921, 11.3086],
      17
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.marker([44.4922, 11.3086])
      .addTo(map)
      .bindPopup("Questo è l'ingresso della sede");

    L.marker([44.493, 11.3082])
      .addTo(map)
      .bindPopup('Questa è la piscina Carmen Longo, dove ci alleniamo');
  }
})();
