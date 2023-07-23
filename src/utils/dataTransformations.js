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

export function addAllFields(data) {
   function transformItem(data, parent = null) {
      if (!data) {
         return [];
      }
      return data.map((item) => {
         const newItem = {
            ...item,
            parent,
            isOpen: false,
            isFit: false,
            isChecked: false,
            children: transformItem(item.children, item)
         };
         return newItem;
      });
   }
   return transformItem(data);
}
