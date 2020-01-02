/**
* объект с различными слайдера
*/
const o2Sliders =
{
	init()
	{
		this.initSliderBySelector('.sofa-types-mob-slider', 740); //слайдер типов диванов на мобилке
		this.initSliderBySelector('.accessories__slider', 1200); //слайдер карточек аксессуаров
		this.initSliderBySelector('._cart-acessories-slider', 1200); //слайдер карточек аксессуаров
		this.initSliderBySelector('.produc-card__reviews-wr', 2560);
		this.initSliderBySelector('.discount-center__menu-mob-slider', 740); //слайдер карточек аксессуаров
		this.modelInStockSlider();
		this.salesSlider();
		this.largeSlider();
		this.productCardSlider();
		this.aboutReviewsSlider();
	},
	windowResizeListeners: {},
	setFullWidth(sliderClass)
	{
		let offsetLeftFrom = $('.main-container__right');

		if($(sliderClass).parents('.popup-wr').length)
		{
			offsetLeftFrom = sliderClass;
		}

		const setWidth = () => {
			if($(window).width() > 320)
				$(sliderClass).width($(window).width() - $(offsetLeftFrom).offset().left);
			else
				$(sliderClass).width( $(window).outerWidth() - $(offsetLeftFrom).offset().left );
			}
			o2.sliders.windowResizeListeners[sliderClass] = setWidth;

		setWidth();

		if(o2.sliders.windowResizeListeners[sliderClass])
			$(window).unbind('resize', o2.sliders.windowResizeListeners[sliderClass]);

		$(window).on('resize', o2.sliders.windowResizeListeners[sliderClass]);
	},
	removeFullWidth(sliderClass)
	{
		$(window).unbind('resize', o2.sliders.windowResizeListeners[sliderClass]);
		setTimeout(() => {
			$(sliderClass).width('auto');
		}, 0)
	},
	setSliderHelpers(slider)
	{
		$(slider)[0].slick.getNavigableIndexes = function() {
			var _ = this,
				breakPoint = 0,
				counter = 0,
				indexes = [],
				max;

			if (_.options.infinite === false) {
				max = _.slideCount;
			} else {
				breakPoint = _.options.slideCount * -1;
				counter = _.options.slideCount * -1;
				max = _.slideCount * 2;
			}

			while (breakPoint < max) {
				indexes.push(breakPoint);
				breakPoint = counter + _.options.slidesToScroll;
				counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
			}

			return indexes;
		}

		// fix lazyload content
		$(slider).on('beforeChange', () => {
			o2.lazyLoad.lazy.update();
		});
	},
	// инициализация/уничтожение слайдера при определенной ширине
	initOnWindowResize(slider, sliderOptions, windowSize)
	{
		const windowWidth = $(window).outerWidth();
		$(window).on('resize', (e) =>
		{
			var breakpointsType = false;

			if(Array.isArray(windowSize))
				breakpointsType = (windowSize[1] < windowWidth || windowWidth < windowSize[0])
			else
				breakpointsType = $(window).width() > windowSize

			if(breakpointsType)
			{
				if($(slider).hasClass('slick-initialized'))
				{
					$(slider).slick('unslick');
					sliderOptions.unslickCallback(sliderOptions.sliderName);
				}
			}
			else
			{
				if(!$(slider).hasClass('slick-initialized'))
				{
					sliderOptions.initCallback(sliderOptions.sliderName);
					$(slider).slick(sliderOptions);
					o2.sliders.setSliderHelpers(slider);
				}
			}
		});
	},
	initSliderBySelector(slider, winSize)
	{
		const sofaTypesMobSlider = $(slider);
		const windowSize = winSize;

		if(!sofaTypesMobSlider.length)
			return false;

		const sliderOptions = {
			sliderName: slider,
			variableWidth: true,
			arrows: false,
			swipeToSlide: true,
			initCallback: o2.sliders.setFullWidth,
			unslickCallback: o2.sliders.removeFullWidth
		}

		if($(window).outerWidth() < windowSize)
		{
			$(sofaTypesMobSlider).slick(sliderOptions);
			this.setFullWidth(sliderOptions.sliderName);
			this.setSliderHelpers(sofaTypesMobSlider);
		}

		this.initOnWindowResize(sofaTypesMobSlider, sliderOptions, winSize);
	},
	/**
	 * слайдер в попапе
	 */
	popupSlider(popup)
	{
		const popupSlider = $(popup).find('.popup-slider');

		if(!popupSlider.length || popupSlider.hasClass('slick-initialized'))
			return false;

		popupSlider.slick({
			variableWidth: true,
			arrows: true,
			lazyLoad: 'ondemand',
			swipeToSlide: true,
			prevArrow: $(popupSlider).parents('._slider-wr').find('._slider-prev'),
			nextArrow: $(popupSlider).parents('._slider-wr').find('._slider-next'),
			swipe: true
		});
		this.setSliderHelpers(popupSlider);
	},
	// слайдер c аксессуарами в корзине
	accesoriesSlider()
	{
		const cartAccesoriesSlider = $('._cart-acessories-slider');
		const windowSizeStart = 1439;
		const windowSizeEnd = 740;

		var widthes = [];
		widthes.push(windowSizeEnd);
		widthes.push(windowSizeStart);

		if(!cartAccesoriesSlider.length)
			return false;

		const sliderOptions = {
			sliderName: '._cart-acessories-slider',
			variableWidth: true,
			arrows: false,
			swipeToSlide: true,
			initCallback: o2.sliders.setFullWidth,
			unslickCallback: o2.sliders.removeFullWidth
		}
		if(windowSizeEnd < $(window).width() && $(window).width() < windowSizeStart)
		{
			$(cartAccesoriesSlider).slick(sliderOptions);
			this.setFullWidth(sliderOptions.sliderName);
			this.setSliderHelpers(cartAccesoriesSlider);
		}

		this.initOnWindowResize(cartAccesoriesSlider, sliderOptions, widthes);
	},
	// ============= modelInStockSlider и salesSlider одинаковые, потом отрефакторить
	modelInStockSlider()
	{
		const modelInStockSlider = $('.models-in-stock-slider');

		if(!modelInStockSlider.length) return false;

		this.setFullWidth('.models-in-stock-slider');
		$(modelInStockSlider).slick({
			variableWidth: true,
			arrows: false,
			swipe: true,
			swipeToSlide: true,
		});
		this.setSliderHelpers(modelInStockSlider);
	},

	salesSlider()
	{
		const modelInStockSlider = $('.sale__items-slider');

		if(!modelInStockSlider.length) return false;

		this.setFullWidth('.sale__items-slider');
		$(modelInStockSlider).slick({
			variableWidth: true,
			arrows: false,
			swipe: true,
			swipeToSlide: true,
		});
		$(modelInStockSlider).on('beforeChange', function(event, slick, currentSlide, nextSlide){
			o2.lazyLoad.lazy.update();
		});
		this.setSliderHelpers(modelInStockSlider);
	},

	// слайдер отзывов на странице о брэнде
	aboutReviewsSlider()
	{
		const aboutReviewsSlider = $('.about-brand__reviews-slider');

		if(!aboutReviewsSlider.length) return false;

		this.setFullWidth('.about-brand__reviews-slider');
		$(aboutReviewsSlider).slick({
			variableWidth: true,
			arrows: false,
			swipe: true,
			swipeToSlide: true,
		});
		$(aboutReviewsSlider).on('beforeChange', function(event, slick, currentSlide, nextSlide){
			o2.lazyLoad.lazy.update();
		});
		this.setSliderHelpers(aboutReviewsSlider);
	},

	// большой слайдер в шапке и на других страницах
	largeSlider()
	{
		const largeSliders = $('.large-slider');

		if(!largeSliders.length) return false;

		this.setFullWidth('.large-slider');
		$(largeSliders).each((index, slider) => {
			var sliderParams = {
				variableWidth: true,
				arrows: true,
				lazyLoad: 'ondemand',
				swipeToSlide: true,
				prevArrow: $(slider).parents('._slider-wr').find('._slider-prev'),
				nextArrow: $(slider).parents('._slider-wr').find('._slider-next'),
				swipe: true,
			};

			if ($(slider).parent().hasClass('riforma-furniture-slider'))
			{
				sliderParams.responsive = [
					{
						breakpoint: 740,
						settings: {
							dots: true
						}
					}
				]
			}

			if($(slider).find('._sofa').length)
			{
				$(slider).on('init', (nextSlide) => {
					const slideId = $(slider).find('.slick-active .parallax-slide').data('slide-id');
					o2.sliderParallax.slides[slideId].animation.play();
					////
					$('.animations__content').html(JSON.stringify(o2.sliderParallax.slides[slideId].frames))
				});

				$(slider).slick(sliderParams);

				$(slider).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
					const slideId = $(slider).find('.slick-active .parallax-slide').data('slide-id');
					o2.sliderParallax.slides[slideId].animation.pause();
				});

				$(slider).on('afterChange', (nextSlide) => {
					const slideId = $(slider).find('.slick-active .parallax-slide').data('slide-id');
					o2.sliderParallax.slides[slideId].animation.play();
					//
					$('.animations__content').html(JSON.stringify(o2.sliderParallax.slides[slideId].frames))
				});
			}
			else
			{
				$(slider).slick(sliderParams);
			}
			this.setSliderHelpers(slider);
		});
	},
	// большой слайдер на странице товара
	productCardSlider()
	{
		const productCardSlider = $('.product-card-slider');

		if(!productCardSlider.length) return false;

		this.setFullWidth('.product-card-slider');
		$(productCardSlider).slick({
			asNavFor: '.product-card-slider-nav',
			arrows: false,
			dots: false,
			swipeToSlide: true,
			responsive: [
				{
					breakpoint: 740,
					settings: {
						dots: true
					}
				}
			]
		});
		$('.product-card-slider-nav').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			asNavFor: '.product-card-slider',
			centerMode: true,
			centerPadding: '0px',
			focusOnSelect: true,
			swipeToSlide: true,
			arrows: false
		});
	},
	// слайдер в попапе на странице карточки товара
	productCardPopupSlider()
	{
		const productPopupSlider = $('.popup-product-slider');

		if(productPopupSlider.length && productPopupSlider.hasClass('slick-slider')) return false;

		this.setFullWidth('.popup-product-slider');
		$(productPopupSlider).slick({
			asNavFor: '.popup-product-slider-nav',
			arrows: false
		});

		$('.popup-product-slider-nav').slick({
			asNavFor: '.popup-product-slider',
			arrows: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '77px',
			vertical: true,
			verticalSwiping: true,
			swipeToSlide: true,
			focusOnSelect: true,
			responsive:
			[
				{
					breakpoint: 1200,
					settings:
					{
						centerPadding: '65px',
					}
				},
				{
					breakpoint: 950,
					settings:
					{
						vertical: false,
						verticalSwiping: false,
						slidesToShow: 5,
						centerPadding: '0px'
					}
				}
			]
		});
	}
}