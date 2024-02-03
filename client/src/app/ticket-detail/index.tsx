import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTickets } from '../store/useTickets';
import { Ticket } from '@acme/shared-models';
import { Skeleton } from '../components/ui/skeleton';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const getTicket = useTickets((state) => state.getTicket);

  const getDetail = async () => {
    const ticket = await getTicket(id);
    setTicket(ticket);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tickets Detail</h2>
      {ticket ? (
        <>
          <div>Id: {ticket?.id}</div>
          <div>Description: {ticket?.description}</div>
          <div>Assignee Id: {ticket?.assigneeId}</div>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
