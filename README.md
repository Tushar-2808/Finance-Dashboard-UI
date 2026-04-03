# WealthLens — Personal Finance Dashboard

WealthLens is a modern, interactive financial tracking platform designed to help users visualize their cash flow, track expenses, and gain actionable insights into their spending habits.

## 🚀 Key Features

### 1. Unified Dashboard
- **Greeting Banner**: Personalized greeting with a daily financial summary.
- **KPI Cards**: Real-time tracking of Balance, Income, Expenses, and Transaction count with delta indicators.
- **Cash Flow Trend**: A dual-series area chart comparing income vs expenses over the last 6 months.
- **Expense Allocation**: A centered donut chart with a premium legend showcasing spending distribution.

### 2. Transaction Management
- **Full Ledger**: A detailed, sortable table of all financial activities.
- **Striped UI**: Enhanced readability with alternating row backgrounds and kind-specific status indicators (Debit/Credit).
- **Search & Filter**: Advanced filtering by date range, category, and transaction type.
- **Admin Actions**: Full CRUD support for administrators (Add, Edit, Delete).

### 3. Financial Insights
- **Monthly Cash Flow**: Grouped bar charts for side-by-side monthly comparisons.
- **Efficiency Metrics**: Real-time savings rate calculation with visual progress indicators.
- **Spending Centers**: Automated identification of highest spending categories and activity volume.

### 4. Role-Based UI (RBAC)
- **Admin Mode**: Full control over transaction data and management.
- **Viewer Mode**: Read-only access to dashboards and insights.
- **Switchable Context**: Simulated role switching via the lateral navigation bar.

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Modern HSL palette)
- **Charts**: Recharts (Customized tooltips & gradients)
- **State Management**: Zustand (Persistent store)
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans

## 📦 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd wealthlens
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Design Philosophy
WealthLens emphasizes **readability** and **focus**. By using a sophisticated palette of Violet, Teal, and Orange, we create a high-contrast environment that separates income from debt naturally while maintaining a premium, "Wealth Management" aesthetic.
