import { render, screen, fireEvent } from '@testing-library/react';
import AddTicketDialog from './add-ticket';

describe('AddTicketDialog', () => {
  it('should open the dialog when "Add Ticket" button is clicked', () => {
    const setIsOpen = jest.fn();
    render(<AddTicketDialog isOpen={false} setIsOpen={setIsOpen} />);
    fireEvent.click(screen.getByText('Add Ticket'));
    expect(setIsOpen).toHaveBeenCalledWith(true);
  });
});
