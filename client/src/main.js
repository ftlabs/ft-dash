/* global $, mina */
/* eslint-env browser */
/* eslint strict:0, no-console:0 */
'use strict';
global.$ = global.jQuery = require('jquery');

/*
	Customisation
	?primaryType=topStories
	&primarySearch=
	&primaryOffset=0
	&primaryMax=3
	&secondaryType=search
	&secondarySearch=banks
	&secondaryOffset=0
	&secondaryMax=10
*/

const serviceUrl = '/data';
const topStoriesUrl = serviceUrl + '/top-stories';

/*function wait (ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);
	});
}*/

function getTopStories (offset, amount) {
	return fetch(topStoriesUrl + '?startFrom=' + offset + '&numberOfArticles=' + amount)
		.then(function (response) {
			return response.json();
		})
	;
}

const __dash = (function (){

	const headlinesContainer = document.querySelector('.articles');
	const storedConfiguration = JSON.parse(localStorage.getItem('dash-config'));

	const configuration = (function (){

		const el = document.querySelector('.config')
		const slider = el.querySelector('.slider');
		const sliderHolder = slider.parentNode;
		const rotatable = el.querySelector('.rotatable');
		const saveBtn = el.querySelector('.save_config');

		let angleValue = 0;

		function showConfigurationScreen (){
			el.setAttribute('data-visible', 'true');
			document.body.style.transform = "";
		}

		function hideConfigurationScreen (showArticles){
			el.setAttribute('data-visible', 'false');
			if(showArticles){
				headlinesContainer.setAttribute('data-visible', 'true');
			}
		}

		function setValue(angle){
			document.body.style.transform = 'rotateX(' + angle + "deg)";
		}

		// bind events

		window.addEventListener('touchmove', function (e){
			e.preventDefault();
		}, true);

		sliderHolder.addEventListener('touchmove', function (e){
			const Y = e.touches[0].clientY | 0;
			const mappedY = (Y / window.innerHeight) * 100;
			const minAngle = -90;
			const maxAngle = 90;
			const angleRange = (maxAngle - minAngle);
			
			angleValue = (mappedY / 100) * angleRange + minAngle;
			
			if(mappedY > 0 && mappedY < 100){
				slider.style.transform = 'translateY(' + (Y - (slider.offsetHeight / 2)) + 'px)';
				rotatable.style.transform = 'rotateX(' + angleValue + 'deg)';
			}

		}, false);

		saveBtn.addEventListener('click', function (){

			localStorage.setItem('dash-config', JSON.stringify( { angle : angleValue } ) );
			hideConfigurationScreen(true);
			setValue(angleValue);

		}, false);

		window.addEventListener('touchstart', function (e){

			if(e.touches.length > 2){
				localStorage.clear();
				showConfigurationScreen();
				headlinesContainer.setAttribute('data-visible', 'false');
			}

		}, false);

		return {
			show : showConfigurationScreen,
			hide : hideConfigurationScreen,
			set : setValue
		};

	}());

	function populateWithStories (stories){

		const articlesFrag = document.createDocumentFragment();
		const storyContainer = document.createElement('ol');

		stories.forEach(story => {

			const li = document.createElement('li');
			const h1 = document.createElement('h1');
			const p = document.createElement('p');

			h1.textContent = story.headline;
			p.textContent = story.subheading;

			li.appendChild(h1);
			li.appendChild(p);

			storyContainer.appendChild(li);

		});

		articlesFrag.appendChild(storyContainer);

		headlinesContainer.innerHTML = "";
		headlinesContainer.appendChild(articlesFrag);

	}

	function initialise (){

		if(storedConfiguration === null){

			configuration.show();

		} else {
			configuration.hide();
			configuration.set(storedConfiguration.angle)
			headlinesContainer.setAttribute('data-visible', 'true');
		}
	
		getTopStories(0, 3)
			.then(stories => populateWithStories(stories))
		;
		
	}

	return {
		init : initialise
	};

}());


$(function () {

	__dash.init();

});
