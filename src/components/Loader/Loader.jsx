import { ColorRing } from 'react-loader-spinner'; // анімований спінер з бібліотеки 

// використовується в компонентах, де потрібно показати що дані завантажуються
export const Loader = () => {
    return (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{
          display: 'block',
          marginTop: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    );
}
