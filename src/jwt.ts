import jwt from 'jsonwebtoken'
import config from 'config'


const private_key = config.get<string>('private_key');
const public_key = config.get<string>('public_key');

export function signing_jwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, private_key, { 
        // Ensure options not undefined
        ...(options && options), algorithm: 'RS256' 
    })
}

export function verify_jwt(token: string) {
    try { 
        let decode_token = jwt.verify(token, public_key);
        return { 
            valid: true,
            expired: false, 
            decoded: decode_token
        }
    } catch (error: any) {
        return { 
            valid: false, 
            expired: error.message === 'jwt expired',
            decoded: null 
        }
    }
}