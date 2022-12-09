declare interface ISideBarItem {
	text: string;
	symbol?: string;
	href?: string;
	active?: boolean;
	children?: ISideBarItem[];
}

declare interface IUser {
	id: string;
	email: string;
}

declare interface ITable {
	name: string;
}

