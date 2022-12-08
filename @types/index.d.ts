declare interface ISideBarItem {
	text: string;
	symbol?: string;
	active?: boolean;
	children?: ISideBarItem[];
}
