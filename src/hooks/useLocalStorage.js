import { useState, useEffect } from "react";

const getStorageValue = (key, defaultValue) => {
   const saved = localStorage.getItem(key);
   const initial = saved?.length > 0 ? JSON.parse(saved) : null;
   return initial ?? defaultValue;
};

export const useLocalStorage = (key, defaultValue) => {
   const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
   }, [key, value]);

   return [value, setValue];
};
