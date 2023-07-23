import { useEffect, useState } from "react";
import { getOkvedTreeData } from "../api/api";
import { OkvedTree } from "../components/OkvedTree/OkvedTree";
import okvedTreeData from "../mocks/okvedTreeData.json";

import styles from "./HomePage.module.css";

export function HomePage() {
   const [data, setData] = useState(null);

   // Если загрузка данных из интернета не удалась, используем данные из моков
   useEffect(() => {
      getOkvedTreeData()
         .then(data => setData(data))
         .catch(() => {
            setData(okvedTreeData);
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
