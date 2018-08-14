import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import {repeat} from 'lit-html/lib/repeat.js';
import {linkVal, linkChecked} from '../../lib/linkProp.js';


class TestLitChildEl extends LitElement {
    static get properties() {
        return {          
            state: Object
        };
    }

    _render({state}) {
        return html`
            <style>
            :host{
                display: block;
                border: 5px double #00FF0033;
                padding: 1em;
                margin: 1em 0em;
            }
            </style>
            <form on-submit=${this.buttonClicked.bind(this)}>
                <input type="text" 
                    on-change=${linkVal(this, "state.nameInput")}
                    value=${state.nameInput}
                />
                <button on-click=${this.buttonClicked.bind(this)}>TEST</button>
            </form>
            <div>
                <button on-click=${this.deleteUsers}>DELETE</button>
            </div>
            <div>
                Test checkbox - checked? ${this.state.testCheckbox}
                <input type="checkbox"
                    on-change=${linkChecked(this, "state.testCheckbox")}
                    checked=${state.testCheckbox}
                />
            </div>
            <ul>
            ${repeat(state.users, (user, index) => html`
                <li>${user.username} - ${user.fullName} - ${index}</li>
            `)}
            </ul>            
            ${!state.users.length ? "No users" : "HAVE USERS"}
        `;
    }

    buttonClicked(event) {
        event.preventDefault();
        const {nameInput:name, testCheckbox: test} = this.state;
        this.dispatchEvent(new CustomEvent("update-users", {
            composed: true,
            bubbles: true,
            detail: { name, test }
        }));
    }

    deleteUsers(event) {
        this.dispatchEvent(new CustomEvent("delete-all-users", {
            composed: true,
            bubbles: true
        }));
    }
}

customElements.define('test-lit-child-el', TestLitChildEl);
