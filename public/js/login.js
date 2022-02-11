class Login{
    constructor ()
    {
        this.endpoint = {
            login : "/user/login"
        }
        this.email = document.querySelector('#email')
        this.password = document.querySelector('#password')
        this.form = document.querySelector('form')
    }

    HandleValidation ()
    {
        if(this.email.value.trim() === "") 
            return {valid:false, message:"Please fill up the email."}

        if(this.password.value.trim() === "") 
            return {valid:false, message:"Please fill up the password."}

        return {valid:true}
    }

    async Submit ()
    {   
        const validate = this.HandleValidation()

        if(!validate.valid) return alert(validate.message)

        fetch(this.endpoint.login,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : this.email.value,
                password : this.password.value
            })
        })
        .then(res => res.json())
        .then(d => {
            if(d.status === false) return alert(d.error)

            location.href="/driver"
        })
    }

    _init ()
    {
        this.form.addEventListener('submit', (e) =>{
            e.preventDefault()

            this.Submit()
        })
    }
}

(new Login)._init()