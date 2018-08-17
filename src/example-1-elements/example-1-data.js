import {ExampleData} from "../common-elements/example-data";
import {EventMap} from "../lib/EventMap";


export const defaultState = {
    results: [],
    infoText: "",
    input: {
        nameInput: "",
        yesInput: false
    }
};


class Example1Data extends EventMap(ExampleData) {
    static get eventMap() {
        return {
            "add-confession": "_addConfession",
            "clear-results": "_clearResults"
        };
    }
}

customElements.define('example-1-data', Example1Data);
