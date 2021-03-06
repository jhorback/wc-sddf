import {ExampleData, defaultState} from "../common-elements/example-data";
import {EventMap} from "../lib/EventMap";
export {defaultState};


class Example3Data extends EventMap(ExampleData) {
    static get eventMap() {
        return {
            "add-confession": "_addConfession",
            "clear-results": "_clearResults"
        };
    }
}

customElements.define('example-3-data', Example3Data);
