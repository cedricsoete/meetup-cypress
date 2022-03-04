import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import TodoDetails, { TodoDetailsProps } from './TodoDetails';
describe('TodoDetails', () => {
  it('should edit tache', async () => {
    const props: TodoDetailsProps = {
      todo: {
        id: 'id',
        complete: true,
        text: 'tache A',
      }
    }

    render(<TodoDetails {...props} />)
    fireEvent.click(screen.getByTestId('edit'));
    userEvent.type(screen.getByTestId('edit-title'), 'Tache Edit{enter}');
    expect(screen.findByTestId('edit-title')).resolves.toHaveTextContent('Tache Edit');
  })
})