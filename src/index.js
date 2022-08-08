import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <App />
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
    const setSlider = () => {
      sliderLeft = containerWidth;
      updateSliderStyle();
      setIsUnlocked(true);
    };

    const deb = useCallback(
      debounce(() => setSlider(), 100),
      []
    );

    const onkeydown = (event) => {
      if (event.keyCode === 39) {
        //right arrow
        if (isRightSlide && !isUnlocked) {
          deb();
        }
      }
      if (event.keyCode === 37) {
        //left arrow
        if (!isRightSlide && !isUnlocked) {
          deb();
        }
      }
    };
     */