(function () {
    'use strict';

    function start() {
        // Добавляем пункт в левое меню
        Lampa.Panel.add({
            title: 'ZonaFilm',
            component: 'zonafilm',
            icon: 'folder'
        });

        // Регистрируем компонент
        Lampa.Component.add('zonafilm', function () {
            let html = $('<div class="about"><div class="about__text">Плагин работает!</div></div>');
            Lampa.Controller.add('zonafilm', {
                toggle: function () {
                    Lampa.Controller.collectionSet(html);
                    Lampa.Controller.collectionFocus(false, html);
                },
                back: function () {
                    Lampa.Controller.toggle('menu');
                }
            });
            Lampa.Controller.toggle('zonafilm');
        });
    }

    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') start();
    });
})();
