<template>
  <v-footer class="bg-primary-darken-1 pt-16 pb-8 px-4 border-top">
    <v-container max-width="1200">
      
      <v-row class="mb-12" justify="space-between">
        
        <v-col cols="12" md="4" class="text-center text-md-left mb-8 mb-md-0">
          <v-avatar size="120" class="mb-6 bg-transparent border-white">
            <v-img src="@/assets/logo.svg" contain ></v-img>
          </v-avatar>
          <h3 class="text-h6 font-weight-bold text-white mb-3">Ecosistema Jub</h3>
          <p class="text-body-2 text-grey-lighten-1 mx-auto mx-md-0" style="line-height: 1.6; max-width: 320px;">
            Concentrador Nacional de Información Estratégica. Unificando la ciencia de datos para impulsar la innovación y el desarrollo en México.
          </p>
        </v-col>

        <v-col cols="12" sm="4" md="2" class="text-center text-sm-left">
          <h4 class="text-subtitle-2 font-weight-bold text-secondary-blue text-uppercase tracking-wide mb-6">
            Soluciones
          </h4>
          <ul class="footer-links">
            <li><router-link to="/">Jub UI</router-link></li>
            <li><router-link to="/services/xelhua">Xelhua</router-link></li>
            <li><router-link to="/services/nez">Nez</router-link></li>
            <li><router-link to="/services/mictlanx">MictlanX</router-link></li>
          </ul>
        </v-col>

        <v-col cols="12" sm="4" md="2" class="text-center text-sm-left">
          <h4 class="text-subtitle-2 font-weight-bold text-secondary-blue text-uppercase tracking-wide mb-6">
            Recursos
          </h4>
          <ul class="footer-links">
            <li><a href="#">Documentación</a></li>
            <li><a href="#">API Reference</a></li>
            <li><a href="#">Observatorios</a></li>
            <li><a href="#">Guía de Usuario</a></li>
          </ul>
        </v-col>

        <v-col cols="12" sm="4" md="3" class="text-center text-sm-left">
          <h4 class="text-subtitle-2 font-weight-bold text-secondary-blue text-uppercase tracking-wide mb-6">
            Conéctate
          </h4>
          <div class="d-flex justify-center justify-sm-start ga-3 mb-6">
            <v-btn icon="mdi-github" variant="tonal" color="grey-lighten-1" size="small" class="hover-icon"></v-btn>
            <v-btn icon="mdi-linkedin" variant="tonal" color="grey-lighten-1" size="small" class="hover-icon"></v-btn>
            <v-btn icon="mdi-twitter" variant="tonal" color="grey-lighten-1" size="small" class="hover-icon"></v-btn>
          </div>
          <p class="text-caption text-grey-lighten-1 mb-0 d-flex align-center justify-center justify-sm-start">
            <v-icon size="small" class="mr-2">mdi-email-outline</v-icon>
            support@jub.mx
          </p>
        </v-col>

      </v-row>

      <v-divider color="grey-darken-2" class="mb-6"></v-divider>

      <v-row align="center">
        <v-col cols="12" md="6" class="text-center text-md-left mb-4 mb-md-0">
          <span class="text-caption text-grey-lighten-1">
            © 2026 Ecosistema Jub. Todos los derechos reservados.
          </span>
        </v-col>
        <v-col cols="12" md="6" class="text-center text-md-right">
          <div class="d-flex justify-center justify-md-end ga-6">
            <a href="#" class="text-caption text-grey-lighten-1 text-decoration-none hover-link">Aviso de Privacidad</a>
            <a href="#" class="text-caption text-grey-lighten-1 text-decoration-none hover-link">Términos de Uso</a>
          </div>
        </v-col>
      </v-row>

    </v-container>
  </v-footer>
</template>

<style scoped>
.border-white {
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  transition: border-color 0.3s ease;
}

.border-white:hover {
  border-color: rgba(255, 255, 255, 0.6) !important;
}

.tracking-wide {
  letter-spacing: 1.5px !important;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a,
.hover-link {
  color: #BDBDBD; /* grey-lighten-1 */
  text-decoration: none;
  font-size: 0.875rem; /* text-body-2 equivalente */
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-block;
}

.footer-links a:hover,
.hover-link:hover {
  color: rgb(var(--v-theme-secondary-blue));
  transform: translateX(4px); 
}

.hover-icon {
  transition: all 0.3s ease;
}

.hover-icon:hover {
  background-color: rgb(var(--v-theme-secondary-blue)) !important;
  color: white !important;
  transform: translateY(-3px);
}

.border-top {
  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
}
</style>