declare module 'metal-jsx' {
	declare interface ConfigAdders {
		required?: boolean;
		value?: any;
	}

	declare export var Config: {
		value(val: ?any): ConfigAdders;
		required(val: ?boolean): ConfigAdders;
	};

	declare class Component<T, U> {
		refs: any;
		props: T;
		state: U;

		setState(value: any, callback: () => {}): void;

		static PROPS: any;
		static STATE: any;
	}

	declare export default typeof Component;
}
