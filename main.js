const tpl = `
<h1>Hello world</h1>
<slot name="result"></slot>
<slot name="button">
	<button type="button">Click me</button>
</slot>
`

class RootComponent extends HTMLElement {
	#counter = new Text('0');
	constructor() {
		super();
	}
    static makeTemplate() {
        const template = document.createElement('template');
        template.innerHTML = tpl;
        return template;
    }
    connectedCallback() {
        const template = this.constructor.makeTemplate();
		const body = template.content.cloneNode(true);
		const result = body.querySelector('slot[name="result"]');
		const button = body.querySelector('slot[name="button"] button');
		result.appendChild(this.#counter);
        this.appendChild(body);
		button.addEventListener('click', () => {
			console.log('click')
			this.#counter.textContent = parseInt(this.#counter.textContent) + 1;
			console.log(this.#counter);
		});
    }
}

customElements.define('root-component', RootComponent);
