import { useEffect, useState } from "react";

import styles from "./NestedItem.module.css";

export const NestedItem = (({ item, setOpenedItems }) => {
   const [isOpen, setIsOpen] = useState(item.isOpen);

   useEffect(() => {
      setIsOpen(item.isOpen);
   }, [item.isOpen]);

   const toggler = () => {
      if (isOpen) {
         setOpenedItems((items) => {
            const ids = [item.id];

            const fn = (item) => {
               item.children.forEach((child) => {
                  ids.push(child.id);
                  fn(child);
               });
            };

            fn(item);

            return items.filter((el) => !ids.includes(el));
         });
      } else {
         setOpenedItems((items) => [...items, item.id]);
      }
      setIsOpen(!isOpen);
   };

   return (
      <ul className={styles.list}>
         <li className={styles.listItem}>
            <span className={item.isFit ? styles.itemIsFit : styles.itemIsNotFit}>
               {item.id} | {item.title}
            </span>
            {item.children.length > 0 && (
               <button onClick={toggler}>{isOpen ? "-" : "+"}</button>
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
