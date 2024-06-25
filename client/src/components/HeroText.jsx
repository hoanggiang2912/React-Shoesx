import styles from "./HeroText.module.css";

function HeroText() {
  return (
    <div className="relative">
      <h1 className={`${styles.heroText} text-primaryColor`}>
        stylish shoes <br /> for you
      </h1>
      <p
        className={`${styles.subText} bottom-3 right-0 absolute leading-normal max-w-xs`}
      >
        The sneakers are friendly to more people, espesiatly when you want to
        100k taller, because many sneakeers have inner heightening shoe poads,
      </p>
    </div>
  );
}

export default HeroText;
