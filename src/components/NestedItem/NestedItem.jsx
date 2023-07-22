import { memo, useEffect, useState } from "react";
import { toggler } from "../../utils/itemUtils";

import styles from "./NestedItem.module.css";

export const NestedItem = memo(({ item, setOpenedItems, setSelectedItems }) => {
   const [isOpen, setIsOpen] = useState(item.isOpen);
   const [isChecked, setIsChecked] = useState(item.isChecked);

   useEffect(() => {
      setIsOpen(item.isOpen);
   }, [item.isOpen]);

   useEffect(() => {
      setIsChecked(item.isChecked);
   }, [item.isChecked]);

   const handleToggle = () => {
      const newIsOpen = toggler(setOpenedItems, isOpen, item);
      setIsOpen(newIsOpen);
   };

   const handleCheckboxChange = () => {
      const newIsChecked = !isChecked;
      setIsChecked(newIsChecked);
      setSelectedItems((prevItems) => {
         if (newIsChecked) {
            return [...prevItems, item.id];
         } else {
            return prevItems.filter((id) => id !== item.id);
         }
      });
   };

   return (
      <ul className={styles.list}>
         <li className={styles.listItem}>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <span className={item.isFit ? styles.itemIsFit : styles.itemIsNotFit}>
               {item.id} | {item.title}
            </span>
            {item.children.length > 0 && (
               <button className={styles.button} onClick={handleToggle}>{isOpen ? "-" : "+"}</button>
            )}
            {isOpen && item.children.map((child) => (
               <NestedItem
                  item={child}
                  key={child.id}
                  setOpenedItems={setOpenedItems}
                  setSelectedItems={setSelectedItems}
               />
            ))}
         </li>
      </ul>
   );
});
