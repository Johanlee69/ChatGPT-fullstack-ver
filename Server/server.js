import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { database } from './DB/DB.js'
import Gemini from './Controllers/GeminiAPI.js'
import  {FunRegister}  from './Controllers/API/Register.js'
import { FunLogin } from './Controllers/API/login.js'
import cookieParser from 'cookie-parser'
import { verify } from './Controllers/Auth.js'
import { FunLogOuT } from './Controllers/API/logout.js'
import { ChatSave } from './Controllers/API/ChatSave.js'
import { FetchChat } from './Controllers/API/FetchChat.js'
import { deleteChat } from './Controllers/API/Delete.js'

const app = express()
app.use(cors({
  origin : process.env.Client ,
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
const port = process.env.PORT

database();

app.get('/', (_, res) => {
    res.send('server is running')
  })


app.post('/Gemini',verify,async (req,res)=>{
    try{
      const prompt = req.body.prompt;
      if (!prompt) {
        return res.status(400).json({Message: 'Prompt is required'});
      }
      const response = await Gemini(prompt);
      res.status(200).json({Message : response})
    }
    catch(err){
        console.log(err)
        res.status(400).json({Message : 'internal server error failed to generate response'})
    }
})

app.post('/Login',FunLogin)
app.post('/Register',FunRegister)
//protected routes
app.post('/LogOut',verify,FunLogOuT)
app.get('/CheckAuth',verify,(req,res)=>{
  try {
    res.status(200).json({Message : "User is authenticated"});   
  } catch (error) {
    res.status(401).json({Message : "User is not authenticated"})
  }
})
app.post('/Save',verify,ChatSave)
app.post('/DeleteChat',verify,deleteChat);
app.get('/FetchChathistory',verify,FetchChat)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
    console.log(`http://localhost:${port}`)
  })