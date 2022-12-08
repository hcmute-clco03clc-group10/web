declare interface ISideBarItem {
	text: string;
	symbol?: string;
	active?: boolean;
	children?: ISideBarItem[];
}

declare interface IUser {
	id: string;
	email: string;
}
