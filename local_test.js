const mongoose = require('mongoose');
const User = require('./src/models/User');
const dotenv = require('dotenv');
dotenv.config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connected');
        
        const user = await User.create({
            name: 'Local Test',
            email: 'local' + Date.now() + '@test.com',
            password: 'password123',
            role: 'student'
        });
        console.log('User created:', user.email);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}
test();
