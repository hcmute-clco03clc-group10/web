declare interface ISideBarItem {
	text: string;
	href: string;
	symbol?: string;
	active?: boolean;
	children?: ISideBarItem[];
}
