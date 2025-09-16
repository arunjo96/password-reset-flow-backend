
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
     resetPasswordString: String,
    resetPasswordExpires: Date
   
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password'));
        const saltRounds = await bcrypt.genSalt(Number(process.env.ENCRYPT_SALT_ROUNDS));
        this.password = await bcrypt.hash(this.password, saltRounds);
});


const User = mongoose.model('User', userSchema);
export default User;