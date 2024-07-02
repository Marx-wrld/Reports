import { AccountLoans } from './types';

const API_URL = 'http://localhost/transactX/loans_api.php';

const fetchLoansData = async (): Promise<AccountLoans[]> => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      return data as AccountLoans[]; // Returning the fetched data as an array of AccountLoans type
    } else {
      console.error('Failed to fetch loans data. Status:', response.status);
      return []; // Returning an empty array in case of failure
    }
  } catch (error) {
    console.error('Error fetching loans data:', error);
    return []; // Returning an empty array in case of an error
  }
};

const fetchAndAssignAccountLoans = async (): Promise<AccountLoans[]> => {
  const fetchedData = await fetchLoansData();
  if (fetchedData && fetchedData.length > 0) {
    const accountLoans: AccountLoans[] = fetchedData.map((item: AccountLoans) => ({
      id: item.id,
      account_number: item.account_number,
      customer_code: item.customer_code,
      name: item.account_title,
      email: '', // Adjust this field according to your updated interface
      otp: null, // Adjust this field according to your updated interface
      arrangement_id: item.arrangement_id,
      category: item.category,
      curr: item.curr,
      account_title: item.account_title,
      working_balance: item.working_balance,
      open_bal: item.open_bal,
      amts_in: item.amts_in,
      amts_out: item.amts_out,
      closing_bal: item.closing_bal,
      subRows: [] // Assuming subRows are an array in the updated interface
      // Adjust other mappings as per your actual data structure
    }));
    return accountLoans;
  } else {
    return []; // Returning an empty array if no data was fetched
  }
};

export { fetchAndAssignAccountLoans };
