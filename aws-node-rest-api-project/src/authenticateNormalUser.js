const loginNormalUser = async(event) => {
    console.log(JSON.stringify(event));
    console.log('loginNormalUser handler function has executed');
    return{
        statusCode: 200,
        body: JSON.stringify({
            message:"it works",
            input: event,
        },
        null,
        2
        ),
    
    }
}

function generateAccessToken(email) {
    return jwt.sign({ email:email}, process.env.JWT_SECRET,{ expiresIn: EXPIRES_IN_MINUTES});
}
module.exports = {
    handler: loginNormalUser
}