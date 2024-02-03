import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import EditTicketFormProps from '../form/edit-ticket';

interface EditTicketDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const EditTicketDialog = ({
  isOpen,
  setIsOpen,
}: EditTicketDialogProps): JSX.Element => {
  const closeAddDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Ticket Form</DialogTitle>
          <DialogDescription>
            Please fill out the form below to edit the ticket.
          </DialogDescription>
        </DialogHeader>
        <EditTicketFormProps closeDialog={closeAddDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTicketDialog;
