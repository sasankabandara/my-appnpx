// src/algorithms/sortingAlgorithms.js

export function getBubbleSortAnimations(array) {
  const animations = [];
  const auxArray = array.slice();
  const n = auxArray.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare
      animations.push({
        type: 'compare',
        indices: [j, j + 1],
      });
      if (auxArray[j] > auxArray[j + 1]) {
        // Swap
        animations.push({
          type: 'swap',
          indices: [j, j + 1],
        });
        let temp = auxArray[j];
        auxArray[j] = auxArray[j + 1];
        auxArray[j + 1] = temp;
      }
    }
    // Mark the last sorted element
    animations.push({
      type: 'sorted',
      index: n - i - 1,
    });
  }
  return animations;
}

// Similarly implement Selection Sort and Insertion Sort
export function getSelectionSortAnimations(array) {
  const animations = [];
  const auxArray = array.slice();
  const n = auxArray.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({
        type: 'compare',
        indices: [minIdx, j],
      });
      if (auxArray[j] < auxArray[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push({
        type: 'swap',
        indices: [i, minIdx],
      });
      let temp = auxArray[i];
      auxArray[i] = auxArray[minIdx];
      auxArray[minIdx] = temp;
    }
    animations.push({
      type: 'sorted',
      index: i,
    });
  }

  return animations;
}

export function getInsertionSortAnimations(array) {
  const animations = [];
  const auxArray = array.slice();
  const n = auxArray.length;

  for (let i = 1; i < n; i++) {
    let key = auxArray[i];
    let j = i - 1;

    animations.push({
      type: 'compare',
      indices: [j, i],
    });

    while (j >= 0 && auxArray[j] > key) {
      animations.push({
        type: 'overwrite',
        indices: [j + 1],
        newValue: auxArray[j],
      });
      auxArray[j + 1] = auxArray[j];
      j = j - 1;
      if (j >= 0) {
        animations.push({
          type: 'compare',
          indices: [j, i],
        });
      }
    }
    animations.push({
      type: 'overwrite',
      indices: [j + 1],
      newValue: key,
    });
    auxArray[j + 1] = key;
  }

  // Mark all elements as sorted at the end
  for (let i = 0; i < n; i++) {
    animations.push({
      type: 'sorted',
      index: i,
    });
  }

  return animations;
}
