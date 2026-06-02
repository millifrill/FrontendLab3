import styles from './card.module.css';

function Card(props) {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
        alt="placeholderimg"></img>
      <h2>Mascara</h2>
      <h3>Gucci</h3>
      <div className={styles.rating}>★★★★★</div>
      <p>19,9$</p>
    </div>
  );
}

export default Card;
