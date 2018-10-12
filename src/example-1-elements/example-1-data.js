import {ExampleData, defaultState} from "../common-elements/example-data";
export { defaultState };


class Example1Data extends ExampleData {
    constructor() {
        super();
        this.handlers = {
            add: this._addConfession.bind(this),
            clear: this._clearResults.bind(this)
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.parentNode.addEventListener("add-confession", this.handlers.add);
        this.parentNode.addEventListener("clear-results", this.handlers.clear);
    }

    disconnectedCallback() {
        this.parentNode.removeEventListener("add-confession", this.handlers.add);
        this.parentNode.removeEventListener("clear-results", this.handlers.clear);
    }
}

customElements.define('example-1-data', Example1Data);
