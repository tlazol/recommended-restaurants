<script lang="ts">
  let text = ''
  let answerText = ''

  async function ask() {
    if (text !== '') {
      answerText = ''
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'content-type': 'application/json'
        }
      })
      const answer = await response.json()

      renderText(answer.data.content)

      return answer
    } else {
      return ''
    }
  }

  let askPromise = ask()

  function handleClick() {
    askPromise = ask()
  }

  async function renderText(text: string) {
    const typeContent = text.replace(/\n/g, '<br>')
    const typeSprit = typeContent.split('')
    const typeSpeed = 50
    let typeLength = 0

    const typeInterval = setInterval(() => {
      if (typeSprit[typeLength] == undefined) {
        clearInterval(typeInterval)
        return false
      }
      answerText += typeSprit[typeLength]
      typeLength++
    }, typeSpeed)
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
  <header>
    <h1>飲食店オススメ AI</h1>
    <p class="description">
      ※ 個人情報や会社の機微情報を入力してはいけません ※<br />※
      虚実と事実が折り混ざった嘘情報満載ですのでご注意ください ※
    </p>
  </header>
  <div class="bodyWrap">
    <textarea
      bind:value={text}
      placeholder="ここに要望を書いてください。下に例文も書いておきます。"
    />
    <button on:click={handleClick}>オススメ教えて</button>
    <div class="answerWrap">
      {#await askPromise}
        {#if text !== ''}
          <div class="loading">
            <div class="spinner">
              <div class="rect1" />
              <div class="rect2" />
              <div class="rect3" />
              <div class="rect4" />
              <div class="rect5" />
            </div>
            <p>🤖 考え中です。ちょっと時間かかります。</p>
          </div>
        {/if}
      {:then answer}
        {#if answer}
          <p class="answer">{@html answerText}</p>
        {:else if answer === ''}
          <p>🤖 要望を入力してください</p>
        {:else}
          <p style="color: red">Error</p>
        {/if}
      {:catch error}
        <p style="color: red">Error</p>
      {/await}
    </div>
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
  </div>
</div>

<style>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  header {
    background-color: var(--header-background-color);
    width: 100%;
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  header h1 {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    max-width: 62rem;
  }

  header .description {
    font-size: 1.4rem;
    text-align: center;
    color: var(--warning-color);
    margin-top: 0.5rem;
  }

  .bodyWrap {
    max-width: 80rem;
    padding: 0 2rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  textarea {
    width: 62rem;
    margin-top: 3rem;
    padding: 2rem 1rem;
    font-size: 1.6rem;
    border-radius: 1rem;
    border: none;
    height: 20rem;
    color: var(--text-color);
    background-color: var(--sub-background-color);
  }

  button {
    width: 30rem;
    margin-top: 3rem;
    padding: 2rem 1rem;
    border-radius: 1rem;
    border: 0;
    font-size: 2rem;
    background-color: var(--key-color);
    color: var(--text-color);
  }

  .ex {
    font-size: 1.4rem;
    color: var(--text-color-sub);
    margin-top: 3rem;
    width: 100%;
    max-width: 62rem;
  }

  .answerWrap {
    width: 100%;
    max-width: 62rem;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }

  .answerWrap p {
    line-height: 3.2rem;
    font-size: 1.6rem;
  }

  .spinner {
    width: 50px; /* サイズ - 可変 */
    height: 40px; /* サイズ - 可変 */
    margin: 0 auto; /* 上下マージン - 可変 */
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: var(--key-color); /* ベースの色 - 可変 */
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
</style>
