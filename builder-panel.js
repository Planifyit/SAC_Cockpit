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
            this._shadowRoot.getElementById("addLine").addEventListener("click", () => this._addLine());
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        connectedCallback() {
            if (this.modelIds && this.modelIds.length) {
                this.modelIds.forEach(id => this._addLine(id));
            }
        }

        _addLine(value = '') {
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'model-input';
            input.value = value;
            input.addEventListener('input', this._submit.bind(this)); // Update on input
            this._modelInputsContainer.appendChild(input);
            this._modelInputsContainer.appendChild(document.createElement('br')); // Add a line break
        }

        _submit(e) {
            if (e) e.preventDefault();
this.dispatchEvent(new CustomEvent("propertiesChanged", {
    detail: {
        properties: {
            modelIds: this.modelIds
        }
    },
    bubbles: true,
    composed: true
}));

        }

        set modelIds(ids) {
            // Clear existing inputs
            this._modelInputsContainer.innerHTML = '';

            // Create and populate new inputs
            ids.forEach(id => this._addLine(id));
        }

        get modelIds() {
            // Collect all model IDs from the input fields
            return Array.from(this._shadowRoot.querySelectorAll('.model-input')).map(input => input.value);
        }
    }

    customElements.define('com-sap-sample-sac-cockpit-builder', BuilderPanel);
})();
