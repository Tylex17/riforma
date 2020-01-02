var deliveryAnim =
{
	deliveryAnimate:{},
	scrollPosition: false,
	animateItems:
	[
		{
			section: '#delivery1',
			icon : '.delivery-icon-1',
			offset: false
		},
		{
			section: '#delivery2',
			icon : '.delivery-icon-2',
			offset: false
		},
		{
			section: '#delivery3',
			icon : '.delivery-icon-3',
			offset: false
		},
		{
			section: '#delivery4',
			icon : '.delivery-icon-4',
			offset: false
		},
	],
	/**
	* убирает активность при переключении блока
	**/
	removeActive()
	{
		$('.delivery-icon').removeClass('delivery-icon_active')
	},

	/**
	* задает оффсеты и на скролл делает всякое
	**/
	init()
	{
		for(var index in this.animateItems)
		{
			var element = $(this.animateItems[index].section)

			if(!element.length)
				return false

			this.animateItems[index].offset = element.offset().top
		}

		$('.delivery-icon-1').addClass('delivery-icon_active')

		window.addEventListener('scroll', function() {

			this.scrollPosition = $(document).scrollTop() + $(window).height() - $('.sidebar-head__bottom').height();

			if(this.scrollPosition < this.animateItems[1].offset)
			{
				this.removeActive()
				$('.delivery-icon-1').addClass('delivery-icon_active')
			}

			else if(this.animateItems[1].offset < this.scrollPosition && this.scrollPosition < this.animateItems[2].offset)
			{
				this.removeActive()
				$('.delivery-icon-2').addClass('delivery-icon_active')
			}

			else if(this.animateItems[2].offset < this.scrollPosition &&  this.scrollPosition < this.animateItems[3].offset)
			{
				this.removeActive()
				$('.delivery-icon-3').addClass('delivery-icon_active')
			}
			else if(this.scrollPosition > this.animateItems[3].offset)
			{
				this.removeActive()
				$('.delivery-icon-4').addClass('delivery-icon_active')
			}

		}.bind(this));
	}
}