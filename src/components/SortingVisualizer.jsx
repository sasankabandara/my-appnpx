import React, { useState, useEffect, useRef } from "react";
import BarGraph from "./BarGraph";
import Controls from "./Controls";
import {
  getBubbleSortAnimations,
  getSelectionSortAnimations,
  getInsertionSortAnimations,
} from "../algorithms/sortingAlgorithms";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [animations, setAnimations] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(50); // in ms
  const [currentStep, setCurrentStep] = useState(0);
  const [colorMap, setColorMap] = useState({});
  const [isSorting, setIsSorting] = useState(false);

  const timeouts = useRef([]); // To store timeout IDs

  useEffect(() => {
    randomizeArray();
    // Cleanup on unmount
    return () => stopSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const randomizeArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < 100; i++) {
      newArray.push(randomIntFromInterval(50, 500));
    }
    setArray(newArray);
    setColorMap({});
  };

  const handleSort = () => {
    if (isSorting) return;
    let sortAnimations = [];
    switch (algorithm) {
      case "Bubble Sort":
        sortAnimations = getBubbleSortAnimations(array);
        break;
      case "Selection Sort":
        sortAnimations = getSelectionSortAnimations(array);
        break;
      case "Insertion Sort":
        sortAnimations = getInsertionSortAnimations(array);
        break;
      default:
        sortAnimations = getBubbleSortAnimations(array);
    }
    setAnimations(sortAnimations);
    setIsSorting(true);
    animateSort(sortAnimations);
  };

  const stopSort = () => {
    // Clear all pending timeouts
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
    setIsSorting(false);
    setColorMap({});
  };

  const animateSort = (sortAnimations) => {
    let arrayCopy = array.slice();
    let newColorMap = {};

    sortAnimations.forEach((animation, index) => {
      const timeoutId = setTimeout(() => {
        switch (animation.type) {
          case "compare":
            newColorMap = {
              ...colorMap,
              [animation.indices[0]]: "red",
              [animation.indices[1]]: "red",
            };
            setColorMap(newColorMap);
            break;
          case "swap":
            const [i, j] = animation.indices;
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
            setArray(arrayCopy.slice());
            newColorMap = { ...colorMap, [i]: "blue", [j]: "blue" };
            setColorMap(newColorMap);
            break;
          case "overwrite":
            const [k] = animation.indices;
            arrayCopy[k] = animation.newValue;
            setArray(arrayCopy.slice());
            newColorMap = { ...colorMap, [k]: "green" };
            setColorMap(newColorMap);
            break;
          case "sorted":
            newColorMap = { ...colorMap, [animation.index]: "purple" };
            setColorMap(newColorMap);
            break;
          default:
            break;
        }
        setCurrentStep(index + 1);
        // Reset colors after action
        const resetTimeoutId = setTimeout(() => {
          setColorMap((prev) => {
            const updated = { ...prev };
            if (animation.type === "compare") {
              updated[animation.indices[0]] = "turquoise";
              updated[animation.indices[1]] = "turquoise";
            }
            return updated;
          });
        }, animationSpeed);
        timeouts.current.push(resetTimeoutId);
      }, index * animationSpeed);
      timeouts.current.push(timeoutId);
    });

    // After all animations
    const finalTimeoutId = setTimeout(() => {
      setIsSorting(false);
    }, sortAnimations.length * animationSpeed);
    timeouts.current.push(finalTimeoutId);
  };

  return (
    <div className="visualizer-container">
      <h1>Sorting Algorithm Visualizer</h1>
      <Controls
        onRandomize={randomizeArray}
        onSort={handleSort}
        onStop={stopSort}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        isSorting={isSorting}
      />
      <BarGraph array={array} colorMap={colorMap} />
    </div>
  );
};

function randomIntFromInterval(min, max) {
  // Returns a random integer between min and max
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
