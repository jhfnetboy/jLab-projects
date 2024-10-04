"use client";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SolidityExaminerABI from './SolidityExaminer.json';


// const contractAddress = '0xe17fAcE58d8a2A3641a30e25BeE4a98Ba9ACe41d';

export default function Home() {
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [numberValue, setNumberValue] = useState(0);
  const [boolValue, setBoolValue] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newBool, setNewBool] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentScore, setStudentScore] = useState('');
  const [divideA, setDivideA] = useState('');
  const [divideB, setDivideB] = useState('');
  const [divideResult, setDivideResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [setNumberStatus, setSetNumberStatus] = useState('');

  // Add new loading states
  const [isLoadingSetBool, setIsLoadingSetBool] = useState(false);
  const [isLoadingSetAddress, setIsLoadingSetAddress] = useState(false);
  const [isLoadingAddStudent, setIsLoadingAddStudent] = useState(false);
  const [isLoadingDivide, setIsLoadingDivide] = useState(false);

  // Add new status states
  const [setBoolStatus, setSetBoolStatus] = useState('');
  const [setAddressStatus, setSetAddressStatus] = useState('');
  const [addStudentStatus, setAddStudentStatus] = useState('');
  const [divideStatus, setDivideStatus] = useState('');

  const [studentId, setStudentId] = useState('');
  const [studentInfo, setStudentInfo] = useState({ name: '', score: '' });
  const [isLoadingGetStudent, setIsLoadingGetStudent] = useState(false);
  const [getStudentStatus, setGetStudentStatus] = useState('');

  // Add new state variables for student count and last student info
  // const [studentCount, setStudentCount] = useState(0);
  // const [lastStudentInfo, setLastStudentInfo] = useState('');

  useEffect(() => {
    const connectToEthereum = async () => {
      try {
        const ethereumNodeUrl = 'https://sepolia.infura.io/v3/be1aa32b920b4f46936b4ac92ad3c387';
        // console.log(ethereumNodeUrl);// Replace with your Ethereum node URL
        const newProvider = new ethers.JsonRpcProvider(ethereumNodeUrl);
        // console.log(newProvider);
        setProvider(newProvider);
        console.log('Connected to Ethereum node');
      } catch (error) {
        console.error('Error connecting to Ethereum node:', error);
      }
    };

    connectToEthereum();
  }, []);

  useEffect(() => {
    const initializeContract = async () => {
      if (provider) {
        try {
          const contractAddress = '0xe17fAcE58d8a2A3641a30e25BeE4a98Ba9ACe41d' // Replace with your contract address
          const contractABI = SolidityExaminerABI.abi; // Replace with your contract ABI
          // console.log(contractABI);
          
          const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
          // console.log("pk:",privateKey);
          if (!privateKey) {
            throw new Error("PRIVATE_KEY is not set in the environment");
          }
          const signer = new ethers.Wallet(privateKey, provider)
          // console.log(signer);
          const contract = new ethers.Contract(contractAddress, contractABI, signer);

          // console.log(contract);
          setContract(contract);
          console.log('Contract initialized');
        } catch (error) {
          console.error('Error initializing contract:', error);
        }
      }
    };

    initializeContract();
  }, [provider]);

  useEffect(() => {
    const fetchInitialValues = async () => {
      if (contract) {
        try {
          const initialNumber = await contract.numberValue();
          setNumberValue(initialNumber.toString());

          const initialBool = await contract.boolValue();
          setBoolValue(initialBool);

          const initialAddress = await contract.addressValue();
          setAddressValue(initialAddress);
        } catch (error) {
          console.error('Error fetching initial values:', error);
        }
      }
    };

    fetchInitialValues();
  }, [contract]);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (contract) {
        try {
          // console.log("Fetching student count...");
          // const count = await contract.getStudentCount();
          // console.log("Student count:", count.toString());
          // setStudentCount(count.toString());

          // Uncomment these lines if you want to fetch the last student info
          // const lastInfo = await contract.getStudent();
          // console.log("Last student info:", lastInfo);
          // setLastStudentInfo(lastInfo);
        } catch (error) {
          console.error('Error fetching student info:', error);
          if (error instanceof Error) {
            console.error('Error message:', error.message);
          }
          if (typeof error === 'object' && error !== null && 'reason' in error) {
            console.error('Error reason:', (error as { reason: string }).reason);
          }
        }
      }
    };

    fetchStudentInfo();
  }, [contract]);

  const handleSetNumber = async () => {
    if (contract) {
      setIsLoading(true);
      setSetNumberStatus('');
      try {
        const tx = await contract.setNumber(newNumber);
        setSetNumberStatus('Transaction sent. Waiting for confirmation...');
        await tx.wait();
        const updatedNumber = await contract.numberValue();
        setNumberValue(updatedNumber.toString());
        setSetNumberStatus('Number updated successfully!');
      } catch (error: unknown) {
        console.error('Error setting number:', error);
        if (error instanceof Error) {
          setSetNumberStatus(`Error: ${error.message}`);
        } else {
          setSetNumberStatus('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSetBool = async () => {
    if (contract) {
      setIsLoadingSetBool(true);
      setSetBoolStatus('');
      try {
        const tx = await contract.setBool(newBool);
        setSetBoolStatus('Transaction sent. Waiting for confirmation...');
        await tx.wait();
        const updatedBool = await contract.boolValue();
        setBoolValue(updatedBool);
        setSetBoolStatus('Bool updated successfully!');
      } catch (error: unknown) {
        console.error('Error setting bool:', error);
        if (error instanceof Error) {
          setSetBoolStatus(`Error: ${error.message}`);
        } else {
          setSetBoolStatus('An unknown error occurred');
        }
      } finally {
        setIsLoadingSetBool(false);
      }
    }
  };

  const handleSetAddress = async () => {
    if (contract) {
      setIsLoadingSetAddress(true);
      setSetAddressStatus('');
      try {
        const tx = await contract.setAddress(newAddress);
        setSetAddressStatus('Transaction sent. Waiting for confirmation...');
        await tx.wait();
        const updatedAddress = await contract.addressValue();
        setAddressValue(updatedAddress);
        setSetAddressStatus('Address updated successfully!');
      } catch (error: unknown) {
        console.error('Error setting address:', error);
        if (error instanceof Error) {
          setSetAddressStatus(`Error: ${error.message}`);
        } else {
          setSetAddressStatus('An unknown error occurred');
        }
      } finally {
        setIsLoadingSetAddress(false);
      }
    }
  };

  const handleAddStudent = async () => {
    if (contract) {
      setIsLoadingAddStudent(true);
      setAddStudentStatus('');
      try {
        const tx = await contract.addStudent(studentName, studentScore);
        setAddStudentStatus('Transaction sent. Waiting for confirmation...');
        await tx.wait();
        setAddStudentStatus('Student added successfully!');
        console.log(studentName, studentScore);

        // Refresh student info
        // const count = await contract.getStudentCount();
        // console.log(count.toString());
        // setStudentCount(count.toString());
        // const lastInfo = await contract.getStudent();
        // console.log(lastInfo);
        // setLastStudentInfo(lastInfo);
      } catch (error: unknown) {
        console.error('Error adding student:', error);
        if (error instanceof Error) {
          setAddStudentStatus(`Error: ${error.message}`);
        } else {
          setAddStudentStatus('An unknown error occurred');
        }
      } finally {
        setIsLoadingAddStudent(false);
      }
    }
  };

  const handleDivide = async () => {
    if (contract) {
      setIsLoadingDivide(true);
      setDivideStatus('');
      try {
        const result = await contract.divide(divideA, divideB);
        setDivideResult(result.toString());
        setDivideStatus('Division successful!');
      } catch (error) {
        console.error('Error dividing:', error);
        if (error instanceof Error) {
          setDivideResult(`Error: ${error.message}`);
          setDivideStatus(`Error: ${error.message}`);
        } else {
          setDivideResult('An unknown error occurred');
          setDivideStatus('An unknown error occurred');
        }
      } finally {
        setIsLoadingDivide(false);
      }
    }
  };

  const handleGetStudent = async () => {
    if (contract) {
      setIsLoadingGetStudent(true);
      setGetStudentStatus('');
      setStudentInfo({ name: '', score: '' });
      try {
        const result = await contract.getStudent(studentId);
        setStudentInfo({ name: result[0], score: result[1].toString() });
        setGetStudentStatus('Student information retrieved successfully!');
      } catch (error: unknown) {
        console.error('Error getting student:', error);
        if (error instanceof Error) {
          setGetStudentStatus(`Error: ${error.message}`);
        } else {
          setGetStudentStatus('An unknown error occurred');
        }
      } finally {
        setIsLoadingGetStudent(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Solidity Examiner</h1>

      {/* Add new section for student information */}
      <div className="mb-4">
        {/* <h2 className="text-xl font-semibold">Student Information</h2> */}
        {/* <p>Total Students: {studentCount}</p> */}
        {/* <p>Last Added Student: {lastStudentInfo}</p> */}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Value Types</h2>
        <p>Number: {numberValue}</p>
        <p>Bool: {boolValue.toString()}</p>
        <p>Address: {addressValue}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Set Values</h2>
        <input
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          className="border p-2 mr-2"
          placeholder="New number"
          disabled={isLoading}
        />
        <button 
          onClick={handleSetNumber} 
          className={`bg-blue-500 text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Setting...' : 'Set Number'}
        </button>
        {setNumberStatus && (
          <p className={`mt-2 ${setNumberStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {setNumberStatus}
          </p>
        )}
        <br />
        <select
          value={newBool.toString()}
          onChange={(e) => setNewBool(e.target.value === 'true')}
          className="border p-2 mr-2 mt-2"
          disabled={isLoadingSetBool}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button 
          onClick={handleSetBool} 
          className={`bg-blue-500 text-white p-2 rounded ${isLoadingSetBool ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoadingSetBool}
        >
          {isLoadingSetBool ? 'Setting...' : 'Set Bool'}
        </button>
        {setBoolStatus && (
          <p className={`mt-2 ${setBoolStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {setBoolStatus}
          </p>
        )}
        <br />
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="border p-2 mr-2 mt-2"
          placeholder="New address"
          disabled={isLoadingSetAddress}
        />
        <button 
          onClick={handleSetAddress} 
          className={`bg-blue-500 text-white p-2 rounded ${isLoadingSetAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoadingSetAddress}
        >
          {isLoadingSetAddress ? 'Setting...' : 'Set Address'}
        </button>
        {setAddressStatus && (
          <p className={`mt-2 ${setAddressStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {setAddressStatus}
          </p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Add Student</h2>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Student name"
          disabled={isLoadingAddStudent}
        />
        <input
          type="number"
          value={studentScore}
          onChange={(e) => setStudentScore(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Student score"
          disabled={isLoadingAddStudent}
        />
        <button 
          onClick={handleAddStudent} 
          className={`bg-blue-500 text-white p-2 rounded ${isLoadingAddStudent ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoadingAddStudent}
        >
          {isLoadingAddStudent ? 'Adding...' : 'Add Student'}
        </button>
        {addStudentStatus && (
          <p className={`mt-2 ${addStudentStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {addStudentStatus}
          </p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Get Student Information</h2>
        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Student ID"
          disabled={isLoadingGetStudent}
        />
        <button 
          onClick={handleGetStudent} 
          className={`bg-blue-500 text-white p-2 rounded ${isLoadingGetStudent ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoadingGetStudent}
        >
          {isLoadingGetStudent ? 'Fetching...' : 'Get Student Info'}
        </button>
        {getStudentStatus && (
          <p className={`mt-2 ${getStudentStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {getStudentStatus}
          </p>
        )}
        {studentInfo.name && (
          <div className="mt-2">
            <p>Name: {studentInfo.name}</p>
            <p>Score: {studentInfo.score}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Divide (Error Handling)</h2>
        <input
          type="number"
          value={divideA}
          onChange={(e) => setDivideA(e.target.value)}
          className="border p-2 mr-2"
          placeholder="A"
          disabled={isLoadingDivide}
        />
        <input
          type="number"
          value={divideB}
          onChange={(e) => setDivideB(e.target.value)}
          className="border p-2 mr-2"
          placeholder="B"
          disabled={isLoadingDivide}
        />
        <button 
          onClick={handleDivide} 
          className={`bg-blue-500 text-white p-2 rounded ${isLoadingDivide ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoadingDivide}
        >
          {isLoadingDivide ? 'Dividing...' : 'Divide'}
        </button>
        <p>Result: {divideResult}</p>
        {divideStatus && (
          <p className={`mt-2 ${divideStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {divideStatus}
          </p>
        )}
      </div>
    </div>
  );
}