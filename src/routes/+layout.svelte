<script lang="ts">
  import './styles.css'
</script>

<div class="app">
  <main>
    <slot />
  </main>

  <footer>
    <p>
      copyright <a
        class="twitter"
        href="https://twitter.com/0rga"
        target="_blank"
        rel="noopener noreferrer">@0rga</a
      >
    </p>
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

  footer a {
    color: var(--a-color);
    text-decoration: underline;
    font-size: 1.4rem;
  }
</style>
