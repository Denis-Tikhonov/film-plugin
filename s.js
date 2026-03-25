icon.on('click', function () {
    Lampa.Noty.show('Открываю ZonaFilm...');
    Lampa.Activity.push({
        url: 'https://zonafilm.ru/',
        title: 'ZonaFilm',
        component: 'browser'
    });
});
