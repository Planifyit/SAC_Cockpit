(function() {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
     
            .panel-content {
                padding: 10px;
            }
            label {
                display: block;
                margin-bottom: 5px;
            }
        </style>
        <div class="panel-content">
            <label for="modelInput">Model:</label>
            <input type="text" id="modelInput" />
        </div>
    `;

    class BuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._modelInput = this._shadowRoot.getElementById('modelInput');
            this._modelInput.addEventListener('input', this._onModelInputChange.bind(this));
        }

        _onModelInputChange(event) {
            // Dispatch a custom event or handle the model input change
            let modelChangeEvent = new CustomEvent('modelChange', { detail: { model: this._modelInput.value } });
            this.dispatchEvent(modelChangeEvent);
        }

        set model(value) {
            this._modelInput.value = value;
        }

        get model() {
            return this._modelInput.value;
        }
    }

    customElements.define('sac-cockpit-builder', BuilderPanel);
})();
