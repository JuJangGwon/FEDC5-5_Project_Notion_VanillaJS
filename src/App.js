import NotionEditPage from "./components/NotionEditPage.js"
import SideBar from "./components/SideBar.js"
import { request } from "./utils/api.js"
import { push, initRouter } from "./utils/router.js"

export default function App({$target}) {
    this.state = []

    this.setState = nextState => {
        this.state = nextState
    }

    const fetchDocuments = async() => {
        const documents = await request('/documents')
        this.setState(documents)
        sideBar.setState(documents)
    }
    
    const addDocument = async (parent=null) => {
        const res = await request('/documents', {
            method: "POST",
            body: JSON.stringify({
                title : '',
                parent
            })
        })
        push(`../documents/${res.id}`)
        this.route();
    }

    const deleteDocuments = async (id) => {
        await request(`/documents/${id}`, {
            method: "DELETE"
        })
        history.replaceState(null, null, "/");
        this.route();
    }

    const sideBar = new SideBar({
        $target, 
        initialState: this.state,
        onAdd: addDocument,
        onDelete: deleteDocuments
    })

    const notionEditPage = new NotionEditPage({
        $target, 
        fetchDocuments
    })

    this.route = () => {
        const {pathname} = window.location

        fetchDocuments()

        if(pathname === '/') {
            notionEditPage.setState('')
        }
        else if(pathname.indexOf('/documents/') === 0) {
            const [, , id] = pathname.split('/')
            notionEditPage.setState({id})
        }  
    }

    this.route()

    initRouter(() => this.route())

    window.addEventListener("popstate", () => {
        this.route();
      });
}