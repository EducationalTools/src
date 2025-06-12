import type { ColumnDef } from '@tanstack/table-core';
import type { ParsedGmae } from '$lib/gmaes';
import { renderComponent } from '$lib/components/ui/data-table/index.js';
import TableActions from './table-actions.svelte';
import Tags from './tags.svelte';
import HeaderButtonSort from './header-button-sort.svelte';

export const columns: ColumnDef<ParsedGmae>[] = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'name',
		header: ({ column }) =>
			renderComponent(HeaderButtonSort, {
				onclick: column.getToggleSortingHandler()
			}),
		// @ts-ignore
		filterFn: 'fuzzy'
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
