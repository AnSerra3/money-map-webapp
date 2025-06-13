
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";
import { useState } from "react";

const transactions = [
  {
    id: 1,
    description: "Grocery Store",
    amount: -125.50,
    category: "Food & Dining",
    date: "2024-06-12",
    type: "expense"
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 3500.00,
    category: "Income",
    date: "2024-06-11",
    type: "income"
  },
  {
    id: 3,
    description: "Gas Station",
    amount: -45.20,
    category: "Transportation",
    date: "2024-06-10",
    type: "expense"
  },
  {
    id: 4,
    description: "Movie Tickets",
    amount: -28.00,
    category: "Entertainment",
    date: "2024-06-09",
    type: "expense"
  },
  {
    id: 5,
    description: "Electric Bill",
    amount: -120.00,
    category: "Utilities",
    date: "2024-06-08",
    type: "expense"
  },
  {
    id: 6,
    description: "Online Shopping",
    amount: -89.99,
    category: "Shopping",
    date: "2024-06-07",
    type: "expense"
  },
  {
    id: 7,
    description: "Freelance Payment",
    amount: 450.00,
    category: "Income",
    date: "2024-06-06",
    type: "income"
  },
  {
    id: 8,
    description: "Coffee Shop",
    amount: -12.50,
    category: "Food & Dining",
    date: "2024-06-05",
    type: "expense"
  }
];

export const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(transactions.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-medium">{transaction.description}</h4>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="hidden sm:inline-flex">
                    {transaction.category}
                  </Badge>
                  <div className={`text-lg font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
