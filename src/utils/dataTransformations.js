export function addParentField(data, parent = null) {
   return data.map((item => {
      const newItem = { ...item, parent };
      if (newItem.children && newItem.children.length > 0) {
         newItem.children = addParentField(newItem.children, newItem);
      }
      return newItem;
   }));
}

export function addField(data, fieldName, arr = []) {
   return data.map((item) => {
      const newItem = { ...item, [fieldName]: arr.includes(item.id) };
      if (newItem.children && newItem.children.length > 0) {
         newItem.children = addField(newItem.children, fieldName, arr);
      }
      return newItem;
   });
}

export function addMultipleFields(data, fields) {
   return data.map((item) => {
      const newItem = { ...item };

      for (const fieldName in fields) {
         newItem[fieldName] = fields[fieldName].includes(item.id);
      }

      if (newItem.children && newItem.children.length > 0) {
         newItem.children = addMultipleFields(newItem.children, fields);
      }

      return newItem;
   });
}

// TODO: не трасформирует
export function recursiveSearchByTitle(data, titleToSearch) {
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

export function updateOpenItems(items, arr) {
   items.forEach((item) => {
      item.isOpen = arr.includes(item.id);
      if (item.children && item.children.length > 0) {
         updateOpenItems(item.children, arr);
      }
   });
}

export function addAllFields(data) {
   function adder(data, parent = null) {
      if (!data) {
         return [];
      }
      return data.map((item) => {
         const newItem = {
            ...item,
            parent,
            isOpen: false,
            isFit: false,
            children: adder(item.children, item)
         };
         return newItem;
      });
   }
   return adder(data);
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
