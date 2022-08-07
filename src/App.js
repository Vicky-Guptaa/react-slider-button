import './App.css';
import Slider from './component/slider.component';

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className='flex flex-col justify-center items-center gap-6'>
        <Slider text="Yes" />
        <Slider text="No" isRightSlide={false} />
      </div>
    </div>
  );
}

export default App;
