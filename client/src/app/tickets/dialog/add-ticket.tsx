import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import AddTicketForm from '../form/add-ticket';

interface AddTicketDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const AddTicketDialog = ({
  isOpen,
  setIsOpen,
}: AddTicketDialogProps): JSX.Element => {
  const openAddDialog = () => setIsOpen(true);
  const closeAddDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={openAddDialog}>Add Ticket</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Ticket Form</DialogTitle>
          <DialogDescription>
            Please fill out the form below to add a new ticket.
          </DialogDescription>
        </DialogHeader>
        <AddTicketForm closeDialog={closeAddDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTicketDialog;
