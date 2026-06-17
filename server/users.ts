"use server"
import { FormLogin } from "@/app/login/login-form"
import { FormSignup } from "@/app/signup/signup-form"
import { auth } from "@/lib/auth"

export const signIn = async (formdata: FormLogin) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: formdata.email,
        password: formdata.password,
      },
    })

    return {
      success: true,
      message: "Signed in successfully",
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      message: e.message || "Invalid email or password",
    }
  }
}

export const signUp = async (formdata: FormSignup) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
      },
    })

    return {
      success: true,
      message: "Signup user successfully",
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      message: e.message,
    }
  }
}
