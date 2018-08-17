import {ExampleData} from "../common-elements/example-data";


export const defaultState = {
    results: [],
    infoText: "",
    input: {
        nameInput: "",
        yesInput: false
    }
};


class Example1Data extends ExampleData {
    constructor() {
        super();

        this.handlers = {
            add: this._addConfession.bind(this),
            clear: this._clearResults.bind(this)
        };

        this.parentNode.addEventListener("add-confession", this.handlers.add);
        this.parentNode.addEventListener("clear-results", this.handlers.clear);
    }

    // @ts-ignore
    disconnectedCallback() {
        super.disconnectedCallback && super.disconnectedCallback();
        this.parentNode.removeEventListener("add-confession", this.handlers.add);
        this.parentNode.removeEventListener("clear-results", this.handlers.clear);
    }

    static get eventMap() {
        return {
            "add-confession": "_addConfession",
            "clear-results": "_clearResults"
        };
    }
}

customElements.define('example-1-data', Example1Data);
