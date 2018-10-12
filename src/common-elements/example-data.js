
export const defaultState = {
    results: [],
    infoText: "",
    input: {
        nameInput: "",
        yesInput: false
    }
};

export class ExampleData extends HTMLElement {

    constructor() {
        super();
        this.dbKey = this.getAttribute("dbKey");
        const state = JSON.parse(sessionStorage.getItem(this.dbKey));
        this.state = state || defaultState;
    }

    connectedCallback() {
        this.dispatchEvent(new CustomEvent("state-changed"));
    }

    _addConfession(event) {
        const {nameInput: name, yesInput: yes} = event.detail;
        const results = [...this.state.results];

        results.unshift({name, yes});
        
        this.state = Object.assign({}, this.state, {
            results,
            infoText: this._getInfoText(results),
            input: {
                nameInput: "",
                yesInput: false
            }
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

// customElements.define('example-1-data', ExampleData);
