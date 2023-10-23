export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  const $editor_title = document.createElement("h1");
  $editor_title.contentEditable = "true";
  $editor_title.className = "editor_title";

  const $editor_content = document.createElement("div");
  $editor_content.className = "editor_content";
  // $editor_content.contentEditable = "true";

  const $editor_content_block = document.createElement("div");
  $editor_content_block.className = "editor_content_block default";
  $editor_content_block.contentEditable = "true";

  $editor_content.appendChild($editor_content_block);

  this.state = initialState;

  this.setState = (nextState) => {
    console.log("nextStatenextStatenextStatenextStatenextState", nextState);
    let isInit = this.state.id === nextState.id; //같은 id면 수정중일테니까 새로 렌더하진 않는다.

    this.state = nextState; //{id: 101456, title: '새로 만든 페이지', createdAt: '2023-10-18T04:52:39.676Z', updatedAt: '2023-10-18T04:52:39.680Z', content: null, …}

    if (!isInit) {
      this.render();
    }
  };

  const handleChangeContent = async (e) => {
    // console.log(e, e.target);
    if (e.key === "Enter") {
      const child = e.target.childNodes[1];
      console.log(child ? child : "NOPE");
      if (child) {
        child.remove();
      }

      const newBlock = document.createElement("div");
      newBlock.className = "editor_content_block";
      newBlock.setAttribute("contenteditable", true);
      // console.log(newBlock);
      newBlock.addEventListener("keyup", (e) => handleChangeContent(e));
      e.currentTarget.after(newBlock);
      newBlock.focus();
      e.preventDefault();
    } else if (e.key === "Backspace") {
      //
    } else if (e.key === "ArrowUp") {
      //
    } else if (e.key === "ArrowDown") {
      //
    } else {
      // 그외 모든 문자 입력
      console.log(e.currentTarget.innerText);
      const { currentTarget } = e;
      console.log({ currentTarget });
      console.log(e.currentTarget);
      console.log(e.currentTarget.parentNode.innerHTML);
      console.log(e.currentTarget.innerHTML.indexOf("#&nbsp;"));
      let allHTML = e.currentTarget.parentNode.innerHTML;
      if (e.currentTarget.innerHTML.indexOf("#&nbsp;") === 0) {
        console.log(e.currentTarget.innerHTML);
        console.log(typeof e.currentTarget.innerHTML);
        const txt = e.currentTarget.innerHTML.substring(7);
        const newline = document.createElement("h1");
        newline.className = "editor_content_block r";
        newline.setAttribute("contenteditable", true);
        newline.addEventListener("keyup", (e) => handleChangeContent(e));
        newline.innerHTML = txt;
        e.currentTarget.after(newline);
        newline.focus();
        allHTML = e.currentTarget.parentNode.innerHTML;
        e.currentTarget.remove();
      }
      // const allHTML = e.currentTarget.parentNode.innerHTML;

      const nextState = {
        ...this.state,
        content: allHTML,
      };
      console.log(nextState);
      await onEditing(nextState, "content");
    }
    // await onEditing(nextState, "title");
  };

  this.render = () => {
    // console.log(this.state.content);
    $editor_title.innerHTML = this.state.title;
    $editor.appendChild($editor_title);
    if (this.state.content !== null) {
      $editor_content.innerHTML =
        this.state.content +
        `<div class="editor_content_block d" contenteditable="true"></div>`;
      $editor_content_block.innerHTML = "";
    } else {
      $editor_content.innerHTML = `<div class="editor_content_block d" contenteditable="true"></div>`;
      $editor_content_block.innerHTML = "";
      // this.state.content가 비어있을땐 입력한게 없으니 둘다 비움
    }
    // console.log($editor_content);
    $editor.appendChild($editor_content);
    const blocks = document.querySelectorAll(".editor_content_block");
    for (let block of blocks) {
      block.addEventListener("keyup", (e) => handleChangeContent(e));
    }
    // console.log(blocks);
  };

  $editor_title.addEventListener("keyup", async (e) => {
    const nextState = {
      ...this.state,
      title: e.target.innerHTML,
    };
    this.setState(nextState);
    await onEditing(nextState, "title");
    const content = e.target.innerText;
    console.log("CustomEvent 타이틀수정실행");
    window.dispatchEvent(
      new CustomEvent("render-SideBarList", {
        detail: {
          content,
        },
      })
    );
  });

  console.log({ $editor_content_block });
  // $editor_content_block.addEventListener("keyup", (e) => console.log(e));
  $editor_content_block.addEventListener("keyup", (e) =>
    handleChangeContent(e)
  );
}
