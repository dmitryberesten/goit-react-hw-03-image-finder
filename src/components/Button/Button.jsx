import css from './Button.module.css'; // імпортуємо стилі

// Функціональний компонент, який відповідає за кнопку "Load more".
export const Button = ({ clickLoad }) => {
  return (
    <button onClick={clickLoad} className={css.Button} type="button">
      Load more
    </button>
  );
};

// Діма Берестень
