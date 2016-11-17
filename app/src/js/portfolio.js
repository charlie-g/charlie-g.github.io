import router from './router'

Pace.on('start', function(){
	// console.log('start')
})
Pace.on('done', function(){
	var navbar = document.getElementById('navbar');
	var navbarLinks = navbar.getElementsByClassName('link');

	for(var i = 0; i < navbarLinks.length; i++){
		navbarLinks[i].className += ' navbar-link-animation';
	}

	// The following function is horrible but I don't have time to refactor it :/
	window.mobilecheck = function() {
	  var check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	$('#navbar .link a').click(function(e){
		e.preventDefault();
		var href = $(e.currentTarget).attr('href');
		if(href === '#projects'){
			if(window.location.hash === '' || window.location.hash === '#'){ //if coming from homepage
				var threejsCanvas = $( '#threejs-container canvas' );
				threejsCanvas.fadeOut();
				clickOnProjectsLinkFromHomepage();
			} else if(window.location.hash.includes('about')){
				clickOnProjectsFromAboutPage();
			}
		} else if(href === '#about'){
			if(window.location.hash === '' || window.location.hash === '#'){
				var threejsCanvas = $( '#threejs-container canvas' );
				threejsCanvas.fadeOut();
				clickOnAboutLinkFromHomepage();
			} else if(window.location.hash.includes('projects')){
				clickOnAboutFromProjectsPage();
			}
		} else if(href.includes('blog')){
			window.open(href)
		} else if(href.includes('mailto')){
			window.location = href
		}
	})

	$('#home-link .description').click(function(e){
		e.preventDefault();
		if(window.location.hash.includes('projects')){
			clickOnHomeFromProjectsPage();

		} else if(window.location.hash.includes('#about')){
			clickOnHomeFromAboutPage();
			var checkExist = setInterval(function() {
			 if ($('#threejs-container').length) {
					threeJSAnimation();
					clearInterval(checkExist);
			 }
		 }, 100); // check every 100ms
		}
	})

	//Check for scroll on about page

	// var MOUSE_OVER = false;
	$('body').bind('mousewheel', function(e){
	  // if(MOUSE_OVER){
	  //   if(e.preventDefault) { e.preventDefault(); }
	  //   e.returnValue = false;
	  //   return false;
	  // }
			if(window.location.hash.includes('about') && !window.mobilecheck()){
				var block = $('#contributions-block')[0].getBoundingClientRect()
				var e = window.event;
				var delta =  Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
				if(delta < 0){
					$('p.svg').fadeOut(1000);
				} else if(delta > 0 && block.top>-1 && block.bottom <= $(window).height()){ //If scrolling back to top and contributions block not visible
					$('p.svg').fadeIn(1000);
				}
			}

			if(window.location.hash.includes('projects') && !window.mobilecheck()){
				var block = $('.project-details')[0].getBoundingClientRect()
				var e = window.event;
				var delta =  Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
				if(delta < 0){
					$('p.svg').fadeOut(1000);
				} else if(delta > 0 && block.top>-1 && block.top >= $('#projects-container').height()){ //If scrolling back to top and contributions block not visible
					$('p.svg').fadeIn(1000);
				}
			}
	});

	//Home page
	if(window.location.hash === "" || window.location.hash === '#'){
	  var descriptionBlock = document.getElementsByClassName('description')[0];
	  descriptionBlock.style.display = 'none';

	  homepageBackgroundAnimation();

	} else {
	  if(descriptionBlock){
	    descriptionBlock.style.display = 'block'
	  }

	  otherPagesBackground();
	}

	function homepageBackgroundAnimation(){
	  var appContainer = $('#app-container');
	  appContainer.addClass('container-animation');

	  var outerContainer = $('#outer-container');
	  outerContainer.addClass('outer-container-animation');

		threeJSAnimation();
	}

	function otherPagesBackground(){
	  var appContainer = $('#app-container');
	  appContainer.addClass('container-style');

	  var outerContainer = $('#outer-container');
	  outerContainer.addClass('outer-container-style');
	}

		function threeJSAnimation(){

			 var ww = window.innerWidth;
			 var container, stats;
			 var camera, scene, renderer;
			 if(window.mobilecheck() || window.innerWidth < 500){
				  var SEPARATION = ww/10
			 } else {
				 var SEPARATION = ww/30
			 }
			 var AMOUNTX = 120, AMOUNTY = 80;
			 var particles, particle, count = 0;

			 var mouseX = 0, mouseY = 0;

			 var windowHalfX = window.innerWidth /2;
			 var windowHalfY = window.innerHeight /2;

			 init();
			 animate();

			 function init() {
					 container = document.getElementById( 'threejs-container' );

					 camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,1,10000);
					 if(window.mobilecheck() || window.innerWidth < 500){

						 camera.position.z = 1500;
						 camera.position.y = 500;
						 camera.position.x = 200;
					 } else {
						 camera.position.z = 2000;
						 camera.position.y = 350;
						 camera.position.x = 1000;
					 }

					 scene = new THREE.Scene();

					 particles = new Array();

					 var PI2 = Math.PI*2;
					 var material = new THREE.SpriteCanvasMaterial( {

							 color: 0x939393,
							 opacity:0.5,
							 program: function ( context ) {

									 context.beginPath();
									 //context.arc( 0, 0, 0.3, 0, PI2, true );
									 context.arc(0, 0, 0.2, 0, PI2, true );
									 context.fill();
							 }

					 } );

					 var i = 0;

					 for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
							 for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
									 particle = particles[ i ++ ] = new THREE.Sprite( material );
									 particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION) / (Math.PI) );
									 particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 10 );
									 scene.add( particle );
							 }//for iy
					 }//for ix

					 renderer = new THREE.CanvasRenderer({ alpha: true });
					 renderer.setSize( window.innerWidth, window.innerHeight );
					 renderer.setClearColor( 0xFFFFFF,0);
					 container.appendChild( renderer.domElement );

					 window.addEventListener( 'resize', onWindowResize, false );
			 }

			 function onWindowResize() {
					 windowHalfX = window.innerWidth / 2;
					 windowHalfY = window.innerHeight / 2;

					 camera.aspect = window.innerWidth / window.innerHeight;
					 camera.updateProjectionMatrix();

					 renderer.setSize( window.innerWidth, window.innerHeight );
			 }

			 function animate() {
					 requestAnimationFrame( animate );
					 render();
			 }

			 function render() {
					 camera.position.x += ( mouseX - camera.position.x ) * .005;
					//  camera.position.y += ( mouseY - camera.position.y ) * .005;
					//  camera.lookAt( scene.position );
					 var i = 0;

					 for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
							 for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
									 particle = particles[ i++ ];
									 particle.position.y = ( Math.sin( ( ix + count ) * 0.20 ) * 50 ) +
											 ( Math.sin( ( iy + count ) * 0.2 ) * 20 );
									 particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 2 ) * 4 +
											 ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
							 }
					 }

					 renderer.render( scene, camera );
					 count += 0.3;
			 }
		}

		function clickOnProjectsLinkFromHomepage(){
		  $('#home h1').addClass("outro-animation");
		  $('#home h2').addClass("outro-animation-h2");
		  $('#home h2').bind("animationend", function(){
				router.navigate('projects', true)
		  });
		}

		function clickOnAboutLinkFromHomepage(){
		  $('#home h1').addClass("outro-animation");
		  $('#home h2').addClass("outro-animation-h2");
		  $('#home h2').bind("animationend", function(){
				router.navigate('about', true)
		  });
		}

		function clickOnAboutFromProjectsPage(){
		  $('.project-number').fadeOut();
		  $('.project-block h3').slideUp();
		  $('.visit-button').slideUp();
		  $('.svg').fadeOut();
		  $('.project-block img').fadeOut("slow", function(){
				router.navigate('about', true)
		  });
		}

		function clickOnHomeFromProjectsPage(){
		  $('.project-number').fadeOut();
		  $('.project-block h3').slideUp();
		  $('.visit-button').slideUp();
		  $('.svg').fadeOut();
		  $('.project-block img').fadeOut("slow", function(){
				router.navigate("#", true);
		  });

				var checkExist = setInterval(function() {
			   if ($('#threejs-container').length) {
					 	threeJSAnimation();
			      clearInterval(checkExist);
			   }
			 }, 100); // check every 100ms
		}

		function clickOnHomeFromAboutPage(){
			 $('#intro-block').addClass('fade-left');
			 $('#about-me-block').addClass('fade-right');
			 $('#skills-block').addClass('fade-right');
			 $('#contributions-block').addClass('fade-down');
			 $('p.svg').fadeOut();
		   $('#about-container h2').fadeOut();
			 $('#navbar').fadeOut();
			 $('#home-link').addClass('fade-left');
			$('#home-link').bind("animationend", function(){
				router.navigate("#", true);
			})
		}

		function clickOnProjectsFromAboutPage(){
			$('#intro-block').addClass('fade-left');
			$('#about-me-block').addClass('fade-right');
			$('#skills-block').addClass('fade-right');
			$('#contributions-block').addClass('fade-down');
			$('p.svg').fadeOut();
			$('#about-container h2').fadeOut("slow", function(){
				router.navigate('projects', true)
			});
		}
})
