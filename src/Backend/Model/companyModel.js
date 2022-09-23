const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true
        },
        contactNo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    { userRole: 'admin' },
    { type: 'company' },
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//for password encrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

let Company = mongoose.model("Company", userSchema);
module.exports = Company;

