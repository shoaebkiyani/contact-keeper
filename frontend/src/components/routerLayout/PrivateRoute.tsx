import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
function PrivateRoute() {
	const { userInfo } = useSelector((state: RootState) => state.auth);
	return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
}
export default PrivateRoute;
