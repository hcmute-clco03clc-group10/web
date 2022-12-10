import { writable } from "svelte/store";

export declare interface DatabaseStore {
	page: 'list' | 'add';
	addForm: AddForm;
}

export declare interface AddForm {
	tableName: string;
	partitionKey: string;
	partitionKeyType: string;
	sortKey: string;
	sortKeyType: string;
	provisionedReadCapacity: string;
	provisionedWriteCapacity: string;
}

export const store = writable<DatabaseStore>({
	page: 'list', addForm: {
		tableName: '',
		partitionKey: '',
		partitionKeyType: '',
		sortKey: '',
		sortKeyType: '',
		provisionedReadCapacity: '5',
		provisionedWriteCapacity: '5',
	}
});

