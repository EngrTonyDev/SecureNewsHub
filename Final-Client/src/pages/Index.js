import React, { Component } from 'react';
import NewCard from '../components/NewCard';
import NavBar from '../components/NavBar';


//import "../css/Index.css";
import { getCategories } from '../services/categoryService';
import { getNewsByUser, getSearchNews } from '../services/newsService';
import { getTags } from '../services/tagService';
import { decodeToken } from '../utils/decodeToken';


class Index extends Component {

    state = {
        notices: [],
        categories: [],
        tags: [],
        tagsSelected: [],
        selectedCat: "all",
        search: '',
        isLoading: false
    };

    componentDidMount() {
        this.gettingCategories();
        this.gettingTags();
        this.gettingNews();
        this.gettingSession();

    }
    gettingSession = async () => {
        try{const user = await decodeToken();
           if(user===null){window.location.href = "/";//return to login screen
        }
        }catch{
            window.location.href = "/";//return to login screen
    
        }
    
    }
    

    gettingCategories = async () => {
        this.setState({ isLoading: true });
        const { data, error } = await getCategories();
        if (!error) {
            this.setState({ categories: data })
        }
        this.setState({ isLoading: false });
    }

    gettingNews = async () => {
        this.setState({ isLoading: true });
     
        
        const { data, error } = await getNewsByUser(decodeToken()._id);
        if (!error) {
            
            this.setState({ notices: data })
        }else{
            

        }
        this.setState({ isLoading: false });
    }

    gettingTags = async () => {
        this.setState({ isLoading: true });
        const { data, error } = await getTags();
        if (!error) {
            this.setState({ tags: data })
        }
        this.setState({ isLoading: false });
    }

    handleChangeSearch = async (e) => {
        this.setState({ isLoading: true });
        const { value } = e.target;
        this.setState({ search: value });

        let category;
        if (this.state.selectedCat !== 'all') {
            category = this.state.selectedCat._id;
        }

        const tagsIds = this.state.tagsSelected.map(t => t._id);
        //const user = decodeToken();

       
   

        const { data, error } = await getSearchNews(
            decodeToken()._id,
            value !== '' ? value : undefined,
            category,
            tagsIds.length !== 0 ? tagsIds : undefined
        );
        if (!error) {
            console.log("carga search");
            console.log(data);
            this.setState({ notices: data })
        }else{
            console.log("no carga search");
            console.log(data);
        }
        this.setState({ isLoading: false });
    }

    filterByCategory = async (category) => {
        this.setState({ isLoading: true });
        this.setState({ selectedCat: category._id })
       
       
        const tagsIds = this.state.tagsSelected.map(t => t._id);
        const { data, error } = await getSearchNews(
            decodeToken()._id,
            this.state.search !== '' ? this.state.search : undefined,
            category !== 'all' ? category._id : undefined,
            tagsIds.length !== 0 ? tagsIds : undefined
        );
        if (!error) {
            console.log("carga search");
            console.log(data);
            
            this.setState({ notices: data })
        }else{
            console.log("no carga search");
            console.log(data);
            
        }
        this.setState({ isLoading: false });
    }

    filterByTags = async (tag) => {
        this.setState({ isLoading: true });
        if (tag === 'all') {
            await this.setState({ tagsSelected: [] });
            this.filterByCategory(this.state.selectedCat);
        } else {
            let category;
            if (this.state.selectedCat !== 'all') {
                category = this.state.selectedCat._id;
            }

            let tags = this.state.tagsSelected;
            const indexTag = tags.findIndex(tagList => tagList._id === tag._id);

            if (indexTag === -1) {
                tags.push(tag);
            } else {
                tags.splice(indexTag, 1);
            }

            this.setState({ tagsSelected: tags });

            const tagsIds = tags.map(t => t._id);
            const { data, error } = await getSearchNews(
                decodeToken()._id,
                this.state.search !== '' ? this.state.search : undefined,
                category,
                tagsIds.length !== 0 ? tagsIds : undefined
            );
            if (!error) {
                this.setState({ notices: data })
            }
        }
        this.setState({ isLoading: false });
    }


    render() {

        const { categories, notices, selectedCat, tags, tagsSelected, search } = this.state;

        return (
            <div>
                <NavBar/>

                <div className="container mt-4">
                    <div className="row mb-3">
                        <div className="col-12 my-3">
                            # Noticias: {notices.length}
                        </div>
                        <div className="col-8">
                            <div className="categories d-flex align-items-center">
                                <div
                                    className={`category me-3 bg-warning p-2 rounded ${selectedCat === 'all' ? 'active' : ''}`}
                                    onClick={() => this.filterByCategory('all')}
                                >
                                    Todas
                                </div>
                                {
                                    categories.map(category => (
                                        <div
                                            className={`category me-3 bg-warning p-2 rounded ${selectedCat === category ? 'active' : ''}`}
                                            key={category._id}
                                            onClick={() => this.filterByCategory(category)}
                                        >
                                            {category.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-3">
                                <input className="form-control" placeholder="Buscar..." onChange={this.handleChangeSearch} value={search} />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="tags d-flex align-items-center mt-3">
                                <div
                                    className={`tag me-3 bg-light border border-secondary px-2 rounded ${tagsSelected.length === 0 ? 'active' : ''}`}
                                    onClick={() => this.filterByTags('all')}
                                >
                                    Todas
                                </div>
                                {
                                    tags.map(tag => {
                                        const isActive = tagsSelected.findIndex(tagSel => tagSel._id === tag._id) !== -1;
                                        return (
                                            <div
                                                className={`tag me-3 bg-light border border-secondary px-2 rounded ${isActive ? 'active' : ''}`}
                                                key={tag._id}
                                                onClick={() => this.filterByTags(tag)}
                                            >
                                                {tag.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            notices.map(notice => (
                                <div className="col-4 mb-3" key={notice._id}>
                                    <NewCard news={notice} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;