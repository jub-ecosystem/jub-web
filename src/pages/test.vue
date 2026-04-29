<template>
  <div class="chart-container">
    <div v-if="loading">Cargando gráfico...</div>
    
    <v-chart 
        v-else 
        class="chart" 
        :option="chartOptions" 
        autoresize 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart from 'vue-echarts';
// import axios from 'axios';

// Registrar los módulos de ECharts que uses
use([CanvasRenderer, LineChart, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

const chartOptions = ref({});
const loading = ref(true);

// Supongamos que el usuario armó este DSL en la UI
const fetchChartData = async () => {
  try {
    loading.value = true;
    
    // 1. Cambiamos GET por POST
    // 2. Apuntamos al endpoint real que construimos
    // NOTA: Ajusta el 'http://localhost:8000/api/v2' a la URL/puerto real de tu FastAPI
    const response = await fetch('http://localhost:5000/api/v2/search/plot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // 3. Mandamos el body que hace match con tu PlotQueryDTO
            query: "jub.v1.VS(MX).VO(AVG(AGE)).BY(SEX AND TEMPORAL)",
            chart_type: "line" // o "bar"
        })
    });
    const data = await response.json();
    console.log("Datos del gráfico:", data);
    chartOptions.value = data; 
    
  } catch (error) {
    console.error("Error al cargar el gráfico:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchChartData();
});
</script>

<style scoped>
.chart-container {
  height: 400px;
  width: 100%;
}
.chart {
  height: 100%;
  width: 100%;
}
</style>