(function () {
    'use strict';

    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') {
            Lampa.Noty.show('ZonaFilm загружен!');

            Lampa.Component.add('zonafilm', function (object) {
                var comp = this;
                var html = $('<div class="about"><div class="about__text">ZonaFilm работает!</div></div>');

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

            // Ждём пока меню отрисуется в DOM
            setTimeout(function () {
                var menu = $('.menu .menu__list');
                Lampa.Noty.show('Меню найдено: ' + menu.length);

                var icon = $('<li class="menu__item selector"><div class="menu__ico"><svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg></div><div class="menu__text">ZonaFilm</div></li>');

                menu.append(icon);

                icon.on('click', function () {
                    Lampa.Activity.push({
                        url: '',
                        title: 'ZonaFilm',
                        component: 'zonafilm',
                        page: 1
                    });
                });

            }, 2000);
        }
    });

})();
