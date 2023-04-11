import { Component } from "react";
import { toast } from "react-hot-toast"; // для показу повідомлень
import { BiSearch } from 'react-icons/bi'; // іконка пошуку
import css from './Searchbar.module.css' // стилізація

// Компонент пошуку
export class Searchbar extends Component {
  state = {
    search: '',
  };

  // функція для зміни стану
    onChangeInput = (evt) => {
        const { name, value } = evt.currentTarget; // деструктуризація об'єкта
        this.setState({ [name]: value }); // зміна стану по ключу name
  }

  // функція для очищення поля вводу
    resetForm = () => {
     this.setState({ search: '' });
    }

  render() {
    return (
      <header className={css.searchbar}>
        <form

          // функція для відправки запиту
          onSubmit={evt => {
                    evt.preventDefault(); // відміна стандартної поведінки браузера

                    // перевірка на пустий запит
                    if (!this.state.search) {
                      return toast.error('Enter text for search.'); // повідомлення про помилку
                    }

            // виклик функції з App.jsx для відправки запиту
            this.props.handleSubmit(this.state.search);
            this.resetForm();
          }}
          className={css.Form}
        >

          {/* іконка пошуку */}
          <button type="submit" className={css.Button}>
            <BiSearch size="20" />
          </button>

          {/* поле вводу */}
          <input
            value={this.state.search}
            onChange={this.onChangeInput} // виклик функції для зміни стану
            className={css.Input}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus // автофокус на полі вводу
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

// Діма Берестень
