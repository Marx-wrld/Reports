import { RolePermissions } from './types'


const rolePermissionRecords: RolePermissions[] = [
	{
		id: 1,
		role_name: 'Super Admin',
		permissions: 'Test',
	},
	{
        id: 2,
		role_name: 'Admin',
		permissions: 'Test',
	},
	{
        id: 3,
		role_name: 'Manager',
		permissions: 'Test',
	},
	{
        id: 4,
		role_name: 'Secretary',
		permissions: 'Test',
	},
]

export {
	rolePermissionRecords,
}
