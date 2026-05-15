async function test() {
    try {
        const response = await fetch('https://backend-1-x7ra.onrender.com/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Admin',
                email: 'admin_test_999@gmail.com',
                password: 'password123',
                role: 'admin'
            })
        });
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    }
}
test();
