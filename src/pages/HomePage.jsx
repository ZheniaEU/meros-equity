import { OkvedTree } from "../components/OkvedTree/OkvedTree";
import { okvedTreeData } from "../mocks/okvedTreeData";

export function HomePage() {
   return <OkvedTree initialData={okvedTreeData} />;
}
