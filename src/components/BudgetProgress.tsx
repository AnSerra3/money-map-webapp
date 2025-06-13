
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

const budgetCategories = [
  { 
    name: 'Food & Dining', 
    spent: 1200, 
    budget: 1000, 
    percentage: 120,
    status: 'over'
  },
  { 
    name: 'Transportation', 
    spent: 450, 
    budget: 500, 
    percentage: 90,
    status: 'good'
  },
  { 
    name: 'Entertainment', 
    spent: 320, 
    budget: 400, 
    percentage: 80,
    status: 'good'
  },
  { 
    name: 'Utilities', 
    spent: 580, 
    budget: 600, 
    percentage: 97,
    status: 'warning'
  },
  { 
    name: 'Shopping', 
    spent: 890, 
    budget: 800, 
    percentage: 111,
    status: 'over'
  },
  { 
    name: 'Healthcare', 
    spent: 250, 
    budget: 300, 
    percentage: 83,
    status: 'good'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'over': return 'bg-red-500';
    case 'warning': return 'bg-yellow-500';
    case 'good': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'over': return <AlertTriangle className="h-4 w-4" />;
    case 'warning': return <TrendingUp className="h-4 w-4" />;
    case 'good': return <CheckCircle className="h-4 w-4" />;
    default: return null;
  }
};

export const BudgetProgress = () => {
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const overallPercentage = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Budget Overview</h2>
        <Button variant="outline">Edit Budgets</Button>
      </div>

      {/* Overall Budget Summary */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-white">Overall Budget Progress</CardTitle>
          <CardDescription className="text-blue-100">
            Total spent vs total budget for this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Spent: ${totalSpent.toLocaleString()}</span>
              <span>Budget: ${totalBudget.toLocaleString()}</span>
            </div>
            <Progress 
              value={overallPercentage} 
              className="h-3 bg-white/20"
            />
            <div className="text-center text-lg font-semibold">
              {overallPercentage.toFixed(1)}% of budget used
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgetCategories.map((category) => (
          <Card key={category.name} className="shadow-lg border-0">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">{category.name}</CardTitle>
                <Badge 
                  variant="secondary" 
                  className={`${getStatusColor(category.status)} text-white`}
                >
                  {getStatusIcon(category.status)}
                  <span className="ml-1 capitalize">{category.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${category.spent}</span>
                  <span>${category.budget}</span>
                </div>
                <Progress 
                  value={Math.min(category.percentage, 100)} 
                  className="h-2"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {category.percentage.toFixed(0)}% used
                  </span>
                  {category.percentage > 100 && (
                    <span className="text-sm text-red-600 font-medium">
                      ${category.spent - category.budget} over budget
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Budget Tips */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-lg">Budget Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Consider reducing dining out expenses - you're 20% over budget
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Great job staying under budget for transportation!
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Monitor your shopping expenses - you're approaching your limit
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
