export type TableRecord = {
	id: number
	firstName: string
	lastName: string
	username: string
}

export type Employee = {
	id: number
	age: number
	name: string
	company: string
	phone: string
	subRows?: Employee[]
}


export type RolePermissions = {
	id: number
	role_name: string
	permissions: string
	subRows?: RolePermissions[]
}

export type AccountStatements = {
	id: number;
	account_number: number;
	customer_code: number; // Add the customer_code property
	subRows?: AccountStatements[]
}

export type AccountCustomers = {
	id: string;
	account_number: string;
	customer_code: string;
	name: string; // Add the 'name' field
	email: string; // Add the 'email' field
	otp: string | null; // Add the 'otp' field which can be a string or null
	subRows?: AccountCustomers[];
  };
  
  
  export type AccountAccounts = {
	id: string;
	account_number: string;
	customer_code: string;
	name: string;
	email: string;
	otp: string | null;
	arrangement_id: string; // Add the 'arrangement_id' field
	category: string; // Add the 'category' field
	curr: string; // Add the 'curr' field
	account_title: string; // Add the 'account_title' field
	working_balance: string; // Add the 'working_balance' field
	open_bal: string; // Add the 'open_bal' field
	amts_in: string; // Add the 'amts_in' field
	amts_out: string; // Add the 'amts_out' field
	closing_bal: string; // Add the 'closing_bal' field
	subRows?: AccountAccounts[];
  };

    
  export type AccountLoans = {
	id: string;
	account_number: string;
	customer_code: string;
	name: string;
	email: string;
	otp: string | null;
	arrangement_id: string; // Add the 'arrangement_id' field
	category: string; // Add the 'category' field
	curr: string; // Add the 'curr' field
	account_title: string; // Add the 'account_title' field
	working_balance: string; // Add the 'working_balance' field
	open_bal: string; // Add the 'open_bal' field
	amts_in: string; // Add the 'amts_in' field
	amts_out: string; // Add the 'amts_out' field
	closing_bal: string; // Add the 'closing_bal' field
	subRows?: AccountLoans[];
  };
  
export type Users = {
	id: number;
	name: string;
	email: string;
	phone: string;
	gender: string;
	username: string;
	permissions: string;
	subRows?: Users[];
  };
  
