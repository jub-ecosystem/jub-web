<template>
  <v-container max-width="1100" class="py-8">

    <!-- Hero -->
    <v-card rounded="xl" elevation="0" class="mb-8 pa-8 text-center" color="primary" theme="dark">
      <v-icon size="52" class="mb-3">mdi-book-open-variant</v-icon>
      <h1 class="text-h4 font-weight-black mb-2">Artículos científicos</h1>
      <p class="text-body-1 opacity-80">Publicaciones del equipo MADTEC-2025 en revistas y conferencias internacionales.</p>
    </v-card>

    <!-- Filter bar -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          placeholder="Buscar por título, autor o palabra clave…"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
          rounded="lg"
        />
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center ga-2 flex-wrap">
        <v-chip
          v-for="opt in typeOptions"
          :key="opt.value ?? 'all'"
          :color="typeFilter === opt.value ? 'primary' : undefined"
          :variant="typeFilter === opt.value ? 'flat' : 'tonal'"
          class="font-weight-bold cursor-pointer"
          @click="typeFilter = opt.value"
        >{{ opt.label }}</v-chip>
      </v-col>
    </v-row>

    <!-- Count -->
    <div class="mb-4 text-body-2 text-grey-darken-1 font-weight-medium">
      {{ filteredPapers.length }} artículo{{ filteredPapers.length !== 1 ? 's' : '' }} encontrado{{ filteredPapers.length !== 1 ? 's' : '' }}
    </div>

    <!-- Paper cards -->
    <v-row>
      <v-col v-for="(paper, i) in filteredPapers" :key="i" cols="12">
        
        <v-card rounded="xl" elevation="1" class="pa-1" hover>
          <v-card-text>
            <!-- Top row: type chip + download -->
            <div class="d-flex align-center mb-3 flex-wrap ga-2">
              <v-chip
                :color="paper.type === 'Journal Article' ? 'primary' : 'deep-purple'"
                size="small"
                variant="tonal"
                class="font-weight-bold"
              >
                <v-icon start size="14">{{ paper.type === 'Journal Article' ? 'mdi-book-open-page-variant' : 'mdi-presentation' }}</v-icon>
                {{ paper.type === 'Journal Article' ? 'Artículo de revista' : 'Artículo de conferencia' }}
              </v-chip>
              <v-spacer />
              <v-btn
                :href="paper.link"
                target="_blank"
                rel="noopener"
                variant="tonal"
                color="primary"
                size="small"
                prepend-icon="mdi-file-download-outline"
                class="text-none font-weight-bold"
              >Descargar</v-btn>
            </div>

            <!-- Title -->
            <h2 class="text-h6 font-weight-bold mb-2" style="line-height: 1.3;">{{ paper.title }}</h2>

            <!-- Authors -->
            <div class="d-flex align-start ga-2 mb-3">
              <v-icon size="16" color="grey-darken-1" class="mt-1 flex-shrink-0">mdi-account-multiple-outline</v-icon>
              <span class="text-body-2 text-grey-darken-1">{{ paper.authors.join(', ') }}</span>
            </div>

            <div>
              <v-icon size="16" color="grey-darken-1" class="mr-1" style="vertical-align: middle;">mdi-link-variant</v-icon>
              <a :href="`https://doi.org/${paper.doi}`" target="_blank" rel="noopener" class="text-body-2 font-weight-medium" style="vertical-align: middle;">
                {{ paper.doi }}
              </a>
            </div>

            <!-- Abstract -->
            <div class="mb-3">
              <p class="text-body-2 text-grey-darken-2" style="line-height: 1.6;">
                {{ expanded[i] ? paper.abstract : paper.abstract.slice(0, 280) + (paper.abstract.length > 280 ? '…' : '') }}
              </p>
              <v-btn
                v-if="paper.abstract.length > 280"
                variant="text"
                size="x-small"
                color="primary"
                class="text-none font-weight-bold pa-0 mt-1"
                @click="expanded[i] = !expanded[i]"
              >{{ expanded[i] ? 'Ver menos' : 'Ver más' }}</v-btn>
            </div>

            <!-- Keywords -->
            <div class="d-flex flex-wrap ga-1">
              <v-chip
                v-for="kw in paper.keywords"
                :key="kw"
                size="x-small"
                variant="tonal"
                color="secondary-blue"
                class="font-weight-medium"
              >{{ kw }}</v-chip>
            </div>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty state -->
    <v-empty-state
      v-if="filteredPapers.length === 0"
      icon="mdi-book-search-outline"
      title="Sin resultados"
      text="Ningún artículo coincide con los filtros actuales."
    />

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';

definePage({
  name: 'ResourcesArticles',
  // meta: { requiresAuth: false, layout: 'default' },
});

interface Paper {
  title: string;
  authors: string[];
  abstract: string;
  keywords: string[];
  type: 'Journal Article' | 'Conference Paper';
  doi: string;
  link: string;
}

const papers: Paper[] = [
  {
    title: 'Nez: A design-driven skeleton model for building continuum AI-based and analytic systems',
    authors: ['Dante D. Sanchez-Gallegos', 'Diana Carrizales-Espinoza', 'J.L. Gonzalez-Compean', 'Marco Antonio Núñez-Gaona', 'Heriberto Aguirre-Meneses', 'Jesus Carretero'],
    abstract: 'Organizations increasingly rely on artificial intelligence (AI) and machine learning (ML) to process data, automate tasks, and enhance decision-making. At the same time, the computing continuum enables AI and ML to be deployed closer to data sources, thereby reducing system latency and response time. Managing applications across this distributed environment is challenging due to the need for manual deployment, integration, and compliance with non-functional requirements (NFRs) such as security and fault tolerance. This paper presents Nez, a design-driven skeleton model for building continuum AI and analytics systems. Nez construction model automatically and transparently integrates AI/ML applications with non-functional components to create continuum systems that are deployed dynamically across multiple distributed infrastructures. We conducted case studies on the processing of medical imagery and satellite imagery. The evaluation shows that Nez outperforms state-of-the-art tools such as Nextflow, Makeflow, and Parsl, achieving improvements in response time of 28.46%, 17.46%, and 23.54%, respectively.',
    keywords: ['AI', 'Machine Learning', 'Continuum Computing', 'Distributed Systems', 'Skeleton Model', 'NFR'],
    type: 'Journal Article',
    link: 'https://cinvestav365-my.sharepoint.com/:b:/g/personal/jose_morin_cinvestav_mx/IQCgxnP0zPraTKNsdLZ-C9pNAR2cSzrh-mQgEkbbUkSzA8g?e=72Mdhu',
    doi: '10.3390/data10110191',
  },
  {
    title: 'A Mexican Enhanced Dataset of Pollutant Releases and Transfers (2004 to 2022) with IARC Cancer Classifications',
    authors: ['Hugo G. Reyes-Anastacio', 'Ivan Lopez-Arevalo', 'Jose L. Gonzalez-Compean', 'Melesio Crespo-Sanchez', 'Jaqueline Calderon', 'Heriberto Aguirre-Meneses'],
    abstract: 'As a member of the North American Free Trade Agreement, the Mexican Ministry of Environment and Natural Resources publishes the Pollutant Releases and Transfers Registry of Substances annually. This registry comprises 19 datasets (one per year, from 2004 to 2022). These have not preserved the same structure and categorical values, making it difficult to fuse them with other datasets and conduct exploratory studies. This paper describes a method for integrating the Pollutant Release and Transfer Registry dataset, enhanced with facilities data and cancer classification from the International Agency for Research on Cancer, to produce an improved and augmented public data source for academic or research purposes. The obtained database contains geospatial information, which enabled us to analyze the dataset at the state or municipal level to create digital products that can be used to inform decisions about environmental pollution.',
    keywords: ['Open Data', 'Cancer Classification', 'Environment', 'Geospatial', 'Public Health', 'IARC'],
    type: 'Journal Article',
    link: 'https://cinvestav365-my.sharepoint.com/:b:/g/personal/jose_morin_cinvestav_mx/IQDe86RGYuf6SZKQYPT_BrIZAWv9Y897iXi5H-PUiY4X3_8?e=QgFyDF',
    doi: '10.1109/TSC.2024.3168615',
  },
  {
    title: 'APaC: A context-aware and availability policy as code framework for elastic object storage',
    authors: ['Ignacio Castillo-Barrios', 'J. L. Gonzalez-Compean', 'Ivan Lopez-Arevalo', 'Jose Juan Garcia-Hernandez'],
    abstract: 'Replication strategies provide availability for cloud storage, yet existing policies typically rely on static popularity metrics. These works struggle to react dynamically to contextual workload variations, specifically the temporal increments and decays in user concurrency and data consumption. This paper introduces APaC, a framework that combines a context-reactive replication method with an Availability Policy-as-Code programming model for storage systems to autonomously update availability policies and adapt at runtime to workload fluctuations. The APaC model defines replication policies through primitives that specify who, what, where, how, and when should replicate data. APaC outperformed state-of-the-art policies, achieving gains of 16.6% over time-distribution-based, 26% over object-lifetime-based, 34.6% over popularity-based strategies, and more than 70% over the baseline configuration.',
    keywords: ['Cloud Storage', 'Replication', 'Availability', 'Policy-as-Code', 'Elastic Storage', 'Workload'],
    type: 'Journal Article',
    link: 'https://cinvestav365-my.sharepoint.com/:b:/g/personal/jose_morin_cinvestav_mx/IQC0Q7ZqlMyUT7iUWZO553HcAZjPPo6cNVpStKQxjSEi4ZA?e=RMmdRJ',
    doi: '10.1109/TCC.2026.3693716',
  },
  {
    title: 'Turning data into insights in Jub, an extensible generic big data platform for life science and healthcare applications',
    authors: ['Ignacio Castillo-Barrios', 'Melesio Crespo-Sanchez', 'Hugo G. Reyes-Anastacio', 'Jose L. Gonzalez-Compean', 'Ivan Lopez-Arevalo', 'J. Carlos Morin-Garcia', 'Yelda A. Leal', 'Jaqueline Calderon-Hernandez', 'Heriberto Aguirre-Meneses', 'Marco Antonio Núñez-Gaona'],
    abstract: 'This paper presents Jub, a Life Science and Healthcare Data Platform (LSHDP) based on generic sandboxes that integrate AI tools and cloud storage into big data science services. Jub automatically and transparently creates data science services to transform datasets into massive information products by using a profiling methodology. These products are presented by generic-secure cloud-based FAIR observatories adding Programmable, Configurable/Customizing, Adaptable, and Resiliency properties (PCA-FAIR-R). We conducted a study case to convert mortality, climate, and pollutants datasets (2000-2023) reported by the Mexican Government into a solid core hub of information products: 16 strategic data observatories based on 85,171,404 information products created from 114,155,622 spatio-temporal profiles.',
    keywords: ['Big Data', 'Life Science', 'FAIR Data', 'Observatories', 'Healthcare', 'AI', 'Cloud Storage'],
    type: 'Journal Article',
    link: 'https://cinvestav365-my.sharepoint.com/:b:/g/personal/jose_morin_cinvestav_mx/IQDDfZqWWm6PR7C-IpTn1dFhAeZbnKY553nPdENhGJpdUw0?e=e1dCxD',
    doi: '10.1038/s41598-025-32196-3',
  },
  {
    title: 'A Computer-aided Framework for Detecting Osteosarcoma in Computed Tomography Scans',
    authors: ['Maximo Rodriguez-Herrero', 'Dante D. Sanchez-Gallegos', 'Marco Antonio Núñez-Gaona', 'Heriberto Aguirre-Meneses', 'Luis Alberto Villalvazo Gutiérrez', 'Mario Ibrahin Gutiérrez Velasco', 'J.L. Gonzalez-Compean', 'Jesus Carretero'],
    abstract: 'Osteosarcoma is the most common primary bone cancer, mainly affecting the youngest and oldest populations. Its detection at early stages is crucial to reduce the probability of developing bone metastasis. The research goal is to automate the diagnosis of osteosarcoma through a pipeline that includes the preprocessing, detection, postprocessing, and visualization of computed tomography (CT) scans. This paper presents a machine learning and visualization framework for classifying CT scans using different convolutional neural network (CNN) models. Preprocessing includes data augmentation and identification of the region of interest in scans. Postprocessing includes data visualization to render a 3D bone model that highlights the affected area. An evaluation on 12 patients revealed the effectiveness of our framework, obtaining an AUC of 94.8% and a specificity of 94.6%.',
    keywords: ['Machine Learning', 'Medical Imaging', 'CNN', 'Bone Cancer', 'Osteosarcoma', 'CT Scans'],
    type: 'Conference Paper',
    link: 'https://cinvestav365-my.sharepoint.com/:b:/g/personal/jose_morin_cinvestav_mx/IQDg0tWUYofWRJxblqT62amSARikCu7LXOPniuD0RxV9rQ4?e=56YINc',
    doi: '10.48550/arXiv.2603.13376',
  },
  {
    title: 'CIATfunc: A frame-based serverless framework for composing secure End-to-End applications',
    authors: ['Ignacio Castillo-Barrios', 'Ricardo A. Ibarra-Garcia', 'Jose Luis Gonzalez-Compean', 'Arturo Diaz-Perez', 'Ivan Lopez-Arevalo', 'Miguel Morales-Sandoval', 'Jose Juan Garcia-Hernandez', 'Heriberto Aguirre Meneses', 'Marco Antonio Núñez Gaona'],
    abstract: 'End-to-end applications (E2E-Apps) are essential for secure and seamless data exchange in scenarios like cloud-based data sharing and decentralized environments. However, they face challenges adapting to changing requirements, integrating security, computing, and storage services, and managing resources effectively in dynamic environments. This paper introduces CIATfunc, a framework for composing Secure End-to-End applications (SecE2E-Apps) by combining Policy-as-Code for defining high-level security requirements with Infrastructure-as-Code for automating resource provisioning and management. CIATfunc was validated through a case study involving the secure exchange of tomographic imagery between valid users and registering transactions in a blockchain. Results demonstrated its capability to build customized and traceable SecE2E-Apps while significantly improving performance through parallel execution of security tasks.',
    keywords: ['Serverless', 'End-to-End Security', 'Blockchain', 'Cloud Storage', 'Policy-as-Code', 'Infrastructure-as-Code'],
    type: 'Journal Article',
    link: 'https://cinvestav365-my.sharepoint.com/:b:/g/personal/jose_morin_cinvestav_mx/IQDuuyBSWLZUQp0-yEn31U6tAZxpWnhPsYPLY2an4ucpdJU?e=K9Pp9o',
    doi: '10.1109/TSC.2024.3168616',
  },
  {
    title: 'OsteoCAD: A Human-in-the-Loop Cloud–Edge Framework for Bone Tumor Segmentation',
    authors: ['Maximo Rodriguez-Herrero', 'Dante D. Sanchez-Gallegos', 'Heriberto Aguirre-Meneses', 'Marco Antonio Núñez-Gaona', 'J. L. Gonzalez-Compean', 'Jesus Carretero'],
    abstract: 'Artificial Intelligence (AI) and Deep Learning (DL) have notably advanced medical image analysis, yet many healthcare organizations struggle to adopt them due to limited computational resources and specialized expertise. To address these barriers, we introduce OsteoCAD, a modular eHealth framework that democratizes access to DL tools in clinical practice. OsteoCAD delivers end-to-end DL capabilities—from dataset creation and preprocessing to model training and inference—through an integrated and user-friendly interface. To mitigate local hardware constraints, the framework securely connects to remote GPU infrastructures. We validate OsteoCAD\'s feasibility through a real-world case study in Mexico focused on large bone tumor segmentation. The results demonstrate the framework\'s ability to enable DL-powered eHealth solutions without demanding advanced technical expertise or complex local configurations.',
    keywords: ['Deep Learning', 'eHealth', 'Medical Image Analysis', 'Data Privacy', 'Tumor Segmentation', 'Cloud-Edge'],
    type: 'Conference Paper',
    link: 'https://cinvestav365-my.sharepoint.com/:b:/g/personal/jose_morin_cinvestav_mx/IQBvRTmKTX1BSY68LuvbMF25ATBxBGfIHg8cEZ1jX4pHgYY?e=zC5AE0',
    doi: '10.1109/TSC.2024.3168617',
  },
];

const typeOptions = [
  { label: 'Todos',                    value: null                },
  { label: 'Artículo de revista',      value: 'Journal Article'   },
  { label: 'Artículo de conferencia',  value: 'Conference Paper'  },
] as const;

const searchQuery = ref('');
const typeFilter  = ref<string | null>(null);
const expanded    = reactive<Record<number, boolean>>({});

const filteredPapers = computed(() =>
  papers.filter(p => {
    const q = searchQuery.value.toLowerCase();
    const matchesQuery = !q ||
      p.title.toLowerCase().includes(q) ||
      p.authors.some(a => a.toLowerCase().includes(q)) ||
      p.keywords.some(k => k.toLowerCase().includes(q));
    const matchesType = !typeFilter.value || p.type === typeFilter.value;
    return matchesQuery && matchesType;
  })
);
</script>
