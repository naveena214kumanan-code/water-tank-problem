const heights = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];

function calculateWater(heights) {
  const n = heights.length;
  const leftMax = Array(n).fill(0);
  const rightMax = Array(n).fill(0);
  const water = Array(n).fill(0);

  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  for (let i = 0; i < n; i++) {
    water[i] = Math.max(0, Math.min(leftMax[i], rightMax[i]) - heights[i]);
  }

  return water;
}

function renderGrid(heights, water, totalRows = 7) {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear previous

  for (let row = totalRows; row >= 1; row--) {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';
    rowDiv.style.height = '30px';

    for (let i = 0; i < heights.length; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (row <= heights[i]) {
        cell.classList.add('block');
      } else if (row <= heights[i] + water[i]) {
        cell.classList.add('water');
      } else {
        cell.style.backgroundColor = '#f0f8ff'; // Empty cell
      }

      rowDiv.appendChild(cell);
    }

    container.appendChild(rowDiv);
  }
}

const water = calculateWater(heights);
renderGrid(heights, water, 7); // Force 7 rows

document.getElementById('water-count').innerText =
  "Total Water Trapped: " + water.reduce((a, b) => a + b, 0) + " units";
