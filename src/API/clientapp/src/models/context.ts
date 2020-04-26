import React from 'react';

export interface AdminContext {
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
}

export const DEFAULT_ADMIN_VALUE = {
  isAdmin: false,
  setAdmin: () => {},
};

export const adminContext = React.createContext<AdminContext>(
  DEFAULT_ADMIN_VALUE,
);
