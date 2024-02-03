import { create } from 'zustand';
import { Ticket } from '@acme/shared-models';
import axios from 'axios';
import { CreateTicketDto } from '../lib/validators';

interface TicketState {
  tickets: Ticket[];
  showEditDialog: boolean;
  selectedTicket: Ticket | null;
}

interface TicketActions {
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: CreateTicketDto) => Promise<void>;
  maskTicketAsCompleted: (id: string) => Promise<void>;
  setEditDialog: (show: boolean) => void;
  assignTicket: (ticket: Ticket, assigneeId: string) => Promise<void>;
  unassignTicket: (ticket: Ticket) => Promise<void>;
  editTicket: (ticket: Ticket, assigneeId: string) => Promise<void>;
  setSelectedTicket: (ticket: Ticket) => void;
  getTicket: (id: string | undefined) => Promise<Ticket>;
}

export const useTickets = create<TicketState & TicketActions>((set, get) => ({
  tickets: [],
  showEditDialog: false,
  selectedTicket: null,

  fetchTickets: async () => {
    const res = await axios.get<Ticket[]>('/api/tickets');
    set({ tickets: res.data });
  },
  addTicket: async (ticket) => {
    await axios.post<Ticket>('/api/tickets', ticket);
    get().fetchTickets();
  },
  maskTicketAsCompleted: async (id) => {
    await axios.put(`/api/tickets/${id}/complete`);
    get().fetchTickets();
  },
  setEditDialog: (show) => {
    set({ showEditDialog: show });
  },
  assignTicket: async (ticket, assigneeId) => {
    await axios.put(`/api/tickets/${ticket.id}/assign/${assigneeId}`);
    get().fetchTickets();
  },
  unassignTicket: async (ticket) => {
    await axios.put(`/api/tickets/${ticket.id}/unassign`);
    get().fetchTickets();
  },
  editTicket: async (ticket, assigneeId) => {
    if (assigneeId) {
      await get().assignTicket(ticket, assigneeId);
    } else {
      await get().unassignTicket(ticket);
    }
    set({ showEditDialog: false, selectedTicket: null });
  },
  setSelectedTicket: (ticket) => {
    set({ selectedTicket: ticket });
  },
  getTicket: async (id) => {
    const res = await axios.get(`/api/tickets/${id}`);
    return res.data;
  },
}));
