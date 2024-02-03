import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTickets } from '../../store/useTickets';
import { CreateTicketDto, createTicketSchema } from '../../lib/validators';
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

interface AddTicketFormProps {
  closeDialog: () => void;
}

export default function AddTicketForm({ closeDialog }: AddTicketFormProps) {
  const addTicket = useTickets((state) => state.addTicket);

  const form = useForm<CreateTicketDto>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      description: '',
    },
  });

  const onSubmit = async (values: CreateTicketDto) => {
    await addTicket(values);
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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
