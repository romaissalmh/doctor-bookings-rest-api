const jwt =  require('jsonwebtoken');

 function verifyTokenDoctor(req, res, next) {
    
    // verify access
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);

    if (token == null) {
        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (user != undefined) {
            const role = user.role
            // Only doctor can do this task

            if (role != "doctor") {
                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;
            }
            else  next()
        }

    } catch (err) {
        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }


  }

  function verifyTokenPatient(req, res, next) {
    
    // verify access
    const token = req.headers['authorization']
    console.log("g"+token);
 
    if (token == null) {
        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (user != undefined) {
            const role = user.role
            // Only patient can do this task

            if (role != "patient") {
                res.status(403).send({
                    message: "Access Forbidden,you can't do this operation",
                });

                return;
            }
            else  next()
        }

    } catch (err) {
        res.status(403).send({
            message: "Access Forbidden,invalide token",
        });

        return;

    }


  }

  module.exports =  {
     verifyTokenDoctor,
     verifyTokenPatient
  }
  
