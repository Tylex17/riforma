// работа с куками
cookie =
{
	/**
	* set cookie
	*/
	set:function(name, value, options)
	{
		options = options || {};
		var updatedCookie = name + "=" + value;
		for (var propName in options)
		{
			updatedCookie += "; " + propName;
			var propValue = options[propName];
			if (propValue !== true)
			{
				updatedCookie += "=" + propValue;
			}
		}
		document.cookie = updatedCookie;
	},
	/**
	* get cookie
	*/
	get:function(name)
	{
		var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	},

	/**
	* delete cookie
	*/
	delete:function(name)
	{
		document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
};