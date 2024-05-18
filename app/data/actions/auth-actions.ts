"use server";

export async function registerUserAction(formData: FormData) {
    console.log("Hello From Register User Action");

    const fields = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')

    }

    console.log(fields)
  }


