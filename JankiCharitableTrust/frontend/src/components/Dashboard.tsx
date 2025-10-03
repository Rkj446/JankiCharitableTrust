import { Users, Heart, Building2, IndianRupee } from 'lucide-react';
import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const metrics = {
  totalProjects: 12,
  volunteers: 50,
  beneficiaries: 2500,
  totalDonations: 500000
};

const donationData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 67000 },
];

const recentDonations = [
  { name: 'Anonymous', amount: 5000, date: '2024-03-15' },
  { name: 'Rahul S.', amount: 10000, date: '2024-03-14' },
  { name: 'Priya M.', amount: 2500, date: '2024-03-13' },
];

export default function Dashboard() {
  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-foreground text-center">Impact Dashboard</h2>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
            <Building2 className="w-8 h-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{metrics.totalProjects}</div>
            <div className="text-muted-foreground">Total Projects</div>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
            <Users className="w-8 h-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{metrics.volunteers}</div>
            <div className="text-muted-foreground">Volunteers</div>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
            <Heart className="w-8 h-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{metrics.beneficiaries}</div>
            <div className="text-muted-foreground">Beneficiaries</div>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
            <IndianRupee className="w-8 h-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">₹{metrics.totalDonations.toLocaleString()}</div>
            <div className="text-muted-foreground">Total Donations</div>
          </Card>
        </motion.div>
      </div>
      
      {/* Donations Chart */}
      <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80 mb-8">
        <h3 className="text-xl font-bold mb-4 text-foreground">Monthly Donations</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#1fc77a" name="Donations (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Recent Donations */}
      <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
        <h3 className="text-xl font-bold mb-4 text-foreground">Recent Donations</h3>
        <div className="divide-y divide-border/60">
          {recentDonations.map((donation, i) => (
            <div key={i} className="py-3 flex justify-between items-center">
              <div>
                <div className="font-medium text-foreground">{donation.name}</div>
                <div className="text-sm text-muted-foreground">{donation.date}</div>
              </div>
              <div className="font-semibold text-foreground">₹{donation.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}