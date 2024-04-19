import express from "express";
import {createUser,
      loginUser,
      // logoutCurrentUser,
      // getAllUser,
      // getCurrentUserProfile,
      // upadateUserProfile,
      // deleteUserById,
      // getUserByid,
      // upadateUserById,
} from "../controllers/userControll.js";

// import {authenticate,authorizeAdim } from "../middlewares/authMiddleware.js";

const router = express.Router()

router
       .route('/signup')
       .get((req, res) => {
            res.render("signup");
       })
       .post(createUser)
      //  .get(authenticate,authorizeAdim,getAllUser)
router.route('/signin')
      .get((req,res)=>{
            res.render('signin')
      })
      .post(loginUser)
// router.post('/auth', loginUser)
// router.post('/logout',logoutCurrentUser)

// router.route('/profile')
//       .get(authenticate,getCurrentUserProfile)
//       .put(authenticate,upadateUserProfile)

//Admin routes
// router.route('/:id')
//       .delete(authenticate,authorizeAdim,deleteUserById)
//       .get(authenticate,authorizeAdim,getUserByid)
//       .put(authenticate,authorizeAdim,upadateUserById)



export default router