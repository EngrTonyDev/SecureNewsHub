import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import NavbarCover from '../components/NavBar';
import { getCategories } from '../services/categoryService';
import { createSource, deleteSource, getSources, updateSource } from '../services/newSourceService';
import { decodeToken } from '../utils/decodeToken';
//import Loading from '../components/Loading';
import NavBar from '../components/NavBar';



import './modal.css';
import { getRole } from '../services/roleService';
import { getSession } from '../services/sessionService';



class NewSource extends Component {


    state = {
        categories: [],
        data: [],
        form: {
            name: '',
            url: '',
            category_id: '',
            user_id: ''

        }
    }


    componentDidMount() {
        
        this.gettingCategories();
        this.gettingSources();
        this.gettingSession();

        const myDiv = document.getElementById("modal");
        myDiv.style.display = "none";
    }
   
    gettingSession = async () => {
        try{const user = await decodeToken();
            if(user===null){window.location.href = "/";//return to login screen
                
        }
        }catch{
            window.location.href = "/";//return to login screen

        }

    }
    

    //Obtiene las categorías

    gettingCategories = async () => {
        this.setState({ isLoading: true });
        const { data, error } = await getCategories();
        if (!error) {


            this.setState({ categories: data })
        }
        this.setState({ isLoading: false });
    }


    gettingSources = async () => {
        //this.setState({ isLoading: true });
        const { error, data } = await getSources()
        //console.log(data);
        if (data) {
            this.setState({ data: data })
        }
        //this.setState({ isLoading: false });
    }

    postSource = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        this.state.form.name = e.target.name.value;
        this.state.form.url = e.target.url.value;
        this.state.form.category_id = e.target.category_id.value;
        this.state.form.user_id = decodeToken()._id;

        const form = await createSource(this.state.form);
        console.log("this.state.form")
        console.log(this.state.form)
        if (form) {
            await this.gettingCategories();
            await this.gettingSources();
            this.setState({ isLoading: false });
            alert("Source has been added sucessfully!");
        }
    }

    handleDelete = async (source_id, e) => {
        this.setState({ isLoading: true });
        console.log("delete value:" + source_id)

        const { error } = await deleteSource(source_id);

        if (!error) {
            await this.gettingCategories();
            alert("Source has been deleted sucessfully!");

            //this.handleCloseDelete();
        }
        this.setState({ isLoading: false });
        window.location.reload();
    }

    handleModal = () => {
        const div = document.getElementById('modal');
        div.style.display = div.style.display === 'none' ? 'block' : 'none';
    }

    handleOpenModal = (source, e) => {
        this.handleModal();

        document.getElementById("edit_name").value = source.name;
        document.getElementById("edit_RSS").value = source.url;
        //document.getElementById("edit_category").select = source.category.name;
        this.state.form._id = source._id;

    }


    patchSource = async (e) => {
        e.preventDefault();
        this.state.form.name = e.target.edit_name.value;
        this.state.form.url = e.target.edit_RSS.value;
        this.state.form.category_id = e.target.edit_category.value;//set values to new form

        console.log("this.state.form holi");        
        console.log(this.state.form);
       
        

        const { error } = await updateSource(this.state.form);// send data to upddate source
        if (!error) {
            alert("Source has been modified! sucessfully")
            this.handleModal();
            await this.gettingCategories();
            await this.gettingSources();


        }else{
            console.log("error");  
            console.log(error );  
            
        }
        
    }

    render() {

        const { categories } = this.state;//load categories into new constant


        return (
            <div className="flex w-full h-screen">
                 <NavBar />

                <div id="modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.handleModal}>&times;</span>
                        <div>
                            <form onSubmit={this.patchSource}>
                                <div className="mb-4">
                                    <label htmlFor="edit_name" className="block text-gray-700 font-bold mb-2">
                                        Category Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="edit_name"
                                        name="edit_name"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    <label htmlFor="edit_RSS" className="block text-gray-700 font-bold mb-2">RSS:</label>


                                    <input
                                        type="text"
                                        id="edit_RSS"
                                        name="edit_RSS"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    <label htmlFor="edit_category" className="block text-gray-700 font-bold mb-2">Category:</label>
                                    <select className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' required

                                        name="edit_category" id="edit_category">

                                        {
                                            categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                                        }
                                    </select>

                                </div>
                                <div className="mb-4">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>



                    </div></div>
                <div className='content-between bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
                    <h3 className='text-gray-500 mt-4 text-5xl font-semibold text-center'>Please add new source</h3>
                    <div className='mt-8'>
                        <div>
                            <form onSubmit={this.postSource} method="POST">
                                <label className='text-lg font-medium'>News name:</label>
                                <input
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    name='name' required
                                    placeholder='Name'
                                />
                                <div>
                                    <label className='text-lg font-medium'>RSS:</label>
                                    <input
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        name='url' required
                                        placeholder='RSS URL'
                                    />
                                </div>
                                <div>
                                    <label className='text-lg font-medium'>Category:</label>
                                    <div>
                                        <select className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' required
                                            //value='{form.category_id}' 
                                            //onChange={this.handleChange} 
                                            name="category_id">
                                            <option></option>
                                            {
                                                categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-8 flex flex-col gap-y-4'>
                                    <button className='active:scale-[.98] py-2 rounded-xl bg-violet-500 text-white text-lg font-bol'
                                        type="submit" name='save'>Save</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                
                <div className="flex flex-auto">
                    
                    <div className='flex flex-auto content-between bg-white px-10 py-20 rounded-3xl border-2 border-gray-100 '>
                        
                        <h2 className='text-gray-500 mt-4 text-5xl font-semibold text-center'>Sources</h2>
                       

                        <div className='mt-12'>
                            <div className="mt-12">
                                <table className="mt-8 text-gray-500 font-semibold">
                                    <thead>
                                        <tr>
                                            <th className='border border-gray-400 px-4 py-2 text-violet-500'>News Name</th>
                                            <th className='border border-gray-400 px-4 py-2 text-violet-500'>Category</th>
                                            <th className='border border-gray-400 px-4 py-2 text-violet-500'>Edit</th>
                                            <th className='border border-gray-400 px-4 py-2 text-violet-500'>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data?.map(source => {
                                            return (

                                                <tr key={source._id}>
                                                    <td className='border border-gray-400  px-4 py-2'>{source.name}</td>
                                                    <td className='border border-gray-400  px-4 py-2'>{source.category.name}</td>
                                                    <td className='border border-gray-400  px-4 py-2 text-center'>
                                                        <button className="text-violet-500" onClick={e => this.handleOpenModal(source, e)}>
                                                            <i className="fa-solid fa-pen-to-square" id="edit_source"></i>
                                                        </button>
                                                    </td>
                                                    <td className='border border-gray-400  px-4 py-2 text-center'><i className="fa-sharp fa-solid fa-trash" onClick={e => this.handleDelete(source._id, e)}></i></td>
                                                </tr>

                                            )
                                        })}
                                    </tbody>
                                </table>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}


export default NewSource;