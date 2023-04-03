<script lang="ts">
  import './styles.css'
</script>

<div class="app">
  <main>
    <slot />
  </main>

  <footer>
    <p>copyright Daisuke Kobayashi</p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    width: 100%;
    margin: 0 auto;
  }

  footer {
    display: flex;
    justify-content: center;
    padding: 0 2rem;
    margin-top: 12rem;
    margin-bottom: 6rem;
  }
</style>
