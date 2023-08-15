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
            .model-inputs {
                margin-bottom: 10px;
            }
        </style>
        <form id="form">
            <fieldset>
                <legend>Properties</legend>
                <div class="model-inputs">
                    <!-- Model inputs will be dynamically added here -->
                </div>
                <button type="button" id="addLine">+</button>
                <input type="submit" style="display:none;">
            </fieldset>
        </form>
    `;

    class BuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            
            this._modelInputsContainer = this._shadowRoot.querySelector('.model-inputs');
            this._shadowRoot.getElementById("addLine").addEventListener("click", this._addLine.bind(this));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        _addLine() {
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'model-input';
            input.addEventListener('input', this._submit.bind(this)); // Update on input
            this._modelInputsContainer.appendChild(input);
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        modelIds: this.modelIds
                    }
                }
            }));
        }

        set modelIds(ids) {
            // Clear current input fields
            this._modelInputsContainer.innerHTML = '';

            // Create a new input field for each model ID
            ids.forEach(id => {
                let input = document.createElement('input');
                input.type = 'text';
                input.className = 'model-input';
                input.value = id;
                input.addEventListener('input', this._submit.bind(this)); // Update on input
                this._modelInputsContainer.appendChild(input);
            });
        }

        get modelIds() {
            // Collect all model IDs from the input fields
            return Array.from(this._shadowRoot.querySelectorAll('.model-input')).map(input => input.value);
        }
    }

    customElements.define('com-sap-sample-sac-cockpit-builder', BuilderPanel);
})();
