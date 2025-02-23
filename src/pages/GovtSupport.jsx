import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const schemes = [
  {
    name: "Pradhan Mantri Jan Dhan Yojana",
    targetGroups: ["Women", "Business/Education"],
    benefits: "Financial inclusion by providing banking services to all households.",
    monetaryValue: "Access to bank accounts with no minimum balance, RuPay debit card, and overdraft facility up to ₹10,000.",
    eligibility: "All Indian citizens, especially those without a bank account.",
    state: "Nationwide",
    yearStarted: 2014,
    detailedInformation: "A National Mission on Financial Inclusion to ensure access to financial services, including Banking/Savings & Deposit Accounts, Remittance, Credit, Insurance, and Pension."
  },
  {
    name: "Pradhan Mantri Kisan Samman Nidhi",
    targetGroups: ["Farmers"],
    benefits: "Income support to farmers.",
    monetaryValue: "₹6,000 per year, paid in three equal installments.",
    eligibility: "Small and marginal farmers owning up to 2 hectares of cultivable land.",
    state: "Nationwide",
    yearStarted: 2019,
    detailedInformation: "A Central Sector scheme with 100% funding from the Government of India to support farmers' financial needs."
  },
  {
    name: "Beti Bachao Beti Padhao",
    targetGroups: ["Women"],
    benefits: "Promote survival, protection, and education of the girl child.",
    monetaryValue: "Varies based on state and specific initiatives.",
    eligibility: "Girl children across India.",
    state: "Nationwide",
    yearStarted: 2015,
    detailedInformation: "Aimed at addressing the declining Child Sex Ratio (CSR) and related issues of women empowerment over a life-cycle continuum."
  },
  {
    name: "Atal Pension Yojana",
    targetGroups: ["Business/Education"],
    benefits: "Pension scheme for unorganized sector workers.",
    monetaryValue: "Guaranteed minimum pension of ₹1,000 to ₹5,000 per month after the age of 60.",
    eligibility: "Citizens aged 18-40 years with a bank account.",
    state: "Nationwide",
    yearStarted: 2015,
    detailedInformation: "Encourages workers from the unorganized sector to voluntarily save for their retirement."
  },
  {
    name: "Make in India",
    targetGroups: ["Business/Education"],
    benefits: "Encourage companies to manufacture in India and incentivize dedicated investments.",
    monetaryValue: "Various incentives and support mechanisms.",
    eligibility: "Domestic and international companies.",
    state: "Nationwide",
    yearStarted: 2014,
    detailedInformation: "Aims to transform India into a global design and manufacturing hub."
  },
  {
    name: "Stand-Up India",
    targetGroups: ["Women", "Business/Education"],
    benefits: "Provides bank loans to SC/ST and women entrepreneurs.",
    monetaryValue: "Loans ranging from ₹10 lakh to ₹1 crore.",
    eligibility: "SC/ST and women entrepreneurs setting up new businesses.",
    state: "Nationwide",
    yearStarted: 2016,
    detailedInformation: "Aims to promote entrepreneurship among women and underprivileged sections by providing financial support for setting up greenfield enterprises."
  },
  {
    name: "Soil Health Card Scheme",
    targetGroups: ["Farmers"],
    benefits: "Provides farmers with information about soil health and nutrient recommendations.",
    monetaryValue: "Free soil health testing and recommendations.",
    eligibility: "All farmers.",
    state: "Nationwide",
    yearStarted: 2015,
    detailedInformation: "Helps farmers understand the nutrient and fertility status of their soil and adopt proper farming practices."
  },
  {
    name: "PM SVANidhi",
    targetGroups: ["Business/Education"],
    benefits: "Micro-credit loans for street vendors to restart businesses post-pandemic.",
    monetaryValue: "Collateral-free working capital loan up to ₹10,000.",
    eligibility: "Street vendors operating before March 24, 2020.",
    state: "Nationwide",
    yearStarted: 2020,
    detailedInformation: "Aims to empower street vendors by providing them access to affordable credit for their businesses."
  },
  {
    name: "National Rural Health Mission",
    targetGroups: ["Women"],
    benefits: "Improves healthcare services in rural areas.",
    monetaryValue: "Free or subsidized healthcare services for rural populations.",
    eligibility: "Rural populations, especially pregnant women and children.",
    state: "Nationwide",
    yearStarted: 2005,
    detailedInformation: "Focuses on providing accessible, affordable, and quality healthcare to rural India, especially targeting maternal and child health."
  }
];

const Card = ({ className, children }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

const CardContent = ({ className, children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const GovernmentSchemesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);

  const uniqueTargets = [...new Set(schemes.flatMap(scheme => scheme.targetGroups))];

  useEffect(() => {
    const filtered = schemes.filter(scheme => {
      const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.detailedInformation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTargets = selectedTargets.length === 0 || 
        scheme.targetGroups.some(target => selectedTargets.includes(target));
      
      return matchesSearch && matchesTargets;
    });
    
    setFilteredSchemes(filtered);
  }, [searchTerm, selectedTargets]);

  const toggleTarget = (target) => {
    setSelectedTargets(prev => 
      prev.includes(target)
        ? prev.filter(t => t !== target)
        : [...prev, target]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search schemes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={20} className="text-gray-500" />
          {uniqueTargets.map(target => (
            <button
              key={target}
              onClick={() => toggleTarget(target)}
              className={`px-4 py-1 rounded-full text-sm transition-colors ${
                selectedTargets.includes(target)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {target}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme, index) => (
          <motion.div
            key={scheme.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <h3 className="text-xl font-semibold">{scheme.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scheme.targetGroups.map(group => (
                    <span
                      key={group}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Benefits:</p>
                  <p className="text-sm">{scheme.benefits}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Value:</p>
                  <p className="text-sm">{scheme.monetaryValue}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Eligibility:</p>
                  <p className="text-sm">{scheme.eligibility}</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">Started in {scheme.yearStarted}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredSchemes.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No schemes found matching your criteria
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemesDashboard;