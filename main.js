(function () {
    'use strict';

    function start() {
        Lampa.Panel.add({
            title: 'ZonaFilm',
            component: 'zonafilm',
            icon: 'folder'
        });

        Lampa.Component.add('zonafilm', function () {
            Lampa.Noty.show('Плагин работает!');
        });
    }

    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') start();
    });
})();
