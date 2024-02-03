import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTickets } from '../../store/useTickets';
import {
  CreateTicketDto,
  UpdateTicketDto,
  createTicketSchema,
  updateTicketSchema,
} from '../../lib/validators';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { useAssignees } from '../../store/useAssignees';
import { useEffect } from 'react';

interface EditTicketFormProps {
  closeDialog: () => void;
}

export default function EditTicketFormProps({
  closeDialog,
}: EditTicketFormProps) {
  const ticketStore = useTickets((state) => state);
  const assignees = useAssignees((state) => state.assignees);
  const fetchAssignees = useAssignees((state) => state.fetchAssignees);

  useEffect(() => {
    fetchAssignees();
  }, []);

  const form = useForm<UpdateTicketDto>({
    resolver: zodResolver(updateTicketSchema),
    defaultValues: {
      description: '',
      assigneeId: '',
    },
  });

  const onSubmit = async (values: UpdateTicketDto) => {
    const { assigneeId } = values;
    if (!ticketStore.selectedTicket) return;
    await ticketStore.editTicket(ticketStore.selectedTicket, assigneeId);
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="assigneeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignee</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={ticketStore.selectedTicket?.assigneeId?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={null as unknown as string}>
                      Unassigned
                    </SelectItem>
                    {assignees.map((assignee) => (
                      <SelectItem
                        key={assignee.id}
                        value={assignee.id.toString()}
                      >
                        {assignee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Mockup)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter ticket description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
