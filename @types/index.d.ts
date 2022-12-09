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
	TableName: string;
	TableStatus: string;
	TableArn: string;
	TableId: string;
	ProvisionedThroughput: {
		NumberOfDecreasesToday: number;
		ReadCapacityUnits: number;
		WriteCapacityUnits: number;
	};
	CreationDateTime: string;
	KeySchema: { AttributeName: string; KeyType: string }[];
	ItemCount: number;
	TableSizeBytes: string;
	AttributeDefinitions: { AttributeName: string; AttributeType: string }[];
}
