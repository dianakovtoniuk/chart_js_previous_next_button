const week = [];
const weekDatapoints = [];

for (let i = 1; i <= 52; i++) {
  week.push(`Week ${i}`);
  weekDatapoints.push(i);
}

// data block
const data = {
  labels: week,
  datasets: [
    {
      label: 'Weekly Data',
      data: weekDatapoints,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

// config block
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      x: {
        min: 8,
        max: 14,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};

// init render block
const myChart = new Chart(document.getElementById('myChart'), config);

const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');

function weekData(start, end) {
  const xScale = myChart.config.options.scales.x;
  const startScale = xScale.min + start;
  const endScale = xScale.max + end;

  xScale.min = startScale;
  xScale.max = endScale;

  previousButton.disabled = false;
  nextButton.disabled = false;

  if (startScale < 0) {
    xScale.min = 0;
    xScale.max = 6;
    previousButton.disabled = true;
  }

  if (endScale > week.length) {
    xScale.min = week.length - 6;
    xScale.max = week.length - 1;
    nextButton.disabled = true;
  }

  myChart.update();
}

previousButton.addEventListener('click', () => weekData(-6, -6));
nextButton.addEventListener('click', () => weekData(6, 6));
