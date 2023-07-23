import { addMultipleFields } from "./dataTransformations";
import { recursiveSearchByTitle } from "./searchUtils";

export function updateListWithOpenItems(list, openedItems) {
   function updateOpenItems(items, arr) {
      items.forEach((item) => {
         item.isOpen = arr.includes(item.id);
         if (item.children && item.children.length > 0) {
            updateOpenItems(item.children, arr);
         }
      });
   }

   updateOpenItems(list, openedItems);
   return list;
}

export function updateListWithSelectedAndOpenedItems(list, openedItems, checkedItems) {
   return list.map((item) => {
      return {
         ...item,
         isChecked: checkedItems.includes(item.id),
         isOpen: openedItems.includes(item.id),
         children: updateListWithSelectedAndOpenedItems(item.children, openedItems, checkedItems)
      };
   });
}

export function updateListOnSearch(list, value, setOpenedItems) {
   value = value.trim();

   if (value !== "") {
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
   } else {
      setOpenedItems([]);
      return addMultipleFields(list, { "isFit": [], "isOpen": [] });
   }
}

export function toggler(setOpenedItems, isOpen, item) {
   setOpenedItems((items) => {
      if (isOpen) {
         const nestedIds = gatherNestedIds(item);
         return items.filter((el) => !nestedIds.includes(el));
      } else {
         return [...items, item.id];
      }
   });
   return !isOpen;
}

export function handleCheckboxToggle(isChecked, item, setSelectedItems) {
   const newIsChecked = !isChecked;
   setSelectedItems((prevItems) => {
      if (newIsChecked) {
         return [...prevItems, item.id];
      } else {
         return prevItems.filter((id) => id !== item.id);
      }
   });
   return newIsChecked;
}

function gatherNestedIds(item) {
   const ids = [item.id];

   const gatherChildIds = (item) => {
      item.children.forEach((child) => {
         ids.push(child.id);
         gatherChildIds(child);
      });
   };

   gatherChildIds(item);

   return ids;
}
