// import jwt from 'jsonwebtoken'

// const generatedAccessToken = async(userId)=>{

//     const token = await jwt.sign({ id : userId},
//         process.env.SECRET_KEY_ACCESS_TOKEN,
//         { expiresIn : '5h'}
//     )

//     return token
// }

// export default generatedAccessToken

import jwt from 'jsonwebtoken';

const generatedAccessToken = async (userId) => {
    if (!process.env.SECRET_KEY_ACCESS_TOKEN) {
        throw new Error('ACCESS TOKEN secret key is not configured');
    }
    
    return jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: '1d' }
    );
};

export default generatedAccessToken;