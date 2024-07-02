import { AccountAccounts } from './types';

const API_URL = 'http://localhost/transactX/account_api.php';

interface AccountData {
  id: string;
  account_number: string;
  arrangement_id: string;
  customer_code: string;
  category: string;
  curr: string;
  account_title: string;
  working_balance: string;
  open_bal: string;
  amts_in: string;
  amts_out: string;
  closing_bal: string;
  // Add any other fields as per the database structure
}

const fetchAccountData = async (): Promise<AccountData[]> => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      return data as AccountData[]; // Returning the fetched data as an array of AccountData type
    } else {
      console.error('Failed to fetch account data. Status:', response.status);
      return []; // Returning an empty array in case of failure
    }
  } catch (error) {
    console.error('Error fetching account data:', error);
    return []; // Returning an empty array in case of an error
  }
};
const fetchAndAssignAccountData = async (): Promise<AccountAccounts[]> => {
    const fetchedData = await fetchAccountData();
    if (fetchedData && fetchedData.length > 0) {
      const accountAccounts: AccountAccounts[] = fetchedData.map((item: AccountData) => ({
        id: item.id,
        account_number: item.account_number,
        customer_code: item.customer_code,
        name: item.account_title,
        email: '', // Adjust this field according to your updated interface
        otp: null, // Adjust this field according to your updated interface
        arrangement_id: item.arrangement_id, // Reflect the additional fields from the updated interface
        category: item.category,
        curr: item.curr,
        account_title: item.account_title,
        working_balance: '', // Assuming these fields are of string type, adjust as per your actual data
        open_bal: '',
        amts_in: '',
        amts_out: '',
        closing_bal: '',
        subRows: [] // Assuming subRows are an array in the updated interface
        // Adjust other mappings as per your actual data structure
      }));
      return accountAccounts;
    } else {
      return []; // Returning an empty array if no data was fetched
    }
  };
  
export { fetchAndAssignAccountData };
