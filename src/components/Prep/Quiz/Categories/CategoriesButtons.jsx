import { CategoriesButtonData } from "./CategoriesButtonData";
import { CategoriesSection, CategoriesButton } from "./CategoriesElements";

export default function CategoriesButtons({ categoryToShow, showCategory }) {
  const buttonsArray = CategoriesButtonData.map((data, i) => {
    const styles = {
      background: data.type === categoryToShow ? "#cecac3" : "",
      color: data.type === categoryToShow ? "#010606" : "",
    };

    return (
      <CategoriesButton
        key={i}
        onClick={() => showCategory(data.type)}
        style={styles}
      >
        {data.value}
      </CategoriesButton>
    );
  });
  return <CategoriesSection>{buttonsArray}</CategoriesSection>;
}
