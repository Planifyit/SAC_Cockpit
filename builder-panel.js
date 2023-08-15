(function() {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 1em;
            }
            label {
                display: block;
                margin-bottom: 5px;
            }
            .input-container {
                margin-bottom: 10px;
            }
        </style>
        <form id="form">
            <fieldset>
                <legend>Properties</legend>
                <div id="inputList">
                    <div class="input-container">
                        <label for="builder_model_id_0">Model ID:</label>
                        <input id="builder_model_id_0" type="text">
                    </div>
                </div>
                <button id="addLine">+</button>
                <input type="submit" style="display:none;">
            </fieldset>
        </form>
    `;

    class BuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
            this._shadowRoot.getElementById("addLine").addEventListener("click", this._addLine.bind(this));
            this._inputCount = 1; // to keep track of the number of inputs
        }

        _submit(e) {
            e.preventDefault();
            // Handle the submission of multiple model IDs
            let modelIds = [];
            for (let i = 0; i < this._inputCount; i++) {
                modelIds.push(this._shadowRoot.getElementById(`builder_model_id_${i}`).value);
            }
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        modelIds: modelIds
                    }
                }
            }));
        }

        _addLine(e) {
            e.preventDefault();
            let newInputContainer = document.createElement('div');
            newInputContainer.classList.add('input-container');
            newInputContainer.innerHTML = `
                <label for="builder_model_id_${this._inputCount}">Model ID:</label>
                <input id="builder_model_id_${this._inputCount}" type="text">
            `;
            this._shadowRoot.getElementById("inputList").appendChild(newInputContainer);
            this._inputCount++;
        }
    }

    customElements.define('com-sap-sample-sac-cockpit-builder', BuilderPanel);
})();
