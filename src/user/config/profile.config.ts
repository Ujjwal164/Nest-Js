import { registerAs } from '@nestjs/config';

export default registerAs('profile', () => ({
  profile: process.env.PROFILE_API_KEY,
}));
