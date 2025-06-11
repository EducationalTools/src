import type { ColumnDef } from '@tanstack/table-core';
import type { Gmae } from '$lib/gmaes';

export const columns: ColumnDef<Gmae>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
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
		header: 'Tags'
	}
];
