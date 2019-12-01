import CodeStep from './CodeSteps.js'

export default class CodeStepManager
{
    constructor()
    {
        this.all = []
    }

    parse(_$element = null)
    {
        // Set up
        const codeStepsFound = []
        const $element = !_$element ? document.body : _$element
        const $codeSteps = $element.querySelectorAll('.code-steps')

        // Each code step found
        for(const _$codeSteps of $codeSteps)
        {
            const alreadySet = _$codeSteps.classList.contains('code-steps-set')

            if(!alreadySet)
            {
                const $code = _$codeSteps.querySelector('code')

                // Set options
                const options = {}

                options.$element = _$codeSteps
                options.text = $code.innerText

                if(typeof _$codeSteps.dataset.type !== 'undefined')
                {
                    options.type = _$codeSteps.dataset.type
                }

                if(typeof _$codeSteps.dataset.trim !== 'undefined')
                {
                    options.trim = true
                }

                if(typeof _$codeSteps.dataset.active !== 'undefined')
                {
                    options.active = _$codeSteps.dataset.active !== 'false' && _$codeSteps.dataset.active !== '0'
                }

                // Instanciate
                const codeStep = new CodeStep(options)

                // Save
                this.all.push(codeStep)
            }

            // Save
            codeStepsFound.push(_$codeSteps.codeSteps)
        }

        return codeStepsFound
    }
}
