"use strict"
cart =
{
	totalPrice : 0,
	cartObj    : [],

	/**
	* cart init function
	*/
	init: function()
	{
		var cart = o2.cookie.get('cart');

		this.cartObj = (typeof cart != 'undefined') ? JSON.parse(cart):[];
		this.recalc();
		this.updateText();
		this.toggleHeaderClassClass();

	},

	/**
	* тоглит класс на иконке хедера
	*/
	toggleHeaderClassClass()
	{
		if(this.cartObj.length == 0)
			$('.header-cart').removeClass('header-cart_not-empty')
		else
			$('.header-cart').addClass('header-cart_not-empty')
	},

	/**
	* update cookie
	*/
	updateCookie: function()
	{
		o2.cookie.set(
			'cart',
			JSON.stringify(this.cartObj),
			{path:'/'}
		);
	},

	/**
	* update text
	*/
	updateText: function()
	{
		var self = this;

		$('._cartNum').each(function(index, item)
		{
			$(item).text(self.cartObj.length)
		})
		$('._text').each(function(index, item)
		{
			$(item).text(self.returnWord())
		})
	},

	/**
	* return word
	*/
	returnWord: function()
	{
		var cartLength = this.cartObj.length % 100,
			mod        = cartLength % 10;

		if(cartLength != 11 && mod == 1)
			return ' товар';
		else if(mod >= 2 && mod <= 4 && (cartLength < 10 || cartLength > 20))
			return ' товара';
		else
			return ' товаров';
	},

	/**
	* add item to cart
	*/
	addProduct: function(instance)
	{
		var productTpl = $(instance).closest('._product '),
			id = productTpl.attr('data-id')
			count = 1;

		var product = {
			'id' : id,
			'count' : count
		}

		for(var index in this.cartObj)
		{
			if(this.cartObj[index].id != id)
				continue

			this.cartObj[index].count += 1
			this.updateCookie();
			return
		}

		this.cartObj.push(product);
		this.updateText();
		this.updateCookie();
		this.toggleHeaderClassClass();

	},

	/**
	* recalc items prices
	*/
	recalc: function(instance)
	{
		var currentItem = $(instance).closest('._product'),
			self        = this;

		$.each(this.cartObj, function(index, item)
		{
			var cartItem = self.cartObj[index];

			if(item.id != +currentItem.attr('data-id'))
				return true;


			var priceWithDiscount = +currentItem.attr('data-price') / 100 * (100 - +currentItem.attr('data-discount'))

			currentItem.find('._stack-price').html(priceWithDiscount * +currentItem.find('._count').val());
		});


		this.updateCookie()
		this.calcTotalPrice()
	},

	/**
	* set total price
	*/
	calcTotalPrice()
	{
		var self = this;

		this.totalPrice = 0;

		$('.cart__items ._product').each(function(index, item)
		{
			self.totalPrice += +$(item).find('._stack-price').html();
		});

		$('._totalPrice').html(this.totalPrice)
	},


	/**
	* remove item from cart
	*/
	removeFromCart: function(instance)
	{
		currentItem = $(instance).closest('._product');

		var self = this

		$.each(this.cartObj, function(index, item)
		{
			var cartItem = self.cartObj[index];

			if(cartItem.id != +currentItem.attr('data-id'))
				return true;

			self.cartObj.splice(index, 1)
			return false;
		});

		this.updateCookie()
		this.toggleHeaderClassClass()

		setTimeout(function()
		{
			currentItem.remove();
			self.recalc();
			self.updateText();
		},200);
	},
}