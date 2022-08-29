import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../Componenet/MainPage'
import SignUpForm from '../Componenet/SignUpForm'
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
                <Route path='/SignUpForm' element={<SignUpForm />} />
                {/* <Route path='/webbag' element={<WebMybag />} /> */}
            </Routes>

        </BrowserRouter>


    )
}
export default AppRouter