import { useEffect, useState } from "react";
import { getOkvedTreeData } from "../api/api";
import { OkvedTree } from "../components/OkvedTree/OkvedTree";

import styles from "./HomePage.module.css";

export function HomePage() {
   const [data, setData] = useState(null);

   useEffect(() => {
      getOkvedTreeData().then(data => {
         setData(data);
      });
   }, []);

   if (data === null) {
      return (
         <div className={styles.loader}>
            Я делаю реальный запрос на свой гитхаб, чтобы получить JSON
         </div>
      );
   }

   return <OkvedTree initialData={data} />;
}
