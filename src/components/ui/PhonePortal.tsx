import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const PhonePortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById('phone-frame') || document.body;
    setContainer(el);
  }, []);

  if (!container) return null;
  return createPortal(children, container);
};

export default PhonePortal;
