import { writable } from 'svelte/store';

export declare interface DatabaseStore {
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
	addForm: {
		tableName: '',
		partitionKey: '',
		partitionKeyType: '',
		sortKey: '',
		sortKeyType: '',
		provisionedReadCapacity: '5',
		provisionedWriteCapacity: '5'
	}
});
