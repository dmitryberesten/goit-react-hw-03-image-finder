import { Component } from 'react';
import { Toaster } from 'react-hot-toast'; // спливаючі повідомлення
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearch } from 'api/getSearch'; // отримання даних пошуку
import { Searchbar } from './Searchbar/Searchbar'; // рядок пошуку
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader'; // індикатор завантаження
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 1,
    loading: false, // флаг, який показує, чи відбувається завантаження
    error: null,
    showModal: false,
    empty: false, // флаг, який показує, чи є результати пошуку порожніми
  };

  // Викликається після того, як компонент був змонтований.
  // Параметр '_' містить попередні пропи компонента, а PrevState - попередній стан компонента.
  componentDidUpdate(_, PrevState) {

    // Перевіряємо, чи змінились пропи search або page.
    if (
      PrevState.search !== this.state.search ||
      PrevState.page !== this.state.page
    ) {
      this.getFunc(this.state.search, this.state.page);
    }
  }

  getFunc = (text, page) => {
    this.setState({ loading: true }); // вмикаємо індикатор завантаження

    // Викликаємо функцію getSearch, яка виконує запит на сервер.
    getSearch(text, page)
      .then(resp => resp.json()) // перетворюємо в JSON
      .then(data => {

        // Перевіряємо, чи є результати пошуку порожніми.
        if (data.hits.length === 0) {
          this.setState({ empty: true }); // вмикаємо флаг, який показує, чи є результати пошуку порожніми
        }
        this.setState(prevSt => ({
          page: prevSt.page,
          images: [...prevSt.images, ...data.hits], // додаємо нові картинки до масиву
          total: data.total,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message }); // записуємо помилку в стейт
      })
      .finally(() => {
        this.setState({ loading: false }); // вимикаємо індикатор завантаження
      });
  };

  // Функція, яка викликається при натисканні кнопки "Load more".
  clickLoad = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1, // збільшуємо номер сторінки на +1
    }));
  };

  // Функція, яка викликається при натисканні на картинку.
  openModal = (largeImageURL, alt) => {

    // Використовуємо setState з функцією, яка приймає попередній стан і повертає новий.
    this.setState(({ showModal }) => {
      return { showModal: !showModal, largeImageURL, alt };
    });
  };

  // Функція, яка викликається при натисканні на кнопку "Search".
  handleSubmit = search => {
    // Очищаємо масив з картинками, а також ставимо початкові значення для сторінки,
    // загальної кількості картинок, флагів і помилок.
    this.setState({
      search,
      images: [],
      page: 1,
      total: 1,
      loading: false,
      error: null,
      empty: false,
    });
  };

  // Функція, яка викликається при натисканні на кнопку "Close".
  closeModal = () => {

    // Використовуємо setState з функцією, яка приймає попередній стан і повертає новий.
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  render() {
    const { error, loading, images, total, page } = this.state;
    return (
      <div>

        {/* Спливаюче повідомлення */}
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />

        {/*текстове поле для введення запиту */}
        <Searchbar handleSubmit={this.handleSubmit} />

        {/* Перевіряємо, чи є помилка */}
        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Something went wrong: ({error})!
          </h2>
        )}

        {/* відображення списку зображень */}
        <ImageGallery togleModal={this.openModal} images={images} />

        {/* Перевіряємо, чи відбувається завантаження */}
        {loading && <Loader />}

        {/* Перевіряємо, чи є результати пошуку порожніми */}
        {this.state.empty && (
          <h2 style={{ textAlign: 'center' }}>
            Sorry. There are no images ... 😭
          </h2>
        )}

        {/* Перевіряємо, чи потрібно відображати кнопку "Load more" */}
        {total / 12 > page && <Button clickLoad={this.clickLoad} />}

        {/* Перевіряємо, чи потрібно відображати модальне вікно */}
        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
      </div>
    );
  }
}

// Діма Берестень
