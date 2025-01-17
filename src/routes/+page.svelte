<script>
	function fullScreen() {
		let el = document.documentElement,
			rfs = el.requestFullscreen;
		if(typeof rfs!="undefined" && rfs){
			rfs.call(el);
		}
	}
</script>

<h1>¡Hola!</h1>
<p class="center">¿Estás listo para ganar?</p>
<a href="/form" class="btn">Estoy listo</a>