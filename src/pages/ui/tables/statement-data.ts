import { AccountStatements } from './types';

const API_URL = 'http://localhost/transactX/accounts.php';

const fetchAccountStatements = async (): Promise<any[]> => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      return data as any[]; // Returning the fetched data as an array of any type
    } else {
      console.error('Failed to fetch account statements. Status:', response.status);
      return []; // Returning an empty array in case of failure
    }
  } catch (error) {
    console.error('Error fetching account statements:', error);
    return []; // Returning an empty array in case of an error
  }
};

const fetchAndAssignData = async (): Promise<AccountStatements[]> => {
  const fetchedData = await fetchAccountStatements();
  if (fetchedData && fetchedData.length > 0) {
    const accountStatements: AccountStatements[] = fetchedData.map(
      (item: any, index: number) => ({
        id: index + 1, // Assigning an ID based on the array index
        account_number: item.account_number,
        customer_code: item.customer_code, // Assigning customer_code from the fetched data
      })
    );
    return accountStatements;
  } else {
    return []; // Returning an empty array if no data was fetched
  }
};

export { fetchAndAssignData };
