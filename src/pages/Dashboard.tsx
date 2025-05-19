import { Header } from '../components/Header/Header';
import { OverviewCard } from '../components/OverviewCard/OverviewCard';
import { Charts } from '../components/Charts/Charts';
import { TransactionsTable } from '../components/TransactionsTable/TransactionsTable';
import { Notifications } from '../components/Notifications/Notifications';
import { userData, overviewData, transactionsData } from '../data/mockData';

// Add a comment to trigger re-evaluation

export const Dashboard = () => {
  return (
    <div className="w-full min-h-screen max-w-7xl mx-auto px-1 sm:px-2 md:px-4 lg:px-8 flex flex-col space-y-6 text-sm">
      <Header user={userData} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Total Balance"
          value={overviewData.balance}
          type="balance"
          period="monthly"
        />
        <OverviewCard
          title="Income"
          value={overviewData.income}
          type="income"
          period="monthly"
        />
        <OverviewCard
          title="Expenses"
          value={overviewData.expenses}
          type="expense"
          period="monthly"
        />
        <OverviewCard
          title="Savings Ratio"
          value={overviewData.savingsRatio * 100}
          type="savings"
          period="monthly"
          suffix="%"
        />
      </div>

      <div className="w-full h-[400px] border border-dashed border-red-500">
        <Charts transactions={transactionsData} />
      </div>
      <div className="w-full">
        <Notifications />
      </div>
      <div className="w-full">
        <TransactionsTable transactions={transactionsData} />
      </div>
    </div>
  );
}; 