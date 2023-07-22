import { memo, useEffect, useState } from "react";
import { gatherNestedIds } from "../../utils/itemUtils";

import styles from "./NestedItem.module.css";

export const NestedItem = memo(({ item, setOpenedItems, setSelectedItems }) => {
   const [isOpen, setIsOpen] = useState(item.isOpen);
   const [isChecked, setIsChecked] = useState(false);

   useEffect(() => {
      setIsOpen(item.isOpen);
   }, [item.isOpen]);

   const toggler = () => {
      setOpenedItems((items) => {
         if (isOpen) {
            const nestedIds = gatherNestedIds(item);
            return items.filter((el) => !nestedIds.includes(el));
         } else {
            return [...items, item.id];
         }
      });
      setIsOpen(!isOpen);
   };

   // Функция для обновления состояния чекбокса и вызова setSelectedItems
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
               <button className={styles.button} onClick={toggler}>{isOpen ? "-" : "+"}</button>
            )}
            {isOpen &&
               item.children.map((child) => (
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
