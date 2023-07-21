import styles from "./SearchInput.module.css";
import { memo } from "react";

export const SearchInput = memo(({ value, onChange }) => {
   return (
      <input className={styles.input}
         type="text"
         placeholder="Поиск"
         value={value}
         onChange={(e) => onChange(e.target.value)}
      />
   );
});
