import {EventMap} from "../lib/EventMap.js";
import {setPropertyPath} from "../lib/linkProp.js";


export const defaultState = {
    nameInput: "testuser",
    testCheckbox: true,
    users: [{
        username: "jhorback",
        fullName: "John Horback"
    }, {
        username: "joeuser",
        fullName: "Joe User"
    }]
};


class TestDataEl extends EventMap(HTMLElement) {

    // change parent to be the default? and implement "this"
    // or add parentEvents, windowEvents, events?
    // change events to be eventMap?
    static get eventMap() {
        return {
            "update-users": "_updateUsers"
        };
    }

    constructor() {
        super();

        this.state = defaultState;
        this.dispatchEvent(new CustomEvent("users-changed"));   

        
        this.parentNode.addEventListener("delete-all-users", (e) => {
            this.state = Object.assign({}, this.state, {
                users: []
            });
            this.dispatchEvent(new CustomEvent("state-changed"));
        });
    }

    _updateUsers(event) {
        const username = event.detail.name;
        const fullName = event.detail.test ? "TEST CHECKED" : "TEST NOT CHECKED";
        const {users} = this.state;

        users.push({username, fullName});

        this.state = Object.assign({}, this.state, {
            users,
            testCheckbox: event.detail.test,
            nameInput: username
        });

        this.dispatchEvent(new CustomEvent("state-changed"));
    }
}

customElements.define('test-data-el', TestDataEl);
