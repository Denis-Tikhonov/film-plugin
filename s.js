(function () {
    'use strict';

    Lampa.Listener.follow('app', function (e) {
        if (e.type !== 'ready') return;

        // Регистрируем компонент
        Lampa.Component.add('zonafilm', function () {
            let comp = this;

            comp.activity = new Lampa.Activity({
                title: 'ZonaFilm',
                component: 'zonafilm',
                page: 1
            });

            let html = $('<div class="layer"><div class="layer__body"><div id="zf-status" style="padding:20px">Загрузка...</div></div></div>');

            comp.activity.loader(true);

            // Тестовый запрос
            $.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zonafilm.ru/movies'))
                .done(function (data) {
                    comp.activity.loader(false);
                    html.find('#zf-status').text('OK: ' + data.contents.length + ' символов');
                })
                .fail(function (err) {
                    comp.activity.loader(false);
                    html.find('#zf-status').text('Ошибка: ' + err.status);
                });

            comp.activity.render().append(html);

            comp.activity.onBack = function () {
                Lampa.Activity.backward();
            };

            comp.activity.start();
        });

        // Добавляем пункт в меню
        setTimeout(function () {
            let icon = $('<li class="menu__item selector"><div class="menu__ico"><svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg></div><div class="menu__text">ZonaFilm</div></li>');
            $('.menu .menu__list').append(icon);

            icon.on('click', function () {
                Lampa.Activity.push({
                    component: 'zonafilm'
                });
            });
        }, 1500);
    });

})();
