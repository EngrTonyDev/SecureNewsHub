import React, { Component, useState } from 'react';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../services/categoryService';

import './modal.css';
import { getRole } from '../services/roleService';
import { getSession } from '../services/sessionService';
import NavBar from '../components/NavBar';
import { decodeToken } from '../utils/decodeToken';



class Categories extends Component {


    state = {
        data: [],
        form: {
            name: ''
        }
    }

    componentDidMount() {
       // this.gettingSession();



       this.gettingSession();
        this.gettingCategories();

        const myDiv = document.getElementById("modal");
        myDiv.style.display = "none";
    }

    gettingSession = async () => {
        try{const user = await decodeToken();
            console.log(user.role.name);
            if(user.role.name==="regular"){
                window.location.href = "/";

            }

                   if(user===null){window.location.href = "/";//return to login screen
                
            }
        }catch{
            window.location.href = "/";//return to login screen

        }
        

       
    }
    




    //Obtiene las categorías

    gettingCategories = async () => {
        this.setState({ isLoading: true });
        const { error, data } = await getCategories()
        //console.log(data);
        if (data) {
            this.setState({ data })
        }
        this.setState({ isLoading: false });
    }

    postCategories = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        this.state.form.name = e.target.name.value;
        console.log(this.state.form.name)
        const form = await createCategory(this.state.form);
        if (form) {
            await this.gettingCategories();
            alert("Category has been added sucessfully!");
            this.setState({ isLoading: false });

        }
    }

    handleDelete = async (category_id, e) => {
        this.setState({ isLoading: true });
        console.log("delete value:" + category_id)

        const { error } = await deleteCategory(category_id);

        if (!error) {
            await this.gettingCategories();
            //this.handleCloseDelete();
            alert("Category has been deleted sucessfully!");
        }
        this.setState({ isLoading: false });
    }

    patchCategories = async (e) => {
        e.preventDefault();
        this.state.form.name = e.target.edit_name.value;
        console.log("this.state.form:");
        console.log(this.state.form);

        const { error } = await updateCategory(this.state.form);
        if (!error) {
            await this.gettingCategories();
            this.handleModal();
            alert("Category has been modified!")
        }
        this.setState({ isLoading: false });
    }

    handleModal = () => {
        const div = document.getElementById('modal');
        div.style.display = div.style.display === 'none' ? 'block' : 'none';
    }

    handleOpenModal = (category, e) => {
        this.handleModal();
        var categoryName = document.getElementById("edit_name");
        categoryName.value = category.name;
        this.state.form._id = category._id;
    }
    /*<Modal isOpen={this.props.openModal}>
  <ModalHeader style={{ display: 'block' }}>
    <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.handleCloseModal()}>
      &times;
    </span>
  </ModalHeader>
  <ModalBody>
    <form onSubmit={this.patchCategories}>
      <div className="mb-4">
        <label htmlFor="edit_name" className="block text-gray-700 font-bold mb-2">
          Category Name
        </label>
        <input
          type="text"
          id="edit_name"
          name="edit_name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
    <button className="btn btn-success" onClick={() => this.handleCloseModal()}>
      Save
    </button>
    <button className="btn btn-danger" onClick={() => this.handleCloseModal()}>
      Cancel
    </button>
  </ModalFooter>
</Modal>*/

    render() {

        return (
            <div className="flex w-full h-screen">

                <NavBar />
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.handleModal}>&times;</span>
                        <div>

                            <form onSubmit={this.patchCategories}>
                                <div className="mb-4">
                                    <label htmlFor="edit_name" className="block text-gray-700 font-bold mb-2">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        id="edit_name"
                                        name="edit_name"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Save-
                                    </button>
                                </div>
                            </form>


                        </div>



                    </div></div>

               

                <div className='content-between bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>

                    <h3 className='text-gray-500 mt-4 text-5xl font-semibold text-center'>Please add new category</h3>
                    <div className='mt-8'>
                        <form onSubmit={this.postCategories} method="POST" >

                            <div>
                                <label className='text-lg font-medium'>Name:</label>
                                <input
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='Category name' name='name' required
                                />
                            </div>
                            <div className='mt-8 flex flex-col gap-y-4'>
                                <button className='active:scale-[.98] py-2 rounded-xl bg-violet-500 text-white text-lg font-bol'
                                    type="submit" name='save'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex flex-auto">

                    <div className='flex flex-auto content-between bg-white px-10 py-20 rounded-3xl border-2 border-gray-100 '>

                        <h2 className='text-gray-500 mt-4 text-5xl font-semibold text-center'>Categories</h2>

                        <div className='mt-12'>

                            <div className="mt-12">
                                <table className="mt-8 text-gray-500 font-semibold">
                                    <thead>
                                        <tr>
                                            <th className='border border-gray-400 px-4 py-2 text-violet-500'>Category</th>
                                            <th className='border border-gray-400 px-4 py-2 text-violet-500'>Edit</th>
                                            <th className='border border-gray-400 px-4 py-2 text-violet-500'>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data?.map(category => {
                                            return (

                                                <tr key={category._id}>
                                                    <td className='border border-gray-400  px-4 py-2'>{category.name}</td>
                                                    <td className='border border-gray-400  px-4 py-2 text-center'>
                                                        <button className="text-violet-500" onClick={e => this.handleOpenModal(category, e)}>
                                                            <i className="fa-solid fa-pen-to-square" id="edit_category"></i>
                                                        </button>
                                                    </td>
                                                    <td className='border border-gray-400  px-4 py-2 text-center'><i className="fa-sharp fa-solid fa-trash" onClick={e => this.handleDelete(category._id, e)}></i></td>
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


export default Categories;