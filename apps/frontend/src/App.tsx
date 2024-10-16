import './App.css';
import { CustomerListCard } from './components/CustomerListCard';
import { PurchaseFrequencyCard } from './components/PurchaseFrequencyCard';
import { QueryErrorBoundary } from './QueryErrorBoundary';

function App() {
  return (
    <div className="flex flex-col gap-4">
      <QueryErrorBoundary>
        <PurchaseFrequencyCard />
      </QueryErrorBoundary>
      <QueryErrorBoundary>
        <CustomerListCard />
      </QueryErrorBoundary>
    </div>
  );
}

export default App;
