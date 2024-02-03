import { Ticket } from '@acme/shared-models';
import { TicketDataTable } from './data-table/data-table-tickets';
import { useState } from 'react';

import AddTicketDialog from './dialog/add-ticket';
import { useTickets } from '../store/useTickets';
import EditTicketDialog from './dialog/edit-ticket';

export interface TicketsProps {
  tickets: Ticket[];
}

function Tickets(props: TicketsProps) {
  const [isAdddialogOpen, setIsAddDialogOpen] = useState(false);
  const showEditDialog = useTickets((state) => state.showEditDialog);
  const setEditDialog = useTickets((state) => state.setEditDialog);

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-6">Tickets List</h2>

      <AddTicketDialog
        isOpen={isAdddialogOpen}
        setIsOpen={setIsAddDialogOpen}
      />
      <EditTicketDialog isOpen={showEditDialog} setIsOpen={setEditDialog} />
      <TicketDataTable />
    </div>
  );
}

export default Tickets;
