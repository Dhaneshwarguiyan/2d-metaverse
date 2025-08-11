import jwt from "jsonwebtoken";
import { Request,Response } from "express";
import dotenv from "dotenv";
import  {prisma} from "@repo/db/client";
import bcrypt from 'bcrypt';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export const loginController = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    try {
      const response = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (response) {
        const result = await bcrypt.compare(password,response.password);
        if (result) {
          const token = jwt.sign({ id: response.id }, JWT_SECRET as string);
          res.status(200).send({ token, username: response.username });
          return;
        }
      }
      //401 Unauthorized: The user is not authenticated against the API
      res.status(401).send({ message: "Incorrect Credentials" });
    } catch (error) {
      console.log(error);
    }
  }

export const signupController = async (req:Request, res:Response) => {
    const { username, firstName, lastName, email, password } = req.body;
    bcrypt.genSalt(8,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
          try {
            await prisma.user.create({
              data: {
                username,
                firstName,
                lastName,
                email,
                password:hash,
              },
            });
            res.status(200).send({ message: "User created Successfully" });
          } catch (error: any) {
            //validating only unique constraints
            if (error.code === "P2002") {
              const target = error.meta?.target;
              //400 Bad Request: The request was not formatted correctly
              res.status(400).send({ message: `${target} already exists` });
              return;
            }
            res.status(500).send({ message: "Internal Server Error" });
          }
        })
    })
  }