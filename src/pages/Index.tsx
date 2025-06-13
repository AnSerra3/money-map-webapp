
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ExpenseChart } from "@/components/ExpenseChart";
import { BudgetProgress } from "@/components/BudgetProgress";
import { TransactionList } from "@/components/TransactionList";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { useMonthlyStats } from "@/services/api";

const Index = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  // Fetch monthly stats from API
  const { data: monthlyStats, isLoading, error } = useMonthlyStats();

  // Fallback data while loading or if API fails
  const defaultStats = {
    totalIncome: 5420.00,
    totalExpenses: 3890.50,
    savings: 1529.50,
    budgetUsed: 72.8
  };

  const stats = monthlyStats || defaultStats;

  if (error) {
    console.error('Failed to load monthly stats:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Budget Tracker
            </h1>
            <p className="text-muted-foreground mt-2">Manage your finances with ease</p>
          </div>
          <Button 
            onClick={() => setIsAddTransactionOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : `$${stats.totalIncome.toLocaleString()}`}
              </div>
              <p className="text-xs opacity-90">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : `$${stats.totalExpenses.toLocaleString()}`}
              </div>
              <p className="text-xs opacity-90">-5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Net Savings</CardTitle>
              <DollarSign className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : `$${stats.savings.toLocaleString()}`}
              </div>
              <p className="text-xs opacity-90">+28% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Budget Used</CardTitle>
              <Target className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : `${stats.budgetUsed}%`}
              </div>
              <p className="text-xs opacity-90">Within budget range</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseChart />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetProgress />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionList />
          </TabsContent>
        </Tabs>

        <AddTransactionDialog 
          open={isAddTransactionOpen} 
          onOpenChange={setIsAddTransactionOpen} 
        />
      </div>
    </div>
  );
};

export default Index;
