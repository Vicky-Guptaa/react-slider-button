import React, { useEffect, useRef, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import "./style.module.css";
import { twMerge } from "tailwind-merge";

const isTouchDevice = "ontouchstart" in document.documentElement;

const Slider = ({ text, isRightSlide = true }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const slider = useRef(null);
  const container = useRef(null);

  let isDragging = false,
    startX = 0,
    sliderLeft = 0,
    containerWidth = 0;

  useEffect(() => {
    if (isTouchDevice) {
      document.addEventListener("touchmove", onDrag);
      document.addEventListener("touchend", stopDrag);
    } else {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", stopDrag);
    }

    return () => {
      if (isTouchDevice) {
        document.removeEventListener("touchmove", onDrag);
        document.removeEventListener("touchend", stopDrag);
      } else {
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
      }
    };
  });

  const updateSliderStyle = () => {
    slider.current.style.width = sliderLeft + 32 + "px";
  };

  const onDrag = (e) => {
    if (isUnlocked) {
      return;
    }
    if (!isDragging) return;

    if (isTouchDevice) {
      sliderLeft = Math.min(
        Math.max(
          0,
          !isRightSlide
            ? -(e.touches[0].clientX - startX)
            : e.touches[0].clientX - startX
        ),
        containerWidth
      );
    } else {
      sliderLeft = Math.min(
        Math.max(0, !isRightSlide ? -(e.clientX - startX) : e.clientX - startX),
        containerWidth
      );
    }
    updateSliderStyle();
  };

  const stopDrag = () => {
    if (isUnlocked) return;

    if (!isDragging) return;

    isDragging = false;
    if (!isRightSlide) {
      sliderLeft = Math.abs(sliderLeft);
    }
    if (sliderLeft > containerWidth * 0.9) {
      sliderLeft = containerWidth;
      setIsUnlocked(true);
    } else {
      sliderLeft = 0;
    }

    slider.current.classList.add("duration-500");
    slider.current.classList.add("ease-in-out");
    updateSliderStyle();
  };

  const startDrag = (event) => {
    if (isUnlocked) {
      return;
    }
    isDragging = true;

    if (slider.current.classList.contains("duration-500")) {
      slider.current.classList.remove("duration-500");
      slider.current.classList.remove("ease-in-out");
    }
    if (isTouchDevice) {
      startX = event.touches[0].clientX;
    } else {
      startX = event.clientX;
    }
    containerWidth = container.current.clientWidth - 50;
  };

  const reset = () => {
    if (!isUnlocked) return;
    setIsUnlocked(false);
    sliderLeft = 0;
    if (slider.current.classList.contains("duration-500")) {
      slider.current.classList.remove("duration-500");
      slider.current.classList.remove("ease-in-out");
    }
    updateSliderStyle();
  };

  return (
    <div
      className={twMerge(
        "w-64 h-12 rounded-full",
        isUnlocked ? "w-24 duration-500 ease-in-out" : ""
      )}
    >
      <div
        className={twMerge(
          "relative top-9 left-[40%] font-bold text-gray-400 w-12 flex items-center justify-center",
          isUnlocked ? "z-20 text-white left-[25%]" : ""
        )}
      >
        <h1 className="cursor-default text-md">{text}</h1>
      </div>
      <div
        className={twMerge(
          "container bg-white h-full w-full rounded-full flex items-center p-2 overflow-hidden",
          !isRightSlide ? "justify-end" : "justify-start"
        )}
        ref={container}
      >
        <div
          className={twMerge(
            "sliderCircle h-full aspect-square rounded-full bg-green-400 flex items-center z-10 cursor-pointer text-white ",
            !isRightSlide ? "justify-start" : "justify-end"
          )}
          ref={slider}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          {!isUnlocked && (
            <FaAngleDoubleRight
              className={twMerge(" mx-2", !isRightSlide ? "rotate-180" : "")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
