import styles from "./Product.module.css";

function Product({ product }) {
  return (
    <div className={styles.product}>
      <div className="productBanner relative"></div>
    </div>
  );
}

export default Product;
