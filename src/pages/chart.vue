<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: ["barMonthNames", "barMonthData"],
  mounted() {
    this.renderChart({
      labels: this.barMonthNames,
      datasets: [
        {
          label: 'Light Bill Renter',
          backgroundColor: '#ef4b7c',
          data: this.barMonthData
        },
        {
          label: 'Light Bill owner',
          backgroundColor: '#007bff',
          data: [1850, 1355,1500,4399]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
};
</script>