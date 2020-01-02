var o2Anim =
{
	/**
	* подгрузка картинок при скролле
	*/

	scrollMagicController: null,
	scenesList: [
		{
			element: '.slick-slider',
			type: 'list',
			callback: function (element) {
				if($(element).find('.slick-center').length)
					var slideds = $(element).find('.slick-active').toArray();
				else
					var slideds = $(element).find('.slick-slide:visible').not('.slick-cloned').toArray();

				anime({
					targets: slideds,
					translateY: [80, 0],
					duration: 600,
					opacity: {
						value: [0, 1],
						duration: 1500,
					},
					easing: 'linear',
					delay: anime.stagger(200, {start: 150}),
					autoplay: true
				});
				$(element).parent().addClass('animated');
			}
		},
		{
			element: '.why-riforma-wr',
			callback: function (element) {
				if($(window).width() > 740)
					anime({
						targets: element,
						translateY: [60, 0],
						duration: 400,
						delay: 200,
						easing: 'linear',
						autoplay: true
					});
			}
		},
		{
			element: '.products',
			callback: function (element) {
				if($(window).width() > 740)
				{
					const card = $(element).find('.product').eq(1)[0];
					anime({
						targets: card,
						translateY: [-40, 0],
						duration: 300,
						delay: 400,
						easing: 'linear',
						autoplay: true
					});
				}
			}
		},
		{
			element: '._map',
			type: 'list',
			callback: function (element) {
				o2.map.init(element);
			}
		},
		{
			element: '.products__row',
			callback: function () {
				// console.log('product');
			}
		},
		{
			element: '.actions',
			callback: function () {
				// console.log('actions');
			}
		},
		{
			element: '.riforma-furniture-advantages',
			callback: function (element) {
				const timeLine = anime.timeline({
					duration: 450,
					easing: 'linear',
				});

				timeLine
				.add({
					targets: '.r-a__1-2',
					translateX: ['-100%', 0],
				})
				.add({
					targets: '.r-a__1-1',
					translateX: ['-50%', 0],
					opacity: [0, 1],
				})
				.add({
					targets: '.r-a__1-3',
					strokeDashoffset: [anime.setDashoffset, 0]
				});
				const timeLineTwo = anime.timeline({
					duration: 750,
					easing: 'linear',
					delay: timeLine.currentTime * 2
				});
				timeLineTwo.add({
					targets: '.r-a__2-2',
					strokeDashoffset: [anime.setDashoffset, 0]
					// strokeDashoffset: function(el) {
					// 	var pathLength = el.getTotalLength();
					// 	el.setAttribute('stroke-dasharray', pathLength);
					// 	return [0-pathLength, 0];
					// },
				}, '-=250')
				.add({
					targets: '.r-a__2-3',
					strokeDashoffset: [anime.setDashoffset, 0]
					// strokeDashoffset: function(el) {
					// 	var pathLength = el.getTotalLength();
					// 	el.setAttribute('stroke-dasharray', pathLength);
					// 	return [-pathLength, 0];
					// },
				})
				.add({
					targets: '.r-a__2-1',
					opacity: [0, 1],
					rotate: [-20, 0]
				}, '-=250');

				const timeLineThree = anime.timeline({
					duration: 950,
					easing: 'linear',
					delay: 26 * 2,
				});

				timeLineThree.add({
					targets: '.r-a__3-4',
					strokeDashoffset: [anime.setDashoffset, 0]
				})
				.add({
					targets: '.r-a__3-5',
					duration: 600,
					strokeDashoffset: [anime.setDashoffset, 0]
				}, '-=180')
				.add({
					targets: '.r-a__3-1',
					opacity: [0, 1],
					translateY: [-14, 0]
				}, '-=360')
				.add({
					targets: '.r-a__3-2',
					opacity: [0, 1],
					duration: 100,
				}, '-=220')
				.add({
					targets: '.r-a__3-3',
					opacity: [0, 1],
					duration: 220,
				});

				const timeLineFour = anime.timeline({
					duration: 1150,
					easing: 'linear',
					delay: timeLineThree.currentTime * 2.9
				});
				timeLineFour.add({
					targets: '.r-a__4-2',
					strokeDashoffset: [anime.setDashoffset, 0]
				}).add({
					targets: '.r-a__4-1',
					opacity: [0, 1],
					translateY: [-8, 0]
				}, '-=250');

				const timeLineFive = anime.timeline({
					duration: 1350,
					easing: 'linear',
					delay: timeLineFour.currentTime * 3.8
				});
				timeLineFive.add({
					targets: '.r-a__5-2',
					strokeDashoffset: [anime.setDashoffset, 0]
				}).add({
					targets: '.r-a__5-1',
					opacity: [0, 1],
					translateY: [18, 0]
				}, '-=200');
			}
		},
		{
			element: '.sofa-types-row',
			callback: function (element) {
				if(!$(element).hasClass('slick-slider'))
				{
					anime({
						targets: '.sofa-type-wr',
						translateY: [80, 0],
						autoplay: true,
						duration: 600,
						opacity: {
							value: [0, 1],
							duration: 1500,
						},
						easing: 'linear',
						delay: anime.stagger(200, {start: 150}),
					});

					setTimeout(() => {
						$('.sofa-types').addClass('sofa-types_showed');
					}, 1000)
				}
			},
		},
		{
			element: '.accessories-wr',
			callback: function (element) {
				if(!$(element).hasClass('slick-slider'))
				{
					anime({
						targets: '.accessories-item-wr',
						translateY: [80, 0],
						autoplay: true,
						duration: 600,
						opacity: {
							value: [0, 1],
							duration: 1500,
						},
						easing: 'linear',
						delay: anime.stagger(200, {start: 150}),
					});

					setTimeout(() => {
						$('.sofa-types').addClass('sofa-types_showed');
					}, 1000)
				}
			},
		},
		{
			element: '.collections-item',
			type: 'list',
			callback: function (element) {
				if(!$(element).hasClass('slick-slider'))
				{
					anime({
						targets: element,
						translateY: [80, 0],
						autoplay: true,
						duration: 600,
						opacity: {
							value: [0, 1],
							duration: 1500,
						},
						easing: 'linear',
						delay: anime.stagger(200, {start: 150}),
					});

					setTimeout(() => {
						$('.sofa-types').addClass('sofa-types_showed');
					}, 1000)
				}
			},
		},
		{
			element: '.actions__row',
			type: 'list',
			callback: function (element) {
				anime({
					targets: element,
					translateY: [80, 0],
					autoplay: true,
					duration: 600,
					opacity: {
						value: [0, 1],
						duration: 1500,
					},
					easing: 'linear',
					delay: anime.stagger(200, {start: 150}),
				});

				setTimeout(() => {
					$('.actions__row ').addClass('actions__row_showed');
				}, 1000)
			},
		}
	],

	createScene(element, options)
	{
		new ScrollMagic.Scene({
			triggerElement: element,
			triggerHook: 1,
			reverse: false
		})
		.on('enter', (e) => {
			options.callback(e.target.triggerElement());
		})
		.addTo(this.scrollMagicController);
	},

	init()
	{
		this.showHeaderItems();
		this.scrollMagicController = new ScrollMagic.Controller();

		for (let i = 0; i < this.scenesList.length; i++)
		{
			const scene = this.scenesList[i];
			if(!$(scene.element).length)
				continue;

			if(typeof scene.type != 'undefined' && scene.type == 'list')
			{
				const scenes = $(scene.element);
				for (let j = 0; j < scenes.length; j++)
				{
					this.createScene(scenes[j], scene);
				}
			}
			else
			{
				// console.log(scene);
				this.createScene($(scene.element)[0], scene);
			}
		}
	},

	showHeaderItems()
	{
		let items = $('.header .header-anim:visible').toArray();
		// console.log(items);

		anime({
			targets: items,
			opacity: [0, 1],
			duration: 600 / items.length,
			delay: anime.stagger(140),
			easing: 'easeInOutQuad',
			complete: () => {
				$('.header .header-anim').css({'opacity': 1});
			}
		});
	},

	sofaIcon:
	{
		animation: null,
		prevAnimation: null,
		calledAnimations: {},
		animationsList:
		{
			straight: {
				settings: (target) => {
					return (
						anime({
							targets: $(target).find('svg')[0],
							easing: 'linear',
							translateY: [
								{ value: -15, duration: 1000},
								{ value: -25, duration: 1000},
								{ value: -35, duration: 1000, delay: -100},
							],
							rotate: [
								{ value: -10, duration: 1000, delay: 200},
								{ value: 5, duration: 1000},
								{ value: 0, duration: 1000},
							],
							autoplay: false
						})
					)
				}
			},
			cornering: {
				settings: (target) => {
					return (
						anime({
							targets: $(target).find('svg')[0],
							easing: 'linear',
							translateY: [
								{ value: -15, duration: 1000},
								{ value: -25, duration: 1000},
								{ value: -35, duration: 1000, delay: -100},
							],
							rotate: [
								{ value: -10, duration: 1000, delay: 200},
								{ value: 5, duration: 1000},
								{ value: 0, duration: 1000},
							],
							autoplay: false
						})
					)
				}
			},
			armchair: {
				settings: (target) => {
					return (
						anime({
							targets: $(target).find('svg')[0],
							easing: 'linear',
							translateY: [
								{ value: -15, duration: 1000},
								{ value: -25, duration: 1000},
								{ value: -35, duration: 1000, delay: -100},
							],
							rotate: [
								{ value: -10, duration: 1000, delay: 200},
								{ value: 5, duration: 1000},
								{ value: 0, duration: 1000},
							],
							autoplay: false
						})
					)
				}
			},
			small: {
				settings: (target) => {
					const timeline = anime.timeline({
						duration: 450,
						easing: 'linear',
						autoplay: false
					});
					return (
						timeline
						.add({
							targets: '.small-part-1',
							translateY: [
								{ value: -15, duration: 1000},
								{ value: -25, duration: 1000},
								{ value: -35, duration: 1000, delay: -100},
							],
							rotate: [
								{ value: -10, duration: 1000, delay: 200},
								{ value: 5, duration: 1000},
								{ value: 0, duration: 1000},
							]
						})
						.add({
							targets: '.small-part-2',
							translateY: [
								{ value: -15, duration: 1000},
								{ value: -25, duration: 1000},
								{ value: -35, duration: 1000, delay: -100},
							],
							rotate: [
								{ value: -10, duration: 1000, delay: 200},
								{ value: 5, duration: 1000},
								{ value: 0, duration: 1000},
							]
						}, '-=2700')
					)
				}
			},
			modular: {
				settings: (target) => {
					const timeline = anime.timeline({
						easing: 'linear',
						autoplay: false
					});
					return (
						timeline
						.add({
							targets: '.modular-part-1',
							translateY: [
								{ value: -15, duration: 700},
								{ value: -25, duration: 700},
								{ value: -35, duration: 700},
							]
						})
						.add({
							targets: '.modular-part-2',
							translateY: [
								{ value: -15, duration: 700},
								{ value: -25, duration: 700},
								{ value: -35, duration: 700},
							]
						}, '-=1700')
						.add({
							targets: '.modular-part-3',
							translateY: [
								{ value: -15, duration: 700},
								{ value: -25, duration: 700},
								{ value: -35, duration: 700},
							]
						}, '-=1600')
					)
				}
			},
			complects: {
				settings: (target) => {
					const timeline = anime.timeline({
						easing: 'linear',
						autoplay: false
					});
					return (
						timeline
						.add({
							targets: '.complects-part-1',
							translateY: [
								{ value: -15, duration: 700},
								{ value: -25, duration: 700},
								{ value: -35, duration: 700},
							]
						})
						.add({
							targets: '.complects-part-2',
							translateY: [
								{ value: -15, duration: 700},
								{ value: -25, duration: 700},
								{ value: -35, duration: 700},
							]
						}, '-=1700')
					)
				}
			},
			sale: {
				settings: (target) => {
					return (
						anime({
							targets: $(target).find('svg')[0],
							easing: 'linear',
							translateY: [
								{ value: -15, duration: 1000},
								{ value: -25, duration: 1000},
								{ value: -35, duration: 1000, delay: -100},
							],
							rotate: [
								{ value: -10, duration: 1000, delay: 200},
								{ value: 5, duration: 1000},
								{ value: 0, duration: 1000},
							],
							autoplay: false
						})
					)
				}
			}
		},
		setCurrentAnimation(type)
		{
			let sofaType = $(type).data('sofa-type');
			if (sofaType in this.calledAnimations)
				this.calledAnimations[sofaType].play()
			else
			{
				this.calledAnimations[sofaType] = this.animationsList[sofaType].settings(type);
				this.calledAnimations[sofaType].play();
			}
		},
		reverseAnimation(sofaType)
		{
			this.calledAnimations[sofaType].pause();
			this.calledAnimations[sofaType].reverse();
			this.calledAnimations[sofaType].completed = false;
			this.calledAnimations[sofaType].play();
		},
		enter(instance)
		{
			let sofaType = $(instance).data('sofa-type');
			if ($.isEmptyObject(this.calledAnimations))
			{
				this.calledAnimations[sofaType] = this.animationsList[sofaType].settings(instance);
				this.calledAnimations[sofaType].play();
			}
			else if (sofaType in this.calledAnimations)
			{
				this.reverseAnimation(sofaType);
			}
			else
			{
				this.setCurrentAnimation(instance)
			}
		},
		leave(instance)
		{
			let sofaType = $(instance).data('sofa-type');
			this.reverseAnimation(sofaType);
		},
	}
}