import App from "./components/App.js";

const $app = document.querySelector("#app");

new App({
  $target: $app,
  // initialState: {
  //   documentId: 0,
  //   document: {
  //     title: "",
  //     content: "",
  //   },
  // },
});
