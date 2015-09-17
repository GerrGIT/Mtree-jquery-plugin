# Mtree-jquery-plugin
Mtree Jquery plugin original by Karl Ward build on top of Foundation 5.

See: http://foundation.zurb.com/forum/posts/17104-plugin-mtree-menu

Modified to behave like a real real jquery plugin.

## How to Use?

Mtree depends on jQuery. Include them both in end of your HTML code:

```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.mtree.js" type="text/javascript"></script>
<script src="jquery.mtree.css" type="text/javascript"></script>
```

Create a list in HTML:

```html
<ul class="mtree bubba">
	<li>
		<a href="/content/admin/">Content</a>
	</li>
	<li>
		<a href="#">Images</a>
		<ul>
			<a href="/image/admin/">Admin</a>
			<a href="/imagecategory/admin/">Categorieen</a>	
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

Or use options to ovveride defaults:
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
