import { createNewElement } from '../../../../../Util/element.js';
import DocumentItem from './DocumentItem/documentItem.js';

// state = { documuentList: [], isRoot: boolean }

export default class DocumentItems {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { documentList, isRoot } = this.state;
        const $documentItems = createNewElement("ul", [{ property: "className", value: "document-items" }]);
        const $fragment = document.createDocumentFragment();

        console.log(isRoot)

        documentList?.forEach((item) => {
            new DocumentItem({ $target: $fragment, initalState: { ...item }})
        });

        $documentItems.appendChild($fragment);
        this.$target.appendChild($documentItems);
    }
}
