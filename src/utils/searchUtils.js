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
