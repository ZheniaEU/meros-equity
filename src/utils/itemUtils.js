export function updateOpenItems(items, arr) {
   items.forEach((item) => {
      item.isOpen = arr.includes(item.id);
      if (item.children && item.children.length > 0) {
         updateOpenItems(item.children, arr);
      }
   });
}

export function gatherNestedIds(item) {
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
