import { useRef, useState } from "react";
import "./App.css";
import Slider from "./component/slider.component";

function App() {
  const slideLeft = useRef(null);
  const slideRight = useRef(null);

  const [isFound, setIsFound] = useState(null);

  const sliderHandler = (isRightSlide, isUnlocked) => {
    if (isUnlocked)
      if (isRightSlide) {
        setIsFound(true);
        slideLeft.current.reset();
      } else {
        setIsFound(false);
        slideRight.current.reset();
      }
  };
  console.log(isFound);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-400">{isFound ? "Yes" : isFound === null ? "" : "No"}</h1>
      <div className="flex flex-col items-center justify-center gap-6">
        <Slider
          text="Yes"
          sliderHandler={sliderHandler}
          isFound={isFound}
          ref={slideRight}
        />
        <Slider
          text="No"
          isRightSlide={false}
          sliderHandler={sliderHandler}
          isFound={isFound}
          ref={slideLeft}
        />
      </div>
    </div>
  );
}

export default App;
