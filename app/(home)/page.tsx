import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard/index";
import ExpensesPerCategory from "./_components/expenses-per-category";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards month={month} {...dashboard} />

            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
