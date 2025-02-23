import React, { useState } from 'react';
import { 
  UserCircle, 
  LogIn, 
  Wallet, 
  CreditCard, 
  HandCoins, 
  PlusCircle, 
  FileText,
  Book,
  MessageCircle,
  Info,
  Globe,
  Target,
  Shield
} from 'lucide-react';

import { BusinessRegistrationPage, RequestLoanPage, AddExpensePage } from './expenseComponents';

const BlockchainBusinessPlatform = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [currentPage, setCurrentPage] = useState('connection');
  const [businessRegistered, setBusinessRegistered] = useState(false);
  
  const [expenses, setExpenses] = useState([]);
  const [loans, setLoans] = useState([]);
  const [complianceDocuments, setComplianceDocuments] = useState([]);
  const [communicationLogs, setCommunicationLogs] = useState([]);

  // Simulated blockchain transaction
  const SimulatedWallet = {
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    chainId: '0x13881',  // Mumbai testnet
    connected: false,
    
    // Simulate connection delay
    connect: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          SimulatedWallet.connected = true;
          resolve({
            address: SimulatedWallet.address,
            chainId: SimulatedWallet.chainId
          });
        }, 1000); // Simulate 1 second connection delay
      });
    },
    
    // Simulate network switching
    switchNetwork: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ chainId: SimulatedWallet.chainId });
        }, 800);
      });
    }
  };
  
  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        try {
          // This will trigger the MetaMask popup
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
  
          if (accounts.length > 0) {
            // If MetaMask connection successful, use real address
            const address = accounts[0];
  
            // Try to switch to Mumbai testnet
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x13881' }], // Mumbai testnet
              });
            } catch (switchError) {
              // Handle chain switch error
              console.log("Network switch failed, using default network");
            }
  
            setWalletConnected(true);
            setWalletAddress(address);
            setCurrentPage(businessRegistered ? 'dashboard' : 'business-registration');
  
            // Listen for account changes
            window.ethereum.on('accountsChanged', (newAccounts) => {
              if (newAccounts.length === 0) {
                // MetaMask is locked or user has no accounts
                fallbackToSimulation();
              } else {
                setWalletAddress(newAccounts[0]);
              }
            });
  
            return;
          }
        } catch (error) {
          // If user rejects MetaMask connection or it fails
          console.log("MetaMask connection failed, falling back to simulation", error);
          fallbackToSimulation();
        }
      } else {
        // If MetaMask is not installed, fall back to simulation
        console.log("MetaMask not detected, using simulation");
        fallbackToSimulation();
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };
  
  // Fallback function for simulation
  const fallbackToSimulation = async () => {
    const { address, chainId } = await SimulatedWallet.connect();
    
    setWalletConnected(true);
    setWalletAddress(address);
    setCurrentPage(businessRegistered ? 'dashboard' : 'business-registration');
    
    // Simulate account changes
    const simulateAccountChange = () => {
      const newAddress = '0x' + Math.random().toString(36).substring(2, 15);
      setWalletAddress(newAddress);
    };
    
    const accountChangeInterval = setInterval(simulateAccountChange, 300000);
    
    return () => {
      clearInterval(accountChangeInterval);
    };
  };
  // Update the simulateBlockchainTransaction function
  const simulateBlockchainTransaction = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 95% success rate
        const success = Math.random() < 0.95;
        if (success) {
          resolve({
            success: true,
            hash: '0x' + Math.random().toString(36).substring(2, 15),
            timestamp: new Date().toISOString()
          });
        } else {
          resolve({
            success: false,
            error: 'Transaction failed'
          });
        }
      }, 2000); // Simulate 2 second transaction time
    });
  };
  
  // Update handleBusinessRegistration to use simulation
  const handleBusinessRegistration = async (registrationData) => {
    alert('Processing business registration...');
    
    // First simulate the blockchain transaction
    const result = await simulateBlockchainTransaction();
    
    if (result.success) {
      // If simulation successful, try to prompt MetaMask
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request MetaMask account access
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });
          
          // If MetaMask connects successfully, proceed with registration
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]); // Update with real MetaMask address
          }
        } catch (error) {
          console.log("MetaMask connection failed, using simulated address");
          // Continue with simulated address if MetaMask fails
        }
      }
      
      setBusinessRegistered(true);
      setCurrentPage('dashboard');
      alert('Business registered successfully! Transaction hash: ' + result.hash);
    } else {
      alert('Registration failed. Please try again.');
    }
  };
  
  // Update handleExpenseSubmit to use simulation
  const handleExpenseSubmit = async (expenseData) => {
    alert('Processing expense...');
    
    const result = await simulateBlockchainTransaction();
    
    if (result.success) {
      const newExpense = {
        id: expenses.length + 1,
        description: expenseData.description,
        amount: expenseData.amount,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        status: 'Pending',
        transactionHash: result.hash
      };
      
      setExpenses(prev => [...prev, newExpense]);
      setCurrentPage('dashboard');
  
      // Simulate transaction confirmation
      setTimeout(() => {
        setExpenses(prev => 
          prev.map(exp => 
            exp.id === newExpense.id 
              ? {...exp, status: 'Completed'}
              : exp
          )
        );
      }, 3000);
      
      alert('Expense recorded! Transaction hash: ' + result.hash);
    } else {
      alert('Failed to record expense. Please try again.');
    }
  };
  
  // Update handleLoanSubmit to use simulation
  const handleLoanSubmit = async (loanData) => {
    alert('Processing loan request...');
    
    const result = await simulateBlockchainTransaction();
    
    if (result.success) {
      const newLoan = {
        id: loans.length + 1,
        description: loanData.description,
        amount: loanData.amount,
        interestRate: loanData.interestRate,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        status: 'Pending',
        transactionHash: result.hash
      };
      
      setLoans(prev => [...prev, newLoan]);
      setCurrentPage('dashboard');
  
      // Simulate loan approval process
      setTimeout(() => {
        setLoans(prev => 
          prev.map(loan => 
            loan.id === newLoan.id 
              ? {...loan, status: 'Approved'}
              : loan
          )
        );
      }, 3000);
      
      alert('Loan request submitted! Transaction hash: ' + result.hash);
    } else {
      alert('Failed to submit loan request. Please try again.');
    }
  };
  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Business Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <UserCircle className="w-10 h-10 text-gray-600" />
            <span className="text-sm">
              {walletAddress ? 
                `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` 
                : 'Not Connected'}
            </span>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Expenses Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-3 text-green-600" /> 
              Expenses
              <button 
                onClick={() => setCurrentPage('add-expense')}
                className="ml-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <PlusCircle size={20} />
              </button>
            </h2>
            {expenses.slice(0, 3).map((expense) => (
              <div key={expense.id} className="border-b pb-2 mb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-xs text-gray-500">{expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{expense.amount}</p>
                    <p className={`text-xs ${
                      expense.status === 'Pending' 
                        ? 'text-yellow-600' 
                        : 'text-green-600'
                    }`}>
                      {expense.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loans Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <HandCoins className="mr-3 text-purple-600" /> 
              Loans
              <button 
                onClick={() => setCurrentPage('request-loan')}
                className="ml-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <PlusCircle size={20} />
              </button>
            </h2>
            {loans.slice(0, 3).map((loan) => (
              <div key={loan.id} className="border-b pb-2 mb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{loan.description}</p>
                    <p className="text-xs text-gray-500">{loan.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">₹{loan.amount}</p>
                    <p className={`text-xs ${
                      loan.status === 'Pending' 
                        ? 'text-yellow-600' 
                        : 'text-green-600'
                    }`}>
                      {loan.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Documents Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-3 text-blue-600" /> 
              Documents
            </h2>
            {complianceDocuments.slice(0, 3).map((doc) => (
              <div key={doc.id} className="border-b pb-2 mb-2">
                <p className="font-medium">{doc.type}</p>
                <p className="text-xs text-gray-500">{doc.uploadDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Connection Page Component
  const ConnectionPage = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <Wallet className="mx-auto mb-6 text-blue-600" size={64} />
        <h1 className="text-2xl font-bold mb-4">
          Business Platform
        </h1>
        <button 
          onClick={connectWallet}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center"
        >
          <LogIn className="mr-2" /> Connect Wallet
        </button>
      </div>
    </div>
  );

  // Render the appropriate page based on current state
  const renderPage = () => {
    if (!walletConnected) return <ConnectionPage />;
    if (!businessRegistered) {
      return <BusinessRegistrationPage onSubmit={handleBusinessRegistration} />;
    }
    
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-expense':
        return <AddExpensePage 
          onSubmit={handleExpenseSubmit} 
          onClose={() => setCurrentPage('dashboard')} 
        />;
      case 'request-loan':
        return <RequestLoanPage 
          onSubmit={handleLoanSubmit} 
          onClose={() => setCurrentPage('dashboard')} 
        />;
      default:
        return <Dashboard />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default BlockchainBusinessPlatform;