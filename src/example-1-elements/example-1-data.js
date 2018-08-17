import {EventMap} from "../lib/EventMap.js";


export const defaultState = {
    results: [],
    infoText: "",
    name: "",
    yes: false
};


class Example1Data extends EventMap(HTMLElement) {

    static get eventMap() {
        return {
            "add-confession": "_addConfession",
            "clear-results": "_clearResults"
        };
    }

    constructor() {
        super();
        this.state = defaultState;
        this.dbKey = this.getAttribute("dbKey");
        if (this.dbKey) {
            const state = JSON.parse(sessionStorage.getItem(this.dbKey));
            if (state) {
                this.state = state;
                this.dispatchEvent(new CustomEvent("state-changed"));
            }
        }
    }

    _addConfession(event) {
        const {name, yes} = event.detail;
        const results = [...this.state.results];

        results.push({name, yes});
        console.log(name);    

        this.state = Object.assign({}, this.state, {
            results,
            infoText: this._getInfoText(results),
            name: "",
            yes: false
        });

        this.dispatchEvent(new CustomEvent("state-changed"));
        this.save();
    }

    _clearResults(event) {
        this.state = Object.assign({}, this.state, {
            results: [],
            infoText: ""
        });

        this.dispatchEvent(new CustomEvent("state-changed"));
        this.save();
    }

    _getInfoText(results) {
        if (results.length === 0) {
            return "";
        }

        const yeses = results.reduce((count, item) => {
            if (item.yes) {
                count = count + 1;
            }
            return count;
        }, 0);

        const percent = Math.round((yeses / results.length) * 100);
        return `${percent}%`;
    }

    save() {
        if (!this.dbKey) {
            return;
        }

        sessionStorage.setItem(this.dbKey, JSON.stringify(this.state));
    }
}

customElements.define('example-1-data', Example1Data);
