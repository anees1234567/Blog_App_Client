"use client";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store';
import { login, logout } from '@/app/store/slices/userSlice';
import { userType } from '@/app/auth/type';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const loginUser = (userData: userType) => {
    dispatch(login(userData));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { user, isAuthenticated, loginUser, logoutUser };
};