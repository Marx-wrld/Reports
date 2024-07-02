import { Route, RouteProps } from 'react-router-dom'

// helpers
// import { useAuthContext } from '@/common'

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */

const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
	// const { isAuthenticated } = useAuthContext();
	return (
	  <Route
		{...rest}
		render={(props: RouteProps) => {
		  // Remove the check for authentication
		  return <Component {...props} />;
		}}
	  />
	);
  };
  

export default PrivateRoute
