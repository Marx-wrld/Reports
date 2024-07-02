import { AccountCustomers } from './types';
const API_URL = 'http://localhost/transactX/customer_api.php';

interface CustomerData {
  id: string;
  customer_code: string;
  name: string;
  email: string;
  otp: string | null;
  // Add any other fields as per the database structure
}

const fetchCustomerData = async (): Promise<CustomerData[]> => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      return data as CustomerData[]; // Returning the fetched data as an array of CustomerData type
    } else {
      console.error('Failed to fetch customer data. Status:', response.status);
      return []; // Returning an empty array in case of failure
    }
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return []; // Returning an empty array in case of an error
  }
};

const fetchAndAssignCustomerData = async (): Promise<AccountCustomers[]> => {
    const fetchedData = await fetchCustomerData();
    if (fetchedData && fetchedData.length > 0) {
      const accountCustomers: AccountCustomers[] = fetchedData.map((item: CustomerData) => ({
        id: item.id,
        account_number: item.customer_code,
        customer_code: item.customer_code,
        name: item.name,
        email: item.email,
        otp: item.otp,
        // Adjust other mappings as per your actual data structure
      }));
      return accountCustomers;
    } else {
      return []; // Returning an empty array if no data was fetched
    }  
};

export { fetchAndAssignCustomerData };
