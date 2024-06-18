# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
- 내용

## 📌 과제 설명 
바닐라 JS만을 이용해 노션을 클로닝합니다.

### 시연 영상
https://github.com/prgrms-fe-devcourse/FEDC5-5_Project_Notion_VanillaJS/assets/40955023/d7562840-b38b-433c-b996-db65cb99b155

## 👩‍💻 구현 내용

- [X] 기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.
- [X] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [X]  초기화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
- [X]  Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
- [X] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [X] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [X] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [X] History API를 이용해 SPA 형태로 만듭니다.

### 보너스 요구사항
- [X] 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다. -> H1 , H2, H3, H4 태그를 사용할 수 있습니다.

그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다!
- [X] 검색 기능을 하는 모달을 구현했습니다. 검색결과를 클릭하면 해당 페이지로 이동합니다
- [X] 페이지 상단에 해당 페이지의 경로를 표시합니다.
- [X] Document 삭제시 하위 Document들 모두 삭제하도록 했습니다. 
