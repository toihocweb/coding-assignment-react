import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Row } from '@tanstack/react-table';
import { Ticket } from '@acme/shared-models';
import { Button } from '../../components/ui/button';
import { useTickets } from '../../store/useTickets';
import { useNavigate } from 'react-router-dom';

interface DataTableActionsProps {
  row: Row<Ticket>;
}

const DataTableActions = ({ row }: DataTableActionsProps) => {
  const ticketStore = useTickets((state) => state);
  const navigate = useNavigate();
  return (
    <div className="w-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={async () => {
              const id = row.original.id.toString();
              navigate(`/${id}`);
            }}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              const id = row.original.id.toString();
              await ticketStore.maskTicketAsCompleted(id);
            }}
          >
            Mask as completed
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              ticketStore.setEditDialog(true);
              ticketStore.setSelectedTicket(row.original);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Delete (not work)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataTableActions;
