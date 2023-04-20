import {  Field, Form, Formik, } from 'formik';
import { Header, SearchForm, FormButton, FormButtonLabel, Input } from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa/';


export function Searchbar({onSubmit}) {
    
    const initialValues = {
        inputValue: "",
    }

    function handleSubmit(values, {resetForm}) {
        // console.log(values);
            
            onSubmit(values)
            resetForm();
    }

    return (
            <Header className="searchbar">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                
                    <SearchForm className="form">
                        <FormButton type="submit" className="button">
                            <FaSearch/>
                        </FormButton>

                    <Input
                        name="inputValue"
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        />
                    </SearchForm>
                </Formik>
</Header>
    )
}

