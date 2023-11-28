const totalVoteChart = document.getElementById('js-vote-rate-chart');
    const chartData = {
        labels: [
          '有效票',
          '無效票',
        ],
        datasets: [{
          data: [300, 50],
          backgroundColor: [
            '#262E49',
            '#CCCCCC',
          ],
          hoverOffset: 20
        }]
      };
      new Chart(totalVoteChart, {
        type: 'doughnut',
        data: chartData,
      });