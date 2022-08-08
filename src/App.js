import { useState, useRef } from 'react';
import './App.css';
import Slider from './component/slider.component';

function App() {
  const slideLeft = useRef(null);
  const slideRight = useRef(null);

  const [isFound, setIsFound] = useState(null);

  const sliderHandler = (isRightSlide, isUnlocked) => {
    if (isUnlocked)
      if (isRightSlide) {
        setIsFound(true);
        slideLeft.current.reset();
      }
      else {
        setIsFound(false);
        slideRight.current.reset();
      }
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className='flex flex-col justify-center items-center gap-6'>
        <Slider text="Yes" sliderHandler={sliderHandler} isFound={isFound} ref={slideRight} />
        <Slider text="No" isRightSlide={false} sliderHandler={sliderHandler} isFound={isFound} ref={slideLeft} />
      </div>
      {isFound}
    </div>
  );
}

export default App;
