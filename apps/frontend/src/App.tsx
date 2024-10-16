import './App.css';
import { CustomerListCard } from './components/CustomerListCard';
import { PurchaseFrequencyCard } from './components/PurchaseFrequencyCard';

function App() {
  return (
    <div className="flex flex-col gap-4">
      <PurchaseFrequencyCard />
      <CustomerListCard />
    </div>
  );
}

export default App;
