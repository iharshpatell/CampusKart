import React from 'react';
import { useSelector } from 'react-redux';

const AdminPermission = ({ children }) => {
    const user = useSelector(state => state.user);
    console.log("User from Redux:", user); // Debugging

    return (
        <>
            {user ? children : <p className='text-red-600 bg-red-100 p-4'>Do not have permission</p>}
        </>
    );
};

export default AdminPermission;
