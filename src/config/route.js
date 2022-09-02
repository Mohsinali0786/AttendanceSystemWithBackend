import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../Componenet/MainPage'
import SignUpForm from '../Componenet/SignUpForm'
import AdminPage from '../Componenet/adminPage'
import Student from '../Componenet/Student'
import Home from '../Componenet/Home'
// import {
//     SignInForm,
//     SignUpForm,
// } from './const'


// var Allpaths = [

//     { path: SignInForm, Component: MainPage },
//     { path: SignUpForm, Component: SignUpForm },


// ]

function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>
                {/* {
                        Allpaths.map((myroutes, index) => {
                            return (
                                <Route key={index} path={myroutes.path} element={<myroutes.Component />} />
                            )
                        })

                    } */}

                <Route path='/' element={<MainPage />} />
                <Route path='/signupform' element={<SignUpForm />} />
                <Route path='/adminPage' element={<AdminPage />} />
                <Route path='/student' element={<Student />} />
                <Route path='/home' element={<Home />} />


            </Routes>

        </BrowserRouter>


    )
}
export default AppRouter