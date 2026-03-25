(function () {
    'use strict';

    function start() {
        // Регистрируем компонент ПЕРЕД добавлением в меню
        Lampa.Component.add('zonafilm', function (object) {
            var comp = this;
            var html = $('<div class="about"><div class="about__text">Плагин работает!</div></div>');

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

        // Добавляем пункт в меню
        Lampa.Menu.add({
            title: 'ZonaFilm',
            subtitle: '',
            icon: 'folder',
            action: function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'ZonaFilm',
                    component: 'zonafilm',
                    page: 1
                });
            }
        });
    }

    // Ждём готовности приложения
    if (window.Lampa) {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }

})();
