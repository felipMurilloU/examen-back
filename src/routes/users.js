import bcrypt from "../../libs/bcrypt";
import jwt from "../../libs/jwt";
import auth from "../../libs/auth";
module.exports = (app, db) => {
  app.get( "/users", (req, res, next) => {
    return db.users.findAll().then( (result) => res.json(result) )
  });

  app.get( "/users/:id", (req, res) => {
    return db.user.findByPk(req.params.id).then( (result) => res.json(result))
  });

  app.post("/users",  async (req, res, next) =>  {
    const passHash = await bcrypt.create(req.body.password)
  
    const user = {
      name: req.body.name,
      hash: passHash,
      celular: '',
      birth_date: new Date(),
      password: req.body.password,
      username: req.body.username,
      active: true
    };
    db.users.create(user).then( (result) => res.json(result) ).catch(err=> {
      console.log(err)
      res.status(400).send({ success: false, mensaje: 'Ya existe un registro' })
    })
  }
    
  );
  app.post("/users/login", async (req, res, next) => 
  {
    const user = await db.users.findOne({ where: {username: req.body.username}});
    if (user === null) {
      res.status(400).send({ success: false, mensaje: 'Usuario o Contraseña inválidos' })
      return next();
    }
    if (!await bcrypt.verify(user.hash, req.body.password)) {
      res.status(400).send({ success: false, mensaje: 'Usuario o Contraseña inválidos' })
      return next();
    }
    let token = await jwt.create({id: user.id});
    res.json({ token, role: user.role, name: user.name, id: user.id, photo: user.photo, success: true });
  }
  );

  app.put( "/users/:id", (req, res) =>
    db.user.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );

  app.delete( "/users/:id", (req, res) =>
    db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}