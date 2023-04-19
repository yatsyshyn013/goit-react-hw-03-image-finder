import {  Field, Form, Formik, } from 'formik';


export function Searchbar({onSubmit}) {
    
    const initialValues = {
        inputValue: "",
    }

    function handleSubmit(values, {resetForm}) {
        console.log(values);
            
            onSubmit(values)
            resetForm();
    }

    return (
            <header className="searchbar">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                
                    <Form className="form">
                        <button type="submit" className="button">
                        <span className="button-label">Search</span>
                        </button>

                    <Field
                        name="inputValue"
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        />
                    </Form>
                </Formik>
</header>
    )
}

