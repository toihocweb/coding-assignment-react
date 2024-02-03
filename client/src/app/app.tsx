import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Ticket } from '@acme/shared-models';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import TicketDetail from './ticket-detail';

const App = () => {
  const [tickets] = useState([] as Ticket[]);

  return (
    <div className={styles['app']}>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetail />} />
      </Routes>
    </div>
  );
};

export default App;
