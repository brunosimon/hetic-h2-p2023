import CodeStepManager from '../code-steps/CodeStepsManager.js'

const codeStepManager = new CodeStepManager()
codeStepManager.parse()
window.codeStepManager = codeStepManager

Reveal.initialize({
	controls        : false,
	transition      : 'none', // none/fade/slide/convex/concave/zoom
	transitionSpeed : 'fast',
	progress        : true,
	history         : true,
	center          : true,
	slideNumber     : true,
	dependencies : [
		{ src : '../src/reveal.js/lib/js/classList.js',         condition: function() { return !document.body.classList; } },
		{ src : '../src/reveal.js/plugin/markdown/marked.js',   condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src : '../src/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		// { src : '../src/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		{ src : '../src/reveal.js/plugin/zoom-js/zoom.js',        async: true, condition: function() { return !!document.body.classList; } },
		{ src : '../src/reveal.js/plugin/notes/notes.js',         async: true, condition: function() { return !!document.body.classList; } }
	]
})

Reveal.addEventListener('slidechanged', (_event) =>
{
	// Parse slide for code steps
	const currentCodeSteps = codeStepManager.parse(_event.currentSlide)

	for(const _codeSteps of currentCodeSteps)
	{
		_codeSteps.sizes.update()
		_codeSteps.go(0)
	}
})

Reveal.addEventListener('ready', (_event) =>
{
	const currentCodeSteps = codeStepManager.parse(_event.currentSlide)

	for(const _codeSteps of currentCodeSteps)
	{
		_codeSteps.sizes.update()
	}
})