import "./style.css";

function Category({ id, title }) {
  return <span className="category captionBold">{title}</span>;
}

export default Category;
