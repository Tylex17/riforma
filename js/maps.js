const o2Maps =
{
	map:
	{
		map: false,
		placemarks: [],
		placemarkImgURL: '',
		popupsListById: {},
		mapsList:
		{
			large:
			{
				shops: window.shopsCoordinate['москва'],
				placemarkCallback: function(data)
				{
					if (data.id in o2Maps.map.popupsListById)
					{
							o2Maps.map.renderPopup(o2Maps.map.popupsListById[data.id], data);
					}
					else
					{
						//ajax для получения тела(html) попапа
						$.ajax({
							url: 'http://riforma.dev.odva.pro/ajax/?action=getShopPopup&shopId=' + data.id,
							success: function(result) {
								o2Maps.map.renderPopup(result, data);
								o2Maps.map.popupsListById[data.id] = result;
							}
						});

					}
				}
			},
			smallMap:
			{
				shops:
				[
					{
						date: '4 октября',
						name: 'SC GAGARINSKIY',
						coords: [55.707086, 37.591793],
					}
				],
				placemarkCallback: function(data)
				{
					console.log('Hi, I\'m placemark!');
				}
			},
		},

		/**
		* инит карты
		**/
		init(mapElement)
		{
			if(!$(mapElement).length)
				return;
			$(mapElement).find('ymaps').remove();

			var mapType = $(mapElement).data('map');
			const mapData = this.mapsList[mapType];
			var mapCenter = mapData.shops[Math.floor(mapData.shops.length/2)].coords;
			var self = this;

			ymaps.ready(function()
			{
				self.map = new ymaps.Map(mapElement,
				{
					center: mapCenter,
					zoom: 10,
					controls: []
				});
				self.drawPlacemarks(mapData);
			});

			$(window).on('resize', () => {
				self.map.container.fitToViewport();
			})
		},
		renderPopup(popupHtml, shopData)
		{
			$('[data-popup-name="popup-shops"]').find('.popup-body-html').html(popupHtml);
			o2Maps.map.mapsList.smallMap.shops[0] = shopData;
			o2.popups.open('popup-shops');
			o2.lazyLoad.init();
			o2Maps.map.init($('.popup-map')[0]);
			o2.masks.init();
			o2.validation.init();
			setTimeout(() => {
				o2.sliders.popupSlider();
				o2.sliders.initSliderBySelector('.discount-center__menu-mob-slider', 740);
			}, 1000);
		},
		/**
		 * Инициализация большой карты,
		 * в зависимости от выбранного города,
		 * название которого передается во
		 * входном параметре cityName
		 */
		showShopsInCity(cityName)
		{

			if (!cityName) return;

			const city = cityName.toLowerCase();
			o2Maps.map.mapsList.large.shops = window.shopsCoordinate[city];

			if (o2Maps.map.mapsList.large.shops) {
				o2Maps.map.init($("[data-map='large']")[0]);
			}
			else
				console.log('city not found');
		},
		/**
		** get placemarks DOM
		**/
		getPlacemarkView: function(placemark)
		{
			if(!placemark)
				return;

			var overlay = placemark.getOverlay().valueOf();

			if(!overlay || (typeof overlay == 'string'))
				return;

			if(!overlay.getElement)
				return;

			return overlay.getElement();
		},

		/**
		* рисует маркеры на карте
		**/
		drawPlacemarks(mapData)
		{
			this.placemarks = [];

			var self = this;
			var placemarksCollection = new ymaps.GeoObjectCollection();

			const shops = mapData.shops;

			for(var index in shops)
			{
				var placemark = this.drawPlacemark(shops[index], mapData.placemarkCallback)
				placemark.shopName = shops[index].name

				this.placemarks.push(placemark)
				placemarksCollection.add(placemark);
			}

			this.map.geoObjects.add( placemarksCollection );
			if (shops.length > 1)
				this.map.setBounds( placemarksCollection.getBounds() );
			else
				this.map.setZoom(12);
		},

		/**
		* центрует карту по имени плейсмарки
		**/
		setActivePlacemark(name, coords, instance)
		{
			if(!$(instance).prop('checked'))
				return

			coords = coords.split(',')
			for(var index in this.placemarks)
			{

				if(this.placemarks[index].shopName == name)
				{

					this.map.setCenter(coords)
					this.map.setZoom(15)
				}
			}
		},


		/**
		* создает плейсмарк и возвращает его
		**/
		drawPlacemark(markData, callback)
		{
			// console.log(markData.coords);
			var self = this
			var placemark = new ymaps.Placemark(markData.coords,
			{
				autoPan: false,
			},
			{
				iconLayout: 'default#image',
				balloonCloseButton: false,
				balloonAutoPan: false,
				hideIconOnBalloonOpen: false,
				iconShape: {
					type: 'Circle',
					coordinates: [0, 0],
					radius: 30
				},
				iconImageHref: window.placemarkImgURL,
				iconImageSize: [30, 30],
				iconImageOffset: [-15, -15],

			});

			// add events
			placemark.events.add('click', function (e)
			{
				if(typeof callback != 'undefined')
					callback(markData);
			});

			placemark.events.add('mouseenter', function (e) {
				$(self.getPlacemarkView(placemark)).addClass("map__placemark_hover");
			});

			placemark.events.add('mouseleave', function (e) {
				$(self.getPlacemarkView(placemark)).removeClass("map__placemark_hover");
			});

			return placemark
		}
	}
}