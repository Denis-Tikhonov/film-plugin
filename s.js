(function () {
    'use strict';

    function showNotice(msg) {
        Lampa.Noty.show(msg);
    }

    function start() {
        showNotice('ZonaFilm: start() вызван');

        try {
            Lampa.Component.add('zonafilm', function (object) {
                var comp = this;
                var html = $('<div class="about"><div class="about__text">Плагин ZonaFilm работает!</div></div>');

                this.create = function () {
                    comp.activity.loader(false);
                    comp.activity.toggle();
                    return html;
                };

                this.back = function () {
                    Lampa.Activity.backward();
                };

                this.destroy = function () {
                    html.remove();
                };
            });

            showNotice('ZonaFilm: компонент зарегистрирован');

            var icon = $('<li class="menu__item selector" data-action="zonafilm"><div class="menu__ico"><svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg></div><div class="menu__text">ZonaFilm</div></li>');

            var menu = $('.menu .menu__list');
            showNotice('ZonaFilm: меню найдено — ' + menu.length);

            menu.append(icon);

            icon.on('click', function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'ZonaFilm',
                    component: 'zonafilm',
                    page: 1
                });
            });

            showNotice('ZonaFilm: иконка добавлена');

        } catch (e) {
            showNotice('ZonaFilm ОШИБКА: ' + e.message);
        }
    }

    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') start();
    });

})();
