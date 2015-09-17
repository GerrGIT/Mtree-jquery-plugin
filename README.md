# Mtree-jquery-plugin
Mtree Jquery plugin original by Karl Ward build on top of Foundation 5.

See: http://foundation.zurb.com/forum/posts/17104-plugin-mtree-menu

Just modified a little to behave like a real jquery plugin instead of a snippet.

## How to Use?

Mtree depends on jQuery. Include these files into your HTML code:

Also according to the original code, Velocity should be optional, but it seems not to work without it. 
I did not pay attention to it, just include it or fix it and submit a pull request.

```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.mtree.js" type="text/javascript"></script>
<script src="jquery.mtree.css" type="text/css"></script>
<script src="velocity.min.js" type="text/javascript"></script>
```

Create a list in HTML:

```html
<ul class="mtree">
	<li>
		<a href="/content/admin/">Content</a>
	</li>
	<li>
		<a href="#">Images</a>
		<ul>
			<a href="/image/admin/">Admin</a>
			<a href="/imagecategory/admin/">Categories</a>	
		</ul>
	</li>
	<li>
		<a href="/logout/">Logout</a>
	</li>
</ul>
```

Call Mtree
```js
		$(document).ready(function() {
			$('ul.mtree').mtree();
		});
```

Or use options to override defaults:
```js
		$(document).ready(function() {
			$('ul.mtree').mtree({
				collapsed: true, // Start with collapsed menu (only level 1 items visible)
		  		close_same_level: true, // Close elements on same level when opening new node.
				duration: 200, // Animation duration should be tweaked according to easing.
				listAnim: true, // Animate separate list items on open/close element (velocity.js only).
				easing: 'easeOutQuart', // Velocity.js only, defaults to 'swing' with jquery animation.
			});
		});
```
