<template>
  <v-sheet class="bg-surface py-16 border-bottom">
    <v-container max-width="1200">
      
      <div class="text-center mb-10">
        <h2 class="text-h3 font-weight-black text-grey-darken-4 mb-4">Desglose del Proyecto</h2>
        <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px;">
          Conoce a detalle los objetivos particulares, las metas tecnológicas y los componentes que integran cada fase del ecosistema <router-link to="/" class="text-primary font-weight-bold text-decoration-none">Jub</router-link>, <router-link to="/services/xelhua" class="text-primary font-weight-bold text-decoration-none">Xelhua</router-link>, <router-link to="/services/nez" class="text-primary font-weight-bold text-decoration-none">Nez</router-link> y <router-link to="/services/mictlanx" class="text-primary font-weight-bold text-decoration-none">MictlanX</router-link>.
        </p>
      </div>

      <v-tabs
        v-model="activeStage"
        color="primary"
        align-tabs="center"
        class="mb-8"
      >
        <v-tab value="etapa1" class="text-none font-weight-bold text-subtitle-1">
          <v-icon start>mdi-rocket-launch-outline</v-icon>
          Etapa 1: Maduración Tecnológica (En curso)
        </v-tab>
        <v-tab value="etapa2" class="text-none font-weight-bold text-subtitle-1">
          <v-icon start>mdi-telescope</v-icon>
          Etapa 2: Observatorios y Conectores (Pendiente)
        </v-tab>
      </v-tabs>

      <v-window v-model="activeStage" class="pt-4">
        <v-window-item v-for="(stage, stageKey) in projectData" :key="stageKey" :value="stageKey">
          
          <v-expansion-panels variant="popout" class="mb-4">
            <v-expansion-panel
              v-for="meta in stage"
              :key="meta.id"
              class="border mb-2 panel-hover"
              elevation="0"
            >
              <v-expansion-panel-title class="py-4">
                <v-row no-gutters align="center">
                  <v-col cols="auto" class="mr-4">
                    <v-avatar color="primary-lighten-1" variant="tonal" rounded="lg">
                      <span class="font-weight-bold text-primary">{{ meta.id }}</span>
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <div class="d-flex align-center flex-wrap ga-2 mb-1">
                      <div class="text-caption text-grey-darken-1 font-weight-bold text-uppercase">
                        {{ meta.objetivo }}
                      </div>
                      <v-chip 
                        v-for="p in meta.problemas" 
                        :key="p" 
                        size="x-small" 
                        :color="getProblemColor(p)" 
                        variant="flat" 
                        class="font-weight-bold text-white px-2"
                      >
                        Resuelve {{ p }}
                      </v-chip>
                    </div>
                    <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">
                      {{ meta.titulo }}
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="bg-grey-lighten-4 pt-4">
                
                <v-alert
                  border="start"
                  border-color="primary"
                  color="blue-lighten-5"
                  elevation="0"
                  class="mb-6 pa-5"
                >
                  <p class="text-body-2 mb-3 text-grey-darken-4">
                    <strong class="text-primary mr-2"><v-icon size="small" class="pb-1">mdi-target</v-icon> Propósito:</strong> 
                    {{ meta.proposito }}
                  </p>
                  <p class="text-body-2 mb-0 text-grey-darken-4">
                    <strong class="text-primary mr-2"><v-icon size="small" class="pb-1">mdi-flag-checkered</v-icon> Fin:</strong> 
                    {{ meta.fin }}
                  </p>
                </v-alert>

                <h4 class="text-subtitle-2 font-weight-bold mb-3 text-grey-darken-3">Componentes y Productos Asociados</h4>
                <v-table density="comfortable" class="border rounded-lg overflow-hidden bg-white">
                  <thead>
                    <tr class="bg-grey-lighten-3">
                      <th class="text-left font-weight-bold text-grey-darken-4" style="width: 25%">Identificador</th>
                      <th class="text-left font-weight-bold text-grey-darken-4" style="width: 35%">Definición</th>
                      <th class="text-left font-weight-bold text-grey-darken-4" style="width: 20%">Indicador</th>
                      <th class="text-left font-weight-bold text-grey-darken-4" style="width: 20%">Verificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="comp in meta.componentes" :key="comp.id">
                      <td class="align-top py-4">
                        <router-link to="/" class="text-decoration-none">
                          <v-chip 
                            size="small" 
                            color="secondary-blue" 
                            variant="outlined" 
                            class="mb-2 font-weight-bold cursor-pointer clickable-chip"
                          >
                            {{ comp.id }}
                            <v-icon end size="x-small">mdi-open-in-new</v-icon>
                          </v-chip>
                        </router-link>
                        <br>
                        <span class="text-caption font-weight-bold text-grey-darken-4">{{ comp.nombre }}</span>
                      </td>
                      <td class="align-top py-4 text-body-2 text-grey-darken-2">{{ comp.definicion }}</td>
                      <td class="align-top py-4 text-caption text-grey-darken-3">{{ comp.indicador }}</td>
                      <td class="align-top py-4 text-caption text-grey-darken-1">{{ comp.verificacion }}</td>
                    </tr>
                  </tbody>
                </v-table>

              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-window-item>
      </v-window>

    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const activeStage = ref('etapa1');

const getProblemColor = (problema: string) => {
  if (problema === 'P1') return 'error';
  if (problema === 'P2') return 'secondary-blue';
  if (problema === 'P3') return 'teal';
  return 'primary';
};

const projectData = {
  etapa1: [
    {
      id: 'Meta 1',
      objetivo: 'Objetivo Particular 1: Maduración tecnológica de 5 a 6.',
      titulo: 'Ecosistema unificador (Jub) para acoplamiento de servicios',
      proposito: 'Consolidar los servicios de ciencia de datos y el buscador DCS-PI en un único marco.',
      fin: 'Facilitar el acoplamiento y consulta de información estratégica.',
      problemas: ['P2', 'P3'], 
      componentes: [
        {
          id: 'Prod1E1-C1',
          nombre: 'Concentrador DCS-PI',
          definicion: 'Módulo central que orquesta la ingestión, almacenamiento y distribución de datos y productos de información en el ecosistema Jub.',
          indicador: 'Disponibilidad del servicio ≥ 99% durante pruebas piloto.',
          verificacion: 'Registros de operación; métricas de disponibilidad; logs de despliegue.'
        },
        {
          id: 'Prod1E1-C2',
          nombre: 'Buscador DCSPI',
          definicion: 'Componente de consulta indexada sobre datos, metadatos y productos almacenados.',
          indicador: 'Tiempo respuesta medio ≤ 10s en 90% consultas; éxito ≥ 98%.',
          verificacion: 'Informe de rendimiento; estadísticas de latencia y éxito.'
        }
      ]
    },
    {
      id: 'Meta 2',
      objetivo: 'Objetivo Particular 2: Maduración tecnológica de Xelhua.',
      titulo: 'Acoplamiento de la plataforma Xelhua con MictlanX y Jub',
      proposito: 'Establecer una integración funcional y robusta entre la plataforma Xelhua y los sistemas MictlanX y Jub.',
      fin: 'Contar con una infraestructura operativa que permita la conexión eficiente.',
      problemas: ['P2'], 
      componentes: [
        {
          id: 'Prod2E1-C1',
          nombre: 'Malla de servicios estructurados',
          definicion: 'Conjunto de servicios interconectados que permiten el procesamiento de datos estructurados.',
          indicador: 'Cobertura de pruebas unitarias ≥ 90%.',
          verificacion: 'Repositorio de códigos e informe técnico de validación.'
        },
        {
          id: 'Prod2E1-C2',
          nombre: 'Acoplamiento con Jub',
          definicion: 'Integración de los servicios de análisis con la plataforma Jub.',
          indicador: 'Disponibilidad (99%); Cobertura pruebas ≥ 90%.',
          verificacion: 'API de procesos: Indica flujos a ejecutar.'
        },
        {
          id: 'Prod2E1-C3',
          nombre: 'Acoplamiento con MictlanX',
          definicion: 'Conector para almacenar los resultados del análisis en MictlanX.',
          indicador: 'Cobertura pruebas unitarias ≥ 90%.',
          verificacion: 'API de productos: Devuelve listado de productos generados.'
        }
      ]
    },
    {
      id: 'Meta 3',
      objetivo: 'Objetivo Particular 3: Maduración tecnológica de Nez.',
      titulo: 'Suite de acoplamiento ligero para invocar Nez',
      proposito: 'Implementar una suite que permita invocación de servicios de imágenes desde Jub, con conector a MictlanX.',
      fin: 'Facilitar la interoperabilidad entre Jub, MictlanX y Nez.',
      problemas: ['P2'], 
      componentes: [
        {
          id: 'Prod3E1-C1',
          nombre: 'Malla de servicios no estructurados',
          definicion: 'Procesamiento de datos no estructurados en repositorios de imagenología.',
          indicador: 'Cobertura pruebas ≥ 90%; 100% casos de uso.',
          verificacion: 'Repositorio de códigos e informe de validación.'
        },
        {
          id: 'Prod3E1-C2',
          nombre: 'Acoplamiento con Jub',
          definicion: 'Integración de servicios de análisis de imágenes con Jub.',
          indicador: 'Cobertura pruebas ≥ 90%; 100% casos de uso.',
          verificacion: 'API de procesos.'
        },
        {
          id: 'Prod3E1-C3',
          nombre: 'Acoplamiento con MictlanX',
          definicion: 'Conector para almacenar resultados de imágenes en MictlanX.',
          indicador: 'Cobertura pruebas ≥ 90%; 100% casos de uso.',
          verificacion: 'API de productos generados.'
        }
      ]
    },
    {
      id: 'Meta 4',
      objetivo: 'Objetivo Particular 4: Maduración tecnológica de MictlanX.',
      titulo: 'Arquitectura de eventos para MictlanX y Conectores multiplataforma',
      proposito: 'Facilitar la interacción de aplicaciones externas con MictlanX mediante un cliente estándar y garantizar la interoperabilidad con multiples proveedores de nube.',
      fin: 'Garantizar colocación y recuperación de objetos en flujos operativos.',
      problemas: ['P1', 'P2'], 
      componentes: [
        {
          id: 'Prod4E1-C1',
          nombre: 'Cliente de acoplamiento ligero',
          definicion: 'Biblioteca que expone operaciones put y get para integrar MictlanX con Xelhua y Nez.',
          indicador: 'Biblioteca operativa; pruebas ≥ 80%; 100% casos de uso.',
          verificacion: 'Repositorio con versión; informe de tests unitarios.'
        },
        {
          id: 'Prod4E1-C2',
          nombre: 'Orquestador VSS',
          definicion: 'API REST que permite crear, listar y gestionar espacios de almacenamiento (EAV).',
          indicador: 'Servicio operativo; pruebas ≥ 80%; 100% casos de uso.',
          verificacion: 'Especificación OpenAPI; colección de pruebas y logs.'
        }
      ]
    }
  ],
  etapa2: [

    {
      id: 'Meta 5',
      objetivo: 'Objetivo Particular 5: Observatorio IMA.',
      titulo: 'Construir el observatorio de Investigación Ambiental',
      proposito: 'Generar un observatorio de datos integrados ambientales (EMAS, MERRA, INEM, etc).',
      fin: 'Consolidar información relevante para la toma de decisiones y detección de áreas de interés.',
      problemas: ['P3'], 
      componentes: [
        {
          id: 'Prod5E1-C1',
          nombre: 'Acoplados Kawak-Jub',
          definicion: 'Módulo que acopla la plataforma Kawak con Jub para bases de datos EMAS/MERRA.',
          indicador: 'Pruebas unitarias ≥ 80%; 100% casos de uso.',
          verificacion: 'Pruebas de integración Kawak-Jub.'
        },
        {
          id: 'Prod5E2-C1',
          nombre: 'Módulo de recuperación',
          definicion: 'Recuperación sistemática de INEM, RETC, DENUE, EMAS y MERRA.',
          indicador: 'Pruebas unitarias ≥ 80%; 100% casos de uso.',
          verificacion: 'Pruebas de recuperación de información.'
        },
        {
          id: 'Prod5E3-C1',
          nombre: 'Módulo de procesamiento',
          definicion: 'Generación de productos de información a partir de datos crudos.',
          indicador: 'Pruebas unitarias ≥ 80%; 100% casos de uso.',
          verificacion: 'Pruebas de procesamiento y generación.'
        },
        {
          id: 'Prod5E4-C1',
          nombre: 'Módulo de indexación',
          definicion: 'Indexación de productos generados en MictlanX para el observatorio.',
          indicador: 'Pruebas unitarias ≥ 80%; 100% casos de uso.',
          verificacion: 'Visualización de productos en Jub.'
        }
      ]
    },
    {
      id: 'Meta 6',
      objetivo: 'Objetivo Particular 6: Observatorio ALERTA.',
      titulo: 'Análisis Local Epidemiológico de Riesgos Toxicológicos',
      proposito: 'Analizar, comunicar y contextualizar emisión de contaminantes y riesgos.',
      fin: 'Consolidar datos relevantes para toma de decisiones e investigación toxicológica.',
      problemas: ['P3'],
      componentes: [
        {
          id: 'Prod6E1-C1',
          nombre: 'Flujo de contaminantes',
          definicion: 'Sistema de ciencia de datos a partir de datos estructurados de contaminantes.',
          indicador: 'Pruebas unitarias ≥ 80%; 100% casos de uso.',
          verificacion: 'Generación de base de datos con productos y metadatos.'
        },
        {
          id: 'Prod6E2-C2',
          nombre: 'Acoplamiento Xelhua',
          definicion: 'Aplicaciones para preprocesamiento encapsuladas usando Xelhua.',
          indicador: 'Pruebas unitarias ≥ 80%; 100% casos de uso.',
          verificacion: 'Pruebas de procesamiento.'
        },
        {
          id: 'Prod6E3-C3',
          nombre: 'Acoplamiento MictlanX',
          definicion: 'Integración del conector de Xelhua con MictlanX para almacenar resultados.',
          indicador: 'Pruebas unitarias ≥ 80%; 100% casos de uso.',
          verificacion: 'Visualización indexada en Jub.'
        }
      ]
    },
    {
      id: 'Meta 7',
      objetivo: 'Objetivo Particular 5: Azomalli.',
      titulo: 'Observatorio de Salud Mental y Suicidios en México',
      proposito: 'Analizar y contextualizar información de salud mental y suicidios.',
      fin: 'Consolidar datos relevantes traducidos en representaciones para decisiones.',
      problemas: ['P3'],
      componentes: [
        {
          id: 'Prod7E1-C1',
          nombre: 'Flujo de datos',
          definicion: 'Sistema que organiza el preprocesamiento, algoritmos y generación de visuales.',
          indicador: 'Cobertura pruebas ≥ 90%; 100% casos de uso.',
          verificacion: 'Visualización de productos en Jub.'
        }
      ]
    },
    {
      id: 'Meta 8',
      objetivo: 'Objetivo Particular 5: Kaexla.',
      titulo: 'Observatorio de la lengua Tének',
      proposito: 'Consulta, documentación y divulgación de la lengua tének.',
      fin: 'Promover la transmisión de la lengua en espacios formales.',
      problemas: ['P3'],
      componentes: [
        {
          id: 'Prod8E1-C1',
          nombre: 'Acoplamiento MictlanX',
          definicion: 'Consumir e intercambiar datos con el sistema MictlanX.',
          indicador: 'Cobertura pruebas ≥ 90%; 100% casos de uso.',
          verificacion: 'Visualización en Jub.'
        },
        {
          id: 'Prod8E2-C1',
          nombre: 'Indexación y Recuperación',
          definicion: 'Indexación en MictlanX para consulta a través de Jub.',
          indicador: 'Cobertura pruebas ≥ 90%; 100% casos de uso.',
          verificacion: 'Generación de BD con productos y metadatos.'
        }
      ]
    }
  ]
};
</script>

<style scoped>
.clickable-chip:hover {
  background-color: rgba(var(--v-theme-secondary-blue), 0.1) !important;
  transform: translateY(-1px);
  transition: all 0.2s ease;
}
.panel-hover:hover {
  border-color: rgba(var(--v-theme-primary), 0.5) !important;
  transition: border-color 0.3s ease;
}
</style>


