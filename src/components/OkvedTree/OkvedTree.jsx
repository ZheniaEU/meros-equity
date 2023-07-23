import { useEffect, useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { NestedItem } from "../NestedItem/NestedItem";
import { useDebounce } from "../../hooks/useDebounce";
import { addAllFields } from "../../utils/dataTransformations";
import { updateListOnSearch, updateListItems } from "../../utils/itemUtils";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function OkvedTree({ initialData }) {
   const [list, setList] = useState(addAllFields(initialData));
   const [openedItems, setOpenedItems] = useLocalStorage("openedItems", []);
   const [selectedItems, setSelectedItems] = useLocalStorage("selectedItems", []);
   const [value, setValue] = useState("");
   const debounce = useDebounce(value, 300);

   useEffect(() => {
      setList((list) => updateListItems(list, openedItems, selectedItems));
   }, [selectedItems, openedItems]);

   useEffect(() => {
      if (debounce) {
         setList((list) => updateListOnSearch(list, debounce, setOpenedItems));
      }
   }, [debounce, setOpenedItems]);

   return (<>
      <SearchInput value={value} onChange={setValue} />
      {list.map((item) => (<NestedItem key={item.id} item={item} setOpenedItems={setOpenedItems}
         setSelectedItems={setSelectedItems} />))}
   </>);
}
