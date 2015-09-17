// mtree.js Jquery plugin build on top of Foundation 5
// Requires jquery.js and velocity.js (optional but recommended).
// Copy the below function, add to your JS, and simply add a list <ul class=mtree> ... </ul>

// Original by Karl Ward.
// Rewritten on to act as a real jquery plugin.

(function($)
{
	$.fn.mtree = function(options) 
	{ 
		// Settings.
		var settings = $.extend({
			collapsed: true, // Start with collapsed menu (only level 1 items visible)
	  		close_same_level: true, // Close elements on same level when opening new node.
			duration: 200, // Animation duration should be tweaked according to easing.
			listAnim: true, // Animate separate list items on open/close element (velocity.js only).
			easing: 'easeOutQuart', // Velocity.js only, defaults to 'swing' with jquery animation.
        }, options );

		// Set initial styles 
		this.find('ul').css({'overflow':'hidden', 'height': (settings.collapsed) ? 0 : 'auto', 'display': (settings.collapsed) ? 'none' : 'block' });	  
	  
		// Get node elements, and add classes for styling
		var node = this.find('li:has(ul)');
		node.each(function(index, val) 
		{
			$(this).children(':first-child').css('cursor', 'pointer')
			$(this).addClass('mtree-node mtree-' + ((settings.collapsed) ? 'closed' : 'open'));
			$(this).children('ul').addClass('mtree-level-' + ($(this).parentsUntil(this, 'ul').length + 1));
		});
	  
		// Set mtree-active class on list items for last opened element
		this.find('li > *:first-child').on('click.mtree-active', function(e){
			if($(this).parent().hasClass('mtree-closed')) {
				$('.mtree-active').not($(this).parent()).removeClass('mtree-active');
				$(this).parent().addClass('mtree-active');
			} else if($(this).parent().hasClass('mtree-open')){
				$(this).parent().removeClass('mtree-active'); 
			} else {
				$('.mtree-active').not($(this).parent()).removeClass('mtree-active');
				$(this).parent().toggleClass('mtree-active'); 
			}
		});
		
		// Set node click elements, preferably <a> but node links can be <span> also
		node.children(':first-child').on('click.mtree', function(e)
		{	    						
	    	// element vars
			var el = $(this).parent().children('ul').first();
			var isOpen = $(this).parent().hasClass('mtree-open');
	    
			// close other elements on same level if opening 
			if((settings.close_same_level || $('.csl').hasClass('active')) && !isOpen) 
			{
				var close_items = $(this).closest('ul').children('.mtree-open').not($(this).parent()).children('ul');
	      
				// Velocity.js
				if($.Velocity) {
				close_items.velocity({
					height: 0
				}, {
					duration: settings.duration,
					easing: settings.easing,
					display: 'none',
					delay: 100,
					complete: function(){
						setNodeClass($(this).parent(), true)
					}
				});	        
				// jQuery fallback
				} else {
					close_items.delay(100).slideToggle(settings.duration, function(){
						setNodeClass($(this).parent(), true);
					});
				}	
			}
	    
			// force auto height of element so actual height can be extracted
			el.css({'height': 'auto'}); 
	    
			// listAnim: animate child elements when opening
			if(!isOpen && $.Velocity && settings.listAnim) el.find(' > li, li.mtree-open > ul > li').css({'opacity':0}).velocity('stop').velocity('list');
	    
			// Velocity.js animate element
			if($.Velocity) {
				el.velocity('stop').velocity({
				//translateZ: 0, // optional hardware-acceleration is automatic on mobile
				height: isOpen ? [0, el.outerHeight()] : [el.outerHeight(), 0]
			},{
				queue: false,
				duration: settings.duration,
				easing: settings.easing,
				display: isOpen ? 'none' : 'block',
				begin: setNodeClass($(this).parent(), isOpen),
				complete: function(){
					if(!isOpen) $(this).css('height', 'auto');
				}
			});	    
			// jQuery fallback animate element
			} else {
				setNodeClass($(this).parent(), isOpen);
				el.slideToggle(settings.duration);
			}
	    
			// We can't have nodes as links unfortunately
			e.preventDefault();
		});
	  
		// Function for updating node class
		function setNodeClass(el, isOpen) {
			if(isOpen) {
				el.removeClass('mtree-open').addClass('mtree-closed');
			} else {
				el.removeClass('mtree-closed').addClass('mtree-open');
			}
		}
	  
		// List animation sequence
		if($.Velocity && settings.listAnim) {
			$.Velocity.Sequences.list = function (element, options, index, size) {
				$.Velocity.animate(element, { 
					opacity: [1,0],
					translateY: [0, -(index+1)]
				}, {
					delay: index*(settings.duration/size/2),
					duration: settings.duration,
					easing: settings.easing
				});
			};
		}
	    
		// Fade in mtree after classes are added.
		// Useful if you have set collapsed = true or applied styles that change the structure so the menu doesn't jump between states after the function executes.		
		if(this.css('opacity') == 0) {
			if($.Velocity) {
				this.css('opacity', 1).children().css('opacity', 0).velocity('list'); 				
			} else {
				this.show(200);
			}
		}
		return this;	
			
	}

}(jQuery));
