import type { ColumnDef } from '@tanstack/table-core';
import type { ParsedGmae } from '$lib/gmaes';
import { renderComponent } from '$lib/components/ui/data-table/index.js';
import TableActions from './table-actions.svelte';
import TableNameButton from './table-name-button.svelte';
import Tags from './tags.svelte';

export const columns: ColumnDef<ParsedGmae>[] = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'name',
		filterFn: 'fuzzy',
		header: ({ column }) =>
			renderComponent(TableNameButton, {
				onclick: column.getToggleSortingHandler()
			})
	},
	{
		accessorKey: 'category',
		header: 'Category'
	},
	{
		accessorKey: 'description',
		header: 'Description'
	},
	{
		accessorKey: 'tags',
		header: 'Tags',
		cell: ({ row }) => {
			return renderComponent(Tags, { tags: row.original.tags });
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return renderComponent(TableActions, { id: row.original.id });
		}
	}
];
