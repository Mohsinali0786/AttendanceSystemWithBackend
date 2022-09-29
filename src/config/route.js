import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../Componenet/SignInComponent'
import SignUpForm from '../Screen/SignUpForm'
import AdminPage from '../Screen/adminPage'
import Student from '../Screen/Student'
import Home from '../Screen/Home'
import CompanySignUpForm from '../Screen/CompanySignUp'
import CompanyProfile from '../Screen/companyProfile'
import UserProfile from '../Screen/userProfile'


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
                <Route path='/comapanysignup' element={<CompanySignUpForm />} />
                <Route path='/profile' element={<CompanyProfile />} />
                <Route path='/userprofile' element={<UserProfile />} />





            </Routes>

        </BrowserRouter>


    )
}
export default AppRouter