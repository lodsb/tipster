 /*
 * jquery.socialshareprivacy.js | 2 Klicks fuer mehr Datenschutz
 *
 * Copyright (c) 2013 hacklschorsch & lodsb
 *
 * is released under the MIT License http://www.opensource.org/licenses/mit-license.php
 *
 * Spread the word, link to us if you can.
 */

(function ($, undefined) {
	"use strict";

	function get (self, options, uri, settings, name) {
		var value = options[name];
		if (typeof value === "function") {
			return value.call(self, options, uri, settings);
		}
		return String(value);
	}

	// using an unsupported language breaks the paypal button
	var langs = {en:true,sq:true,ar:true,be:true,bg:true,ca:true,zh:true,hr:true,cs:true,da:true,nl:true,eo:true,et:true,fi:true,fr:true,es:true,de:true,el:true,iw:true,hi:true,hu:true,is:true,'in':true,ga:true,it:true,ja:true,ko:true,lv:true,lt:true,mk:true,ms:true,mt:true,no:true,nn:true,fa:true,pl:true,pt:true,ro:true,ru:true,sr:true,sk:true,sl:true,sv:true,th:true,tr:true,uk:true,vi:true};

	$.fn.socialSharePrivacy.settings.services.paypal = {
		'status'            : true, 
		'button_class'      : 'paypal',
		'dummy_line_img'    : 'images/sdf',
		'dummy_box_img'     : 'images/btn_donateCC_LG.gif',
		'dummy_alt'         : '"Paypal"-Dummy',
		'txt_info'          : 'Two clicks for more privacy: The Paypal button will be enabled once you click here. Activating the button already sends data to Paypal &ndash; see <em>i</em>.',
		'txt_off'           : 'not connected to Paypal',
		'txt_on'            : 'connected to Paypal',
		'perma_option'      : true,
		'display_name'      : 'Paypal',
		'referrer_track'    : '',
		'title'             : $.fn.socialSharePrivacy.getTitle,
		'description'       : $.fn.socialSharePrivacy.getDescription,
		'uid'               : '',
		'category'          : '',
		'tags'              : '',
		'popout'            : '',
		'hidden'            : '',
		'button'            : function (options, uri, settings) {
			var attrs = {
				href                   : uri + options.referrer_track,
				title                  : get(this, options, uri, settings, 'title')
			};
			if (options.uid)      attrs['data-paypal-uid']      = options.uid;
			if (options.hidden)   attrs['data-paypal-hidden']   = options.hidden;
			if (options.popout)   attrs['data-paypal-popout']   = options.popout;
			if (options.category) attrs['data-paypal-category'] = options.category;
			if (options.tags)     attrs['data-paypal-tags']     = options.tags;
			if (options.language) {
				var lang = String(options.language).replace('-','_');
				var baselang = lang.split('_')[0];
				if (langs[baselang] === true) {
					attrs['data-paypal-language'] = attrs.lang = lang;
				}
			}
			if (settings.layout === 'line') attrs['data-paypal-button'] = 'compact';
			
			 var $code = $('<div id="paypal"><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">'+
			'<input type="hidden" name="cmd" value="_donations">'+
			'<input type="hidden" name="business" value="penis@penis.org">'+
			'<input type="hidden" name="lc" value="US">'+
			'<input type="hidden" name="item_name" value="penis">'+
			'<input type="hidden" name="amount" value="1337.00">'+
			'<input type="hidden" name="currency_code" value="CAD">'+
			'<input type="hidden" name="no_note" value="0">'+
			'<input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">'+
			'<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer,'+ 'easier way to pay online!">'+
			'<img alt="foo" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">'+
			'</form></div>');

			//$code.filter('a').attr(attrs);

			return $code;
		}
	};
})(jQuery);
