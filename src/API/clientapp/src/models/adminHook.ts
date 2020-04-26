import React, { useState, useCallback } from 'react';
import { AdminContext } from './context';

export const useAdmin = (): AdminContext => {
  const [isAdmin, setCurrentAdmin] = useState(false);
  const setAdmin = useCallback((isAdmin: boolean): void => {
    setCurrentAdmin(isAdmin);
  }, []);

  return {
    isAdmin,
    setAdmin,
  };
};
