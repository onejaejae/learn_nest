import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.Repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      // jwt 토큰을 생성할 때 사용되는 키인데 절대로 외부에 노출되면 안 되는 값이므로 환경변수나 config 로 빼서 사용하는 것을 권장한다
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      // jwt로 생성해서 클라이언트 측으로 보냈던 Token 값을 헤더에 Bearer Token 값으로 포함하여 호출해야 서버단에서 토큰을 받아 검사할 수 있다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
