import config from "./config.js";
import passport from "passport";
import UsersService from "../service/dao/users.service.js";
import jwtStrategy from "passport-jwt";

const usersService = new UsersService();
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  //Estrategia de obtener Token JWT por Cookie:
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwtPrivateKey,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
  //Funciones de Serializacion y Desserializacion
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await usersService.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwtCookieToken"];
  }
  return token;
};

export default initializePassport;
