import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword , avatar: `https://ui-avatars.com/api/?name=${userData.email}&rounded=true&bold=true&background=FCDADC&color=3D3373`});

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookieString: string; findUser: User; token: string }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const {cookieString, token} = this.createCookie(tokenData);

    return { cookieString, token, findUser };
  }

  public async getCurrentLoggedInUser(userId: string) : Promise<User> {
    const findUser: User = await this.users.findOne({ _id: userId}).select("-password");
    if (!findUser) throw new HttpException(404, `User not found`);
    return findUser;
  }


  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): {cookieString: string, token: string} {
    return {
      cookieString: `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`,
      token: tokenData.token
    }
  }
}

export default AuthService;
