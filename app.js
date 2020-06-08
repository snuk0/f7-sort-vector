$$(document).on('page:init', '.page[data-name="sortvec"]', function(e) { 
        axios
            .get('http://localhost/cgi-bin/vec.cgi')
            .then(response => {
                console.log(this.items, response.data);
                var virtualList = app.virtualList.create({
                    el: '.virtual-list',
                    items: response.data, 
                    searchAll: function(query, items) {
                        var found = [];
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].imie.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '' || items[i].nazwisko.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '' || items[i].wiek.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
                        }
                        return found; 
                    },
                    itemTemplate: '<li>' +
                        '<a href="#" class="item-link item-content">' +
                        '<div class="item-inner">' +
                        '<div class="item-title-row">' +
                        '<div class="item-title">{{imie}} {{nazwisko}}</div>' +
						'</div>' +
						'<div class="item-subtitle">{{wiek}}</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>',
                    height: app.theme === 'ios' ? 63 : (app.theme === 'md' ? 73 : 46),
                });
            });
    });
