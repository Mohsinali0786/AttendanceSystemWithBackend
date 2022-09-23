const Company = require('../Model/companyModel')

const registerCompany = async (req, res) => {
    try {
        console.log(req.body)

        const { companyName, contactNo, address, email, password } = req.body

        // console.log('email===>', email)
        const CompanyExist = await Company.findOne({ email })
        // console.log('CompanyExist', CompanyExist)
        if (CompanyExist) {
            res.status(400)
            throw new Error('Company Already Exist')
        }
        const myCompany = await Company.create({
            companyName,
            contactNo,
            address,
            email,
            password
        });
        if (myCompany) {
            res.status(201).json({
                _id: myCompany._id,
                companyName: myCompany.companyName,
                contactNo: myCompany.contactNo,
                address: myCompany.address,
                email: myCompany.email,
                password: myCompany.password,
                isAdmin: myCompany.isAdmin,
            })
        }
        else {
            res.status(400)
            throw new Error('Error Occured')
        }
        //     await Company.findOne({email:email},(err ,result)=>{
        //         if(err){
        //             console.log('err',err)
        //         }

        //     })
        return res.send({ success: true })
    }
    catch (err) {

        console.log('err', err)
    }

}
const authCompany = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    // const EmailExist=await Company.findOne({email})


    const companyExist = await Company.findOne({ email })
    console.log('----companyExist----', companyExist)
    if (companyExist && await companyExist.matchPassword(password)) {
        res.send({ status: 'success', message: 'Congratulation You Successfully Login !', id: 'id' })
    }
    else {

        res.send({ status: 'error', message: 'Wrong Passowrd' })
        // res.status(400)
        // throw new Error('Invalid Company or Password')
    }

}


const getData = async (res) => {

}
module.exports = { registerCompany, authCompany }