import { useEffect, useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { NestedItem } from "../NestedItem/NestedItem";
import { useDebounce } from "../../hooks/useDebounce";
import { addAllFields } from "../../utils/dataTransformations";
import { updateListOnSearch, updateListWithSelectedAndOpenedItems } from "../../utils/itemUtils";

const getItemsFromLocalStorage = (key) => {
   try {
      const items = JSON.parse(localStorage.getItem(key));
      if (!Array.isArray(items)) {
         return [];
      }
      return items;
   } catch {
      return [];
   }
};

const updateLocalStorage = (key, value) => {
   localStorage.setItem(key, JSON.stringify(value));
};

export function OkvedTree({ initialData }) {
   const [list, setList] = useState(addAllFields(initialData));
   const [openedItems, setOpenedItems] = useState(getItemsFromLocalStorage("openedItems"));
   const [selectedItems, setSelectedItems] = useState(getItemsFromLocalStorage("selectedItems"));
   const [value, setValue] = useState("");
   const debouncedValue = useDebounce(value, 300);

   useEffect(() => {
      updateLocalStorage("selectedItems", selectedItems);
      updateLocalStorage("openedItems", openedItems);
      setList((list) => updateListWithSelectedAndOpenedItems(list, openedItems, selectedItems));
   }, [selectedItems, openedItems]);

   useEffect(() => {
      if (!debouncedValue) {
         return;
      }
      setList((list) => updateListOnSearch(list, debouncedValue, setOpenedItems));
   }, [debouncedValue]);

   return (<>
      <SearchInput value={value} onChange={setValue} />
      {list.map((item) => (<NestedItem key={item.id} item={item} setOpenedItems={setOpenedItems}
         setSelectedItems={setSelectedItems} />))}
   </>);
}
