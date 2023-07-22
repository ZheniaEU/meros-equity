import { useEffect, useState } from "react";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { NestedItem } from "../../components/NestedItem/NestedItem";
import { useDebounce } from "../../hooks/useDebounce";
import { addAllFields, addMultipleFields } from "../../utils/dataTransformations";
import { updateOpenItems } from "../../utils/itemUtils";
import { recursiveSearchByTitle } from "../../utils/searchUtils";

export function OkvedTree({ initialData }) {
   const [list, setList] = useState(addAllFields(initialData));
   const [openedItems, setOpenedItems] = useState([]);

   const [value, setValue] = useState("");
   const debouncedValue = useDebounce(value, 300);

   useEffect(() => {
      setList((list) => {
         updateOpenItems(list, openedItems);
         return list;
      });
   }, [openedItems]);

   useEffect(() => {
      const value = debouncedValue.trim();

      if (value !== "") {
         setList((list) => {
            const items = recursiveSearchByTitle(list, value);
            const ids = items.map((item) => item.id);

            function pushParent(item) {
               if (item.parent) {
                  ids.push(item.parent.id);
                  pushParent(item.parent);
               }
            }

            items.forEach(pushParent);

            setOpenedItems(ids);
            return addMultipleFields(list, { "isFit": ids, "isOpen": ids });
         });
      } else {
         setOpenedItems([]);
         setList(list => addMultipleFields(list, { "isFit": [], "isOpen": [] }));
      }
   }, [debouncedValue]);

   return (
      <>
         <SearchInput value={value} onChange={setValue} />
         {list.map((item) => (
            <NestedItem key={item.id} item={item} setOpenedItems={setOpenedItems} />
         ))}
      </>
   );
}
