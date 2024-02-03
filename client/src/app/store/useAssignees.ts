import { create } from 'zustand';
import { User } from '@acme/shared-models';
import axios from 'axios';

interface AssigneeState {
  assignees: User[];
}

interface AssigneeActions {
  fetchAssignees: () => Promise<void>;
}

export const useAssignees = create<AssigneeState & AssigneeActions>(
  (set, get) => ({
    assignees: [],

    fetchAssignees: async () => {
      const res = await axios.get<User[]>('/api/users');
      set({ assignees: res.data });
    },
  })
);
