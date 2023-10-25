import Editor from "./Editor.js";
import SearchBox from "./SearchBox.js";
import SubPages from "./SubPages.js";
import { request } from "./utils/api.js";
import { localStorageSetItem } from "./utils/storage.js";

export default function EditPage({ $target, initialState }) {
  // $wrapEditPage , 초기디폴트는 {docId: "new",  doc: {  title: "",  content: "",}, }
  const $editPage = document.createElement("div");
  $editPage.className = "edit_page";
  this.state = initialState;

  // const searchBox = new SearchBox({
  //   $target: $editPage,
  //   initialState,
  // });
  // [ ] 타이틀이랑 같은 레벨에 오른쪽에 있도록

  let DOC_TMP_KEY = `doc_tmp_${this.state.docId}`;
  let timer = null;
  let timerPost = null;

  const editor = new Editor({
    $target: $editPage,
    initialState: { title: "", content: "" },
    onEditing: async (nextState, type = "") => {
      console.log("On eedinting 실행");
      // 디바운스
      clearTimeout(timer);
      clearTimeout(timerPost);

      timer = setTimeout(async () => {
        localStorageSetItem(DOC_TMP_KEY, {
          ...nextState,
          updatedAt: new Date(),
        });
      }, 1000);
      if (type === "title") {
        //<< 제목의 경우 즉시 실행함수로 PUT
        const res = await request(`/documents/${nextState.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: nextState.title,
            content: nextState.content,
          }),
        });
        console.log("PUT", res);
      } else {
        // << content는 2초 디바운스
        timerPost = setTimeout(async () => {
          const res = await request(`/documents/${nextState.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: nextState.title,
              content: nextState.content,
            }),
          });
          console.log("PUT", res);
        }, 2000);
      }
    },
  });

  const subPages = new SubPages({
    $target: $editPage,
    initialState: [],
  });

  this.setState = async ({ docId }) => {
    this.state = docId;
    DOC_TMP_KEY = `doc_tmp_${docId}`;

    const res = await request(`/documents/${docId}`);
    console.log(res);
    // searchBox.setState(res);

    editor.setState(res);
    subPages.setState(res.documents);
    // searchBox.setState();
    this.render();
  };

  this.render = () => {
    $target.appendChild($editPage);
  };
}
