import { Checkbox } from '../../components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Ticket } from '@acme/shared-models';
import { Badge } from '../../components/ui/badge';
import { getStatusText } from '../../lib/utils';
import DataTableActions from './data-table-actions';

export const columns: ColumnDef<Ticket>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'assigneeId',
    header: 'Assignee Id',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('assigneeId')}</div>
    ),
  },
  {
    accessorKey: 'completed',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('completed') as boolean;
      return (
        <Badge variant={status ? 'default' : 'destructive'}>
          {getStatusText(status)}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
    enableResizing: true,
    size: 2,

    cell: ({ row }) => {
      return <DataTableActions row={row} />;
    },
  },
];
