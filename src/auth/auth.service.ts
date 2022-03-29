import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // #TODO: implement actual user validation when a user module is created
  // create dummy method that returns true when password = 123
  public async validateUser(username: string, password: string): Promise<any> {
    const user = await Promise.resolve({ username, password: '123' });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
