import scrollTo from "../../../src/scrollTo";

let demo = function() {

	let examples = {};

	function init() {
		examples = {
			example1: {
				options: {
					element: document.querySelector('#example2')
				}
			},
			example2: {
				options: {
					element: document.querySelector('#example3'),
					duration: 3000
				}
			},
			example3: {
				options: {
					element: document.querySelector('#example4'),
					easing: 'easeIn',
					duration: 1500,
				}
			},
			example4: {
				options: {
					position: 0
				}
			}
		}

		document.addEventListener('click', onDocumentClick);
	}

	function onDocumentClick(e) {
		if(e.target.matches('.example__button')) {
			e.preventDefault();
			
			runExample(e.target.closest('.example'));
		}
	}

	function runExample(containerEl) {

		var example = examples[containerEl.id];

		scrollTo(example.options);
	}

	init();
};

export default demo();