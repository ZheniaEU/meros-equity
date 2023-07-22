import { memo, useEffect, useState } from "react";
import { gatherNestedIds } from "../../utils/itemUtils";

import styles from "./NestedItem.module.css";

export const NestedItem = memo(({ item, setOpenedItems }) => {
   const [isOpen, setIsOpen] = useState(item.isOpen);

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

   return (
      <ul className={styles.list}>
         <li className={styles.listItem}>
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
                  />
               ))}
         </li>
      </ul>
   );
});
