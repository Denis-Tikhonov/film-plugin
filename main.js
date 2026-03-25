(function () {
    'use strict';

    function start() {
        if (!window.Lampa) return;

        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') {
                Lampa.SettingsApi.addComponent({
                    component: 'zonafilm',
                    name: 'ZonaFilm',
                    icon: 'folder',
                    onSelect: openZonaFilm
                });
            }
        });
    }

    function openZonaFilm() {
        let scroll = new Lampa.Scroll({ mask: true });
        let body = $('<div class="zonafilm"></div>');

        Lampa.Utils.request({
            url: 'https://zonafilm.ru/',
            method: 'GET',
            dataType: 'text'
        }, (html) => {
            let dom = $(html);

            dom.find('.shortstory').each(function () {
                let item = $(this);
                let title = item.find('.zagolovki h2').text().trim();
                let link = item.find('a').attr('href');
                let poster = item.find('img').attr('src');

                let card = Lampa.Template.get('card', {
                    title: title,
                    poster: poster
                });

                card.on('hover:enter', () => openMovie(link));

                body.append(card);
            });

            scroll.append(body);

            Lampa.Controller.add('zonafilm', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render(), body);
                    Lampa.Controller.collectionFocus(false, scroll.render());
                },
                back: function () {
                    Lampa.Controller.toggle('content');
                }
            });

            Lampa.Controller.toggle('zonafilm');
        });
    }

    function openMovie(url) {
        Lampa.Utils.request({
            url: url,
            method: 'GET',
            dataType: 'text'
        }, (html) => {
            let dom = $(html);

            // Ищем iframe плеера
            let iframe = dom.find('iframe').attr('src');

            if (iframe) {
                Lampa.Player.play({
                    title: 'Просмотр',
                    url: iframe
                });
            } else {
                Lampa.Noty.show('Видео не найдено');
            }
        });
    }

    if (window.appready) start();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') start();
    });
})();

