const axios = require('axios')

test('should return all user', async ()=> {
    const response = await axios('http://localhost:5000/users');
    expect(await response.status).toBe(200)
})

test('user login', async()=>{
    const response = await axios('http://localhost:5000/auth/sign-in', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "username": "testuser",
            "password": "testpassword"
        }
    });

    expect(await response.status).toBe(200);
})