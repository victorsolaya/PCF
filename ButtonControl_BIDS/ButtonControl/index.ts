import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class ButtonControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _context: ComponentFramework.Context<IInputs>;
	// Value of the field is stored and used inside the control
	private _value: string = "";	
	// PowerApps component framework framework delegate which will be assigned to this object which would be called whenever an update happens.
	private _notifyOutputChanged: () => void;
	// label element created as part of this control
	private _label: string;
	// button element created as part of this control
	private button: HTMLButtonElement;
	// reference to the control container HTMLDivElement
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;

	constructor() { }
	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If control is marked control-type='standard', it receives an empty div element within which it can render its content.
	 */
	public init(
		context: ComponentFramework.Context<IInputs>,
		notifyOutputChanged: () => void,
		state: ComponentFramework.Dictionary,
		container: HTMLDivElement
	) {

		this._context = context; // set the context
		debugger;
		//Create a button
		this.button = document.createElement("button");
		// Get the localized string from localized string
		this._label = context.parameters.btnLabel.raw;		
		this.button.innerHTML = this._label.toString();
		//this.button.classList.add("SimpleIncrement_Button_Style");
		this._notifyOutputChanged = notifyOutputChanged;
		//this.button.addEventListener("click", (event) => { this._value = this._value + 1; this._notifyOutputChanged();});
		this.button.addEventListener("click", this.onButtonClick.bind(this));
		// Adding the label and button created to the container DIV.
		this._container = document.createElement("div");
		this._container.appendChild(this.button);
		container.appendChild(this._container);
	}
	/**
	 * Button Event handler for the button created as part of this control
	 * @param event
	 */
	private onButtonClick(event: Event): void {
		//this._value = this._context.parameters.btnPurpose.raw;
		this._value = "true";
		this._notifyOutputChanged();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// This method would render the control with the updated values after we call NotifyOutputChanged
		//set the value of the field control to the raw value from the configured field
		this._context = context; // set the context    
		this._label = context.parameters.btnLabel.raw;
		this.button.innerHTML = this._label.toString();
		//this._notifyOutputChanged();

	}
	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		// custom code goes here - remove the line below and return the correct output
		let result: IOutputs = {
			btnValue: this._value
		};
		return result;
	}
	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. canceling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void { }
}