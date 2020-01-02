"use strict"

/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	o2.init();
});
$(window).on('load', () => {
	// console.log(o2.deliveryAnimate);
})
/**
 * основной объект
 * @type {object}
 */
var o2 =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init()
	{
		this.lazyLoad.init();
		this.map = o2Maps.map;
		this.scrollMagic = o2Anim;
		this.validation = o2Validation;
		this.sliderParallax.init();
		this.sliders = o2Sliders;
		this.sliders.init();
		this.animations = o2Anim;
		this.validation = o2Validation;
		this.animations.init();
		this.deliveryAnimate = deliveryAnim;
		this.deliveryAnimate.init()
		this.sidebar.init();
		this.rangeSlider.init();
		this.masks.init();
		this.validation.init();
		this.cookie = cookie;
		this.cart = cart;
		this.cart.init();
	},
	/**
	* подгрузка картинок при скролле
	*/
	lazyLoad:
	{
		lazy: null,
		init()
		{
			this.lazy = new LazyLoad({
				elements_selector: ".lazy-image",
				threshold: 100,
			});
		}
	},

	masks:
	{
		init()
		{
			this.phoneMask();
		},
		phoneMask()
		{
			$('._phone-mask').each((index, element) =>
			{
				IMask(element, {
					mask: '+{7} (000) 000-00-00'
				});
			})
		}
	},

	/**
	* объект регистрации
	*/
	registration:
	{
		send(instance, event)
		{
			event.preventDefault();
			// будущая валидация формы
			if(o2.validation.validateForm(instance))
			{
				setTimeout(() =>
				{
					$('.registration-wr').fadeOut(300, () => {
						$('html, body').animate({
							scrollTop: 0,
						}, 300);
						$('.registration-message').fadeIn(300);
					})
				}, 2000)
			}
		},
		restoreUserInfo(instance, event)
		{
			event.preventDefault();
			$(instance).parents('.popover-login-visible').fadeOut(500);
			$('.popover-login-restore').delay(500).fadeIn(500);
		},
		sendRestoreData(event)
		{
			event.preventDefault();
			setTimeout(() => {
				$('.login-restore').fadeOut(300, () => {
					//текст будем вставлять в зависимости от ответа с сервера
					$('.login-restore-message').html('Мы отправили Вам письмо. Проверьте <a href="https://mail.ru/" target="_blank">почту</a>')
					$('.login-restore-message').fadeIn(300);
				})
			}, 2000)
		},
		closeRestore(instance, event)
		{
			event.preventDefault();
			$(instance).parents('.popover-login-restore').fadeOut(500);
			$('.popover-login-visible').delay(500).fadeIn(500);
		}
	},
	/**
	 * табы
	 */
	tabs:
	{
		open(instance, tabId)
		{
			const tabsContainer = $(instance).parents('._tabs-container');
			const openedTab = $(tabsContainer).find('.tab[data-tab-id="' + tabId + '"]');
			if($(openedTab).hasClass('tab_open'))
				return false;

			$(tabsContainer).find('.tab.tab_open').fadeOut(200, () => {
				$('.tab').removeClass('tab_open')
				$(openedTab).fadeIn(200).addClass('tab_open');
			});
			this.markActiveTab(instance)
		},
		markActiveTab(activeItem)
		{
			$('.discount-center__item').each((index, item) => {
				if ( $(item).hasClass('discount-center__item_active') )
					$(item).removeClass('discount-center__item_active');
				$(activeItem).addClass('discount-center__item_active');
			})
		}
	},
	/**
	 * Объект для настройки
	 * параллакса диванов на слайдере
	 */
	sliderParallax: {
		slides: {},
		animeFrames:
		[
			[{"translateY":"2%","rotate":"-0.3794290545509229deg","duration":1669.4529498210943},{"translateY":"-3%","rotate":"-1.5711561591200884deg","duration":2636.905958009924},{"translateY":"-7%","rotate":"0.6790008006384052deg","duration":2145.807634329911},{"translateY":"-10%","rotate":"0.8410187996472072deg","duration":2336.7040687869394},{"translateY":"-13%","rotate":"1.5393924225851405deg","duration":1891.9086477249266},{"translateY":"-16%","rotate":"-1.5966119560154868deg","duration":2009.4482709979723},{"translateY":"-18%","rotate":"0.18754359604680104deg","duration":2328.666923116706},{"translateY":"-19%","rotate":"-0.34256016250915255deg","duration":2344.487687960413},{"translateY":"-20%","rotate":"-1.8882507806855042deg","duration":2191.5233685627563},{"translateY":"-21%","rotate":"1.982412664588992deg","duration":2399.751134417039},{"translateY":"-21%","rotate":"-0.3917359770268023deg","duration":2468.822540123807},{"translateY":"-20%","rotate":"1.9948668231749043deg","duration":2181.512155944877},{"translateY":"-20%","rotate":"-1.2212694737128271deg","duration":1581.711570339094},{"translateY":"-18%","rotate":"2.2525493797559513deg","duration":2656.012815368933},{"translateY":"-16%","rotate":"-2.042971175468422deg","duration":1915.2659622157562},{"translateY":"-14%","rotate":"0.2629732266324716deg","duration":2952.023548353535},{"translateY":"-11%","rotate":"0.8170263921592991deg","duration":2683.9037379868296},{"translateY":"-7%","rotate":"-2.3158082861535156deg","duration":2795.614263851133},{"translateY":"-3%","rotate":"0.08150894278785792deg","duration":2164.0017910702104},{"translateY":"-1%","rotate":"-0.9769167180108296deg","duration":2038.3262164857533}],
			// [{"translateY":"-1%","rotate":"-2.4032107220903107deg","duration":2683.3572590034355},{"translateY":"-5%","rotate":"-1.28716877963760545deg","duration":2860.211547893863},{"translateY":"-9%","rotate":"0.6624539022066911deg","duration":1831.0038249219917},{"translateY":"-12%","rotate":"1.5502814418070798deg","duration":2890.539389254024},{"translateY":"-15%","rotate":"2.7194754321932828deg","duration":2268.9897194081414},{"translateY":"-17%","rotate":"1.4472662856469545deg","duration":1961.4319245616784},{"translateY":"-19%","rotate":"1.209139464901302deg","duration":1588.1427553454441},{"translateY":"-20%","rotate":"0.8415860918205555deg","duration":1734.851951012893},{"translateY":"-21%","rotate":"-0.3146707460547633deg","duration":2150.688263822357},{"translateY":"-21%","rotate":"-1.67415598495004deg","duration":2032.7892438088043},{"translateY":"-21%","rotate":"-1.717568955926742deg","duration":2631.500600682304},{"translateY":"-20%","rotate":"0.7910537104761817deg","duration":2309.275310973539},{"translateY":"-19%","rotate":"1.5005960354101804deg","duration":2964.903100679812},{"translateY":"-17%","rotate":"-0.7738344469999758deg","duration":1542.3545204217935},{"translateY":"-15%","rotate":"1.3165090145490996deg","duration":2494.482355582193},{"translateY":"-12%","rotate":"1.910090174260322deg","duration":1943.2377246022174},{"translateY":"-9%","rotate":"0.9078365659463197deg","duration":1837.0190013808324},{"translateY":"-5%","rotate":"-0.42864203931118094deg","duration":2136.3500201209918},{"translateY":"-1%","rotate":"-1.3381602417932337deg","duration":2591.970360762577}],
			[{"translateY":"-9%","rotate":"2.1200492447739903deg","duration":1896.0717138609475},{"translateY":"-12%","rotate":"-0.6061686205265482deg","duration":2998.6408106060126},{"translateY":"-15%","rotate":"-1.7236133084020033deg","duration":2818.9362686467166},{"translateY":"-17%","rotate":"-0.459394048341756deg","duration":1605.6710971179914},{"translateY":"-19%","rotate":"1.110779500281709deg","duration":2936.70458339276},{"translateY":"-20%","rotate":"-2.187388916673169deg","duration":2768.6242892103032},{"translateY":"-21%","rotate":"-2.14037009766205deg","duration":2008.3055394940975},{"translateY":"-21%","rotate":"0.9188174727269818deg","duration":2188.2232814670447},{"translateY":"-21%","rotate":"-0.7552745864457611deg","duration":2431.327825521814},{"translateY":"-20%","rotate":"-0.0637723619513908deg","duration":1842.3492630044143},{"translateY":"-19%","rotate":"1.7426774648704892deg","duration":2870.4691603930323},{"translateY":"-17%","rotate":"2.0333682577524845deg","duration":1903.6567693860666},{"translateY":"-15%","rotate":"1.0388965015463958deg","duration":1690.7944353441078},{"translateY":"-12%","rotate":"-0.7239301146006893deg","duration":2858.4322847138765},{"translateY":"-9%","rotate":"2.343628136120852deg","duration":2931.6542552477617},{"translateY":"-5%","rotate":"2.38885878094794deg","duration":2258.5724401916004},{"translateY":"-1%","rotate":"-1.9909743191380769deg","duration":2731.25182745684}],
			[{"translateY":"-11%","rotate":"-0.20843004140259946deg","duration":1625.2987650552047},{"translateY":"-14%","rotate":"-1.9912806287390772deg","duration":2193.7999378453474},{"translateY":"-16%","rotate":"1.1678635134755488deg","duration":2297.4962483078493},{"translateY":"-18%","rotate":"0.5459878783225394deg","duration":1723.6541200808178},{"translateY":"-20%","rotate":"2.0659752965813283deg","duration":1528.6246764402774},{"translateY":"-20%","rotate":"1.4496249871214504deg","duration":2897.2318996813874},{"translateY":"-21%","rotate":"-1.7374730033775854deg","duration":2125.3997039251935},{"translateY":"-21%","rotate":"-0.820566955278903deg","duration":2592.8341488530414},{"translateY":"-20%","rotate":"0.7777221703119688deg","duration":1613.8542393961152},{"translateY":"-19%","rotate":"-0.5600387791064254deg","duration":2158.741057142212},{"translateY":"-18%","rotate":"0.4243889602835482deg","duration":2841.3886436392604},{"translateY":"-16%","rotate":"2.162750139678118deg","duration":2469.7962439424555},{"translateY":"-13%","rotate":"-0.8350490824665291deg","duration":2513.88723242989},{"translateY":"-10%","rotate":"2.13391309013263deg","duration":2007.7357452384272},{"translateY":"-7%","rotate":"-0.3242934762622598deg","duration":2318.914478181243},{"translateY":"-3%","rotate":"0.7118447144395725deg","duration":1521.4475105287052},{"translateY":"-1%","rotate":"-0.007115694518926574deg","duration":1545.2203422798796}],
			[{"translateY":"-6%","rotate":"-1.1355644046903257deg","duration":2175.494715960785},{"translateY":"-9%","rotate":"1.951505442792735deg","duration":2797.479683861502},{"translateY":"-12%","rotate":"-1.2342789808910226deg","duration":2147.7157383923345},{"translateY":"-15%","rotate":"0.6769660416111813deg","duration":1886.5709699637475},{"translateY":"-17%","rotate":"1.008029172195787deg","duration":1923.4174002091515},{"translateY":"-19%","rotate":"0.9980018641219859deg","duration":2752.2161334678567},{"translateY":"-20%","rotate":"0.6740330256953841deg","duration":2039.8795309639956},{"translateY":"-21%","rotate":"0.7300790300374214deg","duration":2062.003728928628},{"translateY":"-21%","rotate":"-1.6356099611324382deg","duration":2256.6922809192624},{"translateY":"-21%","rotate":"-0.9042090251583401deg","duration":2321.3180355262143},{"translateY":"-20%","rotate":"0.2217783564013942deg","duration":2455.3119497011135},{"translateY":"-19%","rotate":"2.313154857240404deg","duration":2910.613533472121},{"translateY":"-17%","rotate":"-0.9762100669762508deg","duration":1680.3090867564251},{"translateY":"-14%","rotate":"1.1217448563057753deg","duration":2983.450297170299},{"translateY":"-12%","rotate":"1.6542056597257702deg","duration":1913.8701143003127},{"translateY":"-8%","rotate":"0.08702283351037376deg","duration":2606.9507884619575},{"translateY":"-4%","rotate":"-2.41729126162899deg","duration":2590.191366274868},{"translateY":"0%","rotate":"-0.25033008978749605deg","duration":2742.797097119803}],
			[{"translateY":"3%","rotate":"2.1214082144264266deg","duration":2423.9488552515586},{"translateY":"-2%","rotate":"-1.5849653633269245deg","duration":2080.52385591808},{"translateY":"-6%","rotate":"-0.3802296781713599deg","duration":1514.047096013701},{"translateY":"-10%","rotate":"-0.5210023844954192deg","duration":2227.151889715995},{"translateY":"-13%","rotate":"-1.6471837766507147deg","duration":2449.2316174094144},{"translateY":"-15%","rotate":"2.1257569768611875deg","duration":1734.0328235780685},{"translateY":"-17%","rotate":"-1.9102121398677896deg","duration":1515.986364898011},{"translateY":"-19%","rotate":"-0.11899447679420971deg","duration":2670.8077913006723},{"translateY":"-20%","rotate":"-1.1358428097347184deg","duration":2805.013304129934},{"translateY":"-21%","rotate":"0.6049662958823898deg","duration":2891.4947527672925},{"translateY":"-21%","rotate":"0.12244997028571625deg","duration":2724.9415625295205},{"translateY":"-21%","rotate":"0.8297085696673512deg","duration":1536.480097075524},{"translateY":"-20%","rotate":"1.8576183621057307deg","duration":2248.746273287963},{"translateY":"-18%","rotate":"-2.4076314912239893deg","duration":2615.165907749225},{"translateY":"-16%","rotate":"-0.21686505979936044deg","duration":2188.352063159714},{"translateY":"-14%","rotate":"1.5779559717849008deg","duration":1673.5769604710376},{"translateY":"-11%","rotate":"-0.4139681728402711deg","duration":2618.890605151763},{"translateY":"-8%","rotate":"1.2946659849149977deg","duration":2968.0959327587098},{"translateY":"-4%","rotate":"-1.038937899201372deg","duration":1943.4362025444204},{"translateY":"0%","rotate":"-0.023158491384291047deg","duration":1644.2345701321976}],
			// [{"translateY":"-2%","rotate":"-1.4252451888048934deg","duration":2442.106465586374},{"translateY":"-6%","rotate":"-0.6443668697087701deg","duration":2241.9729540697062},{"translateY":"-10%","rotate":"1.7019259708470607deg","duration":1773.304497230346},{"translateY":"-13%","rotate":"-0.328315145530631deg","duration":1844.105508538135},{"translateY":"-15%","rotate":"-0.4156510549606409deg","duration":2295.2629642362144},{"translateY":"-18%","rotate":"0.4786935205291911deg","duration":2315.1690206556505},{"translateY":"-19%","rotate":"0.9465590955701728deg","duration":2468.007734764805},{"translateY":"-20%","rotate":"0.9288857756226143deg","duration":2460.39670612208},{"translateY":"-21%","rotate":"0.6031153037330164deg","duration":1566.746630538518},{"translateY":"-21%","rotate":"2.2538586866050725deg","duration":2278.7387051377805},{"translateY":"-21%","rotate":"-1.1953799675980392deg","duration":2974.95071421192},{"translateY":"-20%","rotate":"-0.8366394500275021deg","duration":2469.506272044863},{"translateY":"-18%","rotate":"2.433784037748403deg","duration":2520.9508481174917},{"translateY":"-16%","rotate":"0.6354313766728623deg","duration":1672.6496953676815},{"translateY":"-14%","rotate":"1.0189801683391106deg","duration":2273.6424524313134},{"translateY":"-11%","rotate":"0.52700559339908deg","duration":2631.5231099276907},{"translateY":"-8%","rotate":"-0.542772859748506deg","duration":2441.821579065773},{"translateY":"-4%","rotate":"1.3107931790512617deg","duration":2826.7490578402126},{"translateY":"0%","rotate":"2.1653657026732294deg","duration":2675.7482467937534}],
			[{"translateY":"-7%","rotate":"-0.2851339481699613deg","duration":1828.872654431751},{"translateY":"-10%","rotate":"-0.09969043629632601deg","duration":2569.218091256566},{"translateY":"-13%","rotate":"0.931273929759767deg","duration":2559.1349022624713},{"translateY":"-16%","rotate":"1.5539257714747965deg","duration":1877.2373612778679},{"translateY":"-18%","rotate":"1.7676140866968577deg","duration":1919.3588849990858},{"translateY":"-19%","rotate":"-2.4532886607048465deg","duration":2763.5399529169717},{"translateY":"-20%","rotate":"1.5266085320887504deg","duration":2908.4009373196077},{"translateY":"-21%","rotate":"2.4888180221851064deg","duration":2102.2191191799543},{"translateY":"-21%","rotate":"-0.25557284417692916deg","duration":2555.6349679938776},{"translateY":"-21%","rotate":"-1.253340260381387deg","duration":1580.7957394619864},{"translateY":"-20%","rotate":"2.121587914282098deg","duration":1711.8073887879427},{"translateY":"-18%","rotate":"0.8082362308755622deg","duration":2403.729932020858},{"translateY":"-16%","rotate":"0.2746836778298025deg","duration":1842.3577274109407},{"translateY":"-14%","rotate":"-2.3780758998709772deg","duration":1929.5553190940918},{"translateY":"-11%","rotate":"2.222355452189765deg","duration":2607.9050341416005},{"translateY":"-7%","rotate":"1.0660928354683374deg","duration":1557.9877512515388},{"translateY":"-3%","rotate":"1.8553330785526798deg","duration":1654.19658456945},{"translateY":"-1%","rotate":"1.604427230394391deg","duration":2454.650155907618}]
		],
		// loopFlag: 1,
		init: function()
		{
			this.setSlidesAnime();
		},
		/**
		 * Метод для получения рандомного числа
		 * в диапазоне от from до to
		 */
		getRandom: function(from, to)
		{
			return (Math.random() * (to - from) + from) * 1;
		},
		/**
		 * Добавление анимации каждому слайду
		 */
		setSlidesAnime: function()
		{
			const largeSlides = $('.parallax-slide');

			if (!largeSlides.length) return false;

			$(largeSlides).each((index, element) => {
				let slideKey = `f${(~~(Math.random()*1e8)).toString(16)}`;
				$(element).attr('data-slide-id', slideKey);

				let animationIndex = Math.round(this.getRandom(0, this.animeFrames.length-1));
				let slideAnime = {
					isMouseEnter: false,
					moveDown: true,
					frames: /*this.animeFrames[animationIndex],*/ this.setKeyframes(),
					animation: anime({
						targets: $(element).find('.large-slider-sofa').toArray()[0],
						keyframes: /*this.animeFrames[animationIndex],*/ this.setKeyframes(),
						direction: 'alternate',
						loop: true,
						autoplay: false,
						easing: 'linear',
						loopBegin: (anim) => slideAnime.moveDown = !slideAnime.moveDown,
						update: (anim) => {
							if ( (Math.round(anim.progress) == 50 && slideAnime.isMouseEnter && !slideAnime.moveDown)
							|| Math.round(anim.progress) == 50 && slideAnime.isMouseEnter && slideAnime.moveDown )
							{
								slideAnime.animation.pause();
							}
						}
					})
				};
				this.slides[slideKey] = slideAnime;
			});
		},
		/**
		 * Метод для генерации фреймов
		 * со случайными величинами
		 */
		setKeyframes: function()
		{
			const getY = () => {
				coordsY = [];
				for (let x  = this.getRandom(-3, -5); x < 5; x += 0.5)
				{
					let newY = Math.round(Math.pow(x, 2) - 21) + '%';
					coordsY.push(newY);
				}
				return coordsY;
			};

			const getDegrees = () => {
				let from = -2.5;
				let to = 2.5;

				return (Math.random() * (to - from) + from * 1) + 'deg';
			};

			const getDuration = () => {
				let from = 1500;
				let to = 3000;

				return (Math.random() * (to - from) + from) * 1;
			};

			const coords = getY();
			const framesArr = [];

			coords.forEach((coordY) => {
				let newFrame = {translateY: coordY, rotate: getDegrees(), duration: getDuration()};
				framesArr.push(newFrame);
			});

			return framesArr;
		},
		sofaOnSlider:
		{
			currentAnimation: {},
			setCurrentAnimation(slider)
			{
				const animationID = ($(slider).parents('.parallax-slide').attr('data-slide-id'));
				this.currentAnimation = o2.sliderParallax.slides[animationID];
			},
			reverseCurrentAnimation(eventType)
			{
				const isAnimMovingDown = this.currentAnimation.moveDown;
				const animationProgress = this.currentAnimation.animation.progress;

				const isStartedAnimation = !isAnimMovingDown && animationProgress > 50 ? true : false;
				const isReversedAnimation = isAnimMovingDown && animationProgress < 50 ? true : false;

				if ( isStartedAnimation || isReversedAnimation )
				{
					if (eventType === 'onLeave')
					{
						this.currentAnimation.animation.pause();
					}
					this.currentAnimation.animation.reverse();
					this.currentAnimation.animation.completed = false;
					this.currentAnimation.animation.play();
				}
			},
			enter(instance)
			{
				this.setCurrentAnimation(instance);
				this.reverseCurrentAnimation('onEnter');
				this.currentAnimation.isMouseEnter = true;
			},
			leave()
			{
				this.currentAnimation.animation.play();
				this.reverseCurrentAnimation('onLeave');
				this.currentAnimation.isMouseEnter = false;
			}
		}
	},
	/**
	 *
	 */
	productCardPopup:
	{
		close()
		{
			$('.popup-product').fadeOut(250);
			bodyScrollLock.clearAllBodyScrollLocks({reserveScrollBarGap: true});
			document.removeEventListener('keyup', o2.popups.closeOnKeyUp);

			setTimeout(() =>
			{
				o2.sliders.setFullWidth('.slick-initialized');
			}, 50);
		},
		open()
		{
			bodyScrollLock.disableBodyScroll($('.popup-product'), {reserveScrollBarGap: true});

			$('.popup-product').fadeIn(500, function(){
				o2.sliders.productCardPopupSlider();
				$('.popup-product-body').css({'opacity':1});
			});
			document.addEventListener('keyup', this.closeOnKeyUp);
		},
		closeOnKeyUp(event)
		{
			if (event.keyCode === 27)
			{
				$('.popup-product').fadeOut(250);
				bodyScrollLock.clearAllBodyScrollLocks({reserveScrollBarGap: true});
				setTimeout(() =>
				{
					o2.sliders.setFullWidth('.slick-initialized');
				}, 50);
			}
		}
	},
	sidebar:
	{
		/**
		* делает сайдбар стики через скроллмэджик
		* height - высота страницы - высота сайдбара, иначе страница становится длинее на высоту скроллбара
		* тригеррится сразу если ""
		**/
		init()
		{
			var ua = window.navigator.userAgent;
			var old_ie = ua.indexOf('MSIE ');
			var new_ie = ua.indexOf('Trident/');

			if ((old_ie > -1) || (new_ie > -1)) {
				$('.sticky-sidebar-element').removeClass('sticky-sidebar-element').addClass('ie-sticky-sidebar-element');
				var scene = new ScrollMagic.Scene({triggerElement: '.ie-sticky-sidebar-element', triggerHook: 0})
								.setPin('.ie-sticky-sidebar-element')
								.addTo(o2.animations.scrollMagicController);
			}
		}
	},

	/**
	* отслеживание клика вне блока
	*/
	clickOutside(element, callback)
	{
		var outsideChecker = (event) =>
		{
			var container = $(element);

			if (!container.is(event.target) && container.has(event.target).length === 0)
			{
				document.removeEventListener('click', outsideChecker);
				callback();
			}
		};

		document.addEventListener('click', outsideChecker);

		return outsideChecker;
	},

	shops:
	{
		open: false,
		clickOutsideListener: null,

		/**
		* открытие/закрытие списка стран
		*/
		countrySelectDropdownToggle()
		{
			if(!this.open)
			{
				this.clickOutsideListener = o2.clickOutside($('.shops-select'), () => {
					o2.shops.countrySelectDropdownToggle()
				});

				$('.shops-select').addClass('shops-select_open-list');
				this.open = true;
			}
			else
			{
				$('.shops-select').removeClass('shops-select_open-list');
				document.removeEventListener('click', this.clickOutsideListener);
				this.open = false;
			}
		},

		/**
		* устанавливаем название выбранного города
		* и отображаем на карте магазины выбранного
		* города
		*/
		selectCountry(instance)
		{
			o2Maps.map.showShopsInCity($(instance).data('city-key'));

			$('.shops-select').find('._shops-select-name').html($(instance).html());
			this.countrySelectDropdownToggle();
		},

		toggleAccordeon(instance)
		{
			$(instance).parent().siblings().find('.shops-results-item__bot').slideUp(200);
			$(instance).parent().siblings().removeClass('shops-results-item_active');

			$(instance).next().slideToggle(200);
			$(instance).parent().toggleClass('shops-results-item_active');
		},
		listOfCityShops(){
			let shopsItems = '';
			let selectedCity = $('._shops-select-name').text();
			let selectedCityShops = window.shopsCoordinate[selectedCity.toLowerCase()];
			let shopItemHtml = `
						<div class="shops-results-item">
							<div class="shops-results-item__top" onclick="o2.shops.toggleAccordeon(this);">
								<div class="shops-results-item__address">
								<span class="shops-results-item__city">#city#</span>
								<svg role="img" class="arrow-down">
									<use xlink:href="#arrow-down"></use>
								</svg>
							</div>
								<div class="shops-results-item__name">#shopName#</div>
							</div>
							<div class="shops-results-item__bot">
								#shopAdress#
							</div>
						</div>`;

			$('.shops__results-city').text(selectedCity);

			for (shop in selectedCityShops)
			{
				shopsItems += shopItemHtml.replace(/#city#/g, selectedCity)
					.replace(/#shopName#/g, selectedCityShops[shop].name)
					.replace(/#shopAdress#/g, `${selectedCityShops[shop].address}, Время работы: ${selectedCityShops[shop].worktime} ${selectedCityShops[shop].phone}`);
			}
			$('.shops__results-items').html(shopsItems);
			$('.shops__results').fadeIn(500);
		},
		/**
		* Меняет содержимое кнопки 'купить' при нажатии на нее
		* на странице комплектов
		*/
		complectsButtonClick(instance)
		{
			$(instance).text('Оформить заказ');
		}
	},

	/**
	* методы связанные с шапкой сайта
	*/
	header:
	{
		/**
		* выбор города
		*/
		location:
		{
			/**
			* открыт ли выбор города
			*/

			open: false,
			/**
			* ссылка на обработчик клика вне блока
			*/

			clickOutsideListener: null,
			/**
			* открытие/закрытие списка городов
			*/
			citySelectDropdownToggle()
			{
				if(!this.open)
				{
					this.clickOutsideListener = o2.clickOutside($('.header-contacts-city'), () => {
						o2.header.location.citySelectDropdownToggle()
					});
					$('.header-contacts-city').addClass('header-contacts-city_open-list');
					this.open = true;
				}
				else
				{
					$('.header-contacts-city').removeClass('header-contacts-city_open-list');
					document.removeEventListener('click', this.clickOutsideListener);
					this.open = false;
				}
			},

			/**
			* устанавливаем название выбранного города
			*/
			setSelectedCityName(instance)
			{
				$('._select-city').find('._select-city-name').html($(instance).html());
			},

			/**
			* выбор города в шапке
			*/
			selectCityInHeader(instance)
			{
				// o2Maps.map.showShopsInCity($(instance).data('city-key'));
				o2.header.location.citySelectDropdownToggle();
				$('.header-contacts-city-list__item').each( (index, element) => {
					if ( $(element).hasClass('header-city_active') )
						$(element).removeClass('header-city_active');
				})
				$(instance).addClass('header-city_active');
				this.setSelectedCityName(instance);
			},

			/**
			* выбор города в мобильном меню
			*/
			selectCityInPopup(instance)
			{
				o2.popups.close();
				o2.dropdown.toggle(instance);
				this.setSelectedCityName(instance);
			},

		},
		/**
		* октрываем всплывашки в шапке
		*/
		openPopover(popoverName)
		{
			if($(window).width() > 740)
				o2.popover.open(popoverName);
			else
				o2.popups.open(popoverName);
		}
	},
	/**
	 * Объект для реализации методов
	 * на странице о бренде
	 */
	aboutBrand:
	{
		commentView(event)
		{
			event.preventDefault();

			let openButton = $(event.target);
			if (!openButton.hasClass('_opened'))
			{
				openButton.addClass('_opened');
				openButton.text('Свернуть');
			}
			else
			{
				openButton.removeClass('_opened');
				openButton.text('Читать целиком');
				// openButton.prev('.about-brand-review__text').css('height', '');
			}
			openButton.prev().toggleClass('about-brand-review__text_view');
		}
	},
	/**
	 * Объект для реализации методов
	 * на странице карточка товара
	 */
	productCard:
	{
		/**
		* Добавляет класс выбранному элементу на странице
		* карточки товара и делает элемент актиным
		*/
		selectSofaType(instance)
		{
			var sofaTypes = $('.product-card__type');
			sofaTypes.each(function(index, element){
				if ($(this).hasClass('product-card__type_selected'))
					$(this).removeClass('product-card__type_selected')

				$(instance).addClass('product-card__type_selected')
			})
		},
		popupMaterial:
		{
			popupInfoToggle: function(instance)
			{
				var materialInfo = $(instance).parents('.fabric-gallery__info');

				materialInfo.find('.fabric-gallery__text').slideToggle(200);

				if (!materialInfo.hasClass('_info-opened'))
				{
					materialInfo.find('.fabric-gallery__desc').toggleClass('fabric-gallery__desc_margin');
					materialInfo.addClass('_info-opened');
					$(instance).text('Скрыть');
				}
				else
				{
					materialInfo.removeClass('_info-opened');
					$(instance).text('Информация о материале');
				}

				// materialInfo.find('.fabric-gallery__compos').slideToggle(500);
			},
			scrollToSelectedMaterial(instance, event)
			{

				event.preventDefault();

				let curMaterialId = $(instance).data('fabric-id');
				let offsetMargin = 50;
				let popupContainer = $(instance).parents('.popup-body').find('.popup-body-html');
				if ($(window).width() < 740)
				{
					offsetMargin = 135;
					o2.dropdown.setSelectedMaterialName(instance);
				}
				$('.popup-body-html').animate({
					scrollTop: $(`.fabric-gallery__card[data-fabric-id=${curMaterialId}]`).offset().top - popupContainer.offset().top + popupContainer.scrollTop()
				}, 400);
			}
		},
		chooseMaterial(instance, event)
		{
			event.preventDefault();
			$('.product-card__materials-img').each( (index, element) => {
				$(element).removeClass('product-card__materials-img_active');
			} )
			$(instance).find('.product-card__materials-img').addClass('product-card__materials-img_active');
		},
		clickBuyButton(instance)
		{
			var productBuyButton = $(instance)
			if (!productBuyButton.hasClass('_product-added'))
			{
				productBuyButton.addClass('_product-added').text('Добавить в корзину')
			}
			else
			{
				productBuyButton.addClass('product-card__btn-buy').text('Добавить');
				$('.product-card__btn-order').fadeIn(250);
			}
		},
		sofaDescriptionPopover:
		{
			popoverMargin:
			{
				top: 0,
				left: 0
			},
			openedPopup: false,
			clickOutsideListener: false,
			setPopoverCoordinates(popover, top, left)
			{
				popover.css({'top' : top + 'px', 'left' : left + 'px'});
			},
			open(instance)
			{
				$(instance).addClass('product-card__description-more_openend');

				this.calcPopoverMargin();

				var elementPositionTop = parseInt($(instance).css('top'));
				var elementPositionLeft = parseInt($(instance).css('left'));

				var popoverContainer = $(instance).next();
				var popoverPositionTop, popoverPositionLeft;

				if ( elementPositionLeft < ( $('.main-container__right').outerWidth() / 2) )
				{
					popoverPositionLeft = elementPositionLeft + $(instance).width() + this.popoverMargin.left;

					if ( popoverContainer.outerWidth() > ($('.main-container__right').outerWidth() - popoverPositionLeft))
					{
						popoverPositionTop = elementPositionTop + 50;
						popoverPositionLeft = elementPositionLeft - 70;
					}
					else
					{
						popoverPositionTop = elementPositionTop - this.popoverMargin.top;
					}
				}
				else
				{
					popoverPositionTop = elementPositionTop - this.popoverMargin.top;
					popoverPositionLeft = elementPositionLeft - popoverContainer.outerWidth() - this.popoverMargin.left;
				}
				this.setPopoverCoordinates(popoverContainer, popoverPositionTop, popoverPositionLeft);

				$(popoverContainer).fadeIn(300, () => {
					this.clickOutsideListener = o2.clickOutside(popoverContainer, () => {
						o2.productCard.sofaDescriptionPopover.close($(instance));
					});
					this.openedPopup = popoverContainer;
				});
			},

			/* Расчет отступов поповера от кнопки открытия/закрытия
			 * в зависмости от разрмеров экрана
			 */
			calcPopoverMargin(){
				if ($(window).width() >= 1440)
				{
					this.popoverMargin.top = 43;
					this.popoverMargin.left = 57;
				}
				else if ( $(window).width() < 1440 && $(window).width() >= 1024 )
				{
					this.popoverMargin.top = 30;
					this.popoverMargin.left = 35;
				}
				else if( $(window).width() < 1024 && $(window).width() >+ 740 )
				{
					this.popoverMargin.top = 25;
					this.popoverMargin.left = 35;
				}
				else
				{
					this.popoverMargin.top = 125;
					this.popoverMargin.left = 35;
				}
			},
			close(popoverTrigger)
			{
				popoverTrigger.removeClass('product-card__description-more_openend');;
				$(this.openedPopup).fadeOut(300);
				document.removeEventListener('click', this.clickOutsideListener);
			}
		},

		sideBar:
		{
			selectSofaType(instance)
			{
				const selectedType = $(instance);
				const selectedTypeName = selectedType.find('.o-radio__text').text();

				selectedType.parents('.product-card__types').find('.product-card__sofa-type').text(selectedTypeName.toLowerCase());
			},
			scrollToSection(section, event)
			{
				event.preventDefault();
				$('html, body').animate({
					scrollTop: $(section).offset().top - 10
				}, 400);
			}
		},

	},
	/**
	* объект для работы с попапами
	*/
	popups:
	{
		/**
		* текущий timeline анимации
		*/
		currentTimeLine: false,

		/**
		* текущий открытый попап в dom
		*/
		openedPopupBox: false,

		/**
		* название открытого попапа
		*/
		openedPopupName: '',

		/**
		* анимация открытия/закрытия
		*/
		animate(popupBox, popupBoxName)
		{
			this.currentTimeLine = anime.timeline({
				autoplay: false,
				duration: 250,
				easing: 'linear',
			});

			const burger = $('.header-burger:visible');

			this.currentTimeLine
			.add({
				targets: $(this.openedPopupBox).find('.popup-overlay').get(0),
				opacity: [0, 1],
			})
			.add({
				targets: $(this.openedPopupBox).find('.popup-body').get(0),
				translateX: ['100%', 0],
			})
			.add({
				targets: $(this.openedPopupBox).find('.popup-body-html').get(0),
				opacity: [0, 1],
				duration: 250,
			})
			////////////
			let burgerAnimObj = {
				targets: $(burger).get(0),
				duration: 200,
				translateX: ''
			};

			if( (burger.length) && ( $(window).width() > 375) )
				burgerAnimObj.translateX = ($(window).width() - $(burger).offset().left) - ($(burger).width() + 22);
			else
				burgerAnimObj.translateX = 0;

			this.currentTimeLine.add(burgerAnimObj, 300);
		},

		/**
		* открытие/закрытие при помощи бургера
		*/
		toggleByBurger(popupName)
		{
			if(this.openedPopupName)
			{
				$('.header-burger').removeClass('header-burger_active');
				this.close()
			}
			else
			{
				$('.header-burger').addClass('header-burger_active');
				this.open(popupName);
			}
		},

		/**
		* открытие попапа по дата атрибуту
		*/
		open(popupName)
		{
			let timeForOpen = 0;
			if(this.openedPopupName === popupName)
			{
				this.close();
				return false;
			}

			if(this.openedPopupName && this.openedPopupName != popupName)
				timeForOpen = this.close();

			setTimeout(() => {
				this.openedPopupName = popupName;
				this.openedPopupBox = $('.popup-wr[data-popup-name="' + this.openedPopupName + '"]');

				$(this.openedPopupBox).css({'display': 'flex'});
				bodyScrollLock.disableBodyScroll($(this.openedPopupBox).find('.popup-body-html')[0], {reserveScrollBarGap: true});

				this.animate(this.openedPopupBox);
				this.currentTimeLine.play();

				if($(this.openedPopupBox).find('.popup-slider').attr('class') == 'popup-slider')
				{
					o2.sliders.popupSlider(this.openedPopupBox);
				};
			}, timeForOpen);
			document.addEventListener('keyup', this.closeOnKeyUp);
		},

		/**
		* закрытие попапов
		*/
		close()
		{
			this.currentTimeLine.reverse();
			this.currentTimeLine.completed = false;
			this.currentTimeLine.play();

			if ( (this.openedPopupName === 'menu') || (this.openedPopupName === 'request') )
				$('.header-burger').removeClass('header-burger_active');

			setTimeout(() => {
				$('.popup-wr').hide();
				bodyScrollLock.clearAllBodyScrollLocks({reserveScrollBarGap: true});
			}, this.currentTimeLine.duration);

			this.openedPopupBox = '';
			this.openedPopupName = '';
			document.removeEventListener('keyup', this.closeOnKeyUp);
			return this.currentTimeLine.duration;

		},
		closeOnKeyUp: function(event)
		{
			if (event.keyCode === 27)
				o2.popups.close();
		}
	},

	// всплывающие окна авторизация и отправка завяки
	popover:
	{
		clickOutsideListener: null,
		openedPopover: null,
		open(popoverName)
		{
			const popover = $('.popover-wr[data-popover-name="' + popoverName + '"]');
			const pageContaienr = $('.container');
			const y = ($(window).width() - $(pageContaienr).width()) / 2;

			if(y < 40)
				$(popover).css({'right': 0});
			else
				$(popover).css({'right': (-(y - 20)) / 4});

			$(popover).fadeIn(200, () =>
			{
				this.clickOutsideListener = o2.clickOutside(popover, () => {
					o2.popover.close();
				});
				this.openedPopover = popover;
			});
		},
		close()
		{
			$(this.openedPopover).fadeOut(200);
			this.openedPopover = null;
			document.removeEventListener('click', this.clickOutsideListener);
			this.clickOutsideListener = null;
		}
	},

	/**
	* объект для работы с дропдаунами
	*/
	dropdown:
	{
		/**
		* открыть/закрыть выпадающий спсиок
		*/
		toggle(instance)
		{
			o2.lazyLoad.lazy.update();
			var parent = $(instance).parents('.dropdown-wr').first();
			$(parent).find('.dropdown-list').first().slideToggle(200);
			$(parent).find('.dropdown-activator').first().toggleClass('dropdown-activator_active');
			$(parent).toggleClass('dropdown-wr_active');
		},
		productCardMechanismToggle(instance)
		{
			this.toggle(instance);
			var dropdownActivator = $(instance);

			if (dropdownActivator.hasClass('dropdown-activator_active'))
				dropdownActivator.text('Информации о механизме');
			else
				dropdownActivator.text('Свернуть');
		},
		/**
		 * открытие закрытие выпадающего списка в попапе материалов
		 */
		materialToggle(instance)
		{
			$(instance).toggleClass('open');
		},
		/**
		 * Подстановка выбранного материала в
		 * dropdown
		 */
		setSelectedMaterialName(instance)
		{
			var selectedItemName = $(instance).text().replace(/,/g, '');
			$('._select-item').find('._select-item-name').text(selectedItemName);
		}
	},
	/**
	* завяка для обратного звонка
	*/
	feedbackRequest:
	{
		form: false,
		formParent: false,
		/**
		* отправка заявки
		*/
		send(instance, event)
		{
			event.preventDefault();
			this.form = $(instance);
			this.formParent = this.form.parents('.popover-request-wr');
			this.clearErrors();
			if ( o2.validation.validateForm(instance) )
			{
				this.formParent.addClass('popover-request-wr_sended');
				this.formParent.find('button[type="submit"]').prop('disabled', true);
				BX.ajax.post($(instance).attr('action'), this.form.serialize(), BX.proxy(this.successAjax, this));
			}
			$(parent).find('.dropdown-activator').toggleClass('dropdown-activator_active');
			$(parent).find('.dropdown-list').slideToggle(300);
		},
		/**
		 * очистка ошибок всей формы перед отправкой
		 */
		clearErrors: function()
		{
			if(!this.form)
				return;
			this.form.find('input').removeClass('input_error').siblings('.input__sub-text_error').empty();
		},

		/**
		 * обработка завершения запроса
		 */
		successAjax: function(msg)
		{
			if(!this.form)
				return;

			msg = JSON.parse(msg);

			if(msg.success)
				this.showSuccessBlock();
			else
				this.showErrors(msg.errors);
		},

		/**
		 * отображение ошибок
		 */
		showErrors: function(errors)
		{
			$.each(
				errors,
				BX.proxy(this.showError, this)
			);
		},

		/**
		 * отображение одной ошибки
		 */
		showError: function(field, error)
		{
			this.form.find('input[name="'+field+'"]').addClass('input_error').siblings('.input__sub-text_error').html(error);
		},

		/**
		 * отображение блока, оповещающего о успешной отправке формы
		 */
		showSuccessBlock: function(errors)
		{
			var rquestBlock = this.formParent;

			if(!rquestBlock)
				return;

			$(rquestBlock).find('.popover-request-form').fadeOut(200, () => {
				$(rquestBlock).find('.popover-request-success').fadeIn(200).css({'display': 'flex'});
			});
		}
	},

	rangeSlider:
	{
		init()
		{
			$('.range-slider').each((index, element) => {
				const dataParams = $(element).data();
				// const name = $(element).attr('data-field-name');
				const minName = $(element).attr('data-field-min-name');
				const maxName = $(element).attr('data-field-max-name');
				const type = $(element).attr('data-type');

				const slider = noUiSlider.create(element, {
					start: [dataParams.from, dataParams.to],
					connect: true,
					step: 1,
					range: {
						'min': dataParams.min,
						'max': dataParams.max
					},
				});
				if(type == 'single')
					$(element).find('.noUi-origin').first().attr('disabled', true);

				// настраиваем лэйблы для слайдера
				const sliderLabels = $(element).siblings('.range-slider-labels');
				if(sliderLabels.length)
				{
					const labelFrom = sliderLabels.find('.range-slider-labels_from');
					const labelTo = sliderLabels.find('.range-slider-labels_to');
					slider.on('update', function(values)
					{
						labelFrom.html(Number(values[0]));
						labelTo.html(Number(values[1]));
					});
				};
				slider.on('set', function (values, handle) {
					if (handle == 0)
						$(this.target).siblings('input[name="' + minName + '"]').trigger('change')
					else
						$(this.target).siblings('input[name="' + maxName + '"]').trigger('change')
				});
				slider.on('update', function(values)
				{
					$(this.target).siblings('input[name="' + minName + '"]').val(values[0]);
					$(this.target).siblings('input[name="' + maxName + '"]').val(values[1]);
				});
			})
		}
	},

	/**
	* все связанное с личным кабинетом
	*/
	personal:
	{
		inputs: '',

		changedItems: {},

		changePersonalInfo: function(instance) {
			this.inputs = $(instance).parents('.personal__item').find('.personal__input');
			this.changedItems = $(instance).parents('.personal__item').find('.personal__item_visibl');
			for (var i = 0; i < this.changedItems.length; i++)
			{
				$(this.inputs[i]).val($(this.changedItems[i]).text().trim());
			}

			$(instance).hide();
			$(instance).next().show();

			this.changedItems.hide();
			this.inputs.show();
		},
		updateUserInfo: function(instance) {
			for (var i = 0; i < this.changedItems.length; i++)
			{
				$(this.changedItems[i]).text($(this.inputs[i]).val());
			}

			this.inputs.hide();
			this.changedItems.show();

			$(instance).parents('.personal__item').find('.personal__item-change-ctrl-wr').hide();
			$(instance).parents('.personal__item').find('.personal__item-change-ctrl-wr').prev().show();
		},
		canselEdit: function(instance) {
			this.inputs = $(instance).parents('.personal__item').find('.personal__input');
			this.changedItems = $(instance).parents('.personal__item').find('.personal__item_visibl');

			this.inputs.hide();
			this.changedItems.show();

			$(instance).parents('.personal__item').find('.personal__item-change-ctrl-wr').hide();
			$(instance).parents('.personal__item').find('.personal__item-change-ctrl-wr').prev().show();
		},

		/**
		* выбор доставки
		*/
		toggleDeliveryType(instance)
		{
			var input = $(instance).parent().find('input');

			$('.cart-info__delivery-type-item').removeClass('cart-info__delivery-type-item_active')

			if(input.prop('checked'))
				$(instance).parent().addClass('cart-info__delivery-type-item_active')

			$('.cart-info__delivery-params-item').hide()

			if($('.cart-info__delivery-type-item_active').hasClass('_delivery'))
			{
				$('.cart-info__body-right').addClass('cart-info__body-right_hidden')
				$('._deliveryParams').fadeIn(200)
			}

			if($('.cart-info__delivery-type-item_active').hasClass('_pickup'))
			{
				$('.cart-info__body-right').removeClass('cart-info__body-right_hidden')
				$('._pickupParams').fadeIn(200);
			}
		},

		/**
		* тоглл аккордеона с магазами
		*/
		togglePickupInfo(instance)
		{
			$('.cart-info__shops-item-info').slideUp(200)

			if($(instance).prop('checked'))
				$(instance).parent().find('.cart-info__shops-item-info').slideDown(200)
		},
		togglePromoInput(instance)
		{
			$(instance).parent().next().fadeToggle(200)
		},
	}
}