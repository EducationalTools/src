import type { ColumnDef } from '@tanstack/table-core';
import type { ParsedGmae } from '$lib/gmaes';
import { renderComponent } from '$lib/components/ui/data-table/index.js';
import TableActions from './table-actions.svelte';
import Link from './link.svelte';
import HeaderButtonSort from './header-button-sort.svelte';

export const columns: ColumnDef<ParsedGmae>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) =>
			renderComponent(HeaderButtonSort, {
				content: 'ID'
			})
	},
	{
		accessorKey: 'name',
		header: ({ column }) =>
			renderComponent(HeaderButtonSort, {
				onclick: column.getToggleSortingHandler(),
				content: 'Name',
				sort: true
			}),
		cell: ({ row }) => {
			return renderComponent(Link, {
				children: row.original.name,
				href: `/g/${row.original.id}`
			});
		},
		// @ts-ignore
		filterFn: 'fuzzy'
	},
	{
		accessorKey: 'category',
		header: ({ column }) =>
			renderComponent(HeaderButtonSort, {
				onclick: column.getToggleSortingHandler(),
				content: 'Category',
				sort: true
			})
	},
	{
		accessorKey: 'description',
		header: ({ column }) =>
			renderComponent(HeaderButtonSort, {
				content: 'Description'
			})
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return renderComponent(TableActions, { id: row.original.id });
		}
	}
];
