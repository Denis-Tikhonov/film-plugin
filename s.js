(function () {
    'use strict';

    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') {

            Lampa.Component.add('zonafilm', function (object) {
                var comp = this;
                var html = $('<div style="padding:20px;overflow-y:auto"><div id="zf-status">Загрузка...</div></div>');

                this.create = function () {
                    Lampa.Noty.show('create() вызван');
                    comp.activity.loader(true);

                    // Тест через allorigins
                    $.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zonafilm.ru/movies'))
                        .done(function (data) {
                            Lampa.Noty.show('Данные получены: ' + data.contents.length + ' символов');
                            comp.activity.loader(false);
                            comp.activity.toggle();
                            html.find('#zf-status').text('OK: ' + data.contents.length + ' символов');
                        })
                        .fail(function (err) {
                            Lampa.Noty.show('Ошибка запроса: ' + err.status);
                            comp.activity.loader(false);
                            comp.activity.toggle();
                            html.find('#zf-status').text('Ошибка: ' + err.status);
                        });

                    return html;
                };

                this.back = function () {
                    Lampa.Activity.backward();
                };

                this.destroy = function () {
                    html.remove();
                };
            });

            setTimeout(function () {
                var icon = $('<li class="menu__item selector"><div class="menu__ico"><svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg></div><div class="menu__text">ZonaFilm</div></li>');
                $('.menu .menu__list').append(icon);
                icon.on('click', function () {
                    Lampa.Noty.show('Клик по меню!');
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
