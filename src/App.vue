<template>
  <v-app>
    <v-main>
      <TypeTest />
    </v-main>
  </v-app>
</template>

<script>
import TypeTest from './components/TypeTest';

export default {
  name: 'App',

  components: {
    TypeTest,
  }
};
</script>
