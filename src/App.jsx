
import React, { useEffect, useState } from "react";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { okvedTreeData } from "./mocks/okvedTreeData";
import './App.css';
import { NestedItem } from "./components/NestedItem/NestedItem";

function addParentField(data, parent = null) {
   data.forEach((item) => {
      item.parent = parent;
      if (item.children.length > 0) {
         addParentField(item.children, item);
      }
   });
}

function addIsOpenField(data, arr = []) {
   return data.map((item) => {
      const newItem = { ...item, isOpen: arr.includes(item.id) };
      if (newItem.children && newItem.children.length > 0) {
         newItem.children = addIsOpenField(newItem.children, arr);
      }
      return newItem;
   });
}

function addIsFitField(data, arr = []) {
   return data.map((item) => {
      const newItem = { ...item, isFit: arr.includes(item.id) };
      if (newItem.children && newItem.children.length > 0) {
         newItem.children = addIsFitField(newItem.children, arr);
      }
      return newItem;
   });
}

function recursiveSearchByTitle(data, titleToSearch) {
   const matching = [];

   const searchRecursively = (items) => {
      items.forEach((item) => {
         if (item.title.toLowerCase().includes(titleToSearch.toLowerCase())) {
            matching.push(item);
         }
         if (item.children.length > 0) {
            searchRecursively(item.children);
         }
      });
   };

   searchRecursively(data);
   return matching;
}

function useDebounce(value, delay) {
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}


addParentField(okvedTreeData);

export function App() {
   const [list, setList] = useState(
      addIsFitField(addIsOpenField(okvedTreeData))
   );
   const [openedItems, setOpenedItems] = useState([]);

   const [value, setValue] = useState("");
   const debouncedValue = useDebounce(value, 300);

   useEffect(() => {
      // TODO: mutate data
      setList((list) => addIsOpenField(list, openedItems));
   }, [openedItems]);

   useEffect(() => {
      const value = debouncedValue.trim();

      if (value !== "") {
         setList((list) => {
            const items = recursiveSearchByTitle(list, value);
            const ids = items.map((item) => item.id);

            let cleanList = addIsFitField(list);
            cleanList = addIsFitField(cleanList, ids);

            function pushParent(item) {
               if (item.parent) {
                  ids.push(item.parent.id);
                  pushParent(item.parent);
               }
            }

            items.forEach(pushParent);

            setOpenedItems(ids);
            return addIsOpenField(cleanList, ids);
         });
      } else {
         setOpenedItems([]);
         setList(addIsFitField);
      }
   }, [debouncedValue]);

   return (
      <div className="App">
         <SearchInput value={value} onChange={setValue} />
         {list.map((item) => (
            <NestedItem key={item.id} item={item} setOpenedItems={setOpenedItems} />
         ))}
      </div>
   );
}
