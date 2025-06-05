"use server"

export async function handleForm(prevState:unknown,formData:FormData){
    await new Promise ((resolve)=>setTimeout(resolve,2000))
    const password = formData.get("password")

   if (password === "12345") {
    return {message:"Welcome back!"}
    
  } else {
    return {
        error :"Wrong password"
        }
    }
}