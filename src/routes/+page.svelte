<script lang="ts">
  let text = ''

  async function ask() {
    if (text !== '') {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'content-type': 'application/json'
        }
      })

      return await response.json()
    } else {
      return ''
    }
  }

  let askPromise = ask()

  function handleClick() {
    askPromise = ask()
  }
</script>

<svelte:head>
  <title>オススメの飲食店を教えてくれる GPT 君</title>
  <meta
    name="description"
    content="テキストエリアに要望を書いてボタンを押せば GPT がオススメの飲食店を教えてくれるよ！【注意】ほぼ架空のお店を紹介してくるので気をつけてください。<br>AIによるレコメンドの雰囲気を感じるためだけのアプリです。【注意】"
  />
</svelte:head>

<div class="wrap">
  <div class="form">
    <h1>要望を書けばオススメの飲食店を教えてくれる君</h1>
    <p class="description">
      【注意】【注意】【注意】【注意】【注意】<br
      />ほぼ架空のお店を紹介してくるので気をつけてください。<br
      />AIによるレコメンドの雰囲気を感じるためだけのアプリです。
    </p>
    <textarea
      bind:value={text}
      placeholder="ここに要望を書いてください。下に例文も書いておきます。"
    />
    <div class="ex">
      入力例: <br />
      来週の金曜日に、親友のためにサプライズバースデーディナーを開きます。<br />
      親しい友人 10 人を招待します。<br />
      場所は渋谷駅周辺。<br />
      料理のジャンルは中華がいいです。
    </div>
    <div class="ex">
      入力例: <br />
      恵比寿で結婚式を挙げてその後2次会として行ける居酒屋を探しています。<br />
      人数は30人程度です。
    </div>
    <div class="ex">
      入力例: <br />
      今日は嬉しい事があったのでひとりで練馬駅あたりで落ち着いて飲みたいです。<br />
      和食がいいな。
    </div>
    <button on:click={handleClick}>オススメを聞いてみる</button>
  </div>

  <div class="answer">
    {#await askPromise}
      <div class="spinner" />
    {:then ansewr}
      {#if ansewr}
        <p>{@html ansewr.data.content.replace(/\n/g, '<br>')}</p>
      {:else if ansewr === ''}
        <p>要望を入力してください</p>
      {:else}
        <p style="color: red">Error</p>
      {/if}
    {:catch error}
      <p style="color: red">Error</p>
    {/await}
  </div>
</div>

<style>
  .wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
  }

  .description {
    font-size: 1.6rem;
    text-align: center;
    color: #ffde15;
    font-weight: bold;
  }

  .form {
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .form > * {
    width: 100%;
    margin-top: 3rem;
  }

  .form .ex {
    font-size: 1.4rem;
    color: #ccc;
  }

  .form textarea {
    width: 100%;
    margin-top: 3rem;
    padding: 2rem 1rem;
    font-size: 1.6rem;
    border-radius: 1rem;
    border: none;
    height: 20rem;
  }

  .form button {
    width: 30rem;
    padding: 2rem 1rem;
    border-radius: 1rem;
    border: 0;
    font-size: 2rem;
    font-weight: bold;
    background-color: #3675a3;
    color: var(--text-color);
  }

  .answer {
    max-width: 800px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }

  .answer p {
    line-height: 3.2rem;
    font-size: 1.6rem;
  }

  .spinner {
    width: 40px; /* サイズ - 可変 */
    height: 40px; /* サイズ - 可変 */
    background-color: rgb(50, 255, 132); /* ベースの色 - 可変 */

    margin: 0 auto; /* 上下マージン - 可変 */
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }

  @-webkit-keyframes sk-rotateplane {
    0% {
      -webkit-transform: perspective(120px);
    }
    50% {
      -webkit-transform: perspective(120px) rotateY(180deg);
    }
    100% {
      -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
    }
  }

  @keyframes sk-rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
</style>
