import React, {useEffect, useState} from 'react';
import styled                       from 'styled-components';
import axios                        from "axios";
import BootstrapTable               from 'react-bootstrap-table-next';
import Pagination                   from 'react-js-pagination';
import {Field, Form, Formik} from "formik";
import UserCard from './UserCard';

const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(1);
    const [total, setTotal] = useState(1);

    let getUsersData = async (pageNumber , searchParams = null) => {
        axios.get("https://boiler-stage.ibtikar.sa/api/v1/users?page=" + pageNumber + "&"+searchParams, {
            headers: {
                "X-Api-Key": "boilerplate_react",
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        }).then(function (response) {
            console.log(response.data);
            setUsers(response.data.data);
            setPerPage(response.data.data.length);
            setPage(response.data.meta.current_page);
            setTotal(response.data.meta.total);

        }).catch(function (error) {
            console.log(error);
            alert(error.message);
        });

    };

    const columns = [
        {dataField: "name", text: "User name"},
        {dataField: "email", text: "Email"},
        {dataField: "mobile_number", text: "Mobile number"},
    ];

    useEffect(() => {
        getUsersData(1).then(r => {
            console.log('Done')
        });
    }, []);


    return (
        <Wrapper>
            <Formik
                initialValues = {{
                    search: '',
                }}
                onSubmit = {values => {
                    getUsersData(1,"name="+values.search);
                }}
            >

                {({errors, touched, isValidating}) => (
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className = "form-group">
                                    <Field name = "search" className = "form-control" type = "text"/>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type = "submit" className = "btn btn-dark btn-lg btn-block">
                                    Search
                                </button>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>

            {users.map((user) => {
                return <UserCard key={user.id} user={user} />;
            })}

            <div>
                <Pagination
                    activePage = {page}
                    itemsCountPerPage = {perPage}
                    totalItemsCount = {total}
                    pageRangeDisplayed = {5}
                    onChange = {(pageNumber) => getUsersData(pageNumber)}
                    itemClass = "page-item"
                    linkClass = "page-link"
                    firstPageText = "First"
                    lastPageText = "Last"
                />
            </div>

        </Wrapper>
    );

}

export default Users;

