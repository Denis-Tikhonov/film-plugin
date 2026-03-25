(function () {
    'use strict';

    function parseMovies(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var items = [];
        var seen = {};

        doc.querySelectorAll('a[href*="/movies/"]').forEach(function (el) {
            var img = el.querySelector('img');
            var title = img ? img.getAttribute('alt') : el.textContent.trim();
            var href = el.getAttribute('href');
            var poster = img ? img.getAttribute('src') : '';

            if (title && href && !href.includes('/filter/') && !seen[href]) {
                seen[href] = true;
                items.push({ title: title, url: 'https://zonafilm.ru' + href, poster: poster });
            }
        });

        return items;
    }

    function renderCards(movies, html) {
        movies.forEach(function (movie) {
            var card = $('<div class="card selector" style="display:inline-block;margin:10px;width:120px;vertical-align:top;cursor:pointer">' +
                '<img src="' + movie.poster + '" style="width:120px;height:180px;object-fit:cover;border-radius:6px">' +
                '<div style="font-size:12px;margin-top:5px;text-align:center">' + movie.title + '</div>' +
                '</div>');

            card.on('click', function () {
                Lampa.Noty.show('Открываем: ' + movie.title);
            });

            html.append(card);
        });
    }

    function loadMovies(html, comp) {
        // Способ 1 — через Lampa.Reguest
        Lampa.Reguest.get('https://zonafilm.ru/movies', function (data) {
            comp.activity.loader(false);
            comp.activity.toggle();
            var movies = parseMovies(data);
            if (movies.length) renderCards(movies, html);
            else html.text('Ничего не найдено');
        }, function () {
            // Способ 2 — через allorigins прокси
            $.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zonafilm.ru/movies'), function (data) {
                comp.activity.loader(false);
                comp.activity.toggle();
                var movies = parseMovies(data.contents);
                if (movies.length) renderCards(movies, html);
                else html.text('Ничего не найдено');
            }).fail(function () {
                comp.activity.loader(false);
                html.text('Ошибка загрузки. Нужен прокси.');
            });
        });
    }

    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') {

            Lampa.Component.add('zonafilm', function (object) {
                var comp = this;
                var html = $('<div style="padding:20px;overflow-y:auto"></div>');

                this.create = function () {
                    comp.activity.loader(true);
                    loadMovies(html, comp);
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
