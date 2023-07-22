import styles from "./SaveButton.module.css";

export function SaveButton({ selectedItems }) {
   const saveSelectedItems = () => {
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
   };

   return (
      <button className={styles.button} onClick={saveSelectedItems}>Сохранить</button>
   );
}
