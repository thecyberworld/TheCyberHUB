import { CategoriesData } from "./CategoriesData";
import { CategoriesSection, CategoriesButton } from "./CategoriesElmts";

export default function Categories() {
  const buttonsArray = CategoriesData.map((data) => (
    <CategoriesButton>{data}</CategoriesButton>
  ));
  return <CategoriesSection>{buttonsArray}</CategoriesSection>;
}
