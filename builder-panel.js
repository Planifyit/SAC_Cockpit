(function() {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `

    	<form id="form">
    <fieldset>
        <legend>Properties</legend>
        <table>
           <tr>
        <td>Model ID</td>
        <td><input id="builder_model_id" type="text"></td>
    </tr>
            
        </table>
        <input type="submit" style="display:none;">
    </fieldset>
</form>


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

_submit(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
            properties: {
                decimalPlaces: this.decimalPlaces,
                dimension: this.dimension,
                measure: this.measure,
                modelId: this.modelId
            }
        }
    }));
}
        
        _onModelInputChange(event) {
            // Dispatch a custom event or handle the model input change
            let modelChangeEvent = new CustomEvent('modelChange', { detail: { model: this._modelInput.value } });
            this.dispatchEvent(modelChangeEvent);
        }

    set modelId(newModelId) {
    this._shadowRoot.getElementById("builder_model_id").value = newModelId;
}

get modelId() {
    return this._shadowRoot.getElementById("builder_model_id").value;
}
    }

    customElements.define('sac-cockpit-builder', BuilderPanel);
})();
